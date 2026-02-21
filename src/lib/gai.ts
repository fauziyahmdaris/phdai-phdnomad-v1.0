export type GAIProviderId = 'gemini' | 'groq' | 'huggingface' | 'ollama';

export type GAIConfig = {
  geminiApiKey?: string;
  groqApiKey?: string;
  huggingFaceToken?: string;
  huggingFaceModel?: string;
  ollamaBaseUrl?: string;
  ollamaModel?: string;
};

export type GAIResult = {
  provider: GAIProviderId;
  text: string;
};

const DEFAULT_HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.3';
const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3.1';
const DEFAULT_GROQ_MODEL = 'llama-3.1-8b-instant';

const getLocalConfig = (): GAIConfig => {
  try {
    const raw = localStorage.getItem('gai-api-keys');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed ? parsed : {};
  } catch {
    return {};
  }
};

export const saveLocalConfig = (config: GAIConfig) => {
  localStorage.setItem('gai-api-keys', JSON.stringify(config));
};

export const getEffectiveConfig = (): GAIConfig => {
  const local = getLocalConfig();
  return {
    geminiApiKey: local.geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY,
    groqApiKey: local.groqApiKey || import.meta.env.VITE_GROQ_API_KEY,
    huggingFaceToken: local.huggingFaceToken || import.meta.env.VITE_HUGGINGFACE_TOKEN,
    huggingFaceModel: local.huggingFaceModel || import.meta.env.VITE_HUGGINGFACE_MODEL || DEFAULT_HF_MODEL,
    ollamaBaseUrl: local.ollamaBaseUrl || import.meta.env.VITE_OLLAMA_BASE_URL || DEFAULT_OLLAMA_BASE_URL,
    ollamaModel: local.ollamaModel || import.meta.env.VITE_OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL
  };
};

const extractText = (data: any): string => {
  if (!data) return '';
  if (typeof data === 'string') return data;

  const geminiText = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('');
  if (geminiText) return geminiText;

  const groqText = data?.choices?.[0]?.message?.content;
  if (typeof groqText === 'string' && groqText.trim()) return groqText;

  const hfText0 = data?.[0]?.generated_text;
  if (typeof hfText0 === 'string' && hfText0.trim()) return hfText0;

  const hfText1 = data?.generated_text;
  if (typeof hfText1 === 'string' && hfText1.trim()) return hfText1;

  const ollamaText = data?.response;
  if (typeof ollamaText === 'string' && ollamaText.trim()) return ollamaText;

  return '';
};

const callGemini = async (prompt: string, config: GAIConfig): Promise<GAIResult> => {
  if (!config.geminiApiKey) throw new Error('Missing Gemini API key');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(config.geminiApiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text = extractText(data);
  if (!text) throw new Error('Gemini returned empty text');
  return { provider: 'gemini', text };
};

const callGroq = async (prompt: string, config: GAIConfig): Promise<GAIResult> => {
  if (!config.groqApiKey) throw new Error('Missing Groq API key');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.groqApiKey}`
    },
    body: JSON.stringify({
      model: DEFAULT_GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4
    })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Groq error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text = extractText(data);
  if (!text) throw new Error('Groq returned empty text');
  return { provider: 'groq', text };
};

const callHuggingFace = async (prompt: string, config: GAIConfig): Promise<GAIResult> => {
  if (!config.huggingFaceToken) throw new Error('Missing Hugging Face token');
  const model = config.huggingFaceModel || DEFAULT_HF_MODEL;

  const res = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.huggingFaceToken}`
    },
    body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Hugging Face error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text = extractText(data);
  if (!text) throw new Error('Hugging Face returned empty text');
  return { provider: 'huggingface', text };
};

const callOllama = async (prompt: string, config: GAIConfig): Promise<GAIResult> => {
  const baseUrl = config.ollamaBaseUrl || DEFAULT_OLLAMA_BASE_URL;
  const model = config.ollamaModel || DEFAULT_OLLAMA_MODEL;

  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, stream: false })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Ollama error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const text = extractText(data);
  if (!text) throw new Error('Ollama returned empty text');
  return { provider: 'ollama', text };
};

export const generateWithFallback = async (
  prompt: string,
  preferredOrder: GAIProviderId[] = ['gemini', 'groq', 'huggingface', 'ollama']
): Promise<GAIResult> => {
  const config = getEffectiveConfig();
  const errors: string[] = [];

  for (const provider of preferredOrder) {
    try {
      if (provider === 'gemini') return await callGemini(prompt, config);
      if (provider === 'groq') return await callGroq(prompt, config);
      if (provider === 'huggingface') return await callHuggingFace(prompt, config);
      if (provider === 'ollama') return await callOllama(prompt, config);
    } catch (e: any) {
      errors.push(`${provider}: ${e?.message || String(e)}`);
    }
  }

  throw new Error(`All providers failed. ${errors.join(' | ')}`);
};

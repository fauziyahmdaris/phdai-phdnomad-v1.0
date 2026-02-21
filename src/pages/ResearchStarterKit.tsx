import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Target, FileText, Lightbulb, Rocket } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiCandidate {
  content?: GeminiContent;
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ResearchStarterKit: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useProject();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    objectives: [''],
    area: '',
    keywordsInput: '',
    keywords: [] as string[],
    gapDescription: '',
    selectedGap: '',
    researchGaps: [] as string[],
    generatedTitles: [] as string[],
    selectedTitle: '',
    researchAims: ''
  });

  const steps = [
    { id: 1, title: 'Research Keywords', icon: Search },
    { id: 2, title: 'Research Gap Search', icon: Target },
    { id: 3, title: 'Title Generator', icon: FileText },
    { id: 4, title: 'Research Aims', icon: Lightbulb },
    { id: 5, title: 'Complete Setup', icon: Rocket }
  ];

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedTitle) {
      createProject({
        title: formData.selectedTitle,
        objectives: formData.objectives.filter(obj => obj.trim()),
        area: formData.area,
        keywords: formData.keywords
      });
      navigate('/app');
    }
  };

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const parseKeywords = (input: string) => input.split(/,\s*|\s+/).filter(k => k.trim()).map(k => k.trim());

  const generateResearchAreas = async () => {
    if (!formData.keywordsInput.trim()) {
      alert('Please enter some keywords first');
      return;
    }
    const parsedKeywords = parseKeywords(formData.keywordsInput);
    setFormData(prev => ({
      ...prev,
      keywords: parsedKeywords
    }));

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: {
          ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: parsedKeywords.join(' ') })
      });
      const data = await response.json();
      const generatedAreas = Array.isArray(data) ? data.slice(0, 5).map(t => `${t} research`) : ['Error fetching areas'];
      setFormData(prev => ({
        ...prev,
        generatedTitles: generatedAreas
      }));
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      try {
        if (!GEMINI_API_KEY) {
          throw new Error('Missing Gemini API key');
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Generate 5 research areas based on: ${parsedKeywords.join(', ')}` }] }] })
        });
        const geminiData: GeminiResponse = await geminiResponse.json();
        const geminiAreas = geminiData.candidates?.[0]?.content?.parts.map((p: GeminiPart) => p.text) || ['Fallback error'];
        setFormData(prev => ({
          ...prev,
          generatedTitles: geminiAreas.slice(0, 5)
        }));
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
        const mockAreas = [
          `Molecular biology insights in ${parsedKeywords[0] || 'health'} research`,
          `Technological innovations for ${parsedKeywords[0] || 'engineering'} solutions`,
          `Behavioral economics in ${parsedKeywords[0] || 'market'} dynamics`,
          `Social identity in ${parsedKeywords[0] || 'community'} studies`,
          `Chronic disease management via ${parsedKeywords[0] || 'healthcare'} systems`
        ];
        setFormData(prev => ({
          ...prev,
          generatedTitles: mockAreas
        }));
      }
    }
  };

  const findResearchGaps = async () => {
    if (!formData.gapDescription) {
      alert('Please describe your research area first');
      return;
    }
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: {
          ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: formData.gapDescription })
      });
      const data = await response.json();
      const gaps = Array.isArray(data) ? data.slice(0, 5).map(t => `A gap in ${t}`) : ['Error fetching gaps'];
      setFormData(prev => ({
        ...prev,
        researchGaps: gaps
      }));
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      try {
        if (!GEMINI_API_KEY) {
          throw new Error('Missing Gemini API key');
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Identify 5 research gaps based on: ${formData.gapDescription}` }] }] })
        });
        const geminiData: GeminiResponse = await geminiResponse.json();
        const geminiGaps = geminiData.candidates?.[0]?.content?.parts.map((p: GeminiPart) => p.text) || ['Fallback error'];
        setFormData(prev => ({
          ...prev,
          researchGaps: geminiGaps.slice(0, 5)
        }));
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
        const mockGaps = [
          "A glaring void exists in longitudinal studies exploring the interplay of biodiversity loss and ecosystem resilience.",
          "An urgent deficiency persists in research on scalable sensor technologies for real-time environmental monitoring.",
          "A profound lack of empirical evidence hampers our understanding of digital marketing's impact on small business resilience.",
          "A critical shortfall emerges in ethnographic studies of community engagement within marginalized urban settings.",
          "A pressing absence of clinical trials investigating telemedicine's efficacy in chronic disease management."
        ];
        setFormData(prev => ({
          ...prev,
          researchGaps: mockGaps
        }));
      }
    }
  };

  const generateResearchTitles = async () => {
    if (!formData.selectedGap) {
      alert('Please select a research gap first');
      return;
    }
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: {
          ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: formData.selectedGap })
      });
      const data = await response.json();
      const titles = Array.isArray(data) ? data.slice(0, 5).map(t => `Title: ${t}`) : ['Error fetching titles'];
      setFormData(prev => ({
        ...prev,
        generatedTitles: titles
      }));
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      try {
        if (!GEMINI_API_KEY) {
          throw new Error('Missing Gemini API key');
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Generate 5 research titles based on: ${formData.selectedGap}` }] }] })
        });
        const geminiData: GeminiResponse = await geminiResponse.json();
        const geminiTitles = geminiData.candidates?.[0]?.content?.parts.map((p: GeminiPart) => p.text) || ['Fallback error'];
        setFormData(prev => ({
          ...prev,
          generatedTitles: geminiTitles.slice(0, 5)
        }));
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
        const mockTitles = [
          "Unveiling Ecosystem Resilience: Longitudinal Studies on Biodiversity Loss",
          "Revolutionary Sensor Technologies: Redefining Environmental Monitoring",
          "Transforming Small Business Resilience: Insights into Digital Marketing",
          "Ethnographic Explorations: Reimagining Social Identity in Urban Settings",
          "Pioneering Telemedicine Trials: Enhancing Rural Healthcare"
        ];
        setFormData(prev => ({
          ...prev,
          generatedTitles: mockTitles
        }));
      }
    }
  };

  const generateResearchAims = async () => {
    if (!formData.selectedTitle) {
      alert('Please select a research title first');
      return;
    }
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: formData.selectedTitle })
      });
      const data = await response.json();
      const aims = Array.isArray(data) ? `This research aims to explore ${data[0]}.` : 'This research aims to explore the selected title.';
      setFormData(prev => ({
        ...prev,
        researchAims: aims
      }));
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      try {
        const geminiResponse = await fetch('https://api.google.com/generative/v1beta2/models/gemini-1.5-flash:generateContent', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer AIzaSyD5K7-eVElljF_1hK3QzsIL__XDHybeLcs',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Generate a research aim based on: ${formData.selectedTitle}` }] }] })
        });
        const geminiData: GeminiResponse = await geminiResponse.json();
        const geminiAims = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'This research aims to explore the selected title.';
        setFormData(prev => ({
          ...prev,
          researchAims: geminiAims
        }));
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
        const mockAims = `This research aims to pioneer a comprehensive study to unravel the complex interplay within ${formData.selectedTitle}, employing cutting-edge techniques to empower future innovations.`;
        setFormData(prev => ({
          ...prev,
          researchAims: mockAims
        }));
      }
    }
  };

  const setStep = (stepId: number) => {
    if (stepId >= 1 && stepId <= steps.length) setCurrentStep(stepId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="relative z-10 px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg width="28" height="28" viewBox="0 0 100 100" className="text-white">
                <defs>
                  <linearGradient id="owlGradientStarter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "currentColor", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "currentColor", stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="60" rx="25" ry="30" fill="url(#owlGradientStarter)" />
                <circle cx="50" cy="35" r="20" fill="url(#owlGradientStarter)" />
                <circle cx="43" cy="32" r="6" fill="white" />
                <circle cx="57" cy="32" r="6" fill="white" />
                <circle cx="43" cy="32" r="3" fill="#1F2937" />
                <circle cx="57" cy="32" r="3" fill="#1F2937" />
                <circle cx="44" cy="30" r="1" fill="white" />
                <circle cx="58" cy="30" r="1" fill="white" />
                <polygon points="50,38 47,42 53,42" fill="#F59E0B" />
                <polygon points="35,20 38,15 42,22" fill="url(#owlGradientStarter)" />
                <polygon points="65,20 62,15 58,22" fill="url(#owlGradientStarter)" />
                <rect x="35" y="18" width="30" height="4" fill="#1F2937" />
                <polygon points="50,18 45,12 55,12" fill="#1F2937" />
                <line x1="55" y1="12" x2="62" y2="8" stroke="#F59E0B" strokeWidth="1" />
                <circle cx="62" cy="8" r="2" fill="#F59E0B" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DrPhDAI</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Empathetic AI PhD Coach</p>
            </div>
          </div>
          <a href="https://buymeacoffee.com/qasharis" className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700" target="_blank" rel="noopener noreferrer">Upgrade Now</a>
        </div>
      </header>
      <div className="p-6 mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">PhD Starter Kit - Step {currentStep} of {steps.length}</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">{Math.round((currentStep / steps.length) * 100)}% Complete</div>
          </div>
          <div className="flex items-center mb-6 space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-colors ${step.id <= currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setStep(step.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${step.id === currentStep ? 'bg-blue-600 text-white' : step.id < currentStep ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <step.icon size={16} />
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
              {(() => {
                switch (currentStep) {
                  case 1:
                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🔍 Define Your Research Keywords</h2>
                          <p className="text-gray-600 dark:text-gray-400">Start by entering keywords that describe your research interests</p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Research Keywords</label>
                            <input
                              type="text"
                              value={formData.keywordsInput}
                              onChange={(e) => setFormData(prev => ({ ...prev, keywordsInput: e.target.value }))}
                              placeholder="e.g., AI Pedagogy for Adaptive Microlearning"
                              className="w-full px-4 py-3 text-gray-900 break-words whitespace-normal bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Type freely with spaces; parsed on generation</p>
                          </div>
                          <button
                            onClick={generateResearchAreas}
                            disabled={!formData.keywordsInput.trim()}
                            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                          >
                            <Lightbulb size={20} />
                            <span>✨ Generate Research Areas</span>
                          </button>
                          {formData.generatedTitles.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">Generated Research Areas (Edit for Originality):</h4>
                              <p className="mb-2 text-xs text-red-500">Revise to avoid plagiarism!</p>
                              <div className="space-y-2 overflow-y-auto max-h-40">
                                {formData.generatedTitles.map((area, index) => (
                                  <div key={index} className="p-2 text-sm text-blue-800 rounded bg-blue-50 dark:bg-blue-900/20 dark:text-blue-200">
                                    {area}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  case 2:
                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🔍 Research Gap Discovery</h2>
                          <p className="text-gray-600 dark:text-gray-400">Describe your research area to uncover powerful gaps</p>
                        </div>
                        <div className="space-y-4">
                          <textarea
                            value={formData.gapDescription}
                            onChange={(e) => setFormData(prev => ({ ...prev, gapDescription: e.target.value }))}
                            placeholder="Describe your research area..."
                            rows={4}
                            className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                          <button
                            onClick={findResearchGaps}
                            disabled={!formData.gapDescription}
                            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50"
                          >
                            <Search size={20} />
                            <span>🔍 Find Research Gaps</span>
                          </button>
                          {formData.researchGaps.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">Identified Research Gaps (Edit for Originality):</h4>
                              <p className="mb-2 text-xs text-red-500">Revise to avoid plagiarism!</p>
                              <div className="space-y-2 overflow-y-auto max-h-40">
                                {formData.researchGaps.map((gap, index) => (
                                  <div
                                    key={index}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${formData.selectedGap === gap ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, selectedGap: gap }))}
                                  >
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{gap}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  case 3:
                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">✨ Research Title Generator</h2>
                          <p className="text-gray-600 dark:text-gray-400">Generate titles based on your selected gap</p>
                        </div>
                        <div className="space-y-4">
                          <button
                            onClick={generateResearchTitles}
                            disabled={!formData.selectedGap}
                            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                          >
                            <Target size={20} />
                            <span>✨ Generate Research Titles</span>
                          </button>
                          {formData.generatedTitles.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">Generated Titles (Edit for Originality):</h4>
                              <p className="mb-2 text-xs text-red-500">Revise to avoid plagiarism!</p>
                              <div className="space-y-2 overflow-y-auto max-h-40">
                                {formData.generatedTitles.map((title, index) => (
                                  <div
                                    key={index}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${formData.selectedTitle === title ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-green-300'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, selectedTitle: title }))}
                                  >
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  case 4:
                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🎯 Research Aims Generator</h2>
                          <p className="text-gray-600 dark:text-gray-400">Develop clear aims and purpose statements</p>
                        </div>
                        <div className="space-y-4">
                          <button
                            onClick={generateResearchAims}
                            disabled={!formData.selectedTitle}
                            className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50"
                          >
                            <FileText size={20} />
                            <span>✨ Generate Research Aims</span>
                          </button>
                          {formData.researchAims && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">Generated Research Aims (Edit for Originality):</h4>
                              <p className="mb-2 text-xs text-red-500">Revise to avoid plagiarism!</p>
                              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{formData.researchAims}</p>
                              </div>
                            </div>
                          )}
                          {formData.selectedTitle && (
                            <div className="space-y-4">
                              <h4 className="font-medium text-gray-900 dark:text-white">Research Objectives:</h4>
                              {formData.objectives.map((objective, index) => (
                                <div key={index} className="mb-3">
                                  <textarea
                                    value={objective}
                                    onChange={(e) => updateObjective(index, e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder={`Objective ${index + 1}...`}
                                  />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={addObjective}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                              >
                                + Add Another Objective
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  case 5:
                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🚀 Complete Your Setup</h2>
                          <p className="text-gray-600 dark:text-gray-400">Review your framework and start your journey</p>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 dark:bg-gray-800 rounded-xl dark:border-gray-700">
                          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Your Research Framework Summary</h3>
                          <div className="space-y-4 text-sm">
                            <div>
                              <h4 className="font-medium text-blue-600 dark:text-blue-400">Selected Research Title</h4>
                              <p className="text-gray-700 dark:text-gray-300">{formData.selectedTitle || 'Not selected'}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-green-600 dark:text-green-400">Research Gap</h4>
                              <p className="text-gray-700 dark:text-gray-300">{formData.selectedGap || 'Not selected'}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-600 dark:text-purple-400">Research Aims</h4>
                              <p className="text-gray-700 dark:text-gray-300">{formData.researchAims || 'Not generated'}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-orange-600 dark:text-orange-400">Research Objectives</h4>
                              <ul className="text-gray-700 list-disc list-inside dark:text-gray-300">
                                {formData.objectives.filter(obj => obj.trim()).map((obj, i) => <li key={i}>{obj}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={handleSubmitProject}
                            disabled={!formData.selectedTitle}
                            className="flex items-center justify-center px-8 py-4 mx-auto space-x-2 text-lg font-semibold text-white transition-colors rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                          >
                            <Rocket size={20} />
                            <span>🎉 Start Research Journey</span>
                          </button>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
              <div className="flex justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setStep(currentStep - 1)}
                  disabled={currentStep === 1}
                  className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex space-x-3">
                  {currentStep < steps.length ? (
                    <button
                      onClick={() => setStep(currentStep + 1)}
                      className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <span>Next</span>
                    </button>
                  ) : (
                    <a href="/app" className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
                      <span>Go to Dashboard</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 top-6">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">PhD Starter Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Keyword Inspiration Generator</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Research Gap Discovery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Title Generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Research Aims Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Step-by-Step Guidance</span>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Need Help?</h4>
                <div className="space-y-2">
                  <a href="/app/user-guide" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <span>📖 User Guide</span>
                  </a>
                  <a href="/app/mentor" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <span>🤖 AI Mentor</span>
                  </a>
                  <a href="/app/help-support" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <span>❓ Support</span>
                  </a>
                </div>
                <a href="https://buymeacoffee.com/qasharis" className="block w-full py-2 mt-4 text-center text-white bg-green-600 rounded-lg hover:bg-green-700" target="_blank" rel="noopener noreferrer">Upgrade to Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchStarterKit;
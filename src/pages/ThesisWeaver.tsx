import React, { useMemo, useState } from 'react';
import { PenTool, Copy, Download, Sparkles, FileText, BookOpen } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { phdResearchContext, phdResearchKeywordsFlat } from '../data/researchContext';
import { generateWithFallback } from '../lib/gai';

const ThesisWeaver: React.FC = () => {
  const { literatureEntries } = useProject();
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiProviderUsed, setAiProviderUsed] = useState<string>('');
  const [aiError, setAiError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'references' | 'synthesis' | 'proposal'>('references');
  const [proposalSection, setProposalSection] = useState<
    'abstract' | 'chapter1' | 'chapter2' | 'chapter3' | 'researchQuestions'
  >('abstract');

  const selectedLiterature = useMemo(() => {
    return literatureEntries.filter(entry => selectedEntries.includes(entry.id));
  }, [literatureEntries, selectedEntries]);

  const extractLinkFromAbstract = (abstract: string) => {
    const candidates = abstract.match(/https?:\/\/\S+/g) || [];
    return candidates.length ? candidates[candidates.length - 1] : '';
  };

  const formatSelectedSources = () => {
    return selectedLiterature
      .sort((a, b) => a.authors[0].localeCompare(b.authors[0]))
      .map((entry) => {
        const authors = entry.authors.join(', ');
        const link = extractLinkFromAbstract(entry.abstract);
        const linkLine = link ? `\nLink: ${link}` : '';
        return `- ${authors} (${entry.year}). ${entry.title}. ${entry.journal}.${linkLine}`;
      })
      .join('\n');
  };

  const buildProposalPrompt = () => {
    const r = phdResearchContext.researcher;
    const keywords = phdResearchKeywordsFlat.join(', ');
    const sources = formatSelectedSources();

    const common = `You are my PhD writing supervisor and methodological coach.\n\nResearch context:\n- Researcher: ${r.name}\n- Working PhD title: ${r.workingTitle}\n- Mode: ${r.mode.join(' | ')}\n- Research lens: ${r.lens.join(' + ')}\n- Primary research question: ${phdResearchContext.primaryResearchQuestion}\n\nUse these research keywords throughout (prioritize relevance):\n${keywords}\n\nUse ONLY the sources I provide below for citations/claims. If a claim is not supported by the sources, mark it as [NEEDS SOURCE] instead of inventing it.\n\nSelected sources (${selectedLiterature.length}):\n${sources || '[No sources selected]'}\n\nWriting constraints:\n- Academic tone suitable for a PhD proposal\n- Clear signposting and strong argumentation\n- Keep it aligned to the framing: AI as relational life partner for human flourishing (not merely tool use)\n`;

    if (proposalSection === 'researchQuestions') {
      return `${common}\nTask: Propose a refined set of research questions and sub-questions (max 1 primary + 3-5 sub-questions) that align with the methodology (DDR + Practice-as-Research) and the relational AI framing. Provide:\n1) Primary RQ\n2) Sub-RQs\n3) Brief justification for each (2-3 sentences)\n4) Key constructs and operational signals for: cognition expansion, creativity expansion, identity expansion, flourishing\n`;
    }

    if (proposalSection === 'abstract') {
      return `${common}\nTask: Draft a PhD proposal Abstract (250-350 words). Structure it as:\n- Background / problem\n- Gap (explicitly: most literature positions AI as tool; this study reframes AI as relational partner)\n- Aim and contribution\n- Methodology (DDR + nomadic Practice-as-Research; embodied creative practice: filmmaking/music/travel/journaling/pedagogy)\n- Expected outcomes / significance (doctoral learning + flourishing)\n- Keywords (6-10 keywords from the list)\n\nEnd with a one-sentence statement of novelty.\n`;
    }

    if (proposalSection === 'chapter1') {
      return `${common}\nTask: Draft Chapter 1 (Introduction) for my PhD proposal with the following headings:\n1.1 Background\n1.2 Problem Statement\n1.3 Research Gap\n1.4 Aim & Objectives\n1.5 Research Questions\n1.6 Significance of the Study\n1.7 Scope & Limitations\n1.8 Conceptual Definitions (relational AI, flourishing, practice-as-research, nomadic inquiry)\n1.9 Chapter Summary\n\nKeep it grounded in the relational partner framing and link it to doctoral pedagogy and human flourishing. Use citations ONLY from the provided sources, or mark [NEEDS SOURCE].\n`;
    }

    if (proposalSection === 'chapter2') {
      return `${common}\nTask: Draft Chapter 2 (Literature Review) as a thematic synthesis. Requirements:\n- Organize the review using 5-7 themes aligned to the keyword clusters (relationality, flourishing, cognition/creativity/identity, embodied PaR, nomadic methodology, AI pedagogy/doctoral learning).\n- For each theme: summarize what is known, what is contested, and what is missing.\n- Include a short subsection that introduces the Support → Synergy → Symbiosis continuum and positions my study toward Symbiosis.\n- End with a clearly articulated conceptual/theoretical positioning for my study, and a final gap statement.\n\nUse in-text citations (Author, Year) based on the provided sources.\n`;
    }

    return `${common}\nTask: Draft Chapter 3 (Methodology) for a PhD proposal using DDR + Practice-as-Research (PaR) in a nomadic setting. Include:\n- Research design overview (DDR phases)\n- PaR logic and embodied creative practice activities\n- Data sources (journals, artefacts, reflective memos, interaction logs, supervisor feedback, etc.)\n- Participants (me + supervisors; explain boundaries)\n- Analysis strategy (thematic analysis + reflective analysis; how you will trace cognition/creativity/identity/flourishing shifts)\n- Ethics, privacy, and AI integrity (how to avoid fabrication; disclosure of AI assistance)\n- Trustworthiness/rigour strategies\n\nWrite it so a committee can approve it. Use citations where possible; otherwise mark [NEEDS SOURCE].\n`;
  };

  const handleEntryToggle = (entryId: string) => {
    setSelectedEntries(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const generateReferences = () => {
    if (selectedEntries.length === 0) {
      alert('Please select at least one entry to generate references');
      return;
    }

    const selectedLiterature = literatureEntries.filter(entry => 
      selectedEntries.includes(entry.id)
    );

    const references = selectedLiterature
      .sort((a, b) => a.authors[0].localeCompare(b.authors[0]))
      .map(entry => {
        const authors = entry.authors.join(', ');
        return `${authors} (${entry.year}). ${entry.title}. *${entry.journal}*.`;
      })
      .join('\n\n');

    setGeneratedContent(references);
  };

  const generateSynthesis = async () => {
    if (selectedEntries.length < 2) {
      alert('Please select at least 2 entries for synthesis');
      return;
    }

    setIsGenerating(true);
    setAiError('');
    setAiProviderUsed('');
    await new Promise(resolve => setTimeout(resolve, 400));

    const prompt = `${buildProposalPrompt()}\n\nAdditional task: Also produce a 800-1200 word literature synthesis (as part of Chapter 2) using the selected sources only. Provide:\n1) 5-7 themes\n2) points of agreement\n3) points of tension/contradiction\n4) explicit gap statement\n5) how this synthesis justifies the study\n`;

    setGeneratedContent(prompt);
    setIsGenerating(false);
  };

  const generateProposal = () => {
    if (selectedEntries.length === 0) {
      alert('Please select at least 1 entry so the output can cite your sources');
      return;
    }
    setAiError('');
    setAiProviderUsed('');
    setGeneratedContent(buildProposalPrompt());
  };

  const runInAppAI = async () => {
    if (!generatedContent.trim()) {
      alert('Generate a prompt first');
      return;
    }

    setIsAIGenerating(true);
    setAiError('');
    setAiProviderUsed('');

    try {
      const result = await generateWithFallback(generatedContent);
      setAiProviderUsed(result.provider);
      setGeneratedContent(result.text);
    } catch (e: any) {
      setAiError(e?.message || 'Failed to generate with AI');
    } finally {
      setIsAIGenerating(false);
    }
  };

  const openExternalGAI = async (url: string) => {
    if (!generatedContent.trim()) {
      alert('Generate a prompt first');
      return;
    }

    await navigator.clipboard.writeText(generatedContent);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      // Show success feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    });
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      activeTab === 'references'
        ? 'references.txt'
        : activeTab === 'proposal'
          ? `proposal_${proposalSection}.txt`
          : 'literature_synthesis_prompt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
          <PenTool className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Thesis Weaver
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate references and synthesize literature with AI assistance
          </p>
        </div>
      </div>

      {literatureEntries.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <BookOpen className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No Literature Entries Available
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Add some literature entries to your matrix first to use the Thesis Weaver
          </p>
          <a
            href="/app/matrix"
            className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go to Literature Matrix
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Selection Panel */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Select Literature Entries
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Choose the papers you want to include in your references or synthesis
            </p>
            
            <div className="space-y-3 overflow-y-auto max-h-96">
              {literatureEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedEntries.includes(entry.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => handleEntryToggle(entry.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedEntries.includes(entry.id)}
                      onChange={() => handleEntryToggle(entry.id)}
                      className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {entry.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {entry.authors.join(', ')} ({entry.year})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              {selectedEntries.length} of {literatureEntries.length} entries selected
            </div>
          </div>

          {/* Generation Panel */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Generate Content
              </h2>
              <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg dark:bg-gray-700">
                <button
                  onClick={() => setActiveTab('references')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'references'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  References
                </button>
                <button
                  onClick={() => setActiveTab('synthesis')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'synthesis'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Synthesis
                </button>
                <button
                  onClick={() => setActiveTab('proposal')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'proposal'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Proposal
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {activeTab === 'references' ? (
                <div>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Generate APA-style references for your selected literature entries
                  </p>
                  <button
                    onClick={generateReferences}
                    disabled={selectedEntries.length === 0}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText size={16} />
                    <span>Generate Reference List</span>
                  </button>
                </div>
              ) : activeTab === 'synthesis' ? (
                <div>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Create a high-quality prompt for an external GAI to synthesize your selected literature (minimum 2 entries)
                  </p>
                  <button
                    onClick={generateSynthesis}
                    disabled={selectedEntries.length < 2 || isGenerating}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={16} />
                    <span>
                      {isGenerating ? 'Preparing prompt...' : 'Generate Synthesis Prompt'}
                    </span>
                  </button>
                  {isGenerating && (
                    <div className="p-4 mt-4 rounded-lg bg-purple-50 dark:bg-purple-900">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-b-2 border-purple-600 rounded-full animate-spin"></div>
                        <div>
                          <p className="font-medium text-purple-900 dark:text-purple-100">
                            Preparing your prompt...
                          </p>
                          <p className="text-sm text-purple-700 dark:text-purple-300">
                            Including your research context + selected sources
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Generate proposal-ready prompts (Abstract, Chapter 1/2/3) using your research context and selected literature
                  </p>
                  <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                        Section
                      </label>
                      <select
                        value={proposalSection}
                        onChange={(e) => setProposalSection(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="abstract">Abstract</option>
                        <option value="chapter1">Chapter 1 (Introduction)</option>
                        <option value="chapter2">Chapter 2 (Literature Review)</option>
                        <option value="chapter3">Chapter 3 (Methodology)</option>
                        <option value="researchQuestions">Research Questions</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={generateProposal}
                        disabled={selectedEntries.length === 0}
                        className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FileText size={16} />
                        <span>Generate Proposal Prompt</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {generatedContent && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Generated{' '}
                      {activeTab === 'references'
                        ? 'References'
                        : activeTab === 'proposal'
                          ? 'Proposal Prompt'
                          : 'Synthesis Prompt'}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={downloadContent}
                        className="p-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>

                  {activeTab !== 'references' && (
                    <div className="grid grid-cols-1 gap-2 mb-3 sm:grid-cols-2">
                      <button
                        onClick={runInAppAI}
                        disabled={isAIGenerating}
                        className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles size={16} />
                        <span>
                          {isAIGenerating
                            ? 'Generating with AI...'
                            : 'Generate In-App (Gemini → Groq → HF → Ollama)'}
                        </span>
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openExternalGAI('https://gemini.google.com/')}
                          className="w-full px-3 py-2 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Gemini
                        </button>
                        <button
                          onClick={() => openExternalGAI('https://chat.openai.com/')}
                          className="w-full px-3 py-2 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          ChatGPT
                        </button>
                        <button
                          onClick={() => openExternalGAI('https://claude.ai/')}
                          className="w-full px-3 py-2 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Claude
                        </button>
                        <button
                          onClick={() => openExternalGAI('https://x.ai/')}
                          className="w-full px-3 py-2 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Grok
                        </button>
                        <button
                          onClick={() => openExternalGAI('https://www.perplexity.ai/')}
                          className="w-full px-3 py-2 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Perplexity
                        </button>
                      </div>
                    </div>
                  )}

                  {aiProviderUsed && (
                    <div className="p-3 mb-3 rounded-lg bg-emerald-50 dark:bg-emerald-900">
                      <p className="text-xs text-emerald-800 dark:text-emerald-200">
                        Generated using: <strong>{aiProviderUsed}</strong>
                      </p>
                    </div>
                  )}

                  {aiError && (
                    <div className="p-3 mb-3 rounded-lg bg-red-50 dark:bg-red-900">
                      <p className="text-xs text-red-800 dark:text-red-200">
                        <strong>AI generation failed:</strong> {aiError}
                      </p>
                    </div>
                  )}

                  <div className="p-4 overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-700 max-h-96">
                    <pre className="font-mono text-sm text-gray-900 whitespace-pre-wrap dark:text-white">
                      {generatedContent}
                    </pre>
                  </div>
                  {activeTab !== 'references' && !aiProviderUsed && (
                    <div className="p-3 mt-3 rounded-lg bg-yellow-50 dark:bg-yellow-900">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        <strong>Important:</strong> This is a prompt for an external GAI. Always verify outputs, add your own analysis, and maintain academic integrity by properly citing all sources.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThesisWeaver;
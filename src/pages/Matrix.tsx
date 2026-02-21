import React, { useEffect, useMemo, useState } from 'react';
import { Grid3X3, Plus, Download, Search, Sparkles, BookOpen, Edit3, Trash2, Eye, TrendingUp, Network, Image as ImageIcon } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { hasMVPAccess } from '../plan';

const Matrix: React.FC = () => {
  const { currentProject, literatureEntries, addLiteratureEntry, updateLiteratureEntry: _updateLiteratureEntry, deleteLiteratureEntry } = useProject();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [view, setView] = useState<'matrix' | 'map'>('matrix');
  const [insights, setInsights] = useState<{ title: string; detail: string }[]>([]);
  const [helperMsg, setHelperMsg] = useState<string>('Tip: Add 3–5 papers, then click "Show Me the Patterns" to reveal themes and gaps.');
  const [mindMapUrl, setMindMapUrl] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Plan gating - using new license key system
  const hasAccess = hasMVPAccess();
  
  const [formData, setFormData] = useState({
    title: '',
    authors: [''],
    year: new Date().getFullYear(),
    journal: '',
    abstract: ''
  });

  const filteredEntries = literatureEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'analyzed' && entry.researchGap) ||
                         (filterType === 'unanalyzed' && !entry.researchGap);
    return matchesSearch && matchesFilter;
  });

  const analyzedCount = useMemo(() => filteredEntries.filter(e => e.researchGap).length, [filteredEntries]);

  const addAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, '']
    }));
  };

  // Onboarding control
  useEffect(() => {
    try {
      const seen = localStorage.getItem('matrix_onboarding_seen');
      if (!seen) setShowOnboarding(true);
    } catch (e) { /* noop: localStorage unavailable */ }
  }, []);

  const dismissOnboarding = () => {
    try { localStorage.setItem('matrix_onboarding_seen', '1'); } catch (e) { /* noop */ }
    setShowOnboarding(false);
  };

  // --- Minimal Adaptive Intelligence helpers ---
  // Detect conflicting arguments across studies (simple polarity heuristic)
  const detectConflicts = () => {
    const positives = ['increase','improve','positive','effective','benefit','enhance','higher'];
    const negatives = ['decrease','worse','negative','ineffective','no effect','harm','lower'];
    for (let i = 0; i < filteredEntries.length; i++) {
      for (let j = i + 1; j < filteredEntries.length; j++) {
        const A = filteredEntries[i];
        const B = filteredEntries[j];
        const a = (A.keyFindings || '').toLowerCase();
        const b = (B.keyFindings || '').toLowerCase();
        const aPos = positives.some(w => a.includes(w));
        const aNeg = negatives.some(w => a.includes(w));
        const bPos = positives.some(w => b.includes(w));
        const bNeg = negatives.some(w => b.includes(w));
        if ((aPos && bNeg) || (aNeg && bPos)) {
          const detail = `I've detected a conflict in the literature! ${(A.authors[0]||'Study A')} (${A.year}) suggests one direction, while ${(B.authors[0]||'Study B')} (${B.year}) indicates the opposite. This tension is a great opportunity to position your research.`;
          setInsights(prev => [{ title: 'Conflicting Arguments', detail }, ...prev]);
          setHelperMsg('Nice work surfacing a debate! Consider framing your gap around reconciling this tension.');
          return;
        }
      }
    }
    setInsights(prev => [{ title: 'Conflicting Arguments', detail: 'No clear conflicts detected yet. Add more studies or richer Key Findings.' }, ...prev]);
  };

  // Generate a static SVG mind map and expose it as an object URL
  const generateMindMapSVG = () => {
    // Fixed the replace error by handling different types of currentProject
    const projectTitle = typeof currentProject === 'string' 
      ? currentProject 
      : (currentProject as any)?.title || 'Your Research Topic';
    const center = projectTitle.replace(/&/g, '&amp;');
    
    const width = 1200, height = 800, cx = width/2, cy = height/2;
    // Derive themes heuristically from text
    const themes: Record<string, number> = {};
    filteredEntries.forEach(e => {
      const text = `${e.keyFindings || ''} ${e.researchGap || ''} ${e.framework || ''}`.toLowerCase();
      ['engagement','motivation','acceptance','self-directed','ai','equity','access','performance','usability','trust'].forEach(t => {
        if (text.includes(t)) themes[t] = (themes[t] || 0) + 1;
      });
    });
    const themeList = Object.entries(themes).sort((a,b)=>b[1]-a[1]).slice(0,6);
    const angleStep = (Math.PI * 2) / Math.max(1, themeList.length);
    const parts: string[] = [];
    parts.push(`<circle cx='${cx}' cy='${cy}' r='80' fill='#1f2937'/><text x='${cx}' y='${cy}' fill='#fff' font-size='18' text-anchor='middle' dominant-baseline='middle'>${center}</text>`);
    themeList.forEach(([theme,count], i) => {
      const angle = i * angleStep;
      const tx = cx + Math.cos(angle) * 260;
      const ty = cy + Math.sin(angle) * 220;
      parts.push(`<line x1='${cx}' y1='${cy}' x2='${tx}' y2='${ty}' stroke='#6366f1' stroke-width='2'/>`);
      parts.push(`<rect x='${tx-90}' y='${ty-24}' rx='8' ry='8' width='180' height='48' fill='#eef2ff' stroke='#6366f1'/>`);
      parts.push(`<text x='${tx}' y='${ty}' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='#3730a3'>${theme} (${count})</text>`);
      const papers = filteredEntries.filter(e => (e.keyFindings||'').toLowerCase().includes(theme)).slice(0,3);
      papers.forEach((p, j) => {
        const px = tx + Math.cos(angle) * (120 + j*40);
        const py = ty + Math.sin(angle) * (120 + j*40);
        parts.push(`<line x1='${tx}' y1='${ty}' x2='${px}' y2='${py}' stroke='#22c55e' stroke-width='1.5' stroke-dasharray='3 3'/>`);
        const label = `${(p.authors[0]||'Author')} (${p.year})`.replace(/&/g,'&amp;');
        parts.push(`<text x='${px}' y='${py}' font-size='12' text-anchor='middle' fill='#14532d'>${label}</text>`);
      });
    });
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><rect width='100%' height='100%' fill='#ffffff'/><g>${parts.join('')}</g></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    setMindMapUrl(url);
    setView('map');
  };

  // Analyze all current entries to produce patterns/themes (lightweight heuristic for MVP)
  const analyzePatterns = () => {
    const themes: Record<string, number> = {};
    const methods: Record<string, number> = {};
    const years: Record<number, number> = {};

    filteredEntries.forEach(e => {
      if (e.methodology) {
        const m = e.methodology.toLowerCase();
        methods[m] = (methods[m] || 0) + 1;
      }
      if (e.year) years[e.year] = (years[e.year] || 0) + 1;
      const text = `${e.keyFindings || ''} ${e.researchGap || ''} ${e.framework || ''}`.toLowerCase();
      ['engagement','motivation','acceptance','self-directed','ai','equity','access','performance','usability','trust'].forEach(t => {
        if (text.includes(t)) themes[t] = (themes[t] || 0) + 1;
      });
    });

    const top = (obj: Record<string | number, number>) => Object.entries(obj)
      .sort((a,b) => b[1]-a[1])
      .slice(0,3)
      .map(([k,v]) => `${k} (${v})`)
      .join(', ');

    const results: { title: string; detail: string }[] = [];
    if (Object.keys(methods).length) results.push({ title: 'Methodological Trends', detail: top(methods) });
    if (Object.keys(themes).length) results.push({ title: 'Emerging Themes', detail: top(themes) });
    if (Object.keys(years).length) results.push({ title: 'Publication Clusters (Years)', detail: top(years as any) });
    if (results.length === 0) {
      setInsights([{ title: 'Not Enough Data', detail: 'Add at least 3 papers with methodology and findings to see patterns.' }]);
      setHelperMsg("You're on track! Try adding more entries or filling the Methodology/Findings fields.");
    } else {
      setInsights(results);
      setHelperMsg("Beautiful progress! Consider deepening the strongest theme or exploring a gap in the weakest.");
    }
  };

  const updateAuthor = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => i === index ? value : author)
    }));
  };

  const analyzeAbstract = async (_abstract: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis results
    const analysis = {
      researchGap: "Limited empirical studies on long-term effects of AI-powered learning platforms in postgraduate education contexts.",
      keyFindings: "AI-enhanced learning platforms show 35% improvement in student engagement and 28% reduction in completion time for literature review tasks.",
      methodology: "Mixed-methods approach combining quantitative learning analytics with qualitative interviews and focus groups.",
      framework: "Technology Acceptance Model (TAM) integrated with Self-Directed Learning theory and Constructivist learning principles.",
      population: "Postgraduate students (n=156) from three universities, aged 24-45, across STEM and humanities disciplines."
    };
    
    setIsAnalyzing(false);
    return analysis;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAccess) {
      alert('Please purchase lifetime access or login with your license key to use this feature.');
      return;
    }
    
    if (!formData.title || !formData.abstract) {
      alert('Please fill in the title and abstract');
      return;
    }

    const analysis = await analyzeAbstract(formData.abstract);
    
    addLiteratureEntry({
      title: formData.title,
      authors: formData.authors.filter(author => author.trim()),
      year: formData.year,
      journal: formData.journal,
      abstract: formData.abstract,
      ...analysis
    });

    setFormData({
      title: '',
      authors: [''],
      year: new Date().getFullYear(),
      journal: '',
      abstract: ''
    });
    setShowAddForm(false);
  };

  const exportToCSV = () => {
    if (!hasAccess) {
      alert('Please purchase lifetime access to export data.');
      return;
    }

    const headers = ['Title', 'Authors', 'Year', 'Journal', 'Research Gap', 'Key Findings', 'Methodology', 'Framework', 'Population'];
    const csvContent = [
      headers.join(','),
      ...filteredEntries.map(entry => [
        `"${entry.title}"`,
        `"${entry.authors.join('; ')}"`,
        entry.year,
        `"${entry.journal}"`,
        `"${entry.researchGap || ''}"`,
        `"${entry.keyFindings || ''}"`,
        `"${entry.methodology || ''}"`,
        `"${entry.framework || ''}"`,
        `"${entry.population || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'literature-matrix.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={dismissOnboarding} />
          <div className="relative w-full max-w-2xl p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl dark:border-gray-700">
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Welcome to the AI-Enhanced Literature Matrix</h3>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside dark:text-gray-300">
              <li><span className="font-medium">Add 3–5 papers</span> with Title and Abstract. The AI will extract gaps and key findings.</li>
              <li>Click <span className="font-medium">"Show Me the Patterns"</span> to surface themes and trends.</li>
              <li>Generate a <span className="font-medium">Mind Map Image</span> and try <span className="font-medium">Find Conflicts</span> to reveal contrasting arguments.</li>
            </ol>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">You can revisit these features anytime from the controls at the top of the page.</p>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={dismissOnboarding} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300">Got it</button>
              <button onClick={() => { dismissOnboarding(); setShowAddForm(true); }} className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add First Paper</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
          <Grid3X3 className="text-green-600 dark:text-green-400" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🚀 AI-Enhanced Literature Matrix
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and analyze research papers with intelligent insights
          </p>
        </div>
      </div>

      {!hasAccess && (
        <div className="p-3 text-sm text-yellow-900 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/40 dark:border-yellow-800 dark:text-yellow-100">
          🔒 Some features are limited. <a href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00" target="_blank" className="underline">Purchase lifetime access</a> to unlock all features.
        </div>
      )}

      {/* Controls */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <div className="flex flex-col gap-4 mb-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
            <input
              type="text"
              placeholder="Search literature entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Entries</option>
            <option value="analyzed">AI Analyzed</option>
            <option value="unanalyzed">Not Analyzed</option>
          </select>
          
          <button
            onClick={() => setShowAddForm(true)}
            disabled={!hasAccess}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus size={16} />
            <span>Add Literature</span>
          </button>
          
          <button
            onClick={exportToCSV}
            disabled={filteredEntries.length === 0 || !hasAccess}
            className="flex items-center px-4 py-2 space-x-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            title={!hasAccess ? 'Purchase access to export' : 'Export CSV'}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('matrix')}
              className={`px-3 py-2 rounded-lg text-sm ${view==='matrix' ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              title="Matrix view"
            >
              Matrix
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-3 py-2 rounded-lg text-sm ${view==='map' ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              title="Mind map view"
            >
              Mind Map
            </button>
            <button
              onClick={analyzePatterns}
              disabled={!hasAccess}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              title="Analyze all entries for themes and gaps"
            >
              <TrendingUp size={16} /> Show Me the Patterns
            </button>
            <button
              onClick={detectConflicts}
              disabled={!hasAccess}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
              title="Detect conflicting arguments across studies"
            >
              <Sparkles size={16} /> Find Conflicts
            </button>
            <button
              onClick={generateMindMapSVG}
              disabled={!hasAccess}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              title="Generate static SVG mind map from current data"
            >
              <ImageIcon size={16} /> Mind Map Image
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredEntries.length} of {literatureEntries.length} entries • Analyzed: {analyzedCount}
          {!hasAccess && (
            <a href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00" target="_blank" className="ml-2 underline">Purchase access to unlock all features</a>
          )}
        </div>
      </div>

      {/* Templates Section */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="text-blue-600" size={18} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Templates</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <a href="/downloads/annotation-rubric.pdf" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Annotation Rubric (PDF)
          </a>
          <a href="/downloads/annotation-rubric.docx" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Annotation Rubric (DOCX)
          </a>
          <a href="/downloads/critical-appraisal-checklist.pdf" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Critical Appraisal Checklist (PDF)
          </a>
          <a href="/downloads/critical-appraisal-checklist.docx" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Critical Appraisal Checklist (DOCX)
          </a>
          <a href="/downloads/lr-screening-sheet.csv" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Literature Screening Sheet (CSV)
          </a>
          <a href="/downloads/search-strategy-log.csv" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Search Strategy Log (CSV)
          </a>
          <a href="/downloads/prisma-flow.pdf" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> PRISMA Flow (PDF)
          </a>
          <a href="/downloads/prisma-flow.svg" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> PRISMA Flow (SVG)
          </a>
          <a href="/downloads/synthesis-matrix.csv" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Synthesis Matrix (CSV)
          </a>
          <a href="/downloads/bias-appraisal.pdf" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Bias Appraisal (PDF)
          </a>
          <a href="/downloads/bias-appraisal.docx" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Bias Appraisal (DOCX)
          </a>
          <a href="/downloads/data-extraction.csv" download className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={14} /> Data Extraction Sheet (CSV)
          </a>
        </div>

        <div className="mt-4">
          <a href="/downloads/module1-templates.zip" download className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            <Download size={16} /> Download All Module 1 Templates (ZIP)
          </a>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">If the ZIP is missing, run: <code>npm run bundle:module1</code></p>
        </div>
      </div>

      {/* Matrix / Map Views */}
      {view === 'map' ? (
        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Network className="text-indigo-600" size={18} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mind Map (Preview)</h3>
          </div>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">Interactive visual mapping is coming soon. For now, we group nodes by methodology and themes.</p>
          {mindMapUrl && (
            <div className="mb-4">
              <div className="overflow-auto border rounded">
                <img src={mindMapUrl} alt="Mind map" className="min-w-full" />
              </div>
              <div className="mt-2 text-sm">
                <a href={mindMapUrl} target="_blank" rel="noopener noreferrer" className="mr-3 text-indigo-600 underline">Open SVG in new tab</a>
                <a href={mindMapUrl} download="literature-mindmap.svg" className="text-indigo-600 underline">Download SVG</a>
              </div>
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-medium">By Methodology</h4>
              <ul className="text-sm text-gray-700 list-disc list-inside dark:text-gray-300">
                {filteredEntries.slice(0,12).map(e => (
                  <li key={e.id}>{e.methodology || 'Unknown'} — {e.title.slice(0,50)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">By Theme (heuristic)</h4>
              <ul className="text-sm text-gray-700 list-disc list-inside dark:text-gray-300">
                {(insights.find(i=>i.title==='Emerging Themes')?.detail || 'Run pattern analysis to see top themes.').split(',').map((s,idx)=>(<li key={idx}>{s.trim()}</li>))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Next Steps</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{helperMsg}</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Literature Entries (Matrix) */}
      {filteredEntries.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <BookOpen className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No Literature Entries Found
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start building your literature matrix by adding your first research paper'
            }
          </p>
          {!searchTerm && filterType === 'all' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Your First Paper
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {entry.title}
                  </h3>
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    {entry.authors.join(', ')} ({entry.year})
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {entry.journal}
                  </p>
                </div>
                
                <div className="flex ml-4 space-x-2">
                  <button
                    onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                    className="p-2 text-blue-600 transition-colors rounded hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-600 transition-colors rounded dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Edit entry"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteLiteratureEntry(entry.id)}
                    className="p-2 text-red-600 transition-colors rounded hover:bg-red-100 dark:hover:bg-red-900/20"
                    title="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {entry.researchGap && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <Sparkles size={16} />
                    <span className="text-sm font-medium">AI Insights Available</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className="mb-1 text-sm font-medium text-blue-900 dark:text-blue-100">
                      Research Gap
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 line-clamp-2">
                      {entry.researchGap}
                    </p>
                  </div>
                  
                  {selectedEntry === entry.id && (
                    <div className="space-y-3">
                      {entry.keyFindings && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <h4 className="mb-1 text-sm font-medium text-green-900 dark:text-green-100">
                            Key Findings
                          </h4>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            {entry.keyFindings}
                          </p>
                        </div>
                      )}
                      
                      {entry.methodology && (
                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                          <h4 className="mb-1 text-sm font-medium text-purple-900 dark:text-purple-100">
                            Methodology
                          </h4>
                          <p className="text-sm text-purple-800 dark:text-purple-200">
                            {entry.methodology}
                          </p>
                        </div>
                      )}
                      
                      {entry.framework && (
                        <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                          <h4 className="mb-1 text-sm font-medium text-orange-900 dark:text-orange-100">
                            Theoretical Framework
                          </h4>
                          <p className="text-sm text-orange-800 dark:text-orange-200">
                            {entry.framework}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Literature Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add Literature Entry
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter the paper title"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Authors *
                  </label>
                  {formData.authors.map((author, index) => (
                    <input
                      key={index}
                      type="text"
                      value={author}
                      onChange={(e) => updateAuthor(index, e.target.value)}
                      placeholder="Author name"
                      className="w-full px-4 py-3 mb-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addAuthor}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    + Add Author
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Journal
                    </label>
                    <input
                      type="text"
                      value={formData.journal}
                      onChange={(e) => setFormData(prev => ({ ...prev, journal: e.target.value }))}
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Journal name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Abstract * (Required for AI Analysis)
                  </label>
                  <textarea
                    required
                    value={formData.abstract}
                    onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Paste the complete abstract here for AI analysis..."
                  />
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center mb-2 space-x-2">
                    <Sparkles className="text-blue-600 dark:text-blue-400" size={16} />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      AI Analysis Preview
                    </span>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Our AI will automatically analyze the abstract to extract research gaps, key findings, 
                    methodology, theoretical frameworks, and population details.
                  </p>
                </div>

                <div className="flex pt-4 space-x-3">
                  <button
                    type="submit"
                    disabled={isAnalyzing || !hasAccess}
                    className="flex items-center justify-center flex-1 px-4 py-3 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Sparkles size={16} />
                    <span>
                      {isAnalyzing ? 'Analyzing with AI...' : 'Analyze & Add to Matrix'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matrix;
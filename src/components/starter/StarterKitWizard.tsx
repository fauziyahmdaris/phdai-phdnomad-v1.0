import React from 'react';

type StarterState = {
  keywords: string;
  areas: string[];
  gaps: string[];
  title: string;
  aim: string;
  objectives: string[];
  notes: string[]; // one notes field per first 4 steps
  checklist: {
    navigator: boolean;
    matrix: boolean;
    gapStatement: boolean;
    exportReview: boolean;
  };
};

const STORAGE_KEY = 'starterKit_v2';
const TABS = ['Research Keywords','Research Gap Search','Title Generator','Research Aims','Complete Setup'] as const;
const GAI: Record<string,string> = {
  ChatGPT:'https://chat.openai.com/',
  Claude:'https://claude.ai/',
  Gemini:'https://gemini.google.com/',
  Grok:'https://x.com/i/grok',
  Qwen:'https://chat.qwenlm.ai/',
  Manus:'https://manus.ai/'
};

const StarterKitWizard: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const [s, setS] = React.useState<StarterState>(() => {
    try { 
      const raw = localStorage.getItem(STORAGE_KEY); 
      return raw? JSON.parse(raw): { 
        keywords:'', areas:[], gaps:[], title:'', aim:'', objectives:['','','',''],
        notes: ['', '', '', ''],
        checklist: { navigator:false, matrix:false, gapStatement:false, exportReview:false }
      }; 
    } catch { 
      return { keywords:'', areas:[], gaps:[], title:'', aim:'', objectives:['','','',''], notes:['','','',''], checklist:{ navigator:false, matrix:false, gapStatement:false, exportReview:false } }; 
    }
  });

  const save = (p: Partial<StarterState>) => { const n = { ...s, ...p }; setS(n); localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); };
  const pct = Math.round(((tab+1)/TABS.length)*100);

  const genAreas = () => {
    const kws = s.keywords.split(',').map(k=>k.trim()).filter(Boolean);
    const out: string[] = [];
    if (kws.length) out.push('Concepts: ' + kws.slice(0,3).join(', '));
    out.push('Methods: survey, case study, mixed');
    out.push('Contexts: Malaysia, postgraduate, higher education');
    save({ areas: out });
  };
  const gaps = () => save({ gaps: [
    'Limited longitudinal evidence for AI-supported learning',
    'Under-studied multicultural cohorts in AI-in-education',
    'Weak triangulation between engagement and outcomes'
  ]});
  const title = () => save({ title: `Exploring ${(s.keywords.split(',')[0]||'AI in Education').trim()} to Enhance Postgraduate Research Practice` });
  const aimObj = () => save({
    aim: 'Evaluate how AI-powered tools support postgraduate research learning and outcomes.',
    objectives: [
      'Map usage patterns and perceived benefits',
      'Relate tool use to research skill development',
      'Surface ethical and accessibility considerations',
      'Recommend scalable, equitable practices'
    ]
  });
  const promptText = () => [
    'You are an empathetic PhD coach. Help improve my current step.',
    `Step: ${TABS[tab]}`,
    `Keywords: ${s.keywords || '(none)'}`,
    `Areas: ${s.areas.join(' | ') || '(none)'}`,
    `Gaps: ${s.gaps.join(' | ') || '(none)'}`,
    `Title: ${s.title || '(none)'}`,
    `Aim: ${s.aim || '(none)'}`,
    `Objectives: ${s.objectives.filter(Boolean).join(' | ') || '(none)'}\n`,
    'Give 3 practical suggestions and one mini action plan for the next 2 days.'
  ].join('\n');

  const copy = async (t: string) => { try { await navigator.clipboard.writeText(t); alert('Copied'); } catch { /* noop: clipboard not available */ } };
  const openGAI = (name: string) => { const url = GAI[name] || '#'; window.open(url, '_blank', 'noopener'); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 text-indigo-900 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl dark:from-gray-800 dark:to-gray-700 dark:text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">PhD Starter Kit – Step {tab+1} of {TABS.length}</h1>
          <a href="/app" className="px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Go to Dashboard</a>
        </div>
        <div className="mt-3 h-2 w-full bg-white/60 rounded"><div className="h-2 rounded bg-indigo-500" style={{width:`${pct}%`}} /></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t,idx)=> (
          <button key={t} onClick={()=>setTab(idx)} className={`px-3 py-1.5 text-sm rounded-lg border ${idx===tab? 'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}>{t}</button>
        ))}
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{pct}% Complete</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main card */}
        <div className="md:col-span-2 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          {tab===0 && (<div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Define Your Research Keywords</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Separate by commas. Example: AI, microlearning, PhD education, research tools</p>
            <input value={s.keywords} onChange={e=>save({keywords:e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
            <button onClick={genAreas} className="w-full mt-3 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">⚡ Generate Research Areas</button>
            {s.areas.length>0 && <div className="mt-3 text-sm space-y-1">{s.areas.map((a,ix)=><div key={ix}>• {a}</div>)}</div>}
            <label className="block mt-4 text-sm font-medium">Notes</label>
            <textarea
              value={s.notes[0]}
              onChange={e=>{ const n=[...s.notes]; n[0]=e.target.value; save({notes:n}); }}
              rows={3}
              placeholder="Jot down any ideas or constraints for your keywords..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>)}

          {tab===1 && (<div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Research Gap Search</h2>
            <button onClick={gaps} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Suggest Gaps</button>
            {s.gaps.length>0 && <ul className="mt-3 list-disc list-inside text-sm">{s.gaps.map((g,ix)=><li key={ix}>{g}</li>)}</ul>}
            <div className="mt-3 text-sm"><a className="underline" href="/app/navigator">Open Research Navigator</a></div>
            <label className="block mt-4 text-sm font-medium">Notes</label>
            <textarea
              value={s.notes[1]}
              onChange={e=>{ const n=[...s.notes]; n[1]=e.target.value; save({notes:n}); }}
              rows={3}
              placeholder="Record promising gaps, query strings, and databases to try..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>)}

          {tab===2 && (<div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Title Generator</h2>
            <button onClick={title} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Generate Title</button>
            <input value={s.title} onChange={e=>save({title:e.target.value})} placeholder="Your generated or edited title" className="w-full mt-3 px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
            <label className="block mt-4 text-sm font-medium">Notes</label>
            <textarea
              value={s.notes[2]}
              onChange={e=>{ const n=[...s.notes]; n[2]=e.target.value; save({notes:n}); }}
              rows={3}
              placeholder="Alternative title variants, key terms to include, tone preferences..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>)}

          {tab===3 && (<div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Research Aim & Objectives</h2>
            <button onClick={aimObj} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Suggest Aim & Objectives</button>
            <label className="block mt-3 text-sm font-medium">Aim</label>
            <textarea value={s.aim} onChange={e=>save({aim:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
            <label className="block mt-3 text-sm font-medium">Objectives</label>
            {s.objectives.map((o,ix)=> (<input key={ix} value={o} onChange={e=>{ const arr=[...s.objectives]; arr[ix]=e.target.value; save({objectives:arr}); }} className="w-full px-3 py-2 mb-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />))}
            <label className="block mt-2 text-sm font-medium">Notes</label>
            <textarea
              value={s.notes[3]}
              onChange={e=>{ const n=[...s.notes]; n[3]=e.target.value; save({notes:n}); }}
              rows={3}
              placeholder="Assumptions, data access, limitations, ethics..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>)}

          {tab===4 && (<div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Complete Setup</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Copy your starter summary and continue in the tools.</p>
            <button onClick={()=>copy([
              `Keywords: ${s.keywords}`,
              `Areas: ${s.areas.join(' | ')}`,
              `Gaps: ${s.gaps.join(' | ')}`,
              `Title: ${s.title}`,
              `Aim: ${s.aim}`,
              `Objectives: ${s.objectives.filter(Boolean).join(' | ')}`
            ].join('\n'))} className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700">Copy Summary</button>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a className="px-3 py-1.5 rounded bg-indigo-600 text-white" href="/app/navigator">Open Navigator</a>
              <a className="px-3 py-1.5 rounded bg-indigo-600 text-white" href="/app/matrix">Open Matrix</a>
              <a className="px-3 py-1.5 rounded bg-indigo-600 text-white" href="/app/thesis-weaver">Open Thesis Weaver</a>
            </div>
            <div className="mt-5 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Mini Checklist</h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <label className="flex items-center gap-2"><input type="checkbox" checked={s.checklist.navigator} onChange={e=>save({ checklist: { ...s.checklist, navigator: e.target.checked } })} /> Open Navigator and search 10 papers</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={s.checklist.matrix} onChange={e=>save({ checklist: { ...s.checklist, matrix: e.target.checked } })} /> Add 5–10 studies into Matrix</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={s.checklist.gapStatement} onChange={e=>save({ checklist: { ...s.checklist, gapStatement: e.target.checked } })} /> Draft a 1‑paragraph gap statement</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={s.checklist.exportReview} onChange={e=>save({ checklist: { ...s.checklist, exportReview: e.target.checked } })} /> Export notes and review with advisor</label>
              </div>
            </div>
          </div>)}
        </div>

        {/* Helper panel */}
        <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">PhD Starter Features</h3>
          <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>✓ AI-Powered Keyword Generation</li>
            <li>✓ Research Gap Discovery</li>
            <li>✓ Title Generation</li>
            <li>✓ Research Aims Development</li>
            <li>✓ Step-by-Step Guidance</li>
          </ul>
          <div className="mt-4">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Use your preferred GAI</div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(GAI).map(k => (
                <button key={k} onClick={()=>openGAI(k)} className="text-xs px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700">Open {k}</button>
              ))}
            </div>
            <button onClick={()=>copy(promptText())} className="mt-3 w-full text-xs px-3 py-2 rounded bg-gray-900 text-white hover:bg-gray-700">Copy Suggested Prompt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarterKitWizard;

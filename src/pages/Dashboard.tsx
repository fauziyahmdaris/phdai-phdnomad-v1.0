import React, { useState } from 'react';
import { ExternalLink, Rocket, FileText, BookOpen, Grid3X3, PenTool, MessageSquare, ChevronRight, CheckCircle2, FolderPlus, Folder, Trash2 } from 'lucide-react';
import { PROMPTS } from '../data/prompts';
import { hasMVPAccess, getPlan } from '../plan';
import { useProject } from '../contexts/ProjectContext';
import { Button } from '../components/ui/button';
import ProjectSwitcher from '../components/projects/ProjectSwitcher';

const Tile: React.FC<{ title: string; desc: string; href: string; icon: React.ReactNode; locked?: boolean }> = ({ title, desc, href, icon, locked }) => (
  <a href={locked ? 'https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00' : href} className="relative flex flex-col justify-between p-5 transition-shadow bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label={title}>
    {locked && (
      <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">LOCKED</span>
    )}
    <div className="flex items-center gap-3">
      <div className="p-2 text-white bg-indigo-600 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
      </div>
    </div>
    <div className="inline-flex items-center mt-4 text-sm font-medium text-indigo-600">{locked ? 'Purchase Access' : 'Launch Tool'} <ChevronRight className="w-4 h-4 ml-1" /></div>
  </a>
);

const ExtTile: React.FC<{ name: string; desc: string; url: string }> = ({ name, desc, url }) => (
  <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300">{desc}</p>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded bg-gray-900 text-white hover:bg-gray-700">
        <ExternalLink className="w-3.5 h-3.5 mr-1" /> Open
      </a>
    </div>
  </div>
);

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Prompt copied to clipboard.');
  } catch (e) {
    console.error(e);
  }
};

const Dashboard = () => {
  const hasAccess = hasMVPAccess();
  const planInfo = getPlan();
  const { currentProject, projects, createProject, setCurrentProject, removeProject, updateProject } = useProject();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  
  return (
    <div className="space-y-8">
      {/* Hero */}
      {/* Skip Links */}
      <a href="#prompts" className="px-3 py-2 text-white bg-black rounded sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2">Skip to prompts</a>
      <a href="#gai" className="px-3 py-2 text-white bg-black rounded sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-44">Skip to GAI connections</a>

      {/* Access Status Banner */}
      {!hasAccess && (
        <div className="p-4 text-sm text-yellow-900 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/40 dark:border-yellow-800 dark:text-yellow-100">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <strong>🔒 Visitor Access:</strong> You're exploring drphdai.my with limited access. 
              Some features are locked until you purchase lifetime access.
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <a 
                href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-white transition bg-green-600 rounded hover:bg-green-700"
              >
                Get Lifetime Access - $9.90
              </a>
            </div>
          </div>
        </div>
      )}

      {hasAccess && (
        <div className="p-4 text-sm border rounded-lg border-emerald-200 bg-emerald-50 dark:bg-emerald-900/30 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <strong>✅ Full Access Active:</strong> You have lifetime access to all drphdai.my MVP features. 
              {planInfo.licenseKey && ` License: ${planInfo.licenseKey}`}
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  localStorage.removeItem('drphdai_plan');
                  window.location.reload();
                }
              }}
              className="flex-shrink-0 px-3 py-1 text-sm text-white transition bg-gray-600 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="p-6 text-white shadow rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="flex items-center gap-3 mb-2">
          <Rocket className="w-5 h-5" />
          <span className="text-sm font-medium">AI-Powered PhD Research Assistant</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Your DrPhDAI Journey Starts Here!</h1>
        <p className="max-w-3xl mt-2 text-sm text-white/90">Connect your preferred GAI platforms and launch focused tools for proposal development, literature review, analysis & synthesis, and thesis writing.</p>
      </div>

      {/* Get Started */}
      <section aria-labelledby="get-started">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-orange-600">⚡</span>
          <h2 id="get-started" className="text-lg font-semibold text-gray-900 dark:text-white">Get Started</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tile title="PhD Research Proposal" desc="Step-by-step proposal development with titles, RQs & objectives" href="/app/root" icon={<FileText className="w-5 h-5" />} />
          <Tile title="Research Navigator" desc="Explore and map the literature with guided queries" href="/app/navigator" icon={<BookOpen className="w-5 h-5" />} />
          <Tile title="Literature Matrix" desc="Organize and synthesize evidence across studies" href="/app/matrix" icon={<Grid3X3 className="w-5 h-5" />} locked={!hasAccess} />
          <Tile title="Thesis Weaver" desc="Draft chapters with academic structure and citations" href="/app/thesis-weaver" icon={<PenTool className="w-5 h-5" />} locked={!hasAccess} />
          <Tile title="AI Companion" desc="Brainstorming, motivation, and research guidance" href="/app/ai-companion" icon={<MessageSquare className="w-5 h-5" />} locked={!hasAccess} />
        </div>
      </section>

      {/* Projects Section */}
      <section aria-labelledby="projects">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-indigo-600">🗂️</span>
          <h2 id="projects" className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Project</div>
              <div className="text-base font-semibold text-gray-900 dark:text-white">{currentProject?.title || 'None selected'}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                Manage Projects
              </Button>
            </div>
          </div>
          {projects.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 text-xs text-gray-500">Your Projects</div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <div key={p.title} className={`flex items-center justify-between p-3 rounded-lg border ${currentProject?.title === p.title ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{p.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setCurrentProject(p)}>Set Current</Button>
                      <Button size="sm" variant="ghost" onClick={() => removeProject(p)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how">
        <h2 id="how" className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">How DrPhDAI GAIs Work</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { n: '1', t: 'Connect GAI Accounts', d: 'Link ChatGPT, Claude, Gemini, etc.' },
            { n: '2', t: 'Choose Research Tool', d: 'Pick the tool for your current phase' },
            { n: '3', t: 'Get Custom Prompts', d: 'Use specialized prompts tailored to your needs' },
            { n: '4', t: 'Execute & Iterate', d: 'Open your GAI and iterate on results' }
          ].map((s) => (
            <div key={s.n} className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1"><div className="flex items-center justify-center w-6 h-6 text-sm text-white bg-indigo-600 rounded-full">{s.n}</div><span className="font-medium text-gray-900 dark:text-white">{s.t}</span></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* External GAI Connections */}
      <section aria-labelledby="gai">
        <h2 id="gai" className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">GAI Account Connections</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <ExtTile name="ChatGPT" desc="Complex reasoning & drafts" url="https://chat.openai.com/" />
          <ExtTile name="Claude" desc="Nuanced proposal writing & synthesis" url="https://claude.ai/" />
          <ExtTile name="Gemini" desc="Data analysis & fact checking" url="https://gemini.google.com/" />
          <ExtTile name="Grok" desc="Real-time trends & creative angles" url="https://x.com/i/grok" />
          <ExtTile name="Qwen" desc="Multilingual & cross-cultural insights" url="https://chat.qwenlm.ai/" />
          <ExtTile name="Manus" desc="Academic writing & citation mgmt" url="https://manus.ai/" />
        </div>
        <p className="mt-2 text-xs text-gray-500">You'll interact directly with each platform. DrPhDAI provides structured prompts and workflows.</p>
      </section>

      {/* Prompts Panels */}
      <section aria-labelledby="prompts">
        <h2 id="prompts" className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Guided Prompts</h2>
        <div className="space-y-6">
          {([PROMPTS.proposal, PROMPTS.navigator, PROMPTS.matrix, PROMPTS.thesis, PROMPTS.companion] as const).map((group) => (
            <div key={group.name} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{group.name}</h3>
                <div className="hidden text-xs text-gray-500 md:block">Recommended: {(group.steps[0].recommended || []).join(', ')}</div>
              </div>
              <div className="space-y-4">
                {group.steps.map((step, idx) => (
                  <div key={idx} className="p-3 border border-gray-200 rounded-xl dark:border-gray-700">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /><span className="text-sm font-medium text-gray-900 dark:text-white">{step.title}</span></div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => copy(step.body)} className="text-xs px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Copy</button>
                        {/* Open GAI buttons mapped from recommended */}
                        {(step.recommended || []).map((gai) => {
                          const map: Record<string, string> = {
                            'ChatGPT': 'https://chat.openai.com/',
                            'Claude': 'https://claude.ai/',
                            'Gemini': 'https://gemini.google.com/',
                            'Grok': 'https://x.com/i/grok',
                            'Qwen': 'https://chat.qwenlm.ai/',
                            'Manus': 'https://manus.ai/'
                          };
                          const url = map[gai] || '#';
                          return (
                            <a
                              key={gai}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Open {gai}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap dark:text-gray-300">{step.body}</pre>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-700 whitespace-pre-wrap dark:text-gray-300">{PROMPTS.notice.body}</p>
        </div>
      </section>
      <ProjectSwitcher
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
        projects={projects}
        currentProject={currentProject}
        onCreate={(meta) => { createProject({ title: meta.title, objectives: meta.objectives, area: meta.area, keywords: meta.keywords }); }}
        onSetCurrent={(meta) => setCurrentProject(meta)}
        onRemove={(meta) => removeProject(meta)}
        onUpdate={(prev, next) => updateProject(prev, next)}
      />
    </div>
  );
};

export default Dashboard;
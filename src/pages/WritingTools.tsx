import React, { useState } from 'react';
import { FileText, Save, Download, Calendar, Edit3, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  subsections?: Section[];
}

interface ProposalData {
  title: string;
  author: string;
  abstract: string;
  sections: Section[];
}

const WritingTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'template' | 'outline' | 'editor' | 'timeline'>('template');
  const [expandedSections, setExpandedSections] = useState<string[]>(['title-abstract']);
  const [autoSave, setAutoSave] = useState(true);
  
  const [proposalData, setProposalData] = useState<ProposalData>({
    title: '',
    author: '',
    abstract: '',
    sections: [
      {
        id: 'title-abstract',
        title: 'Title & Abstract',
        content: '',
        completed: false
      },
      {
        id: 'introduction',
        title: 'Introduction & Background',
        content: '',
        completed: false,
        subsections: [
          { id: 'research-problem', title: 'Research Problem', content: '', completed: false },
          { id: 'context-significance', title: 'Context & Significance', content: '', completed: false }
        ]
      },
      {
        id: 'literature-review',
        title: 'Literature Review',
        content: '',
        completed: false,
        subsections: [
          { id: 'theoretical-framework', title: 'Theoretical Framework', content: '', completed: false },
          { id: 'previous-research', title: 'Previous Research', content: '', completed: false },
          { id: 'research-gaps', title: 'Research Gaps', content: '', completed: false }
        ]
      },
      {
        id: 'objectives',
        title: 'Research Objectives & Questions',
        content: '',
        completed: false
      },
      {
        id: 'methodology',
        title: 'Methodology',
        content: '',
        completed: false,
        subsections: [
          { id: 'research-approach', title: 'Research Approach', content: '', completed: false },
          { id: 'data-collection', title: 'Data Collection Methods', content: '', completed: false },
          { id: 'data-analysis', title: 'Data Analysis', content: '', completed: false }
        ]
      },
      {
        id: 'expected-outcomes',
        title: 'Expected Outcomes',
        content: '',
        completed: false
      },
      {
        id: 'timeline-resources',
        title: 'Timeline & Resources',
        content: '',
        completed: false
      },
      {
        id: 'references',
        title: 'References',
        content: '',
        completed: false
      }
    ]
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const updateSectionContent = (sectionId: string, content: string, subsectionId?: string) => {
    setProposalData(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId) {
          if (subsectionId && section.subsections) {
            return {
              ...section,
              subsections: section.subsections.map(sub => 
                sub.id === subsectionId ? { ...sub, content } : sub
              )
            };
          }
          return { ...section, content };
        }
        return section;
      })
    }));
  };

  const markSectionComplete = (sectionId: string, subsectionId?: string) => {
    setProposalData(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId) {
          if (subsectionId && section.subsections) {
            return {
              ...section,
              subsections: section.subsections.map(sub => 
                sub.id === subsectionId ? { ...sub, completed: !sub.completed } : sub
              )
            };
          }
          return { ...section, completed: !section.completed };
        }
        return section;
      })
    }));
  };

  const exportProposal = () => {
    const content = `
${proposalData.title}
PhD Research Proposal
Author: ${proposalData.author}

Abstract
${proposalData.abstract}

${proposalData.sections.map(section => `
${section.title.toUpperCase()}
${section.content}
${section.subsections ? section.subsections.map(sub => `
${sub.title}
${sub.content}
`).join('') : ''}
`).join('')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proposalData.title || 'research-proposal'}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const timelinePhases = [
    {
      phase: 'Phase 1: Research Proposal Development',
      duration: '3-4 months',
      month: 'Month 1 →',
      color: 'bg-blue-100 dark:bg-blue-900',
      tasks: [
        'Define research question and objectives',
        'Conduct preliminary literature review',
        'Develop theoretical framework',
        'Draft initial methodology approach',
        'Meet with supervisors for feedback',
        'Refine proposal based on feedback',
        'Submit final research proposal'
      ]
    },
    {
      phase: 'Phase 2: Literature Review',
      duration: '4-6 months',
      month: 'Month 4 →',
      color: 'bg-green-100 dark:bg-green-900',
      tasks: [
        'Conduct comprehensive literature search',
        'Organize sources using reference management software',
        'Analyze key theories and concepts',
        'Identify research gaps and opportunities',
        'Draft literature review chapter',
        'Create literature matrix for key papers',
        'Present literature findings to supervisory committee'
      ]
    },
    {
      phase: 'Phase 3: Methodology Development',
      duration: '3-4 months',
      month: 'Month 8 →',
      color: 'bg-purple-100 dark:bg-purple-900',
      tasks: [
        'Finalize research design',
        'Develop data collection instruments',
        'Submit ethics application',
        'Conduct pilot study if applicable',
        'Refine methodology based on pilot results',
        'Create detailed research plan and timeline',
        'Prepare for data collection phase'
      ]
    },
    {
      phase: 'Phase 4: Data Collection',
      duration: '6-8 months',
      month: 'Month 12 →',
      color: 'bg-orange-100 dark:bg-orange-900',
      tasks: [
        'Recruit participants and gather consent',
        'Implement data collection procedures',
        'Monitor data quality and completeness',
        'Conduct interviews, surveys, or experiments',
        'Maintain detailed research logs',
        'Address any methodological challenges',
        'Complete data collection activities'
      ]
    },
    {
      phase: 'Phase 5: Data Analysis',
      duration: '4-6 months',
      month: 'Month 18 →',
      color: 'bg-red-100 dark:bg-red-900',
      tasks: [
        'Clean and organize collected data',
        'Apply appropriate analytical techniques',
        'Use statistical or qualitative analysis software',
        'Identify patterns, themes, and findings',
        'Validate results through multiple methods',
        'Prepare preliminary findings presentation',
        'Discuss results with supervisory team'
      ]
    },
    {
      phase: 'Phase 6: Thesis Writing',
      duration: '6-8 months',
      month: 'Month 22 →',
      color: 'bg-indigo-100 dark:bg-indigo-900',
      tasks: [
        'Draft methodology and results chapters',
        'Write discussion and implications sections',
        'Revise literature review based on findings',
        'Create figures, tables, and appendices',
        'Integrate all chapters into complete thesis',
        'Conduct multiple rounds of revision',
        'Prepare for thesis examination'
      ]
    },
    {
      phase: 'Phase 7: Finalization & Submission',
      duration: '2-3 months',
      month: 'Month 30 →',
      color: 'bg-teal-100 dark:bg-teal-900',
      tasks: [
        'Final thesis review and proofreading',
        'Format according to institutional guidelines',
        'Submit thesis to examination committee',
        'Prepare for thesis defense presentation',
        'Conduct thesis defense/viva voce',
        'Address examiner feedback and revisions',
        'Submit final corrected version'
      ]
    }
  ];

  const renderTemplateTab = () => (
    <div className="space-y-6">
      {proposalData.sections.map((section) => (
        <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                section.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {section.completed && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
            </div>
            {expandedSections.includes(section.id) ? (
              <ChevronUp className="text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
          </button>
          
          {expandedSections.includes(section.id) && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {section.id === 'title-abstract' && 'Create a compelling title and concise abstract that summarizes your proposal'}
                {section.id === 'introduction' && 'Introduce your research problem and provide context'}
                {section.id === 'literature-review' && 'Analyze relevant studies and identify gaps in research'}
                {section.id === 'objectives' && 'Clearly state your research aims and specific questions'}
                {section.id === 'methodology' && 'Describe your research design and methods'}
                {section.id === 'expected-outcomes' && 'Describe anticipated results and contribution to knowledge'}
                {section.id === 'timeline-resources' && 'Outline your research schedule and resource requirements'}
                {section.id === 'references' && 'List all sources cited in your proposal'}
              </p>

              {section.id === 'title-abstract' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Writing Prompts:</h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Craft a clear, concise title that accurately reflects your research</li>
                      <li>• Summarize your research problem, objectives, methodology, and significance</li>
                      <li>• Highlight the innovation or contribution of your proposed research</li>
                    </ul>
                  </div>
                  
                  <textarea
                    placeholder="Type your content here..."
                    className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    value={section.content}
                    onChange={(e) => updateSectionContent(section.id, e.target.value)}
                  />
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Tips:</h4>
                    <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Keep your title under 15 words if possible</li>
                      <li>• Abstracts are typically 150-250 words</li>
                      <li>• Write the abstract last after completing other sections</li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => markSectionComplete(section.id)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => markSectionComplete(section.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              )}

              {section.subsections && (
                <div className="space-y-4">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {subsection.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => markSectionComplete(section.id, subsection.id)}
                            className={`w-4 h-4 rounded-full border-2 ${
                              subsection.completed 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder={`Enter your ${subsection.title.toLowerCase()} here...`}
                        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        value={subsection.content}
                        onChange={(e) => updateSectionContent(section.id, e.target.value, subsection.id)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {!section.subsections && section.id !== 'title-abstract' && (
                <div className="space-y-4">
                  <textarea
                    placeholder="Type your content here..."
                    className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    value={section.content}
                    onChange={(e) => updateSectionContent(section.id, e.target.value)}
                  />
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => markSectionComplete(section.id)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => markSectionComplete(section.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderOutlineTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Research Proposal</h3>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Plus size={16} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Edit3 size={16} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {proposalData.sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <ChevronDown className="text-gray-400" size={16} />
                <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Plus size={14} />
                </button>
                <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {section.subsections && (
              <div className="ml-6 space-y-2">
                {section.subsections.map((subsection) => (
                  <div key={subsection.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                    <span className="text-gray-700 dark:text-gray-300">{subsection.title}</span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Plus size={12} />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Edit3 size={12} />
                      </button>
                      <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditorTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
          <Save size={16} />
          <span>Save</span>
        </button>
        <button 
          onClick={exportProposal}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Machine Learning Approaches to Natural Language Understanding
            </h1>
            <p className="text-gray-600 dark:text-gray-400">PhD Research Proposal</p>
            <p className="text-gray-600 dark:text-gray-400">Author: John Doe</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Abstract</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This research proposal examines novel approaches to natural language understanding using advanced machine learning techniques. By combining transformer-based models with reinforcement learning, this study aims to develop more efficient and accurate methods for semantic parsing and contextual understanding.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">1. Introduction</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <textarea
                placeholder="Enter your introduction here..."
                className="w-full h-32 p-4 border-0 bg-transparent text-gray-700 dark:text-gray-300 resize-none focus:outline-none"
                defaultValue="Natural language understanding (NLU) remains one of the most challenging areas in artificial intelligence. Despite significant advances in machine learning techniques, current approaches still struggle with nuanced language comprehension, pragmatic understanding, and cross-cultural linguistic variations. This research proposes a novel framework that integrates transformer architectures with reinforcement learning algorithms to address these limitations..."
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">2. Literature Review</h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <textarea
                placeholder="Enter your literature review here..."
                className="w-full h-32 p-4 border-0 bg-transparent text-gray-700 dark:text-gray-300 resize-none focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus size={16} />
              <span>Add New Section</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">PhD Research Timeline</h2>
          <p className="text-gray-600 dark:text-gray-400">2-3 year schedule (adaptable to your institutional requirements)</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Save size={16} />
            <span>Save</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Calendar size={16} />
            <span>Sync to Calendar</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {timelinePhases.map((phase, index) => (
          <div key={index} className={`${phase.color} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {phase.phase}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{phase.duration}</p>
              </div>
              <span className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                {phase.month}
              </span>
            </div>
            
            <ul className="space-y-2">
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI Writing Tools</h1>
            <p className="text-purple-100">
              Plan, structure, and write your PhD research proposal with our all-in-one research tool
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'template', label: 'Template' },
              { id: 'outline', label: 'Outline' },
              { id: 'editor', label: 'Editor' },
              { id: 'timeline', label: 'Timeline' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Save size={16} />
              <span>Save</span>
            </button>
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Auto-save</span>
            </label>
            <button 
              onClick={exportProposal}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'template' && renderTemplateTab()}
        {activeTab === 'outline' && renderOutlineTab()}
        {activeTab === 'editor' && renderEditorTab()}
        {activeTab === 'timeline' && renderTimelineTab()}
      </div>
    </div>
  );
};

export default WritingTools;
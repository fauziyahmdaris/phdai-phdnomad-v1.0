import React, { useState } from 'react';
import { FileText, Save, Download, ChevronDown, ChevronRight, Target, Lightbulb } from 'lucide-react';

interface OutlineSection {
  id: string;
  title: string;
  description: string;
  prompts: string[];
  subsections?: OutlineSection[];
  content?: string;
  isExpanded?: boolean;
}

interface ThesisOutlineGeneratorProps {
  researchTopic?: string;
  researchField?: string;
  onOutlineGenerated?: (outline: OutlineSection[]) => void;
}

const ThesisOutlineGenerator: React.FC<ThesisOutlineGeneratorProps> = ({
  researchTopic = '',
  researchField = '',
  onOutlineGenerated
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('introduction');
  const [customSection, setCustomSection] = useState('');
  const [generatedOutline, setGeneratedOutline] = useState<OutlineSection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const chapterTemplates = {
    introduction: {
      title: 'Chapter 1: Introduction',
      sections: [
        {
          id: 'background',
          title: 'Background and Context',
          description: 'Provide broad context for your research area',
          prompts: [
            `In recent years, there has been increasing interest in ${researchTopic || '[your topic]'} due to...`,
            `Historically, ${researchField || '[your field]'} has been characterized by...`,
            `The emergence of new technologies in ${researchField || '[your field]'} has led to...`,
            `Current trends in ${researchTopic || '[your topic]'} indicate that...`,
            `The significance of ${researchTopic || '[your topic]'} in modern ${researchField || '[your field]'} cannot be overstated because...`
          ]
        },
        {
          id: 'problem-statement',
          title: 'Problem Statement',
          description: 'Clearly define the research problem',
          prompts: [
            `Despite advances in ${researchField || '[your field]'}, a significant challenge remains in...`,
            `The current understanding of ${researchTopic || '[your topic]'} is limited by...`,
            `Existing approaches to ${researchTopic || '[your topic]'} fail to address...`,
            `A critical gap exists in our knowledge of...`,
            `The problem this research addresses is...`
          ]
        },
        {
          id: 'research-questions',
          title: 'Research Questions and Objectives',
          description: 'State your research questions and objectives',
          prompts: [
            `The primary research question guiding this study is: How does...?`,
            `This research aims to investigate the relationship between...`,
            `The specific objectives of this study are to: (1) analyze..., (2) evaluate..., (3) develop...`,
            `Secondary research questions include: What factors influence...?`,
            `The overarching goal of this research is to...`
          ]
        },
        {
          id: 'significance',
          title: 'Significance and Contribution',
          description: 'Explain why your research matters',
          prompts: [
            `This research contributes to ${researchField || '[your field]'} by...`,
            `The findings of this study will have implications for...`,
            `The theoretical contribution of this work lies in...`,
            `Practically, this research will benefit...`,
            `The significance of this study extends beyond ${researchField || '[your field]'} to...`
          ]
        },
        {
          id: 'thesis-structure',
          title: 'Thesis Structure',
          description: 'Outline the organization of your thesis',
          prompts: [
            `This thesis is organized into [number] chapters. Chapter 2 provides...`,
            `Following this introduction, Chapter 2 reviews the relevant literature...`,
            `The methodology is presented in Chapter 3, which details...`,
            `Chapters 4 and 5 present the findings and analysis...`,
            `The thesis concludes with Chapter 6, which discusses...`
          ]
        }
      ]
    },
    'literature-review': {
      title: 'Chapter 2: Literature Review',
      sections: [
        {
          id: 'theoretical-framework',
          title: 'Theoretical Framework',
          description: 'Establish the theoretical foundation',
          prompts: [
            `The theoretical foundation for this research draws from...`,
            `[Theory name] provides a comprehensive framework for understanding...`,
            `This study is grounded in the principles of...`,
            `The integration of [Theory A] and [Theory B] offers insights into...`,
            `Recent developments in [theoretical area] suggest that...`
          ]
        },
        {
          id: 'key-concepts',
          title: 'Key Concepts and Definitions',
          description: 'Define important terms and concepts',
          prompts: [
            `For the purposes of this study, ${researchTopic || '[key concept]'} is defined as...`,
            `The concept of [term] has evolved to encompass...`,
            `It is important to distinguish between [concept A] and [concept B]...`,
            `The operational definition of [key variable] in this research is...`,
            `Contemporary understanding of [concept] includes...`
          ]
        },
        {
          id: 'previous-research',
          title: 'Previous Research',
          description: 'Review relevant studies and findings',
          prompts: [
            `Early research by [Author] established that...`,
            `Subsequent studies have built upon this foundation by...`,
            `A comprehensive review of the literature reveals...`,
            `Recent empirical evidence suggests...`,
            `Cross-cultural studies have demonstrated...`
          ]
        },
        {
          id: 'research-gaps',
          title: 'Research Gaps and Opportunities',
          description: 'Identify gaps in current knowledge',
          prompts: [
            `Despite extensive research, a significant gap remains in...`,
            `Previous studies have not adequately addressed...`,
            `The literature lacks sufficient investigation into...`,
            `An important limitation of existing research is...`,
            `This gap presents an opportunity to...`
          ]
        }
      ]
    },
    methodology: {
      title: 'Chapter 3: Methodology',
      sections: [
        {
          id: 'research-design',
          title: 'Research Design',
          description: 'Describe your overall research approach',
          prompts: [
            `This study employs a ${researchField?.includes('qualitative') ? 'qualitative' : 'mixed-methods'} research design to...`,
            `The research design is based on [philosophical paradigm] because...`,
            `A [descriptive/exploratory/explanatory] approach was chosen to...`,
            `The study follows a [cross-sectional/longitudinal] design to capture...`,
            `The research strategy combines [methods] to provide comprehensive insights into...`
          ]
        },
        {
          id: 'participants',
          title: 'Participants and Sampling',
          description: 'Describe your study population and sampling method',
          prompts: [
            `The target population for this study consists of...`,
            `Participants were selected using [sampling method] to ensure...`,
            `The sample size of [number] was determined based on...`,
            `Inclusion criteria for participation include...`,
            `The demographic characteristics of participants are...`
          ]
        },
        {
          id: 'data-collection',
          title: 'Data Collection Methods',
          description: 'Detail your data collection procedures',
          prompts: [
            `Data collection involved [method] to gather information about...`,
            `The primary data collection instrument was [tool/survey/interview guide]...`,
            `Data were collected over a period of [timeframe] to...`,
            `Quality assurance measures included...`,
            `Ethical considerations were addressed by...`
          ]
        },
        {
          id: 'data-analysis',
          title: 'Data Analysis',
          description: 'Explain your analytical approach',
          prompts: [
            `Data analysis was conducted using [software/technique] to...`,
            `The analytical framework employed [approach] to identify...`,
            `Quantitative data were analyzed using [statistical methods]...`,
            `Qualitative data were subjected to [thematic/content] analysis...`,
            `Validity and reliability were ensured through...`
          ]
        }
      ]
    },
    conclusion: {
      title: 'Chapter 6: Conclusion',
      sections: [
        {
          id: 'summary-findings',
          title: 'Summary of Findings',
          description: 'Summarize your key findings',
          prompts: [
            `This research has demonstrated that...`,
            `The key findings of this study indicate...`,
            `Analysis of the data revealed several important patterns...`,
            `The most significant finding was...`,
            `Contrary to expectations, the results showed...`
          ]
        },
        {
          id: 'implications',
          title: 'Implications',
          description: 'Discuss the implications of your findings',
          prompts: [
            `These findings have important implications for ${researchField || '[your field]'}...`,
            `The theoretical implications of this research include...`,
            `From a practical perspective, these results suggest...`,
            `Policy implications of this work include...`,
            `The broader societal implications are...`
          ]
        },
        {
          id: 'limitations',
          title: 'Limitations',
          description: 'Acknowledge study limitations',
          prompts: [
            `Several limitations should be acknowledged in interpreting these findings...`,
            `The scope of this study was limited to...`,
            `Methodological limitations include...`,
            `The generalizability of findings may be limited by...`,
            `Future research should address these limitations by...`
          ]
        },
        {
          id: 'future-research',
          title: 'Future Research Directions',
          description: 'Suggest areas for future investigation',
          prompts: [
            `Future research should investigate...`,
            `Longitudinal studies are needed to understand...`,
            `Cross-cultural validation of these findings would...`,
            `The development of [tool/framework] would advance...`,
            `Emerging technologies offer opportunities to...`
          ]
        }
      ]
    }
  };

  const generateOutline = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const template = chapterTemplates[selectedChapter as keyof typeof chapterTemplates];
    const outline: OutlineSection[] = template.sections.map(section => ({
      ...section,
      isExpanded: false,
      content: ''
    }));
    
    setGeneratedOutline(outline);
    setIsGenerating(false);
    
    if (onOutlineGenerated) {
      onOutlineGenerated(outline);
    }
  };

  const toggleSection = (sectionId: string) => {
    setGeneratedOutline(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const updateSectionContent = (sectionId: string, content: string) => {
    setGeneratedOutline(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content }
          : section
      )
    );
  };

  const insertPrompt = (sectionId: string, prompt: string) => {
    const section = generatedOutline.find(s => s.id === sectionId);
    if (section) {
      const newContent = section.content ? `${section.content} ${prompt}` : prompt;
      updateSectionContent(sectionId, newContent);
    }
  };

  const exportOutline = () => {
    const template = chapterTemplates[selectedChapter as keyof typeof chapterTemplates];
    const content = `
${template.title}

${generatedOutline.map(section => `
${section.title}
${section.description}

${section.content || '[Content to be written]'}

Suggested prompts:
${section.prompts.map(prompt => `• ${prompt}`).join('\n')}
`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedChapter}-outline.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Thesis Section Outline Generator</h1>
            <p className="text-indigo-100">
              AI-powered outlines with contextual prompts for academic writing
            </p>
          </div>
        </div>
      </div>

      {/* Chapter Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Chapter/Section
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(chapterTemplates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedChapter(key)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedChapter === key
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {template.sections.length} sections
              </p>
            </button>
          ))}
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={customSection}
            onChange={(e) => setCustomSection(e.target.value)}
            placeholder="Or enter custom section title..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={generateOutline}
            disabled={isGenerating}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Target size={16} />
            <span>{isGenerating ? 'Generating...' : 'Generate Outline'}</span>
          </button>
        </div>
      </div>

      {/* Generated Outline */}
      {generatedOutline.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Outline: {chapterTemplates[selectedChapter as keyof typeof chapterTemplates].title}
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={exportOutline}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Save size={16} />
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedOutline.map((section) => (
              <div key={section.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                  {section.isExpanded ? (
                    <ChevronDown className="text-gray-400" size={20} />
                  ) : (
                    <ChevronRight className="text-gray-400" size={20} />
                  )}
                </button>

                {section.isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="space-y-4">
                      {/* Writing Prompts */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
                          <Lightbulb size={16} />
                          <span>Writing Prompts</span>
                        </h4>
                        <div className="space-y-2">
                          {section.prompts.map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => insertPrompt(section.id, prompt)}
                              className="w-full text-left p-3 text-sm bg-white dark:bg-gray-700 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-800/30 transition-colors"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Content Editor */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Section Content
                        </label>
                        <textarea
                          value={section.content || ''}
                          onChange={(e) => updateSectionContent(section.id, e.target.value)}
                          placeholder="Start writing your content here, or click on prompts above to get started..."
                          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
          💡 Writing Tips
        </h3>
        <ul className="text-yellow-700 dark:text-yellow-300 space-y-2 text-sm">
          <li>• Use the prompts as starting points - customize them with your specific research details</li>
          <li>• Replace placeholders like [your topic] and [your field] with your actual research focus</li>
          <li>• Each section should flow logically to the next - use transition sentences</li>
          <li>• Keep your audience (examiners, peers) in mind when writing</li>
          <li>• Save your work regularly and export outlines for backup</li>
        </ul>
      </div>
    </div>
  );
};

export default ThesisOutlineGenerator;
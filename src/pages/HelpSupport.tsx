import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageSquare, Search, ChevronDown, ChevronRight, FileText, Target, Users } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';

const HelpSupport: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
    { id: 'research-tools', title: 'Research Tools', icon: OwlIcon },
    { id: 'ai-features', title: 'AI Features', icon: Target },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: HelpCircle },
  ];

  const helpContent = {
    'getting-started': {
      title: 'Getting Started with DrPhDAI',
      description: 'Learn the basics of using DrPhDAI for your research',
      articles: [
        {
          title: 'Creating Your First Research Project',
          content: 'Step-by-step guide to setting up your research project in DrPhDAI...',
          prompts: [
            'How do I create a new research project?',
            'What information do I need to start?',
            'Can I change my project details later?'
          ]
        },
        {
          title: 'Understanding the Dashboard',
          content: 'Navigate through your research dashboard and track your progress...',
          prompts: [
            'What does each section of the dashboard show?',
            'How do I track my research progress?',
            'Where can I find my recent activities?'
          ]
        },
        {
          title: 'Interactive Research Starter Kit',
          content: 'Use our guided setup for step-by-step research assistance...',
          prompts: [
            'How does the Research Starter Kit work?',
            'What are the different phases?',
            'Can I skip steps in the guided setup?'
          ]
        }
      ]
    },
    'research-tools': {
      title: 'Research & Thesis Writing Tools',
      description: 'Master all DrPhDAI research tools and features',
      articles: [
        {
          title: 'Literature Matrix Management',
          content: 'Organize and analyze your research papers effectively...',
          prompts: [
            'How do I add papers to my literature matrix?',
            'What information does AI extract from abstracts?',
            'How can I export my matrix data?'
          ]
        },
        {
          title: 'Research Navigator',
          content: 'Find and discover relevant academic literature...',
          prompts: [
            'How do I generate AI keywords?',
            'What databases can I search?',
            'How do I refine my search results?'
          ]
        },
        {
          title: 'Thesis Weaver',
          content: 'Generate references and synthesize literature reviews...',
          prompts: [
            'How do I generate APA references?',
            'What is AI synthesis and how does it work?',
            'Can I edit the generated content?'
          ]
        }
      ]
    },
    'ai-features': {
      title: 'AI-Powered Analysis & Writing',
      description: 'Your AI toolkit for qualitative, quantitative, and mixed-methods analysis',
      articles: [
        {
          title: 'AI Research Gap Analysis',
          content: 'Discover research opportunities through AI analysis...',
          prompts: [
            'How does AI identify research gaps?',
            'What should I include in my research description?',
            'How accurate are AI-generated gaps?'
          ]
        },
        {
          title: 'AI Literature Synthesis',
          content: 'Generate comprehensive literature reviews with AI assistance...',
          prompts: [
            'How many papers should I select for synthesis?',
            'What makes a good AI synthesis?',
            'How do I refine AI-generated content?'
          ]
        },
        {
          title: 'External AI Tools Integration',
          content: 'Connect with ChatGPT, Perplexity, and Gemini for enhanced research...',
          prompts: [
            'Do I need my own AI tool accounts?',
            'How do I use the provided prompts?',
            'What are the best practices for AI research assistance?'
          ]
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting & Support',
      description: 'Solve common issues and get technical support',
      articles: [
        {
          title: 'Common Technical Issues',
          content: 'Solutions for the most frequently encountered problems...',
          prompts: [
            'Why is AI analysis not working?',
            'How do I fix login issues?',
            'What if my data is not saving?'
          ]
        },
        {
          title: 'Account & Data Management',
          content: 'Manage your account settings and research data...',
          prompts: [
            'How do I backup my research data?',
            'Can I delete my account?',
            'How do I change my password?'
          ]
        },
        {
          title: 'Academic Integrity Guidelines',
          content: 'Best practices for using AI tools in academic research...',
          prompts: [
            'How do I maintain academic integrity with AI?',
            'What should I cite when using AI assistance?',
            'Are there any restrictions on AI use?'
          ]
        }
      ]
    }
  };

  const faqs = [
    {
      id: 'free-usage',
      question: 'Is DrPhDAI completely free to use?',
      answer: 'Yes! DrPhDAI is completely free during our pre-MVP phase. We offer a "Buy Me a Coffee" option for users who want to support development and receive free eBooks as a thank you gift.'
    },
    {
      id: 'ai-accuracy',
      question: 'How accurate are the AI-generated analyses?',
      answer: 'Our AI provides intelligent starting points for your research, but you should always verify and refine the outputs. AI analysis is designed to assist, not replace, your critical thinking and scholarly expertise.'
    },
    {
      id: 'data-security',
      question: 'Is my research data secure?',
      answer: 'Absolutely. Your research content is your intellectual property. We use secure databases and do not train AI models on your raw research data without explicit consent.'
    },
    {
      id: 'external-ai',
      question: 'Do I need accounts with ChatGPT, Perplexity, and Gemini?',
      answer: 'Yes, you need your own accounts with these platforms. DrPhDAI provides optimized prompts and direct links, but you interact with these AI tools using your personal accounts.'
    },
    {
      id: 'export-options',
      question: 'Can I export my work to other formats?',
      answer: 'Yes! You can export your literature matrix as CSV, copy generated references and syntheses, and integrate with Google Drive for seamless file management.'
    },
    {
      id: 'pilot-study',
      question: 'What is the pilot study program?',
      answer: 'Our pilot study is part of PhD research on AI-powered academic tools. Participants get access to premium features and contribute to improving AI-assisted research methodologies.'
    }
  ];

  const researchPrompts = {
    'Case Study': [
      'How do I design a robust case study methodology?',
      'What are the key components of case study analysis?',
      'How do I ensure validity in case study research?',
      'What tools help with case study data organization?'
    ],
    'Qualitative': [
      'What are the best qualitative data analysis methods?',
      'How do I conduct thematic analysis effectively?',
      'What software tools support qualitative research?',
      'How do I ensure rigor in qualitative studies?'
    ],
    'Quantitative': [
      'Which statistical tests should I use for my data?',
      'How do I determine appropriate sample sizes?',
      'What are the assumptions of different statistical methods?',
      'How do I interpret statistical results correctly?'
    ],
    'Mixed-Methods': [
      'How do I design a mixed-methods study?',
      'What are the integration strategies for mixed-methods?',
      'How do I sequence qualitative and quantitative phases?',
      'What are the challenges in mixed-methods research?'
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <HelpCircle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-green-100">
              Get assistance with DrPhDAI features and tools
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📚 Research & Thesis Writing Prompts</h3>
          <p className="text-sm text-green-100">
            Your AI-powered toolkit for Case Study, Qualitative, Quantitative, and Mixed-Methods analysis!
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help topics, features, or questions..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 Try searching: "literature matrix", "AI synthesis", "research gaps", or "export data"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Help Categories
            </h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon size={20} />
                  <span className="text-sm font-medium">{category.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Category Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {helpContent[activeCategory as keyof typeof helpContent].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {helpContent[activeCategory as keyof typeof helpContent].description}
              </p>
            </div>

            <div className="space-y-6">
              {helpContent[activeCategory as keyof typeof helpContent].articles.map((article, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {article.content}
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      💡 Common Questions:
                    </h4>
                    <ul className="space-y-1">
                      {article.prompts.map((prompt, promptIndex) => (
                        <li key={promptIndex} className="text-sm text-blue-700 dark:text-blue-300">
                          • {prompt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Methodology Prompts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              🔬 Research Methodology Prompts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(researchPrompts).map(([method, prompts]) => (
                <div key={method} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                    <FileText size={16} />
                    <span>{method} Research</span>
                  </h3>
                  <ul className="space-y-2">
                    {prompts.map((prompt, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              ❓ Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="text-gray-400" size={20} />
                    ) : (
                      <ChevronRight className="text-gray-400" size={20} />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white text-center">
            <MessageSquare className="mx-auto mb-4" size={48} />
            <h2 className="text-xl font-bold mb-2">Still Need Help?</h2>
            <p className="text-purple-100 mb-4">
              Can't find what you're looking for? Get personalized support from our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:qashmyphd@gmail.com"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                📧 Email Support
              </a>
              <a
                href="/app/mentor"
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                🤖 Chat with AI Mentor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
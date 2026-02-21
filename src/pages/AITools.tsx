import React from 'react';
import { ExternalLink, Zap, Brain, Search, FileText, BarChart3, Globe, Shield, Lightbulb } from 'lucide-react';

const AITools: React.FC = () => {
  const aiResearchTools = [
    {
      name: 'Consensus',
      description: 'AI-powered search engine for scientific research',
      url: 'https://consensus.app',
      category: 'Research Discovery',
      icon: Search,
      features: ['Evidence-based answers', 'Citation analysis', 'Research synthesis'],
      pricing: 'Freemium'
    },
    {
      name: 'Elicit',
      description: 'AI research assistant for literature reviews',
      url: 'https://elicit.org',
      category: 'Literature Review',
      icon: FileText,
      features: ['Paper summarization', 'Data extraction', 'Research questions'],
      pricing: 'Free'
    },
    {
      name: 'ResearchRabbit',
      description: 'Discover and visualize academic papers',
      url: 'https://researchrabbit.ai',
      category: 'Paper Discovery',
      icon: Brain,
      features: ['Paper recommendations', 'Citation networks', 'Collection management'],
      pricing: 'Free'
    },
    {
      name: 'Semantic Scholar',
      description: 'AI-powered academic search engine',
      url: 'https://semanticscholar.org',
      category: 'Academic Search',
      icon: Search,
      features: ['Paper insights', 'Citation context', 'Research trends'],
      pricing: 'Free'
    },
    {
      name: 'Scite',
      description: 'Smart citations and research analysis',
      url: 'https://scite.ai',
      category: 'Citation Analysis',
      icon: BarChart3,
      features: ['Citation context', 'Supporting/contrasting evidence', 'Research reliability'],
      pricing: 'Freemium'
    },
    {
      name: 'Connected Papers',
      description: 'Visual tool to find and explore academic papers',
      url: 'https://connectedpapers.com',
      category: 'Paper Discovery',
      icon: Globe,
      features: ['Visual paper maps', 'Prior/derivative works', 'Research trends'],
      pricing: 'Freemium'
    },
    {
      name: 'Litmaps',
      description: 'Literature mapping and discovery tool',
      url: 'https://litmaps.co',
      category: 'Literature Mapping',
      icon: Brain,
      features: ['Interactive literature maps', 'Paper recommendations', 'Research tracking'],
      pricing: 'Freemium'
    },
    {
      name: 'Scholarcy',
      description: 'AI-powered research paper summarizer',
      url: 'https://scholarcy.com',
      category: 'Paper Summarization',
      icon: FileText,
      features: ['Article summarization', 'Key findings extraction', 'Reference checking'],
      pricing: 'Freemium'
    },
    {
      name: 'Iris.ai',
      description: 'AI research workspace for scientists',
      url: 'https://iris.ai',
      category: 'Research Workspace',
      icon: Lightbulb,
      features: ['Research discovery', 'Paper analysis', 'Knowledge mapping'],
      pricing: 'Freemium'
    },
    {
      name: 'ThesisAI',
      description: 'AI-powered thesis writing assistant',
      url: 'https://thesisai.io',
      category: 'Writing Assistant',
      icon: FileText,
      features: ['Thesis structure', 'Writing guidance', 'Research organization'],
      pricing: 'Freemium'
    },
    {
      name: 'AvidNote',
      description: 'AI-powered research note-taking and analysis',
      url: 'https://avidnote.com/',
      category: 'Research Platform',
      icon: Brain,
      features: ['Smart note-taking', 'Research analysis', 'Knowledge synthesis'],
      pricing: 'Freemium'
    },
    {
      name: 'Typeset',
      description: 'AI writing assistant for researchers',
      url: 'https://typeset.io',
      category: 'Writing Assistant',
      icon: FileText,
      features: ['Academic writing', 'Citation formatting', 'Journal templates'],
      pricing: 'Freemium'
    },
    {
      name: 'Writefull',
      description: 'AI writing tool for academic texts',
      url: 'https://writefull.com',
      category: 'Writing Assistant',
      icon: FileText,
      features: ['Language feedback', 'Academic phrasing', 'Grammar checking'],
      pricing: 'Freemium'
    },
    {
      name: 'Paperpal',
      description: 'AI academic writing assistant',
      url: 'https://paperpal.com',
      category: 'Writing Assistant',
      icon: FileText,
      features: ['Real-time suggestions', 'Academic tone', 'Grammar enhancement'],
      pricing: 'Freemium'
    },
    {
      name: 'Jenni AI',
      description: 'AI writing assistant for research',
      url: 'https://jenni.ai',
      category: 'Writing Assistant',
      icon: Brain,
      features: ['Research writing', 'Citation assistance', 'Content generation'],
      pricing: 'Freemium'
    }
  ];

  const nonNativeTools = [
    {
      name: 'Grammarly',
      description: 'Advanced grammar and writing assistant',
      url: 'https://grammarly.com',
      features: ['Grammar checking', 'Style suggestions', 'Plagiarism detection'],
      icon: Shield
    },
    {
      name: 'QuillBot',
      description: 'AI-powered paraphrasing tool',
      url: 'https://quillbot.com',
      features: ['Paraphrasing', 'Grammar checking', 'Summarization'],
      icon: FileText
    },
    {
      name: 'Wordtune',
      description: 'AI writing companion for clarity',
      url: 'https://wordtune.com',
      features: ['Rewriting suggestions', 'Tone adjustment', 'Clarity improvement'],
      icon: Lightbulb
    },
    {
      name: 'LanguageTool',
      description: 'Multilingual grammar and style checker',
      url: 'https://languagetool.org',
      features: ['Grammar checking', 'Style suggestions', 'Multiple languages'],
      icon: Globe
    },
    {
      name: 'Hemingway Editor',
      description: 'Writing clarity and readability tool',
      url: 'https://hemingwayapp.com',
      features: ['Readability analysis', 'Sentence structure', 'Writing clarity'],
      icon: FileText
    }
  ];

  const categories = [
    'All',
    'Research Discovery',
    'Literature Review',
    'Paper Discovery',
    'Academic Search',
    'Citation Analysis',
    'Writing Assistant',
    'Research Platform'
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? aiResearchTools 
    : aiResearchTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Top AI Tools for Researchers</h1>
            <p className="text-purple-100">
              Comprehensive collection of AI-powered research assistance tools
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">🚀 Enhance Your Research with AI</h3>
          <p className="text-sm text-purple-100">
            Discover cutting-edge AI tools that maintain academic integrity while accelerating your research process.
            From literature discovery to writing assistance, these tools are designed specifically for researchers and postgraduate students.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* AI Research Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <tool.icon className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  tool.pricing === 'Free' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : tool.pricing === 'Freemium'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                }`}>
                  {tool.pricing}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {tool.description}
            </p>

            <div className="mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-2">
                {tool.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {tool.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Visit Tool</span>
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* Non-Native Speakers Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <Globe className="text-green-600" size={24} />
          <span>Top Research AI Tools for Non-Native English Speakers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonNativeTools.map((tool, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <tool.icon className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
              
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Visit Tool</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Integrity Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center space-x-2">
          <Shield size={20} />
          <span>Academic Integrity Guidelines</span>
        </h2>
        <div className="text-yellow-700 dark:text-yellow-300 space-y-2 text-sm">
          <p><strong>Always maintain academic integrity:</strong> These AI tools are designed to assist and enhance your research, not replace critical thinking.</p>
          <p><strong>Verify and cite:</strong> Always verify AI-generated content and properly cite all sources according to your institution's guidelines.</p>
          <p><strong>Transparency:</strong> Disclose the use of AI tools when required by your institution or publication guidelines.</p>
          <p><strong>Original contribution:</strong> Ensure your research maintains originality and adds genuine scholarly value to your field.</p>
        </div>
      </div>
    </div>
  );
};

export default AITools;
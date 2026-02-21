import React, { useState } from 'react';
import { Search, ExternalLink, Lightbulb, BookOpen } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const Navigator: React.FC = () => {
  const { currentProject, updateProject } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);

  const generateKeywords = async () => {
    if (!currentProject?.title) return;
    
    setIsGeneratingKeywords(true);
    
    // Simulate AI keyword generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const keywords = [
      'artificial intelligence education',
      'machine learning pedagogy',
      'AI literacy framework',
      'educational technology integration',
      'computational thinking skills'
    ];
    
    setSuggestedKeywords(keywords);

    // Persist keywords into the project so other tools can use them (e.g., Literature Recommendations)
    const existing = currentProject.keywords || [];
    const merged = Array.from(new Set([...existing, ...keywords]));
    updateProject(currentProject, { ...currentProject, keywords: merged });

    setIsGeneratingKeywords(false);
  };

  const handleScholarSearch = (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    window.open(`https://scholar.google.com/scholar?q=${encodedQuery}`, '_blank');
  };

  const researchDatabases = [
    { name: 'Google Scholar', url: 'https://scholar.google.com', description: 'Academic papers and citations' },
    { name: 'JSTOR', url: 'https://jstor.org', description: 'Academic journals and books' },
    { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Medical and life sciences literature' },
    { name: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org', description: 'Technology and engineering papers' },
    { name: 'ERIC', url: 'https://eric.ed.gov', description: 'Education research database' },
    { name: 'ResearchGate', url: 'https://researchgate.net', description: 'Scientific collaboration network' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Search className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Research Navigator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and explore academic literature with AI assistance
            </p>
          </div>
        </div>

        {currentProject && (
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Current Project: {currentProject.title}
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Research Area: {currentProject.area}
            </p>
            <button
              onClick={generateKeywords}
              disabled={isGeneratingKeywords}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Lightbulb size={16} />
              <span>
                {isGeneratingKeywords ? 'Generating...' : 'Generate AI Keywords'}
              </span>
            </button>
          </div>
        )}

        {/* AI Generated Keywords */}
        {suggestedKeywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              AI-Suggested Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleScholarSearch(keyword)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-1"
                >
                  <span>{keyword}</span>
                  <ExternalLink size={12} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your research keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  handleScholarSearch(searchQuery);
                }
              }}
            />
          </div>
          <button
            onClick={() => searchQuery.trim() && handleScholarSearch(searchQuery)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Search Scholar</span>
          </button>
        </div>
      </div>

      {/* Research Databases */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Academic Databases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchDatabases.map((db, index) => (
            <a
              key={index}
              href={db.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-all group hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {db.name}
                </h3>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {db.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Research Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Research Tips & Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Use Boolean Operators</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use AND, OR, NOT to refine your searches (e.g., "AI AND education NOT gaming")
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Search by Date Range</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Filter by publication year to find the most recent research in your field
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Check Citation Counts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Highly cited papers often indicate influential or foundational research
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Use Quotation Marks</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Search for exact phrases by wrapping them in quotes ("machine learning")
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Follow Reference Chains</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check the references of relevant papers to discover more related research
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Set Up Alerts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create alerts for your keywords to stay updated with new publications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigator;
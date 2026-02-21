import React, { useState } from 'react';
import { BookOpen, ExternalLink, Search, Filter } from 'lucide-react';

const ResearchJournals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('All');

  const journalFinders = [
    {
      name: 'Elsevier Journal Finder',
      url: 'https://journalfinder.elsevier.com/',
      description: 'Find the perfect journal for your research',
      logo: '🔍',
      features: ['Journal matching', 'Impact factor info', 'Submission guidelines']
    },
    {
      name: 'IEEE Publication Recommender',
      url: 'https://ieeeauthorcenter.ieee.org/journal-selector/',
      description: 'IEEE journal and conference recommendations',
      logo: '⚡',
      features: ['Technical publications', 'Conference finder', 'IEEE standards']
    },
    {
      name: 'Springer Journal Suggester',
      url: 'https://journalsuggester.springer.com/',
      description: 'Springer journal recommendations',
      logo: '📚',
      features: ['Open access options', 'Journal metrics', 'Editorial information']
    },
    {
      name: 'Wiley Journal Finder',
      url: 'https://journalfinder.wiley.com/',
      description: 'Wiley journal matching service',
      logo: '🔬',
      features: ['Subject matching', 'Publication timeline', 'Journal scope']
    },
    {
      name: 'Scopus Journal Analyzer',
      url: 'https://www.scopus.com/sources',
      description: 'Comprehensive journal database and metrics',
      logo: '📊',
      features: ['Citation metrics', 'Journal rankings', 'Subject categories']
    },
    {
      name: 'Taylor & Francis Journal Suggester',
      url: 'https://authorservices.taylorandfrancis.com',
      description: 'Taylor & Francis journal recommendations',
      logo: '📖',
      features: ['Humanities focus', 'Social sciences', 'Author services']
    },
    {
      name: 'Edanz Journal Selector',
      url: 'https://www.edanz.com/journal-selector',
      description: 'AI-powered journal selection tool',
      logo: '🤖',
      features: ['AI matching', 'Publication advice', 'Editorial support']
    },
    {
      name: 'MDPI Journal Finder',
      url: 'https://www.mdpi.com/about/journalfinder',
      description: 'Open access journal finder',
      logo: '🌐',
      features: ['Open access', 'Fast publication', 'Multidisciplinary']
    },
    {
      name: 'Scimago Journal & Country Rank (SJR)',
      url: 'https://www.scimagojr.com/journalrank.php',
      description: 'Journal rankings and country analysis',
      logo: '🏆',
      features: ['Journal rankings', 'Country analysis', 'Subject areas']
    },
    {
      name: 'JANE (Journal/Author Name Estimator)',
      url: 'https://jane.biosemantics.org/',
      description: 'Biomedical journal and author finder',
      logo: '🧬',
      features: ['Biomedical focus', 'Author suggestions', 'Journal confidence scores']
    }
  ];

  const topJournals = [
    {
      name: 'Nature',
      field: 'Multidisciplinary',
      impactFactor: '64.8',
      url: 'https://nature.com',
      description: 'Leading multidisciplinary science journal',
      openAccess: false
    },
    {
      name: 'Science',
      field: 'Multidisciplinary',
      impactFactor: '56.9',
      url: 'https://science.org',
      description: 'Premier scientific research publication',
      openAccess: false
    },
    {
      name: 'Cell',
      field: 'Life Sciences',
      impactFactor: '66.9',
      url: 'https://cell.com',
      description: 'Leading life sciences research journal',
      openAccess: false
    },
    {
      name: 'The Lancet',
      field: 'Medicine',
      impactFactor: '202.7',
      url: 'https://thelancet.com',
      description: 'World-renowned medical journal',
      openAccess: false
    },
    {
      name: 'New England Journal of Medicine',
      field: 'Medicine',
      impactFactor: '176.1',
      url: 'https://nejm.org',
      description: 'Premier medical research publication',
      openAccess: false
    },
    {
      name: 'PLOS ONE',
      field: 'Multidisciplinary',
      impactFactor: '3.7',
      url: 'https://plosone.org',
      description: 'Open access multidisciplinary journal',
      openAccess: true
    },
    {
      name: 'Scientific Reports',
      field: 'Multidisciplinary',
      impactFactor: '4.6',
      url: 'https://nature.com/srep',
      description: 'Open access scientific publication',
      openAccess: true
    },
    {
      name: 'Proceedings of the National Academy of Sciences',
      field: 'Multidisciplinary',
      impactFactor: '12.8',
      url: 'https://pnas.org',
      description: 'Prestigious multidisciplinary research journal',
      openAccess: false
    },
    {
      name: 'Journal of the American Medical Association',
      field: 'Medicine',
      impactFactor: '120.7',
      url: 'https://jamanetwork.com',
      description: 'Leading medical research publication',
      openAccess: false
    },
    {
      name: 'Nature Communications',
      field: 'Multidisciplinary',
      impactFactor: '17.7',
      url: 'https://nature.com/ncomms',
      description: 'Open access multidisciplinary journal',
      openAccess: true
    },
    {
      name: 'Psychological Science',
      field: 'Psychology',
      impactFactor: '6.1',
      url: 'https://journals.sagepub.com/home/pss',
      description: 'Leading psychology research journal',
      openAccess: false
    },
    {
      name: 'Journal of Educational Psychology',
      field: 'Education',
      impactFactor: '5.6',
      url: 'https://apa.org/pubs/journals/edu',
      description: 'Premier educational psychology journal',
      openAccess: false
    },
    {
      name: 'American Sociological Review',
      field: 'Sociology',
      impactFactor: '7.9',
      url: 'https://journals.sagepub.com/home/asr',
      description: 'Top sociology research publication',
      openAccess: false
    },
    {
      name: 'Journal of Business Research',
      field: 'Business',
      impactFactor: '10.9',
      url: 'https://elsevier.com/locate/jbusres',
      description: 'Leading business research journal',
      openAccess: false
    },
    {
      name: 'Computers & Education',
      field: 'Education Technology',
      impactFactor: '11.2',
      url: 'https://elsevier.com/locate/compedu',
      description: 'Top educational technology journal',
      openAccess: false
    }
  ];

  const fields = ['All', 'Multidisciplinary', 'Medicine', 'Life Sciences', 'Psychology', 'Education', 'Sociology', 'Business', 'Education Technology'];

  const filteredJournals = topJournals.filter(journal => {
    const matchesSearch = journal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === 'All' || journal.field === selectedField;
    return matchesSearch && matchesField;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
        <div className="flex items-center mb-4 space-x-3">
          <div className="p-2 rounded-lg bg-white/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Top Research Journals</h1>
            <p className="text-green-100">
              Discover the best academic journals for your research publication
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/10">
          <h3 className="mb-2 font-semibold">📚 Find the Perfect Journal for Your Research</h3>
          <p className="text-sm text-green-100">
            Access top-tier academic journals across multiple disciplines. Use our journal finders to match your research 
            with the most suitable publications based on scope, impact factor, and submission requirements.
          </p>
        </div>
      </div>

      {/* Journal Finder Tools */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          🔍 Journal Finder Tools
        </h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journalFinders.map((finder, index) => (
            <div
              key={index}
              className="p-4 transition-shadow border border-gray-200 rounded-lg dark:border-gray-600 hover:shadow-md"
            >
              <div className="flex items-center mb-3 space-x-3">
                <div className="text-2xl">{finder.logo}</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{finder.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{finder.description}</p>
                </div>
              </div>
              
              <div className="mb-3 space-y-1">
                {finder.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
              
              <a
                href={finder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <span>Use Tool</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          🏆 Top Academic Journals by Field
        </h2>
        
        <div className="flex flex-col gap-4 mb-6 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
            <input
              type="text"
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Journals Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJournals.map((journal, index) => (
            <div
              key={index}
              className="p-6 transition-shadow rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {journal.name}
                </h3>
                {journal.openAccess && (
                  <span className="inline-flex items-center px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                    Open Access
                  </span>
                )}
              </div>
              
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Field:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{journal.field}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Impact Factor:</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{journal.impactFactor}</span>
                </div>
              </div>
              
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {journal.description}
              </p>
              
              <a
                href={journal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <span>Visit Journal</span>
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Publication Tips */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          💡 Journal Selection Tips
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Check Journal Scope</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ensure your research aligns with the journal's aims and scope
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-green-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Consider Impact Factor</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Balance prestige with realistic acceptance chances
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-purple-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Review Publication Timeline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check average review and publication times
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-orange-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Open Access Options</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consider open access for wider reach and impact
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-red-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Read Recent Articles</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review recently published papers to understand standards
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-teal-600 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Check Indexing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify journal is indexed in relevant databases
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchJournals;
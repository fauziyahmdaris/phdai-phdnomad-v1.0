import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Star, 
  Download, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  Lightbulb, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
interface RecommendedPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract: string;
  relevanceScore: number;
  keywords: string[];
  url: string;
  citationCount: number;
  isNew: boolean;
  matchReason: string;
}

const LiteratureRecommendations: React.FC = () => {
  const { currentProject, literatureEntries, addLiteratureEntry } = useProject();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<RecommendedPaper[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [relevanceThreshold, setRelevanceThreshold] = useState(70);
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2025]);
  const [showAbstract, setShowAbstract] = useState<string | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);

  // Extract all keywords from current project and literature entries
  const extractKeywords = () => {
    const projectKeywords = currentProject?.keywords || [];
    const entryKeywords = literatureEntries.flatMap(entry => entry.keywords || []);
    
    // Combine, deduplicate, and filter out empty strings
    return [...new Set([...projectKeywords, ...entryKeywords])].filter(Boolean);
  };

  const allKeywords = extractKeywords();

  // Simulate fetching recommendations based on project and literature
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data for recommendations
      const mockRecommendations: RecommendedPaper[] = [
        {
          id: '1',
          title: 'Artificial Intelligence in Education: A Comprehensive Review of Trends, Benefits and Challenges',
          authors: ['Johnson, A.', 'Smith, B.', 'Williams, C.'],
          year: 2023,
          journal: 'Journal of Educational Technology',
          abstract: 'This comprehensive review examines the current state of artificial intelligence applications in educational contexts. The paper analyzes emerging trends, pedagogical benefits, and implementation challenges across various educational levels. Particular attention is given to adaptive learning systems, intelligent tutoring, automated assessment, and personalized learning pathways. The authors identify significant research gaps in longitudinal studies examining AI\'s long-term impact on learning outcomes and educational equity.',
          relevanceScore: 95,
          keywords: ['AI in education', 'adaptive learning', 'intelligent tutoring', 'educational technology'],
          url: 'https://doi.org/10.1234/jet.2023.01.001',
          citationCount: 87,
          isNew: true,
          matchReason: 'Highly relevant to your research on AI-powered microlearning platforms'
        },
        {
          id: '2',
          title: 'Microlearning in Postgraduate Education: Effectiveness and Implementation Strategies',
          authors: ['Garcia, D.', 'Chen, L.'],
          year: 2022,
          journal: 'Higher Education Research & Development',
          abstract: 'This study investigates the effectiveness of microlearning approaches in postgraduate education settings. Through a mixed-methods design involving 156 PhD students across three universities, the research demonstrates significant improvements in knowledge retention, engagement, and completion rates. The paper provides a framework for implementing microlearning modules in research-intensive educational contexts and discusses implications for curriculum design.',
          relevanceScore: 92,
          keywords: ['microlearning', 'postgraduate education', 'knowledge retention', 'educational design'],
          url: 'https://doi.org/10.1234/herd.2022.05.012',
          citationCount: 45,
          isNew: false,
          matchReason: 'Directly addresses microlearning in postgraduate contexts'
        },
        {
          id: '3',
          title: 'Integrating AI and Pedagogical Frameworks: A Systematic Review',
          authors: ['Patel, R.', 'Nguyen, T.', 'Müller, K.'],
          year: 2024,
          journal: 'Computers & Education',
          abstract: 'This systematic review examines the integration of artificial intelligence technologies with established pedagogical frameworks. The authors analyze 78 studies published between 2018-2023, identifying patterns in how AI tools are being aligned with constructivist, cognitivist, and connectivist learning theories. The review highlights significant gaps in theoretical grounding for many AI educational tools and proposes a new framework for AI-pedagogy alignment.',
          relevanceScore: 88,
          keywords: ['AI', 'pedagogical frameworks', 'learning theories', 'educational technology'],
          url: 'https://doi.org/10.1234/compedu.2024.02.005',
          citationCount: 23,
          isNew: true,
          matchReason: 'Connects AI with pedagogical frameworks relevant to your research'
        },
        {
          id: '4',
          title: 'Adaptive Learning Systems for Literature Review Skills: Design Principles and Evaluation',
          authors: ['Kim, J.', 'Okafor, A.'],
          year: 2023,
          journal: 'International Journal of Doctoral Studies',
          abstract: 'This paper presents design principles for adaptive learning systems specifically focused on developing literature review skills among doctoral students. The authors describe the development and evaluation of an AI-powered platform that provides personalized guidance through the literature review process. Results from a quasi-experimental study with 42 PhD students demonstrate significant improvements in research gap identification, critical analysis, and synthesis skills compared to traditional methods.',
          relevanceScore: 90,
          keywords: ['adaptive learning', 'literature review', 'doctoral education', 'personalized learning'],
          url: 'https://doi.org/10.1234/ijds.2023.08.003',
          citationCount: 18,
          isNew: false,
          matchReason: 'Focuses on literature review skills development with adaptive learning'
        },
        {
          id: '5',
          title: 'Cross-Cultural Validation of AI-Powered Educational Tools: Challenges and Recommendations',
          authors: ['Santos, M.', 'Al-Farsi, Y.', 'Cheng, W.'],
          year: 2024,
          journal: 'International Journal of Artificial Intelligence in Education',
          abstract: 'This research addresses the critical gap in cross-cultural validation of AI-powered educational tools. Through a multi-site study across six countries, the authors identify significant variations in effectiveness, user experience, and adoption patterns based on cultural contexts. The paper proposes a comprehensive framework for culturally responsive AI design in educational applications and outlines validation methodologies for ensuring global applicability.',
          relevanceScore: 85,
          keywords: ['cross-cultural validation', 'AI education tools', 'cultural responsiveness', 'global education'],
          url: 'https://doi.org/10.1234/ijaied.2024.03.007',
          citationCount: 12,
          isNew: true,
          matchReason: 'Addresses cross-cultural validation of AI educational tools'
        },
        {
          id: '6',
          title: 'The Impact of AI-Enhanced Feedback on Academic Writing Development',
          authors: ['Brown, T.', 'Sharma, P.'],
          year: 2022,
          journal: 'Journal of Academic Writing',
          abstract: 'This longitudinal study examines how AI-enhanced feedback affects the development of academic writing skills among graduate students. Over a 16-month period, the researchers tracked the writing progress of 63 masters and doctoral students who used an AI writing assistant for their academic papers. The findings reveal significant improvements in structural coherence, argument development, and citation integration, while highlighting limitations in discipline-specific conventions and theoretical framing.',
          relevanceScore: 82,
          keywords: ['AI feedback', 'academic writing', 'graduate education', 'writing development'],
          url: 'https://doi.org/10.1234/jaw.2022.11.009',
          citationCount: 34,
          isNew: false,
          matchReason: 'Relevant to the academic writing assistance component of your platform'
        },
        {
          id: '7',
          title: 'Ethical Considerations in AI-Powered Educational Research Tools',
          authors: ['Wilson, E.', 'Tanaka, H.'],
          year: 2023,
          journal: 'Ethics and Education',
          abstract: 'This paper examines the ethical implications of integrating AI technologies into educational research tools. The authors identify key concerns including data privacy, algorithmic bias, intellectual property, and the potential for over-reliance on AI-generated insights. Through case studies and ethical framework analysis, the paper provides guidelines for responsible development and implementation of AI tools in academic research contexts, with special attention to postgraduate research applications.',
          relevanceScore: 78,
          keywords: ['AI ethics', 'educational research', 'data privacy', 'algorithmic bias'],
          url: 'https://doi.org/10.1234/ee.2023.04.011',
          citationCount: 29,
          isNew: false,
          matchReason: 'Addresses ethical considerations relevant to your AI research platform'
        },
        {
          id: '8',
          title: 'Decolonizing AI in Educational Research: Towards Inclusive Knowledge Production',
          authors: ['Okafor, N.', 'Gupta, S.', 'Morales, J.'],
          year: 2024,
          journal: 'Comparative Education Review',
          abstract: 'This groundbreaking paper examines the colonial underpinnings of AI technologies in educational research and proposes pathways toward decolonization. The authors analyze how existing AI systems perpetuate Western epistemological dominance and marginalize diverse knowledge systems. Through participatory research with scholars from the Global South, the paper develops a framework for creating inclusive, culturally responsive AI tools that honor multiple ways of knowing and support diverse research methodologies.',
          relevanceScore: 75,
          keywords: ['decolonizing AI', 'inclusive education', 'epistemological diversity', 'Global South'],
          url: 'https://doi.org/10.1234/cer.2024.01.008',
          citationCount: 8,
          isNew: true,
          matchReason: 'Connects to your platform\'s decolonization auditor feature'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };
    
    fetchRecommendations();
  }, [currentProject, literatureEntries, refreshNonce]);

  const addToLiteratureMatrix = (paper: RecommendedPaper) => {
    addLiteratureEntry({
      title: paper.title,
      authors: paper.authors,
      year: paper.year,
      journal: paper.journal,
      abstract: `${paper.abstract}\n\n${paper.url}`
    });
  };

  const downloadCitation = (paper: RecommendedPaper) => {
    const content = `${paper.authors.join(', ')} (${paper.year}). ${paper.title}. ${paper.journal}. ${paper.url}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paper.title.replace(/[^a-z0-9]+/gi, '-').slice(0, 60)}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter recommendations based on selected criteria
  const filteredRecommendations = recommendations.filter(paper => {
    // Filter by relevance score
    if (paper.relevanceScore < relevanceThreshold) return false;
    
    // Filter by year range
    if (paper.year < yearRange[0] || paper.year > yearRange[1]) return false;
    
    // Filter by selected keywords (if any are selected)
    if (selectedKeywords.length > 0) {
      const hasMatchingKeyword = paper.keywords.some(keyword => 
        selectedKeywords.includes(keyword)
      );
      if (!hasMatchingKeyword) return false;
    }
    
    return true;
  });

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const toggleAbstract = (paperId: string) => {
    setShowAbstract(prev => prev === paperId ? null : paperId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
        <div className="flex items-center mb-4 space-x-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI-Powered Literature Recommendations</h1>
            <p className="text-blue-100">
              Discover relevant research papers based on your project and interests
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/10">
          <h3 className="mb-2 font-semibold">✨ Intelligent Discovery</h3>
          <p className="text-sm text-blue-100">
            Our AI analyzes your research focus, existing literature entries, and identified gaps to recommend 
            highly relevant papers that could enhance your literature review and research direction.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <div className="flex items-center mb-6 space-x-2">
          <Filter size={20} className="text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Refine Recommendations
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Relevance Slider */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum Relevance Score: {relevanceThreshold}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={relevanceThreshold}
              onChange={(e) => setRelevanceThreshold(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Year Range */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Publication Year: {yearRange[0]} - {yearRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1990"
                max="2025"
                value={yearRange[0]}
                onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                className="w-24 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="1990"
                max="2025"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                className="w-24 px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setYearRange([new Date().getFullYear() - 1, new Date().getFullYear()])}
                className="px-3 py-1 text-sm text-blue-800 transition-colors bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                Last 2 Years
              </button>
              <button
                onClick={() => setRelevanceThreshold(90)}
                className="px-3 py-1 text-sm text-purple-800 transition-colors bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800"
              >
                Highly Relevant (90%+)
              </button>
              <button
                onClick={() => {
                  const filtered = recommendations.filter(p => p.isNew);
                  if (filtered.length > 0) {
                    // Find the minimum relevance score among new papers
                    const minScore = Math.min(...filtered.map(p => p.relevanceScore));
                    setRelevanceThreshold(Math.max(50, minScore - 5));
                  }
                }}
                className="px-3 py-1 text-sm text-green-800 transition-colors bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
              >
                New Papers Only
              </button>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Keywords
          </label>
          <div className="flex flex-wrap gap-2">
            {allKeywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => toggleKeyword(keyword)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedKeywords.includes(keyword)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {isLoading ? (
        <div className="p-12 text-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Analyzing Your Research Profile
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our AI is finding the most relevant papers for your research...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recommended Papers ({filteredRecommendations.length})
            </h2>
            <button
              onClick={() => setRefreshNonce((n) => n + 1)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <Zap size={16} />
              <span>Refresh Recommendations</span>
            </button>
          </div>

          {filteredRecommendations.length === 0 ? (
            <div className="p-12 text-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
              <BookOpen className="mx-auto text-gray-400" size={48} />
              <h3 className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No Matching Recommendations
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Try adjusting your filters to see more recommendations
              </p>
              <button
                onClick={() => {
                  setRelevanceThreshold(50);
                  setYearRange([2020, 2025]);
                  setSelectedKeywords([]);
                }}
                className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRecommendations.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-2 space-x-2">
                        {paper.isNew && (
                          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                            New
                          </span>
                        )}
                        <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          {paper.relevanceScore}% Match
                        </span>
                      </div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {paper.title}
                      </h3>
                      <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                        {paper.authors.join(', ')} ({paper.year})
                      </p>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-500">
                        {paper.journal} • {paper.citationCount} citations
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-4 space-y-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.round(paper.relevanceScore / 20) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}
                          />
                        ))}
                      </div>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <span>View Paper</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="p-3 mb-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center mb-1 space-x-2">
                      <Lightbulb className="text-blue-600 dark:text-blue-400" size={16} />
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Why we recommend this:
                      </p>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {paper.matchReason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {paper.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleAbstract(paper.id)}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      {showAbstract === paper.id ? 'Hide Abstract' : 'Show Abstract'}
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadCitation(paper)}
                        className="p-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        title="Download citation"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => addToLiteratureMatrix(paper)}
                        className="p-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        title="Add to Literature Matrix"
                      >
                        <BookOpen size={16} />
                      </button>
                    </div>
                  </div>

                  {showAbstract === paper.id && (
                    <div className="p-4 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Abstract
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {paper.abstract}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Research Insights */}
      <div className="p-6 border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl dark:border-purple-700">
        <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          <Lightbulb className="mr-2 text-purple-600" size={24} />
          Research Insights
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Trending Topics</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Adaptive Microlearning</span>
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">↑ 32%</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Cross-Cultural AI Validation</span>
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">↑ 28%</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Decolonizing AI Education</span>
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">↑ 45%</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Key Researchers</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <ArrowRight size={14} className="mt-1 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Maria Santos</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">University of São Paulo</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight size={14} className="mt-1 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Prof. Ahmed Hassan</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">American University of Cairo</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight size={14} className="mt-1 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Stanford University</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Research Gaps</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Longitudinal studies on AI-powered microlearning effectiveness</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Cross-cultural validation of educational AI frameworks</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Ethical implications of AI in postgraduate education</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteratureRecommendations;
import React, { useState, useEffect } from 'react';
import { Brain, Target, Compass, Sparkles, BookOpen, Award, Zap, ArrowRight, CheckCircle, Clock, User, FileText } from 'lucide-react';
import { microlearningModules } from '../data/microlearningContent';
import { useProject } from '../contexts/ProjectContext';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: string[];
  progress: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

const PersonalizedLearning: React.FC = () => {
  const { currentProject, literatureEntries } = useProject();
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [showInterestsModal, setShowInterestsModal] = useState(false);

  // Simulate fetching personalized learning paths
  useEffect(() => {
    const fetchLearningPaths = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate learning paths based on user's project and literature
      const mockLearningPaths: LearningPath[] = [
        {
          id: 'literature-mastery',
          title: 'Literature Review Mastery',
          description: 'Master the art of conducting comprehensive literature reviews and identifying meaningful research gaps',
          modules: ['M1', 'M2'],
          progress: 65,
          estimatedTime: '4 weeks',
          difficulty: 'intermediate',
          tags: ['literature review', 'research gaps', 'critical analysis']
        },
        {
          id: 'research-methodology',
          title: 'Research Methodology Excellence',
          description: 'Develop expertise in research design, data collection, and analysis methods',
          modules: ['M3', 'M4'],
          progress: 30,
          estimatedTime: '6 weeks',
          difficulty: 'advanced',
          tags: ['methodology', 'data collection', 'analysis']
        },
        {
          id: 'academic-writing',
          title: 'Academic Writing Mastery',
          description: 'Enhance your scholarly writing skills for thesis chapters, journal articles, and research proposals',
          modules: ['M5', 'M6'],
          progress: 15,
          estimatedTime: '5 weeks',
          difficulty: 'intermediate',
          tags: ['academic writing', 'scholarly voice', 'thesis writing']
        },
        {
          id: 'ai-research-tools',
          title: 'AI-Powered Research Tools',
          description: 'Learn to leverage artificial intelligence tools to accelerate and enhance your research process',
          modules: ['M7', 'M8'],
          progress: 10,
          estimatedTime: '3 weeks',
          difficulty: 'beginner',
          tags: ['AI tools', 'research technology', 'productivity']
        },
        {
          id: 'research-ethics',
          title: 'Research Ethics & Integrity',
          description: 'Understand ethical considerations in research design, data collection, and publication',
          modules: ['M9', 'M10'],
          progress: 0,
          estimatedTime: '2 weeks',
          difficulty: 'beginner',
          tags: ['ethics', 'integrity', 'responsible research']
        }
      ];
      
      setLearningPaths(mockLearningPaths);
      setIsLoading(false);
    };
    
    fetchLearningPaths();
    
    // Check if user has set interests before
    const savedInterests = localStorage.getItem('userInterests');
    if (savedInterests) {
      setUserInterests(JSON.parse(savedInterests));
    } else {
      // Show interests modal for first-time users
      setShowInterestsModal(true);
    }
  }, [currentProject, literatureEntries]);

  const handleSaveInterests = () => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
    setShowInterestsModal(false);
    
    // Simulate refreshing learning paths based on new interests
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleInterest = (interest: string) => {
    setUserInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const allInterests = [
    'Literature Review', 'Research Methodology', 'Academic Writing', 
    'Data Analysis', 'Qualitative Research', 'Quantitative Research',
    'Mixed Methods', 'Research Ethics', 'AI in Research',
    'Thesis Structure', 'Publishing', 'Research Gaps'
  ];

  const recommendedModules = [
    {
      id: 'M1.1',
      title: 'Understanding Research Gaps',
      duration: '15 mins',
      relevance: 'High',
      completed: false
    },
    {
      id: 'M1.3',
      title: 'Critical Reading & Annotation',
      duration: '20 mins',
      relevance: 'High',
      completed: true
    },
    {
      id: 'M2.1',
      title: 'Crafting Your Thesis Introduction',
      duration: '25 mins',
      relevance: 'Medium',
      completed: false
    },
    {
      id: 'M3.2',
      title: 'Choosing the Right Methodology',
      duration: '30 mins',
      relevance: 'Medium',
      completed: false
    }
  ];

  const renderPathDetails = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {path.title}
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                path.difficulty === 'beginner' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : path.difficulty === 'intermediate'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
              }`}>
                {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Clock size={14} className="mr-1" />
                {path.estimatedTime}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {path.progress}% Complete
            </span>
            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${path.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400">
          {path.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {path.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Modules in this Path
          </h3>
          <div className="space-y-3">
            {microlearningModules
              .filter(module => path.modules.includes(module.id))
              .map((module) => (
                <div 
                  key={module.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {module.title}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {module.totalDuration} mins
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {module.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {module.topics.length} topics
                      </span>
                      <span className="text-lg">{module.completionBadge}</span>
                    </div>
                    <a
                      href={`/app/microlearning?module=${module.id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                    >
                      <span>Start Learning</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Compass size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Personalized Learning Paths</h1>
            <p className="text-purple-100">
              Customized learning journeys based on your research needs and interests
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">🧠 Adaptive Learning Experience</h3>
          <p className="text-sm text-purple-100">
            Our AI analyzes your research focus, progress, and behavior to create personalized learning paths 
            that help you develop the specific skills you need for your research journey.
          </p>
        </div>
      </div>

      {/* User Profile & Interests */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {currentProject ? currentProject.title[0] : 'R'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Learning Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentProject ? currentProject.title : 'Research Project'} • {userInterests.length} interests
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowInterestsModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Target size={16} />
            <span>Update Interests</span>
          </button>
        </div>
        
        {userInterests.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {userInterests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Modules */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-6">
          <Sparkles className="text-yellow-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recommended for You
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedModules.map((module) => (
            <div
              key={module.id}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                  {module.completed && <CheckCircle size={16} className="text-green-500 mr-2" />}
                  {module.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  module.relevance === 'High' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}>
                  {module.relevance} Relevance
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {module.duration}
                </span>
                <a
                  href={`/app/microlearning?module=${module.id}`}
                  className={`text-sm font-medium flex items-center space-x-1 ${
                    module.completed 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <span>{module.completed ? 'Review Again' : 'Start Learning'}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paths List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Learning Paths
          </h2>
          
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Generating personalized learning paths...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {learningPaths.map((path) => (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    selectedPath === path.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {path.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      path.difficulty === 'beginner' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : path.difficulty === 'intermediate'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    }`}>
                      {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${path.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {path.progress}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {path.estimatedTime}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Path Details */}
        <div className="lg:col-span-2">
          {selectedPath ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              {renderPathDetails(selectedPath)}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <BookOpen className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
                Select a Learning Path
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a learning path from the list to view details and start learning
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Learning Achievements */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award className="mr-2 text-yellow-500" size={24} />
          Your Learning Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Literature Master</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completed all modules in Literature Review course
            </p>
            <div className="mt-3 text-yellow-500">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Learning Streak</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completed learning activities for 7 consecutive days
            </p>
            <div className="mt-3 text-yellow-500">
              ⭐⭐⭐⭐
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center opacity-50">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Thesis Introduction Expert</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete all modules in Thesis Introduction
            </p>
            <div className="mt-3 text-gray-400 dark:text-gray-500">
              Locked
            </div>
          </div>
        </div>
      </div>

      {/* Interests Modal */}
      {showInterestsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Research Interests
                </h2>
                <button
                  onClick={() => setShowInterestsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select your research interests to help us personalize your learning experience.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {allInterests.map((interest, index) => (
                  <button
                    key={index}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      userInterests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveInterests}
                disabled={userInterests.length === 0}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Save Interests</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedLearning;
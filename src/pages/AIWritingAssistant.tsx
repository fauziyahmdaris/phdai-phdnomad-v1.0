import React, { useState } from 'react';
import { FileText, Wand2, Target, Link2, Quote, Lightbulb, BookOpen, MessageSquare, Zap, Heart, Star, Award, Sparkles } from 'lucide-react';
import AIWritingAssistant from '../components/AIWritingAssistant';
import ThesisOutlineGenerator from '../components/ThesisOutlineGenerator';
import CitationManager from '../components/CitationManager';
import WritingCoach from '../components/WritingCoach';

const AIWritingAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'outline' | 'citations' | 'coach'>('editor');
  const [editorContent, setEditorContent] = useState('');
  const [sectionType, setSectionType] = useState<'introduction' | 'literature-review' | 'methodology' | 'conclusion' | 'general'>('general');
  const [showMotivation, setShowMotivation] = useState(true);

  const handleCitationInsert = (citation: string) => {
    setEditorContent(prev => prev + (prev.endsWith(' ') ? '' : ' ') + citation + ' ');
  };

  const motivationalQuotes = [
    "Your research has the power to transform understanding in your field.",
    "Every paragraph you write brings new knowledge into the world.",
    "Your unique perspective is what makes your research valuable.",
    "The world needs your research voice—keep writing!",
    "Behind every great discovery is a well-written research paper.",
    "Your writing today creates the foundation for tomorrow's breakthroughs.",
    "The clarity of your writing reflects the clarity of your thinking.",
    "Your research journey matters—each word brings you closer to your goal."
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wand2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Writing Assistant</h1>
            <p className="text-blue-100">
              Your personal writing coach for powerful academic expression
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">✍️ Empowering Your Academic Voice</h3>
          <p className="text-sm text-blue-100">
            Craft compelling, persuasive academic prose that showcases your unique insights. Our AI tools help you 
            develop your scholarly voice while maintaining academic rigor and integrity.
          </p>
        </div>
      </div>

      {/* Motivational Banner */}
      {showMotivation && (
        <div className="relative bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl p-6 text-white animate-pulse-soft">
          <button 
            onClick={() => setShowMotivation(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            ×
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <p className="text-lg font-medium">{randomQuote}</p>
              <p className="text-sm text-white/80 mt-1">
                Your research matters. Write with passion and purpose.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
          {[
            { id: 'editor', label: 'Writing Editor', icon: FileText },
            { id: 'outline', label: 'Thesis Outline', icon: Target },
            { id: 'citations', label: 'Citation Manager', icon: BookOpen },
            { id: 'coach', label: 'Writing Coach', icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI-Powered Writing Editor
              </h2>
              <select
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="general">General Writing</option>
                <option value="introduction">Introduction</option>
                <option value="literature-review">Literature Review</option>
                <option value="methodology">Methodology</option>
                <option value="conclusion">Conclusion</option>
              </select>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <AIWritingAssistant 
                content={editorContent} 
                onContentChange={setEditorContent} 
                sectionType={sectionType}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="text-blue-600 dark:text-blue-400" size={16} />
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">Paragraph Builder</h3>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Craft powerful paragraphs that express your unique insights with clarity and impact.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2 mb-2">
                  <Link2 className="text-purple-600 dark:text-purple-400" size={16} />
                  <h3 className="font-medium text-purple-900 dark:text-purple-100">Transition Helper</h3>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Create seamless flow between ideas, guiding your reader through your scholarly narrative.
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg transform hover:scale-105 transition-transform">
                <div className="flex items-center space-x-2 mb-2">
                  <Quote className="text-orange-600 dark:text-orange-400" size={16} />
                  <h3 className="font-medium text-orange-900 dark:text-orange-100">Paraphrasing Tool</h3>
                </div>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Transform ideas into your authentic voice while maintaining academic integrity.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="text-green-600 dark:text-green-400" size={16} />
                <h3 className="font-medium text-green-800 dark:text-green-200">Your Writing Matters</h3>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Remember that your research has the potential to create meaningful change. As you write, consider:
              </p>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Who will benefit from your discoveries?</li>
                <li>• What unique perspective do you bring to this topic?</li>
                <li>• How might your work inspire future researchers?</li>
                <li>• What passion drove you to choose this research area?</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'outline' && (
          <ThesisOutlineGenerator 
            researchTopic="AI-powered microlearning"
            researchField="educational technology"
          />
        )}

        {activeTab === 'citations' && (
          <CitationManager onCitationInsert={handleCitationInsert} />
        )}

        {activeTab === 'coach' && (
          <WritingCoach />
        )}
      </div>

      {/* Writing Progress Celebration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Award className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Writing Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Celebrate your progress and academic growth
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Star className="text-yellow-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Writing Streak</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">3 Days</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep the momentum going! Consistent writing builds academic excellence.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FileText className="text-blue-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Words Written</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2,450</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each word brings you closer to sharing your valuable insights with the world.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Sparkles className="text-orange-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Writing Quality</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">Excellent</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your academic voice is developing beautifully. Keep refining your unique perspective!
            </p>
          </div>
        </div>
      </div>

      {/* Critical Thinking Prompts */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Zap className="mr-2" size={24} />
          Critical Thinking Power-Ups
        </h2>
        <p className="mb-6 text-indigo-100">
          Elevate your academic writing with these thought-provoking questions that deepen your analysis and strengthen your arguments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
            <h3 className="font-semibold mb-2">Deepen Your Analysis</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>What are the unspoken assumptions in this argument?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>How might someone from a different discipline view this issue?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>What alternative interpretations exist for this evidence?</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
            <h3 className="font-semibold mb-2">Strengthen Your Arguments</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>What is the strongest counter-argument to my position?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>How does my research address a meaningful gap or problem?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>What evidence would make my argument more compelling?</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
            <h3 className="font-semibold mb-2">Establish Your Authority</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>How can I more clearly distinguish my voice from cited sources?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>Where can I more confidently assert my unique perspective?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>How does my work build upon and extend existing knowledge?</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
            <h3 className="font-semibold mb-2">Connect to Broader Impact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>Who will benefit from this research and how?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>What practical applications might emerge from this work?</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-300 mr-2">•</span>
                <span>How does this research contribute to addressing real-world challenges?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWritingAssistantPage;
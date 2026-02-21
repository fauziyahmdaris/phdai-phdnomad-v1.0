import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, ArrowRight, Brain, Search, Grid3X3, PenTool, Bot, Users, Target, Award, Map, Rocket, Compass, Sparkles, FileText, MessageSquare, Share2, BarChart3, Download, Smartphone, ShoppingBag, Globe } from 'lucide-react';

const UserGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const guideSteps = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      description: 'Learn the basics of DrPhDAI',
      content: {
        overview: 'Welcome to DrPhDAI! This comprehensive guide will walk you through every feature of the platform.',
        steps: [
          'Create your account and complete the onboarding process',
          'Set up your first research project with title, objectives, and research area',
          'Familiarize yourself with the dashboard and navigation',
          'Explore the core research tools and new features available'
        ],
        tips: [
          'Take your time with the project setup - it forms the foundation of your research',
          'Use the Interactive Research Starter Kit if you\'re unsure about your research direction',
          'Try the new Research Pathfinder for a guided approach to developing your research proposal',
          'The dashboard provides a quick overview of your progress and recent activities'
        ]
      }
    },
    {
      id: 'collaborative-research',
      title: 'Collaborative Research',
      icon: Share2,
      description: 'Work together with research teams',
      content: {
        overview: 'Our NEW Collaborative Research feature allows multiple researchers to work together on the same project, perfect for team-based research and supervisor-student collaboration.',
        steps: [
          'Access the Collaborative Research section from the sidebar',
          'Invite collaborators via email with specific permission levels (viewer, editor, admin)',
          'Share your project with others using customizable share links',
          'Track recent activity from all collaborators on your project',
          'Add comments and discussions to specific research elements',
          'Manage permissions and access for all team members'
        ],
        tips: [
          'Assign appropriate permission levels based on collaborator roles',
          'Use the activity feed to stay updated on team contributions',
          'Share specific sections with supervisors for targeted feedback',
          'Coordinate with team members to avoid conflicting changes',
          'Regular communication improves collaborative research outcomes'
        ]
      }
    },
    {
      id: 'literature-recommendations',
      title: 'AI Literature Recommendations',
      icon: Sparkles,
      description: 'Get personalized paper suggestions',
      content: {
        overview: 'Our NEW AI-Powered Literature Recommendations feature analyzes your research focus and existing literature to suggest highly relevant papers for your research.',
        steps: [
          'Access Literature Recommendations from the sidebar',
          'Review AI-suggested papers based on your research profile',
          'Filter recommendations by relevance score, publication year, and keywords',
          'View paper details including abstracts and relevance explanations',
          'Access papers directly through provided links',
          'Save recommended papers to your literature matrix'
        ],
        tips: [
          'Adjust filters to discover different types of relevant literature',
          'Pay attention to the "Why we recommend this" section for context',
          'Use the Research Insights panel to identify trending topics and key researchers',
          'Regularly refresh recommendations as your research evolves',
          'Combine AI recommendations with traditional search methods for comprehensive coverage'
        ]
      }
    },
    {
      id: 'progress-analytics',
      title: 'Progress Analytics Dashboard',
      icon: BarChart3,
      description: 'Track your research journey',
      content: {
        overview: 'Our NEW Progress Analytics Dashboard provides comprehensive insights into your research progress, time investment, and achievements.',
        steps: [
          'Access the Progress Analytics Dashboard from the sidebar',
          'View overall research progress statistics and trends',
          'Analyze your literature review progress and distribution',
          'Track writing progress including word count and quality metrics',
          'Monitor your learning achievements and module completion',
          'Export analytics in multiple formats for reporting'
        ],
        tips: [
          'Use the time range selector to view progress over different periods',
          'Switch between tabs to focus on specific aspects of your research',
          'Set goals based on analytics insights to improve productivity',
          'Share progress reports with supervisors to demonstrate advancement',
          'Identify patterns in your research activity to optimize your workflow'
        ]
      }
    },
    {
      id: 'export-options',
      title: 'Enhanced Export Options',
      icon: Download,
      description: 'Export your research in multiple formats',
      content: {
        overview: 'Our NEW Enhanced Export Options allow you to export your research in multiple formats including PDF, Word, LaTeX, and Markdown with customizable settings.',
        steps: [
          'Access Export Options from the sidebar',
          'Choose your preferred export format (PDF, DOCX, LaTeX, Markdown)',
          'Select the content you want to include in your export',
          'Choose citation style and format-specific options',
          'Generate and download your export file',
          'Integrate with reference management tools like Zotero and Mendeley'
        ],
        tips: [
          'Use PDF for sharing final documents with supervisors',
          'Choose DOCX for collaborative editing with colleagues',
          'Export to LaTeX for academic publishing preparation',
          'Use Markdown for version control and web publishing',
          'Customize format-specific options for optimal results',
          'Export regularly to maintain backups of your research'
        ]
      }
    },
    {
      id: 'mobile-app',
      title: 'Mobile App (Coming Soon)',
      icon: Smartphone,
      description: 'Research on the go',
      content: {
        overview: 'Our upcoming Mobile App will provide enhanced offline capabilities, push notifications, and a seamless research experience optimized for smartphones and tablets.',
        steps: [
          'Sign up for early access or launch notifications',
          'Download the app from iOS App Store or Google Play Store when available',
          'Log in with your existing DrPhDAI account',
          'Access your research projects and literature on the go',
          'Receive smart notifications for research milestones',
          'Work offline and sync when connected'
        ],
        tips: [
          'Enable notifications to stay updated on research progress',
          'Download content for offline access before traveling',
          'Use the mobile app for quick literature reviews on the go',
          'Capture research ideas whenever inspiration strikes',
          'Sync regularly to ensure your data is backed up',
          'Provide feedback during beta testing to help improve the app'
        ]
      }
    },
    {
      id: 'personalized-learning',
      title: 'Personalized Learning Paths',
      icon: Compass,
      description: 'Customized learning journeys',
      content: {
        overview: 'Our NEW Personalized Learning Paths feature creates customized learning journeys based on your research needs, interests, and behavior.',
        steps: [
          'Access Personalized Learning from the sidebar',
          'Set up your learning profile with research interests',
          'Explore AI-recommended learning paths tailored to your needs',
          'View recommended modules based on your research progress',
          'Track your learning achievements and progress',
          'Complete modules to earn badges and certifications'
        ],
        tips: [
          'Update your interests regularly to keep recommendations relevant',
          'Follow the recommended sequence for optimal learning progression',
          'Balance different learning paths to develop well-rounded skills',
          'Set aside dedicated time for microlearning sessions',
          'Apply what you learn immediately to your research for better retention',
          'Track your achievements to stay motivated'
        ]
      }
    },
    {
      id: 'free-resources',
      title: 'Free Resources',
      icon: BookOpen,
      description: 'Access free eBooks and materials',
      content: {
        overview: 'Our NEW Free Resources section provides access to a curated collection of eBooks and research materials to support your academic journey.',
        steps: [
          'Access the Free Resources section from the sidebar',
          'Browse the collection of eBooks by category',
          'Use the search function to find specific topics',
          'Click on any eBook to view details and description',
          'Download eBooks directly to your device',
          'Share valuable resources with your colleagues'
        ],
        tips: [
          'Check back regularly for new additions to the library',
          'Use the category filters to find relevant resources quickly',
          'Download resources for offline reading during travel',
          'Apply the knowledge from these resources directly to your research',
          'Provide feedback on resources that you find particularly helpful',
          'Suggest topics for future eBooks and resources'
        ]
      }
    },
    {
      id: 'drphdai-store',
      title: 'DrPhDAI Store',
      icon: ShoppingBag,
      description: 'Exclusive merchandise and products',
      content: {
        overview: 'Our NEW DrPhDAI Store offers exclusive merchandise and products designed specifically for researchers and PhD students.',
        steps: [
          'Access the DrPhDAI Store from the sidebar',
          'Browse different product categories including apparel, drinkware, and stationery',
          'View product details, images, and pricing',
          'Contact our store via WhatsApp to place your order',
          'Provide shipping details and complete payment',
          'Receive your exclusive DrPhDAI merchandise'
        ],
        tips: [
          'Check the store regularly for new product releases',
          'Consider DrPhDAI merchandise as gifts for fellow researchers',
          'Your purchases help support the continued development of DrPhDAI',
          'Follow the ordering instructions carefully for smooth processing',
          'Share photos of your DrPhDAI merchandise on social media',
          'Provide feedback on products to help us improve our offerings'
        ]
      }
    },
    {
      id: 'network-community',
      title: 'Network Community',
      icon: Globe,
      description: 'Connect with fellow researchers',
      content: {
        overview: 'Our NEW Network Community feature connects you with fellow researchers through our active Telegram group, creating a supportive community of practice.',
        steps: [
          'Access the Network Community section from the sidebar',
          'Click the link to join our Telegram group',
          'Introduce yourself to the community',
          'Participate in discussions and knowledge sharing',
          'Ask questions and provide support to fellow researchers',
          'Stay updated on community events and activities'
        ],
        tips: [
          'Engage regularly to build meaningful connections',
          'Share your research challenges and successes',
          'Respect community guidelines for positive interactions',
          'Contribute your knowledge to help others',
          'Participate in community events for deeper engagement',
          'Use the community as a source of motivation and accountability'
        ]
      }
    },
    {
      id: 'research-navigator',
      title: 'Research Navigator',
      icon: Search,
      description: 'Discover and explore academic literature',
      content: {
        overview: 'The Research Navigator helps you find relevant academic papers and generate AI-powered keyword suggestions.',
        steps: [
          'Enter your research keywords in the search bar',
          'Click "Generate AI Keywords" to get intelligent suggestions based on your project',
          'Use the suggested keywords to search Google Scholar directly',
          'Explore the academic databases section for specialized searches',
          'Apply the research tips and best practices provided'
        ],
        tips: [
          'Use Boolean operators (AND, OR, NOT) to refine your searches',
          'Try different keyword combinations to discover new perspectives',
          'Set up alerts on Google Scholar to stay updated with new publications',
          'Check citation counts to identify influential papers in your field'
        ]
      }
    },
    {
      id: 'literature-matrix',
      title: 'Literature Matrix',
      icon: Grid3X3,
      description: 'Organize and analyze research papers',
      content: {
        overview: 'The Literature Matrix is your central hub for organizing research papers with AI-powered analysis.',
        steps: [
          'Click "Add Literature" to open the entry form',
          'Fill in paper details: title, authors, year, journal, and abstract',
          'Click "Analyze & Add to Matrix" to let AI extract key insights',
          'Review the AI-generated analysis including research gaps, findings, and methodology',
          'Use filters and sorting to organize your entries',
          'Export your matrix as CSV for external use'
        ],
        tips: [
          'Always paste the complete abstract for better AI analysis',
          'Review and refine AI-generated insights to match your understanding',
          'Use the filter function to focus on specific themes or methodologies',
          'Regular backups via CSV export ensure you never lose your work'
        ]
      }
    },
    {
      id: 'thesis-weaver',
      title: 'Thesis Weaver',
      icon: PenTool,
      description: 'Generate references and synthesize literature',
      content: {
        overview: 'Thesis Weaver helps you create reference lists and AI-powered literature syntheses.',
        steps: [
          'Select literature entries from your matrix using checkboxes',
          'Choose between "References" or "Synthesis" tab',
          'For references: Click "Generate Reference List" for APA-style citations',
          'For synthesis: Select at least 2 entries and click "Generate AI Synthesis"',
          'Review the generated content and copy or download as needed',
          'Always refine AI-generated syntheses with your own analysis'
        ],
        tips: [
          'Start with reference generation to get familiar with the tool',
          'AI synthesis works best with 3-5 related papers',
          'Use the synthesis as a starting point, not a final product',
          'Always verify and cite sources properly in your final work'
        ]
      }
    },
    {
      id: 'ai-companion',
      title: 'AI Companion',
      icon: Bot,
      description: 'Access external AI tools for research assistance',
      content: {
        overview: 'AI Companion provides direct access to ChatGPT, Perplexity, and Gemini with research-specific prompts.',
        steps: [
          'Browse the 10 AI-powered research tools available',
          'Click on any tool card to open the external AI platform',
          'Copy the provided prompt template using the copy button',
          'Paste and customize the prompt with your specific research details',
          'Replace placeholders like [TOPIC] and [FIELD] with your content',
          'Follow the suggested research workflow for best results'
        ],
        tips: [
          'You need your own accounts with ChatGPT, Perplexity, and Gemini',
          'Always verify AI outputs and maintain academic integrity',
          'Use the workflow suggestions to structure your AI interactions',
          'Combine multiple AI tools for comprehensive research assistance'
        ]
      }
    },
    {
      id: 'gap-scanner',
      title: 'Gap Scanner & Microlearning',
      icon: Target,
      description: 'Identify research gaps and access microlearning',
      content: {
        overview: 'Our revolutionary FRIN-Scanning Engine helps identify research gaps while unlocking adaptive microlearning modules.',
        steps: [
          'Upload research papers (PDF) or enter URLs/DOIs',
          'Run the FRIN Scan to detect "Future Research Is Needed" sentences',
          'Review identified research gaps with confidence scores',
          'Generate interactive Gap Maps to visualize research clusters',
          'Run Decolonization Audits to analyze reference diversity',
          'Access unlocked microlearning modules based on your discoveries'
        ],
        tips: [
          'Higher-quality PDFs yield better scanning results',
          'Combine multiple papers for more comprehensive gap analysis',
          'Use the Gap Map to identify unexplored research territories',
          'Complete microlearning modules to enhance your research skills',
          'The Decolonization Auditor helps create more inclusive research'
        ]
      }
    },
    {
      id: 'academic-consultants',
      title: 'Academic Consultants',
      icon: Users,
      description: 'Connect with expert PhD supervisors',
      content: {
        overview: 'Our Academic Consultants Marketplace connects you with verified PhD supervisors and research specialists.',
        steps: [
          'Browse consultants by expertise area, price range, and availability',
          'View detailed profiles with ratings and specializations',
          'Pay one-time access fee to unlock direct contact',
          'Book 1-on-1 sessions directly with your chosen expert',
          'Receive personalized guidance for your specific research challenges'
        ],
        tips: [
          'Filter consultants by your specific research area for best matches',
          'Read reviews from other PhD students before booking',
          'Prepare specific questions before your consultation session',
          'Consider consultants with expertise in your methodology',
          'The platform takes a 20% commission from consultants, not you'
        ]
      }
    },
    {
      id: 'mentor',
      title: 'DrPhDAI Mentor',
      icon: MessageSquare,
      description: 'Interactive AI guidance for researchers',
      content: {
        overview: 'The DrPhDAI Mentor provides personalized AI guidance for all aspects of your research journey.',
        steps: [
          'Access the DrPhDAI Mentor from the sidebar',
          'Use quick prompts or ask your own research questions',
          'Receive detailed, personalized guidance',
          'Follow up with clarifying questions',
          'Save important conversations for future reference'
        ],
        tips: [
          'Be specific about your research field and challenges',
          'Use the quick prompts to explore common research topics',
          'Ask follow-up questions to dive deeper into topics',
          'The Mentor can help with all research stages from ideation to writing',
          'Combine Mentor guidance with other DrPhDAI tools for best results'
        ]
      }
    }
  ];

  const troubleshooting = [
    {
      problem: 'AI analysis not working',
      solution: 'Ensure you\'ve pasted a complete abstract and try again. If the issue persists, check your internet connection.'
    },
    {
      problem: 'Can\'t access external AI tools',
      solution: 'You need your own accounts with ChatGPT, Perplexity, and Gemini. Create accounts on their respective platforms first.'
    },
    {
      problem: 'Literature matrix not saving',
      solution: 'Check your browser settings and ensure JavaScript is enabled. Try refreshing the page and re-entering your data.'
    },
    {
      problem: 'Export function not working',
      solution: 'Ensure your browser allows downloads. Try using a different browser or clearing your browser cache.'
    },
    {
      problem: 'Search results not relevant',
      solution: 'Refine your keywords using Boolean operators and try different combinations. Use the AI keyword generator for suggestions.'
    },
    {
      problem: 'Collaboration features not working',
      solution: 'Ensure all collaborators have active accounts. Check your internet connection and try refreshing the page.'
    }
  ];

  const newFeatures = [
    {
      title: 'Collaborative Research',
      description: 'Work together with research teams and supervisors',
      icon: Share2,
      path: '/app/collaborative-research'
    },
    {
      title: 'Literature Recommendations',
      description: 'AI-powered paper suggestions based on your research',
      icon: Sparkles,
      path: '/app/literature-recommendations'
    },
    {
      title: 'Progress Analytics',
      description: 'Detailed dashboard tracking your research journey',
      icon: BarChart3,
      path: '/app/progress-analytics'
    },
    {
      title: 'Enhanced Export Options',
      description: 'Multiple formats including PDF, DOCX, LaTeX, and Markdown',
      icon: Download,
      path: '/app/export-options'
    },
    {
      title: 'Mobile App (Coming Soon)',
      description: 'Research on the go with offline capabilities',
      icon: Smartphone,
      path: '/app/mobile-app'
    },
    {
      title: 'Personalized Learning',
      description: 'Custom learning paths based on your research needs',
      icon: Compass,
      path: '/app/personalized-learning'
    },
    {
      title: 'Free Resources',
      description: 'Access our collection of free research eBooks',
      icon: BookOpen,
      path: '/app/free-resources'
    },
    {
      title: 'DrPhDAI Store',
      description: 'Exclusive merchandise for researchers',
      icon: ShoppingBag,
      path: '/app/store'
    },
    {
      title: 'Network Community',
      description: 'Connect with fellow researchers via Telegram',
      icon: Globe,
      path: '/app/network'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI User Guide</h1>
            <p className="text-blue-100">
              Complete step-by-step guide to master all features
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📚 Everything You Need to Know</h3>
          <p className="text-sm text-blue-100">
            This comprehensive guide covers every feature of DrPhDAI, from basic navigation to advanced research techniques. 
            Follow along step-by-step to become a DrPhDAI expert!
          </p>
        </div>
      </div>

      {/* New Features Highlight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Sparkles className="mr-2 text-purple-600" size={24} />
          New Features & Updates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newFeatures.map((feature, index) => (
            <a
              key={index}
              href={feature.path}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <feature.icon className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </a>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Latest Update:</strong> July 2025 - Major platform enhancements including Collaborative Research, AI Literature Recommendations, Progress Analytics Dashboard, Enhanced Export Options, Mobile App preview, Personalized Learning Paths, Free Resources Library, DrPhDAI Store, and Network Community. All features are now fully functional and optimized for your research journey!
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Guide Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {guideSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                activeStep === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <step.icon 
                  className={`${
                    activeStep === index 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400'
                  }`} 
                  size={20} 
                />
                <h3 className={`font-medium ${
                  activeStep === index 
                    ? 'text-blue-900 dark:text-blue-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            {React.createElement(guideSteps[activeStep].icon, {
              className: "text-blue-600 dark:text-blue-400",
              size: 24
            })}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {guideSteps[activeStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {guideSteps[activeStep].description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {guideSteps[activeStep].content.overview}
            </p>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Step-by-Step Instructions</h3>
            <div className="space-y-3">
              {guideSteps[activeStep].content.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💡 Pro Tips</h3>
            <div className="space-y-2">
              {guideSteps[activeStep].content.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {activeStep < guideSteps.length - 1 ? (
            <button
              onClick={() => setActiveStep(Math.min(guideSteps.length - 1, activeStep + 1))}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setActiveStep(0)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <CheckCircle size={16} />
              <span>Start Over</span>
            </button>
          )}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          🔧 Troubleshooting
        </h2>
        
        <div className="space-y-4">
          {troubleshooting.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ❓ {item.problem}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                💡 {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Video */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">🎥 Quick Start Video</h2>
        <p className="text-green-100 mb-4">
          Watch our 5-minute tutorial to get started with DrPhDAI
        </p>
        <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center space-x-2 mx-auto">
          <Play size={20} />
          <span>Watch Tutorial</span>
        </button>
      </div>

      {/* Acknowledgment */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Special Thanks</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          DrPhDAI was built and developed with love and dedication by Qash Aris, creating the world's most empathetic AI PhD coaching platform.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          "Terima kasih for your support! Together, we're revolutionizing PhD education with empathetic AI coaching. 
          Jom, I belanja you 'teh tarik' mamak dekat Kuala Lumpur when we get into Y Combinator!" 🦉✨
        </p>
      </div>
    </div>
  );
};

export default UserGuide;
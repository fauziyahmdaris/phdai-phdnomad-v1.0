import React from 'react';
import { Users, MessageSquare, ExternalLink, Share2, Globe, BookOpen, Lightbulb, Award, Heart, Target } from 'lucide-react';

const NetworkCommunity: React.FC = () => {
  const telegramUrl = 'https://t.me/drphdai';

  const communityBenefits = [
    {
      icon: MessageSquare,
      title: 'Real-time Support',
      description: 'Get answers to your research questions from peers and experts'
    },
    {
      icon: Lightbulb,
      title: 'Knowledge Sharing',
      description: 'Exchange ideas, resources, and insights with fellow researchers'
    },
    {
      icon: Target,
      title: 'Accountability',
      description: 'Stay motivated with community check-ins and progress sharing'
    },
    {
      icon: Award,
      title: 'Celebrate Milestones',
      description: 'Share your achievements and celebrate with supportive peers'
    },
    {
      icon: Heart,
      title: 'Emotional Support',
      description: 'Navigate the challenges of PhD research with understanding companions'
    },
    {
      icon: Globe,
      title: 'Global Perspectives',
      description: 'Connect with researchers from diverse backgrounds and disciplines'
    }
  ];

  const communityGuidelines = [
    'Be respectful and supportive of all community members',
    'Share knowledge generously but respect intellectual property',
    'Keep discussions focused on research and academic topics',
    'Provide constructive feedback when asked',
    'Respect privacy and confidentiality of shared information',
    'Celebrate the successes of others as enthusiastically as your own'
  ];

  const upcomingEvents = [
    {
      title: 'Literature Review Masterclass',
      date: 'July 15, 2025',
      description: 'Live session on advanced literature review techniques with Q&A'
    },
    {
      title: 'Research Methodology Workshop',
      date: 'August 5, 2025',
      description: 'Interactive workshop on selecting appropriate research methods'
    },
    {
      title: 'Academic Writing Clinic',
      date: 'September 10, 2025',
      description: 'Get feedback on your writing and learn improvement strategies'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI Network Community</h1>
            <p className="text-indigo-100">
              Connect, collaborate, and grow with fellow researchers
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">🌐 Join Our Research Community</h3>
          <p className="text-sm text-indigo-100">
            Connect with fellow postgraduate researchers, share insights, ask questions, and celebrate your milestones 
            in a supportive and engaging environment. Our vibrant DrPhDAI Network is your go-to space for peer support 
            and collaborative learning.
          </p>
        </div>
      </div>

      {/* Telegram Community */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Telegram Community
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're building a vibrant community of researchers and PhD students who support each other through the academic journey. 
              Our active Telegram group is the perfect place to ask questions, share resources, and connect with peers facing similar challenges.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Click the "Join Telegram Group" button below
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Introduce yourself to the community
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Start engaging with fellow researchers
                </p>
              </div>
            </div>
            
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare size={20} />
              <span>Join Telegram Group</span>
              <ExternalLink size={16} />
            </a>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">LR Bootcamp</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Official DrPhDAI Community</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <span className="font-medium">DrPhDAI:</span> Welcome to our community! This is a space for researchers to connect, share insights, and support each other.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <span className="font-medium">Sarah:</span> Just submitted my literature review chapter! Thanks everyone for the support and feedback.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <span className="font-medium">Ahmed:</span> Has anyone used the FRIN Scanner for identifying research gaps? I'd love to hear your experiences!
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-1"
                >
                  <span>Join the conversation</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Benefits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Benefits of Joining Our Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityBenefits.map((benefit, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <benefit.icon className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Community Guidelines
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          To ensure our community remains supportive, productive, and welcoming for all members, we ask everyone to follow these guidelines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityGuidelines.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-gray-700 dark:text-gray-300">{guideline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Upcoming Community Events
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                {event.date}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {event.description}
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <span>Learn more</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Future Plans */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Growing Our Community</h2>
        <p className="text-purple-100 mb-4 max-w-3xl mx-auto">
          As our community grows, we plan to expand with more features including dedicated forums, 
          research collaboration tools, mentorship programs, and exclusive webinars. 
          Join us now to be part of this exciting journey!
        </p>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          <Share2 size={20} />
          <span>Join Our Community Today</span>
        </a>
      </div>
    </div>
  );
};

export default NetworkCommunity;
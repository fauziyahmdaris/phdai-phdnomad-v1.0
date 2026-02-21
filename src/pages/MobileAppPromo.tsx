import React, { useState } from 'react';
import { Smartphone, Download, Bell, Wifi, WifiOff, Zap, Shield, QrCode, ArrowRight, CheckCircle } from 'lucide-react';

const MobileAppPromo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleNotifyMe = () => {
    if (email && email.includes('@')) {
      setNotificationSent(true);
      setTimeout(() => setNotificationSent(false), 3000);
      setEmail('');
    }
  };

  const appFeatures = [
    {
      icon: WifiOff,
      title: 'Offline Access',
      description: 'Continue your research even without internet connection'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get reminders for research milestones and deadlines'
    },
    {
      icon: Zap,
      title: 'Faster Performance',
      description: 'Native app experience with optimized performance'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Biometric authentication and secure data storage'
    }
  ];

  const screenshots = [
    {
      title: 'Dashboard',
      image: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Track your research progress at a glance'
    },
    {
      title: 'Literature Matrix',
      image: 'https://images.pexels.com/photos/6804601/pexels-photo-6804601.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Manage your literature entries on the go'
    },
    {
      title: 'Microlearning',
      image: 'https://images.pexels.com/photos/6804069/pexels-photo-6804069.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Learn in bite-sized modules anywhere, anytime'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Smartphone size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI Mobile App</h1>
            <p className="text-blue-100">
              Coming Soon: Research on the go with our dedicated mobile app
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📱 Mobile-First Research Experience</h3>
          <p className="text-sm text-blue-100">
            Our upcoming mobile app will provide enhanced offline capabilities, push notifications, 
            and a seamless research experience optimized for smartphones and tablets.
          </p>
        </div>
      </div>

      {/* App Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Research Anywhere, Anytime
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The DrPhDAI mobile app brings the power of AI-assisted research to your pocket. 
              Whether you're in the library, at a conference, or commuting, keep your research 
              progress moving forward with our intuitive mobile experience.
            </p>
            
            <div className="space-y-4 mb-6">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mt-1">
                    <feature.icon className="text-blue-600 dark:text-blue-400" size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Get Notified When We Launch
              </h3>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleNotifyMe}
                  disabled={!email.includes('@')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {notificationSent ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Sent!</span>
                    </>
                  ) : (
                    <>
                      <Bell size={16} />
                      <span>Notify Me</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                We'll email you when the mobile app is available for download.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-[500px] bg-gray-900 rounded-[40px] p-4 border-[14px] border-gray-800 shadow-xl">
                <div className="w-full h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-[24px] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-black/20 flex items-center justify-center">
                    <div className="w-20 h-6 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="pt-12 px-4 text-white">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="p-1 bg-white/20 rounded-lg">
                        <Brain className="text-white" size={16} />
                      </div>
                      <span className="font-bold">DrPhDAI</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-4">Research Dashboard</h3>
                    
                    <div className="bg-white/10 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Literature Review</span>
                        <span className="text-xs">65%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Methodology</span>
                        <span className="text-xs">40%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-bold mb-2 mt-4">Recent Activity</h3>
                    
                    <div className="space-y-2">
                      <div className="bg-white/10 rounded-lg p-2 text-xs">
                        Added new literature entry
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 text-xs">
                        Completed microlearning module
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 text-xs">
                        Generated literature synthesis
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-around">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Home size={20} />
                        </div>
                        <div className="p-2 bg-white/10 rounded-lg">
                          <BookOpen size={20} />
                        </div>
                        <div className="p-2 bg-white/10 rounded-lg">
                          <PenTool size={20} />
                        </div>
                        <div className="p-2 bg-white/10 rounded-lg">
                          <User size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phone Shadow */}
              <div className="absolute -bottom-4 left-8 right-8 h-4 bg-black/20 blur-md rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* App Screenshots */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          App Preview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              <img 
                src={screenshot.image} 
                alt={screenshot.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {screenshot.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {screenshot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Download Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Download className="mr-2 text-blue-600" size={20} />
              Get Early Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join our beta testing program and be among the first to experience the DrPhDAI mobile app.
            </p>
            <button
              onClick={() => setShowQRCode(!showQRCode)}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <QrCode size={16} />
              <span>{showQRCode ? 'Hide QR Code' : 'Show QR Code'}</span>
            </button>
            
            {showQRCode && (
              <div className="mt-4 p-4 bg-white rounded-lg flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-2">
                  {/* Placeholder for QR code */}
                  <QrCode size={120} className="text-gray-800" />
                </div>
                <p className="text-sm text-gray-600">
                  Scan to join beta program
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Bell className="mr-2 text-purple-600" size={20} />
              Launch Notification
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get notified as soon as the app is available on app stores.
            </p>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleNotifyMe}
                disabled={!email.includes('@')}
                className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {notificationSent ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <ArrowRight size={16} />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Development Timeline
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600"></div>
          
          <div className="space-y-8 ml-12">
            <div className="relative">
              <div className="absolute -left-12 mt-1.5 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Design Phase</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Completed: UI/UX design, user flow mapping, and feature prioritization
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  May 2025
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 mt-1.5 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Development Phase</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  In Progress: Core functionality development, API integration, and offline capabilities
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  June - August 2025
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 mt-1.5 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Beta Testing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Upcoming: Limited beta release for testing and feedback collection
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  September 2025
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-12 mt-1.5 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Public Launch</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Upcoming: Official release on iOS App Store and Google Play Store
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Q4 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// These icons are needed for the mobile app mockup
const Home = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const User = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Brain = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const BookOpen = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const PenTool = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19 7-7 3 3-7 7-3-3z"></path>
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="m2 2 7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

export default MobileAppPromo;
import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  
  Search, 
  Grid3X3, 
  PenTool, 
  Bot, 
  Zap, 
  HelpCircle, 
  Cloud, 
  MessageSquare,
  Rocket,
  Target,
  Award,
  Settings,
  Coffee,
  Users,
  FileText,
  GraduationCap,
  Edit3,
  Map,
  Download,
  BarChart3,
  Smartphone,
  Share2,
  BookOpen,
  ShoppingBag,
  Globe,
  TreePine
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import OwlIcon from '@/components/icons/OwlIcon';

const QuickMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto open on desktop when hovering the left edge (hotspot)
  const openOnHover = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setIsOpen(true);
    }
  };

  const menuItems = [
    {
      category: 'Core Research Tools',
      items: [
        { name: 'PhD Starter', href: '/starter-kit', icon: Rocket, description: 'Guided setup for beginners' },
        { name: 'Dashboard', href: '/app', icon: OwlIcon, description: 'Research overview & progress' },
        { name: 'Research Navigator', href: '/app/navigator', icon: Search, description: 'Find academic literature' },
        { name: 'Literature Matrix', href: '/app/matrix', icon: Grid3X3, description: 'Organize research papers' },
        { name: 'Thesis Weaver', href: '/app/thesis-weaver', icon: PenTool, description: 'Generate references & synthesis' },
        { name: 'AI Companion', href: '/app/ai-companion', icon: Bot, description: 'AI research assistance' },
      ]
    },
    {
      category: 'AI Research Tools',
      items: [
        { name: 'Research Pathfinder', href: '/app/pathfinder', icon: Map, description: 'Interactive PhD proposal builder', highlight: true },
        { name: 'Gap Scanner & Microlearning', href: '/app/gap-scanner', icon: Search, description: 'FRIN-Scanning Engine with AI-powered microlearning', highlight: true },
        { name: 'Writing Tools', href: '/app/writing-tools', icon: FileText, description: 'PhD research proposal writing assistant', highlight: true },
        { name: 'AI Writing Assistant', href: '/app/ai-writing-assistant', icon: Edit3, description: 'Advanced AI-powered academic writing tools', highlight: true },
        { name: 'Microlearning Platform', href: '/app/microlearning', icon: GraduationCap, description: 'AI-powered adaptive learning modules', highlight: true },
        { name: 'Top AI Tools', href: '/app/ai-tools', icon: Zap, description: '15+ AI research tools' },
        { name: 'Research Journals', href: '/app/research-journals', icon: BookOpen, description: 'Find publication venues' },
        { name: 'DrPhDAI Mentor', href: '/app/mentor', icon: OwlIcon, description: 'Interactive AI guidance' },
        { name: 'Academic Consultants', href: '/app/consultants', icon: Users, description: 'Expert PhD supervisors & specialists', highlight: true },
      ]
    },
    {
      category: 'Collaborative Features',
      items: [
        { name: 'Collaborative Research', href: '/app/collaborative-research', icon: Share2, description: 'Work with research teams', highlight: true },
        { name: 'Literature Recommendations', href: '/app/literature-recommendations', icon: Zap, description: 'AI-powered paper suggestions', highlight: true },
        { name: 'Progress Analytics', href: '/app/progress-analytics', icon: BarChart3, description: 'Research progress dashboard', highlight: true },
        { name: 'Export Options', href: '/app/export-options', icon: Download, description: 'Multiple export formats', highlight: true },
        { name: 'Mobile App (Coming Soon)', href: '/app/mobile-app', icon: Smartphone, description: 'Research on the go', highlight: true },
        { name: 'Personalized Learning', href: '/app/personalized-learning', icon: Target, description: 'Custom learning paths', highlight: true },
      ]
    },
    {
      category: 'Community & Resources',
      items: [
        { name: 'R.O.O.T', href: '/app/root', icon: TreePine, description: 'Research Outline & Organizational Tool', highlight: true },
        { name: 'Free Resources', href: '/app/free-resources', icon: BookOpen, description: 'Free eBooks collection', highlight: true },
        { name: 'University Announcements', href: '/app/announcements', icon: GraduationCap, description: 'Postgraduate admissions & programme updates', highlight: true },
        { name: 'DrPhDAI Store', href: '/app/store', icon: ShoppingBag, description: 'Exclusive merchandise', highlight: true },
        { name: 'Network Community', href: '/app/network', icon: Globe, description: 'Connect with researchers', highlight: true },
        { name: 'User Guide', href: '/app/user-guide', icon: HelpCircle, description: 'Complete feature guide' },
        { name: 'Help & Support', href: '/app/help-support', icon: MessageSquare, description: 'Get assistance' },
      ]
    },
    {
      category: 'Integrations & More',
      items: [
        { name: 'Google Drive', href: '/app/google-drive', icon: Cloud, description: 'Cloud file management' },
        { name: 'Goals & Milestones', href: '#', icon: Target, description: 'Track research progress' },
        { name: 'Certifications', href: '/app/certifications', icon: Award, description: 'Academic achievements' },
        { name: 'Settings', href: '/app/settings', icon: Settings, description: 'Account preferences' },
      ]
    }
  ];

  const supportItem = {
    name: 'Buy Me a Coffee ☕',
    href: 'https://buymeacoffee.com/qasharis',
    icon: Coffee,
    description: 'Support development + Get FREE "F1 DRPHD Templates" by Qash Aris!'
  };

  return (
    <>
      {/* Desktop hover hotspot (lg+) */}
      <div
        className="hidden lg:block fixed left-0 top-0 h-full w-2 z-30"
        onMouseEnter={openOnHover}
        aria-hidden
      />

      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 lg:top-1/2 lg:-translate-y-1/2 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Quick Menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img 
              src="/1-QASH ARIS_Profile Photo.png" 
              alt="Qash Aris - DrPhDAI Founder" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">DrPhDAI</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your AI PhD Coach</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4 overscroll-contain pb-24">
          <div className="space-y-6">
            {menuItems.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center p-3 rounded-lg transition-colors relative ${
                          isActive
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${item.highlight ? 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700' : ''}`
                      }
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <item.icon size={18} className={item.highlight ? 'text-purple-600 dark:text-purple-400' : ''} />
                        <div>
                          <div className={`text-sm font-medium ${item.highlight ? 'font-semibold' : ''}`}>{item.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      {item.highlight && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}

            {/* Support Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
  Support Development
</h3>
              <a
                href={supportItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center w-full p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <supportItem.icon size={18} />
                  <div>
                    <div className="text-sm font-medium">{supportItem.name}</div>
                    <div className="text-xs text-orange-100">
                      {supportItem.description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              World's first AI-powered and AI-empowered coaching and PhD guidance platform
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              by Fauziyah Md Aris aka Qash Aris
            </p>
            <div className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
              <p className="text-xs text-white font-medium">🎓 AI-Powered Microlearning Active</p>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuickMenu;
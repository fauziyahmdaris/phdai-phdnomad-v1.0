import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, LineChart, Clock, Target, Award, Calendar, ArrowUp, ArrowDown, Zap, BookOpen, FileText, Search, Download, AlertCircle, RefreshCw } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';
import { useProject } from '../contexts/ProjectContext';

const ProgressAnalytics: React.FC = () => {
  const { currentProject, literatureEntries } = useProject();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'literature' | 'writing' | 'learning'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful data loading
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading analytics data:", error);
        setIsLoading(false);
        setHasError(true);
      }
    };
    
    loadData();
  }, [timeRange, activeTab]);

  // Mock data for analytics
  const overviewStats = [
    {
      name: 'Research Progress',
      value: '68%',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      name: 'Literature Entries',
      value: literatureEntries.length.toString(),
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      name: 'Time Invested',
      value: '42h',
      change: '+8h',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      name: 'Achievements',
      value: '7',
      change: '+2',
      trend: 'up',
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900'
    }
  ];

  const moduleProgress = [
    { name: 'Literature Review', progress: 85, color: 'bg-blue-600' },
    { name: 'Research Methodology', progress: 60, color: 'bg-green-600' },
    { name: 'Thesis Writing', progress: 45, color: 'bg-purple-600' },
    { name: 'Data Analysis', progress: 30, color: 'bg-orange-600' },
    { name: 'Research Ethics', progress: 75, color: 'bg-red-600' }
  ];

  const timeDistribution = [
    { activity: 'Literature Matrix', hours: 18, percentage: 42, color: 'bg-blue-600' },
    { activity: 'Thesis Weaver', hours: 12, percentage: 28, color: 'bg-green-600' },
    { activity: 'AI Companion', hours: 6, percentage: 14, color: 'bg-purple-600' },
    { activity: 'Microlearning', hours: 4, percentage: 10, color: 'bg-orange-600' },
    { activity: 'Other Features', hours: 2, percentage: 6, color: 'bg-gray-600' }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 0.5 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 2.2 },
    { day: 'Sun', hours: 1.0 }
  ];

  const achievements = [
    { 
      name: 'Literature Master', 
      description: 'Added 10+ literature entries with AI analysis', 
      date: '2 days ago',
      icon: BookOpen,
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
    },
    { 
      name: 'Gap Hunter', 
      description: 'Identified 5 research gaps using FRIN Scanner', 
      date: '1 week ago',
      icon: Search,
      color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
    },
    { 
      name: 'Microlearning Champion', 
      description: 'Completed all modules in "Mastering the Literature Review"', 
      date: '2 weeks ago',
      icon: OwlIcon,
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
    },
    { 
      name: 'Thesis Architect', 
      description: 'Created a complete thesis outline with all chapters', 
      date: '3 weeks ago',
      icon: FileText,
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
    }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <div className={`flex items-center mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span className="text-xs font-medium ml-1">{stat.change} this {timeRange}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Module Progress
        </h2>
        <div className="space-y-4">
          {moduleProgress.map((module) => (
            <div key={module.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{module.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${module.color}`} 
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock size={20} className="mr-2 text-blue-600" />
            Time Distribution
          </h2>
          <div className="space-y-4">
            {timeDistribution.map((item) => (
              <div key={item.activity}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.activity}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.hours}h ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar size={20} className="mr-2 text-green-600" />
            Weekly Activity
          </h2>
          <div className="h-64 flex items-end justify-between">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-col items-center">
                <div 
                  className="w-10 bg-blue-600 rounded-t-lg" 
                  style={{ height: `${day.hours * 15}px` }}
                ></div>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{day.day}</div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">{day.hours}h</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award size={20} className="mr-2 text-yellow-600" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className={`p-3 rounded-lg ${achievement.color}`}>
                <achievement.icon size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{achievement.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLiteratureTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Literature Review Analytics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Total Entries</h3>
              <span className="text-2xl font-bold text-blue-600">{literatureEntries.length}</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {literatureEntries.length > 0 ? 'Great progress on your literature collection!' : 'Start adding literature entries to your matrix'}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-green-900 dark:text-green-100">AI Analyzed</h3>
              <span className="text-2xl font-bold text-green-600">
                {literatureEntries.filter(e => e.researchGap).length}/{literatureEntries.length}
              </span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              {literatureEntries.filter(e => e.researchGap).length === literatureEntries.length 
                ? 'All entries have been analyzed by AI' 
                : 'Some entries need AI analysis'}
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900 dark:text-purple-100">Research Gaps</h3>
              <span className="text-2xl font-bold text-purple-600">
                {literatureEntries.filter(e => e.researchGap?.includes('gap')).length}
              </span>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Identified research gaps from your literature
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Literature Entry Timeline</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-end justify-between">
            {/* Mock timeline chart */}
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '40px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '60px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '30px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '80px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '120px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '90px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '150px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '100px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '70px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '110px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '130px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '90px' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Literature by Year
          </h2>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            {/* Mock year distribution chart */}
            <div className="h-full flex items-end justify-between">
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '30px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2019</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '50px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2020</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '80px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2021</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '120px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2022</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '180px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2023</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-blue-600 rounded-t-lg" style={{ height: '150px' }}></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">2024</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Literature by Type
          </h2>
          <div className="h-64 flex items-center justify-center">
            {/* Mock pie chart */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-blue-600" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-600" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-purple-600" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-orange-600" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)' }}></div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Journal Articles (45%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Conference Papers (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Books/Chapters (15%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Other Sources (15%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWritingTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Writing Progress Analytics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Words Written</h3>
              <span className="text-2xl font-bold text-blue-600">12,450</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              +2,300 words this month
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-green-900 dark:text-green-100">Writing Sessions</h3>
              <span className="text-2xl font-bold text-green-600">28</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Average 45 minutes per session
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900 dark:text-purple-100">Writing Streak</h3>
              <span className="text-2xl font-bold text-purple-600">5 days</span>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Your longest streak: 12 days
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Daily Word Count</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-end justify-between">
            {/* Mock word count chart */}
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '120px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '80px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '40px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '160px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '60px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '100px' }}></div>
            <div className="w-8 bg-blue-600 rounded-t-lg" style={{ height: '140px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
            <div className="w-8 bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{ height: '20px' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Chapter Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 1: Introduction</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 2: Literature Review</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">70%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 3: Methodology</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">60%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 4: Results</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 5: Discussion</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">10%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter 6: Conclusion</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">5%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Writing Quality Metrics
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Voice</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">85/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Critical Analysis</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">78/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Argument Coherence</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">82/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Citation Integration</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">90/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLearningTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Microlearning Progress
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Modules Completed</h3>
              <span className="text-2xl font-bold text-blue-600">4/8</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              50% of all modules completed
            </p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-green-900 dark:text-green-100">Learning Time</h3>
              <span className="text-2xl font-bold text-green-600">3.5h</span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Total time spent on microlearning
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-purple-900 dark:text-purple-100">Badges Earned</h3>
              <span className="text-2xl font-bold text-purple-600">5</span>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Earned through module completion
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="font-medium text-gray-900 dark:text-white">Module Completion</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mastering the Literature Review</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">100%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Crafting Your Thesis Introduction</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">75%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Research Methodology Fundamentals</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">60%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Writing Excellence</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">40%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Critical Analysis Techniques</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">25%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Research Ethics & Integrity</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">0%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Learning Mode Preferences
          </h2>
          <div className="h-64 flex items-center justify-center">
            {/* Mock pie chart */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-blue-600" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-600" style={{ clipPath: 'polygon(50% 50%, 50% 0, 0 0, 0 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-purple-600" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-orange-600" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)' }}></div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Text Mode (45%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Podcast Mode (25%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Interactive Mode (20%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Offline Mode (10%)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Learning Achievements
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Award className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Literature Review Master</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed all modules in the Literature Review course</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Zap className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Learning Streak</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed learning activities for 7 consecutive days</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <OwlIcon size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Knowledge Explorer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Engaged with all available learning modes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg opacity-50">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <BookOpen className="text-yellow-600 dark:text-yellow-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Thesis Introduction Expert</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Complete all modules in Thesis Introduction (In Progress)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Progress Analytics Dashboard</h1>
            <p className="text-blue-100">
              Comprehensive insights into your research journey
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📊 Data-Driven Research</h3>
          <p className="text-sm text-blue-100">
            Track your progress, analyze your research patterns, and identify opportunities for improvement. 
            Our detailed analytics help you understand where you're excelling and where to focus next.
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'week', label: 'This Week' },
              { id: 'month', label: 'This Month' },
              { id: 'year', label: 'This Year' }
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id as any)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  timeRange === range.id
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'literature', label: 'Literature', icon: BookOpen },
              { id: 'writing', label: 'Writing', icon: FileText },
              { id: 'learning', label: 'Learning', icon: OwlIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center space-x-2 ${
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
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Loading Analytics Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we gather your research insights...
          </p>
        </div>
      ) : hasError ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Unable to Load Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We encountered an issue while loading your analytics data. Please try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
          >
            <RefreshCw size={16} />
            <span>Refresh Page</span>
          </button>
        </div>
      ) : (
        <>
          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'literature' && renderLiteratureTab()}
          {activeTab === 'writing' && renderWritingTab()}
          {activeTab === 'learning' && renderLearningTab()}

          {/* Export Options */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Export Analytics
            </h2>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Export as PDF</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Export as CSV</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Export as PNG</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressAnalytics;
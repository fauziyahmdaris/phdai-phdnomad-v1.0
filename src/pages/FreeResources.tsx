import React from 'react';
import { BookOpen, Download, ExternalLink, Search, Filter } from 'lucide-react';

const FreeResources: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', 'Research Methodology', 'Literature Review', 'Academic Writing', 'Thesis Structure', 'AI Tools'];

  const ebooks = [
    {
      id: 1,
      title: 'The Ultimate Guide to Literature Reviews',
      author: 'DrPhDAI\'s Friend',
      description: 'A comprehensive guide to conducting effective literature reviews for your PhD research. Learn how to identify research gaps, organize your sources, and synthesize information effectively.',
      category: 'Literature Review',
      coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 2,
      title: 'AI-Powered Research: Tools and Techniques',
      author: 'DrPhDAI\'s Friend',
      description: 'Discover how to leverage artificial intelligence to enhance your research process. This guide covers the latest AI tools for literature analysis, data processing, and academic writing.',
      category: 'AI Tools',
      coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 3,
      title: 'Mastering Academic Writing for PhD Students',
      author: 'DrPhDAI\'s Friend',
      description: 'Improve your academic writing skills with this comprehensive guide. Learn how to structure your arguments, develop your scholarly voice, and communicate complex ideas clearly.',
      category: 'Academic Writing',
      coverImage: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 4,
      title: 'Research Methodology: A Practical Approach',
      author: 'DrPhDAI\'s Friend',
      description: 'A step-by-step guide to research methodology for postgraduate students. Covers qualitative, quantitative, and mixed methods approaches with practical examples.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 5,
      title: 'Structuring Your PhD Thesis',
      author: 'DrPhDAI\'s Friend',
      description: 'Learn how to organize your thesis effectively from introduction to conclusion. This guide provides templates, examples, and best practices for creating a cohesive and compelling thesis.',
      category: 'Thesis Structure',
      coverImage: 'https://images.pexels.com/photos/6238118/pexels-photo-6238118.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 6,
      title: 'Finding Your Research Gap: A Systematic Approach',
      author: 'DrPhDAI\'s Friend',
      description: 'Discover proven strategies for identifying meaningful research gaps in your field. This guide walks you through the process of analyzing existing literature to find your unique contribution.',
      category: 'Literature Review',
      coverImage: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 7,
      title: 'AI Tools for Literature Reviews',
      author: 'DrPhDAI\'s Friend',
      description: 'A comprehensive guide to using AI-powered tools for conducting more efficient and effective literature reviews. Learn how to leverage technology to save time and gain deeper insights.',
      category: 'AI Tools',
      coverImage: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 8,
      title: 'Qualitative Research Methods for PhD Students',
      author: 'DrPhDAI\'s Friend',
      description: 'An in-depth guide to qualitative research methods, including interviews, focus groups, case studies, and thematic analysis. Includes practical examples and ethical considerations.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/6325959/pexels-photo-6325959.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 9,
      title: 'Quantitative Research Design and Analysis',
      author: 'DrPhDAI\'s Friend',
      description: 'A comprehensive guide to designing and conducting quantitative research. Covers survey design, statistical analysis, and data visualization techniques for PhD researchers.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 10,
      title: 'Academic Publishing: From Thesis to Journal Articles',
      author: 'DrPhDAI\'s Friend',
      description: 'Learn how to transform your thesis chapters into publishable journal articles. This guide covers the entire process from selecting journals to responding to reviewer feedback.',
      category: 'Academic Writing',
      coverImage: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 11,
      title: 'Crafting Your Research Proposal',
      author: 'DrPhDAI\'s Friend',
      description: 'A step-by-step guide to writing a compelling research proposal that will impress your committee. Includes templates, examples, and common pitfalls to avoid.',
      category: 'Academic Writing',
      coverImage: 'https://images.pexels.com/photos/6238021/pexels-photo-6238021.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 12,
      title: 'Mixed Methods Research: Integrating Qualitative and Quantitative Approaches',
      author: 'DrPhDAI\'s Friend',
      description: 'Learn how to design and implement effective mixed methods research. This guide covers research design, data collection, analysis, and integration of findings.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/5428033/pexels-photo-5428033.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 13,
      title: 'Systematic Literature Reviews: A Comprehensive Guide',
      author: 'DrPhDAI\'s Friend',
      description: 'Master the art of conducting systematic literature reviews. This guide covers search strategies, inclusion/exclusion criteria, quality assessment, and synthesis methods.',
      category: 'Literature Review',
      coverImage: 'https://images.pexels.com/photos/5428163/pexels-photo-5428163.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 14,
      title: 'Navigating the PhD Journey: A Survival Guide',
      author: 'DrPhDAI\'s Friend',
      description: 'A comprehensive guide to surviving and thriving during your PhD. Covers time management, supervisor relationships, work-life balance, and overcoming common challenges.',
      category: 'Academic Writing',
      coverImage: 'https://images.pexels.com/photos/4065624/pexels-photo-4065624.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 15,
      title: 'Data Visualization for Academic Research',
      author: 'DrPhDAI\'s Friend',
      description: 'Learn how to create effective visualizations for your research data. This guide covers principles of good visualization, tool selection, and best practices for different data types.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 16,
      title: 'Ethical Considerations in Academic Research',
      author: 'DrPhDAI\'s Friend',
      description: 'A comprehensive guide to navigating ethical issues in research. Covers informed consent, data privacy, vulnerable populations, and ethical approval processes.',
      category: 'Research Methodology',
      coverImage: 'https://images.pexels.com/photos/6325901/pexels-photo-6325901.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    },
    {
      id: 17,
      title: 'Thesis Defense: Preparation and Presentation',
      author: 'DrPhDAI\'s Friend',
      description: 'Everything you need to know to prepare for and excel in your thesis defense. Includes presentation tips, common questions, and strategies for handling challenging situations.',
      category: 'Thesis Structure',
      coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      downloadUrl: 'https://drive.google.com/drive/folders/1VMEaiLtr5WLAtYhQk0c4oo4Wm-EZBy3F?usp=sharing'
    }
  ];

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ebook.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI Free Research Library</h1>
            <p className="text-blue-100">
              Curated collection of free eBooks to support your research journey
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📚 Empower Your Research</h3>
          <p className="text-sm text-blue-100">
            Dive into our collection of free eBooks designed to enhance your research skills and academic writing. 
            From literature reviews to thesis structure, these resources will help you excel in your PhD journey.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search eBooks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* eBooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEbooks.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  {ebook.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {ebook.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                By {ebook.author}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {ebook.description}
              </p>
              <a
                href={ebook.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download size={16} />
                <span>Download Free eBook</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <BookOpen className="mx-auto text-gray-400" size={48} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
            No eBooks Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          About Our Free Resources
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          These eBooks are created by DrPhDAI's Friend as part of their commitment to supporting the global research community. All resources are free to download and use for educational purposes.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          If you find these resources valuable, consider supporting DrPhDAI through our "Buy Me a Coffee" option or by exploring our merchandise store.
        </p>
      </div>
    </div>
  );
};

export default FreeResources;
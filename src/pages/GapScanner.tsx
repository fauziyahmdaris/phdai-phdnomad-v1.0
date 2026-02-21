import React, { useState } from 'react';
import { Upload, Search, Map, Users, Globe, BookOpen, Play, Award, Zap, Target, FileText, BarChart3, Lightbulb, Link } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';

const GapScanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scanner' | 'map' | 'audit' | 'microlearning'>('scanner');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [doiInput, setDoiInput] = useState('');
  const [scanResults, setScanResults] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [mapData, setMapData] = useState<any>(null);
  const [auditResults, setAuditResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const runFRINScan = async () => {
    if (!uploadedFile && !urlInput.trim() && !doiInput.trim()) {
      alert('Please upload a PDF file, enter a URL, or provide a DOI');
      return;
    }
    
    setIsScanning(true);
    
    // Simulate FRIN scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResults = {
      totalGaps: 7,
      confidence: 0.89,
      gaps: [
        {
          type: 'Theoretical',
          sentence: 'Limited theoretical frameworks exist for understanding AI adoption in educational contexts.',
          confidence: 0.92,
          page: 15,
          suggestions: ['Social Cognitive Theory', 'Technology Acceptance Model', 'Diffusion of Innovation Theory']
        },
        {
          type: 'Methodological',
          sentence: 'Few studies have employed mixed-methods approaches to examine long-term impacts.',
          confidence: 0.87,
          page: 23,
          suggestions: ['Longitudinal Design', 'Sequential Explanatory', 'Concurrent Triangulation']
        },
        {
          type: 'Empirical',
          sentence: 'Insufficient research on cross-cultural validation of AI learning tools.',
          confidence: 0.84,
          page: 31,
          suggestions: ['Cross-Cultural Studies', 'Multi-Site Validation', 'Cultural Adaptation Framework']
        },
        {
          type: 'Population',
          sentence: 'Research predominantly focuses on undergraduate students, neglecting postgraduate contexts.',
          confidence: 0.91,
          page: 8,
          suggestions: ['PhD Student Populations', 'Postgraduate Learning Patterns', 'Advanced Academic Skills']
        }
      ],
      microlearningUnlocked: [
        'Gap Hunter Fundamentals',
        'FRIN Identification Mastery',
        'Theoretical Gap Analysis'
      ]
    };
    
    setScanResults(mockResults);
    setIsScanning(false);
  };

  const generateGapMap = async () => {
    setIsScanning(true);
    
    // Simulate gap map generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockMapData = {
      clusters: [
        { id: 1, name: 'AI in Education', papers: 245, gaps: 12, x: 100, y: 150, size: 40 },
        { id: 2, name: 'Learning Analytics', papers: 189, gaps: 8, x: 300, y: 100, size: 35 },
        { id: 3, name: 'Adaptive Learning', papers: 156, gaps: 15, x: 200, y: 250, size: 30 },
        { id: 4, name: 'Educational Technology', papers: 298, gaps: 6, x: 400, y: 200, size: 45 },
        { id: 5, name: 'Microlearning', papers: 87, gaps: 22, x: 150, y: 350, size: 25 }
      ],
      unexploredZones: 3,
      recommendedAreas: [
        'AI-Powered Microlearning for PhD Students',
        'Cross-Cultural Educational AI Adoption',
        'Decolonized Learning Analytics'
      ]
    };
    
    setMapData(mockMapData);
    setIsScanning(false);
  };

  const runDecolonizationAudit = async () => {
    setIsScanning(true);
    
    // Simulate decolonization audit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAuditResults = {
      totalReferences: 156,
      globalSouthPercentage: 22,
      femaleAuthorsPercentage: 18,
      diversityScore: 58,
      recommendations: [
        'Include more scholars from Africa and Asia',
        'Seek out female researchers in your field',
        'Consider indigenous knowledge systems',
        'Review non-English publications with translations'
      ],
      suggestedAuthors: [
        'Dr. Aisha Patel (India) - AI in Education',
        'Prof. Amara Okafor (Nigeria) - Learning Technologies',
        'Dr. Maria Santos (Brazil) - Educational Psychology'
      ]
    };
    
    setAuditResults(mockAuditResults);
    setIsScanning(false);
  };

  const microlearningModules = [
    {
      id: 1,
      title: 'Gap Hunter Fundamentals',
      duration: '4 mins',
      description: 'Master the art of identifying research gaps using FRIN methodology',
      unlocked: scanResults?.totalGaps > 0,
      icon: Target,
      color: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'FRIN Identification Mastery',
      duration: '6 mins',
      description: 'Advanced techniques for spotting Future Research Is Needed sentences',
      unlocked: scanResults?.totalGaps > 5,
      icon: Search,
      color: 'bg-purple-600'
    },
    {
      id: 3,
      title: 'Theoretical Gap Analysis',
      duration: '5 mins',
      description: 'How to identify and articulate theoretical contributions',
      unlocked: scanResults?.gaps?.some(g => g.type === 'Theoretical'),
      icon: OwlIcon,
      color: 'bg-green-600'
    },
    {
      id: 4,
      title: 'Niche Spotting Tactics',
      duration: '7 mins',
      description: 'Find your unique research niche in crowded fields',
      unlocked: mapData?.unexploredZones > 0,
      icon: Map,
      color: 'bg-orange-600'
    },
    {
      id: 5,
      title: 'Decolonize Your Literature Review',
      duration: '8 mins',
      description: 'Build inclusive and diverse reference lists',
      unlocked: auditResults?.diversityScore < 70,
      icon: Globe,
      color: 'bg-red-600'
    },
    {
      id: 6,
      title: 'Advanced Gap Tactics',
      duration: '10 mins',
      description: 'Professional strategies for gap identification and articulation',
      unlocked: scanResults?.totalGaps > 10,
      icon: Zap,
      color: 'bg-indigo-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">🔬 AI-Powered Gap-Scanning & Microlearning</h1>
            <p className="text-purple-100">
              Revolutionary FRIN-Scanning Engine with Integrated Pedagogical Microlearning
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">🎓 PhD Research Innovation by Qash Aris</h3>
          <p className="text-sm text-purple-100">
            "The Development and Evaluation of AI-Powered Microlearning Platform for Postgraduate Education in Thesis Writing Course"
            <br />
            <strong>World's First FRIN-Scanning Engine with Decolonization Auditor & Interactive Gap Mapping!</strong>
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'scanner', label: 'FRIN Scanner', icon: Search },
            { id: 'map', label: 'Gap Map', icon: Map },
            { id: 'audit', label: 'Decolonization Audit', icon: Globe },
            { id: 'microlearning', label: 'Microlearning', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <tab.icon size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* FRIN Scanner Tab */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🔍 FRIN-Scanning Engine
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your PDF, enter URL, or provide DOI to detect "Future Research Is Needed" sentences and identify research gaps
              </p>
            </div>

            {/* Input Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PDF Upload */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Upload PDF
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload research paper (PDF format)
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                >
                  Choose PDF File
                </label>
                {uploadedFile && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✅ {uploadedFile.name} uploaded
                  </p>
                )}
              </div>

              {/* URL and DOI Inputs */}
              <div className="space-y-4">
                {/* URL Input */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Link className="text-gray-400" size={20} />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Enter URL
                    </h3>
                  </div>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/research-paper"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* DOI Input */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="text-gray-400" size={20} />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Enter DOI
                    </h3>
                  </div>
                  <input
                    type="text"
                    value={doiInput}
                    onChange={(e) => setDoiInput(e.target.value)}
                    placeholder="10.1000/182"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Scan Button */}
            <div className="text-center">
              <button
                onClick={runFRINScan}
                disabled={!uploadedFile && !urlInput.trim() && !doiInput.trim() || isScanning}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto"
              >
                <Zap size={20} />
                <span>{isScanning ? 'Scanning for Gaps...' : '🔬 Run FRIN Scan'}</span>
              </button>
            </div>

            {/* Scan Results */}
            {scanResults && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">🎯 Scan Complete!</h3>
                  <p className="text-lg">Found <strong>{scanResults.totalGaps} research gaps</strong> with {Math.round(scanResults.confidence * 100)}% confidence</p>
                  <p className="text-green-100 mt-2">
                    🎓 {scanResults.microlearningUnlocked.length} microlearning modules unlocked!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scanResults.gaps.map((gap: any, index: number) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          gap.type === 'Theoretical' ? 'bg-purple-100 text-purple-800' :
                          gap.type === 'Methodological' ? 'bg-blue-100 text-blue-800' :
                          gap.type === 'Empirical' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {gap.type} Gap
                        </span>
                        <span className="text-sm text-gray-500">Page {gap.page}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 italic">
                        "{gap.sentence}"
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Suggestions:</p>
                        <div className="flex flex-wrap gap-1">
                          {gap.suggestions.map((suggestion: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                              {suggestion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gap Map Tab */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🗺️ Interactive Gap Map Generator
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize research clusters and discover unexplored territories in your field
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={generateGapMap}
                disabled={isScanning}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <Map size={20} />
                <span>{isScanning ? 'Generating Map...' : '🗺️ Generate Gap Map'}</span>
              </button>
            </div>

            {mapData && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">🎯 Map Generated!</h3>
                  <p className="text-lg">Found <strong>{mapData.unexploredZones} unexplored zones</strong> with high research potential</p>
                </div>

                {/* Interactive Map Visualization */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-96 relative overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 500 400">
                    {mapData.clusters.map((cluster: any) => (
                      <g key={cluster.id}>
                        <circle
                          cx={cluster.x}
                          cy={cluster.y}
                          r={cluster.size}
                          fill={cluster.gaps > 15 ? '#ef4444' : cluster.gaps > 10 ? '#f59e0b' : '#10b981'}
                          opacity={0.7}
                          className="hover:opacity-100 cursor-pointer transition-opacity"
                        />
                        <text
                          x={cluster.x}
                          y={cluster.y + 5}
                          textAnchor="middle"
                          className="text-xs font-medium fill-white"
                        >
                          {cluster.name}
                        </text>
                        <text
                          x={cluster.x}
                          y={cluster.y + 20}
                          textAnchor="middle"
                          className="text-xs fill-white"
                        >
                          {cluster.gaps} gaps
                        </text>
                      </g>
                    ))}
                  </svg>
                  <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>High Gap Density (15+)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Medium (10-15)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Low (0-10)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Areas */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🎯 Recommended Research Areas
                  </h3>
                  <div className="space-y-3">
                    {mapData.recommendedAreas.map((area: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Target className="text-blue-600" size={20} />
                        <span className="text-gray-900 dark:text-white font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Decolonization Audit Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🌍 Decolonization Auditor
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze your reference list for diversity and inclusivity across gender, geography, and perspectives
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={runDecolonizationAudit}
                disabled={isScanning}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <Globe size={20} />
                <span>{isScanning ? 'Auditing References...' : '🌍 Run Diversity Audit'}</span>
              </button>
            </div>

            {auditResults && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">📊 Audit Complete!</h3>
                  <p className="text-lg">Diversity Score: <strong>{auditResults.diversityScore}/100</strong></p>
                  <p className="text-red-100 mt-2">
                    Based on {auditResults.totalReferences} references analyzed
                  </p>
                </div>

                {/* Diversity Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      🌍 Geographic Diversity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Global South</span>
                        <span className="font-bold text-blue-600">{auditResults.globalSouthPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${auditResults.globalSouthPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      ♀️ Gender Diversity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Female Authors</span>
                        <span className="font-bold text-purple-600">{auditResults.femaleAuthorsPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${auditResults.femaleAuthorsPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    💡 Recommendations for Improvement
                  </h3>
                  <div className="space-y-3">
                    {auditResults.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Lightbulb className="text-yellow-500 mt-1" size={16} />
                        <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Authors */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    👥 Suggested Diverse Authors
                  </h3>
                  <div className="space-y-3">
                    {auditResults.suggestedAuthors.map((author: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Users className="text-green-600" size={20} />
                        <span className="text-gray-900 dark:text-white">{author}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Microlearning Tab */}
        {activeTab === 'microlearning' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎓 Adaptive Microlearning Modules
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Bite-sized learning modules that unlock based on your research progress and discoveries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {microlearningModules.map((module) => (
                <div
                  key={module.id}
                  className={`rounded-lg p-6 border transition-all ${
                    module.unlocked
                      ? 'border-green-300 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl'
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${module.unlocked ? module.color : 'bg-gray-400'}`}>
                      <module.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${module.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-500">{module.duration}</p>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-4 ${module.unlocked ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500'}`}>
                    {module.description}
                  </p>
                  
                  <button
                    disabled={!module.unlocked}
                    className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      module.unlocked
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Play size={16} />
                    <span>{module.unlocked ? 'Start Learning' : 'Locked'}</span>
                  </button>
                  
                  {module.unlocked && (
                    <div className="mt-3 flex items-center space-x-1 text-green-600">
                      <Award size={14} />
                      <span className="text-xs">Unlocked!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Tracking */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">🏆 Your Learning Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{microlearningModules.filter(m => m.unlocked).length}</div>
                  <div className="text-blue-100">Modules Unlocked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-blue-100">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-blue-100">Certificates Earned</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GapScanner;
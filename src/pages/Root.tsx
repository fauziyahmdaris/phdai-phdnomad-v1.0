import React, { useState } from 'react';
import { TreePine, Target, Lightbulb, FileText, Download, Save, Share2, Eye, Lock, ArrowRight, CheckCircle, Sparkles, Award } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';

const Root: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [userPackage] = useState<'basic' | 'lite' | 'premium'>('basic');
  const [formData, setFormData] = useState({
    researchTitle: '',
    researchArea: '',
    researchProblem: '',
    objectives: [''],
    methodology: '',
    significance: '',
    timeline: '',
    resources: ''
  });

  const steps = [
    { id: 1, title: 'Research Title & Area', icon: Target },
    { id: 2, title: 'Problem Statement', icon: Lightbulb },
    { id: 3, title: 'Objectives & Questions', icon: FileText },
    { id: 4, title: 'Methodology', icon: OwlIcon },
    { id: 5, title: 'Significance & Impact', icon: Sparkles },
    { id: 6, title: 'Timeline & Resources', icon: Award },
    { id: 7, title: 'Review & Export', icon: Download }
  ];

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  const exportROOT = () => {
    const content = `
# DrPhDAI R.O.O.T (Research Outline & Organizational Tool)

## Research Title & Area
**Title:** ${formData.researchTitle}
**Research Area:** ${formData.researchArea}

## Problem Statement
${formData.researchProblem}

## Research Objectives
${formData.objectives.filter(obj => obj.trim()).map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

## Methodology
${formData.methodology}

## Significance & Impact
${formData.significance}

## Timeline & Resources
${formData.timeline}

${formData.resources}

---
Generated with DrPhDAI R.O.O.T - Research Outline & Organizational Tool
Your Empathetic AI PhD Coach
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DrPhDAI-ROOT-Research-Outline.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const isBasicUser = userPackage === 'basic';

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Target className="mr-3 text-blue-600" size={28} />
              Research Title & Area
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Define your research focus and academic area of investigation.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Research Title *
                </label>
                <input
                  type="text"
                  value={formData.researchTitle}
                  onChange={(e) => handleInputChange('researchTitle', e.target.value)}
                  placeholder="Enter your research title..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isBasicUser}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Research Area *
                </label>
                <select
                  value={formData.researchArea}
                  onChange={(e) => handleInputChange('researchArea', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isBasicUser}
                >
                  <option value="">Select your research area</option>
                  <option value="Education">Education</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Lightbulb className="mr-3 text-green-600" size={28} />
              Problem Statement
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Clearly articulate the research problem you aim to address.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Problem *
              </label>
              <textarea
                value={formData.researchProblem}
                onChange={(e) => handleInputChange('researchProblem', e.target.value)}
                placeholder="Describe the research problem you want to solve..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-32"
                disabled={isBasicUser}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="mr-3 text-purple-600" size={28} />
              Objectives & Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Define your research objectives and key research questions.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Objectives
              </label>
              {formData.objectives.map((objective, index) => (
                <div key={index} className="mb-3">
                  <textarea
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder={`Objective ${index + 1}...`}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-20"
                    disabled={isBasicUser}
                  />
                </div>
              ))}
              {!isBasicUser && (
                <button
                  onClick={addObjective}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Another Objective
                </button>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <OwlIcon size={24} />
              Methodology
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Outline your research methodology and approach.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Methodology *
              </label>
              <textarea
                value={formData.methodology}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                placeholder="Describe your research methodology..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-32"
                disabled={isBasicUser}
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="mr-3 text-pink-600" size={28} />
              Significance & Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explain why your research matters and its potential impact.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Research Significance *
              </label>
              <textarea
                value={formData.significance}
                onChange={(e) => handleInputChange('significance', e.target.value)}
                placeholder="Explain the significance and impact of your research..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-32"
                disabled={isBasicUser}
              />
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Award className="mr-3 text-indigo-600" size={28} />
              Timeline & Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Plan your research timeline and required resources.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Research Timeline
                </label>
                <textarea
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  placeholder="Outline your research timeline..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-24"
                  disabled={isBasicUser}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Required Resources
                </label>
                <textarea
                  value={formData.resources}
                  onChange={(e) => handleInputChange('resources', e.target.value)}
                  placeholder="List required resources and budget..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-24"
                  disabled={isBasicUser}
                />
              </div>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Download className="mr-3 text-red-600" size={28} />
              Review & Export
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review your R.O.O.T outline and export your research framework.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Research Outline Summary
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400">Research Title & Area</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formData.researchTitle || 'Not specified'}</p>
                  <p className="text-gray-500 dark:text-gray-500">{formData.researchArea || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400">Problem Statement</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formData.researchProblem || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-600 dark:text-purple-400">Objectives</h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {formData.objectives.filter(obj => obj.trim()).map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-600 dark:text-orange-400">Methodology</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formData.methodology || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-pink-600 dark:text-pink-400">Significance</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formData.significance || 'Not specified'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Timeline & Resources</h4>
                  <p className="text-gray-700 dark:text-gray-300">{formData.timeline || 'Not specified'}</p>
                  <p className="text-gray-700 dark:text-gray-300">{formData.resources || 'Not specified'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={exportROOT}
                disabled={isBasicUser}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>{isBasicUser ? 'Upgrade to Export' : 'Export R.O.O.T'}</span>
              </button>
              
              <button
                disabled={isBasicUser}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Share2 size={20} />
                <span>{isBasicUser ? 'Upgrade to Share' : 'Share with Supervisor'}</span>
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <TreePine size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">R.O.O.T</h1>
              <p className="text-green-100 text-lg">Research Outline & Organizational Tool</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🌱 Grow Your Research from Strong Roots</h3>
            <p className="text-sm text-green-100">
              R.O.O.T helps you build a solid foundation for your PhD research. Create a comprehensive 
              research outline that will guide your entire doctoral journey with confidence and clarity.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Package Indicator */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
            {isBasicUser ? <Eye size={16} className="text-gray-500" /> : <CheckCircle size={16} className="text-green-500" />}
            <span className={`text-sm font-medium ${isBasicUser ? 'text-gray-500' : 'text-green-600'}`}>
              {isBasicUser ? 'PhD Starter (View Only)' : userPackage === 'lite' ? 'PhD Booster (Full Access)' : 'PhD Star (Premium)'}
            </span>
            {isBasicUser && (
              <a href="/auth" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Upgrade
              </a>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Step {activeStep} of {steps.length}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round((activeStep / steps.length) * 100)}% Complete
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  step.id <= activeStep 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  step.id === activeStep
                    ? 'bg-blue-600 text-white'
                    : step.id < activeStep
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <step.icon size={16} />
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              {renderStepContent()}
              
              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 1}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex space-x-3">
                  <button
                    disabled={isBasicUser}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>{isBasicUser ? 'Upgrade to Save' : 'Save Draft'}</span>
                  </button>
                  
                  {activeStep < steps.length ? (
                    <button
                      onClick={nextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <a
                      href="/app"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                R.O.O.T Features
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Structured Research Planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Step-by-Step Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  {isBasicUser ? <Lock className="text-gray-400" size={16} /> : <CheckCircle className="text-green-500" size={16} />}
                  <span className={`text-sm ${isBasicUser ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Export & Save Options
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {isBasicUser ? <Lock className="text-gray-400" size={16} /> : <CheckCircle className="text-green-500" size={16} />}
                  <span className={`text-sm ${isBasicUser ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Google Drive Integration
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {isBasicUser ? <Lock className="text-gray-400" size={16} /> : <CheckCircle className="text-green-500" size={16} />}
                  <span className={`text-sm ${isBasicUser ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Supervisor Sharing
                  </span>
                </div>
              </div>
              
              {isBasicUser && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Upgrade for Full Access
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Unlock editing, saving, and sharing capabilities with PhD Booster package.
                  </p>
                  <a
                    href="/auth"
                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                  >
                    Upgrade Now
                  </a>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Need Help?
                </h4>
                <div className="space-y-2">
                  <a href="/app/user-guide" className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                    <ArrowRight size={12} />
                    <span>User Guide</span>
                  </a>
                  <a href="/app/mentor" className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                    <ArrowRight size={12} />
                    <span>AI Mentor</span>
                  </a>
                  <a href="/app/help-support" className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-2">
                    <ArrowRight size={12} />
                    <span>Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
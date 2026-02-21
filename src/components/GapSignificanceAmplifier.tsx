import React, { useState } from 'react';
import { Target, Lightbulb, ArrowRight, CheckCircle, Zap, Heart } from 'lucide-react';

interface GapSignificanceAmplifierProps {
  onEnhancedGapGenerated: (text: string) => void;
}

const GapSignificanceAmplifier: React.FC<GapSignificanceAmplifierProps> = ({ onEnhancedGapGenerated }) => {
  const [gapStatement, setGapStatement] = useState('');
  const [researchField, setResearchField] = useState('');
  const [enhancedGap, setEnhancedGap] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSignificance, setSelectedSignificance] = useState<string[]>([]);

  const significanceTypes = [
    { id: 'theoretical', label: 'Theoretical Significance', description: 'How it advances conceptual understanding' },
    { id: 'methodological', label: 'Methodological Significance', description: 'How it improves research approaches' },
    { id: 'practical', label: 'Practical Significance', description: 'How it solves real-world problems' },
    { id: 'social', label: 'Social Significance', description: 'How it contributes to broader societal challenges' }
  ];

  const toggleSignificance = (id: string) => {
    setSelectedSignificance(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const amplifyGap = async () => {
    if (!gapStatement.trim() || !researchField.trim() || selectedSignificance.length === 0) {
      alert('Please fill in all fields and select at least one significance type');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate enhanced gap statement based on selected significance types
    let enhanced = `Despite significant advances in ${researchField}, a critical gap exists: ${gapStatement}. `;
    
    if (selectedSignificance.includes('theoretical')) {
      enhanced += `This gap has profound theoretical significance as it limits our conceptual understanding of key processes and relationships within ${researchField}. Addressing this gap would advance theoretical frameworks by providing a more comprehensive explanation of how these elements interact. `;
    }
    
    if (selectedSignificance.includes('methodological')) {
      enhanced += `From a methodological perspective, this gap represents a significant limitation in current research approaches. Developing new methods to address this gap would enhance the rigor and validity of future studies in ${researchField}. `;
    }
    
    if (selectedSignificance.includes('practical')) {
      enhanced += `The practical implications of this research gap are substantial. Without addressing this limitation, practitioners in ${researchField} lack crucial guidance for implementing effective strategies and interventions. Resolving this gap would directly improve professional practice and outcomes. `;
    }
    
    if (selectedSignificance.includes('social')) {
      enhanced += `Perhaps most importantly, this gap has broader societal significance. Research in this area has the potential to address pressing social challenges related to ${researchField}, contributing to more equitable and effective solutions for communities and individuals. `;
    }
    
    enhanced += `This research aims to address this critical gap, making a meaningful contribution to both knowledge and practice in ${researchField}.`;
    
    setEnhancedGap(enhanced);
    setIsGenerating(false);
  };

  const handleUseEnhancedGap = () => {
    if (enhancedGap) {
      onEnhancedGapGenerated(enhancedGap);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
          <Target className="text-orange-600 dark:text-orange-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gap Significance Amplifier
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Transform basic research gaps into powerful contribution statements
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Research Field
          </label>
          <input
            type="text"
            value={researchField}
            onChange={(e) => setResearchField(e.target.value)}
            placeholder="e.g., educational technology, climate science, public health"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Basic Research Gap
          </label>
          <textarea
            value={gapStatement}
            onChange={(e) => setGapStatement(e.target.value)}
            placeholder="e.g., there is limited research on the long-term effects of AI-powered learning tools"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-24"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Start with a simple statement of what's missing or limited in current research
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Significance Types
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {significanceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => toggleSignificance(type.id)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedSignificance.includes(type.id)
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full border ${
                    selectedSignificance.includes(type.id)
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-gray-400 dark:border-gray-500'
                  }`}>
                    {selectedSignificance.includes(type.id) && (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {type.label}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-6">
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="text-orange-600 dark:text-orange-400" size={16} />
            <h3 className="font-medium text-orange-900 dark:text-orange-100">
              Connect to Your Purpose
            </h3>
          </div>
          <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
            Remember why your research matters. Take a moment to reflect:
          </p>
          <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
            <li className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>Who will benefit from addressing this gap?</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>What inspired you to focus on this particular area?</span>
            </li>
            <li className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>How might your work create positive change?</span>
            </li>
          </ul>
        </div>

        <button
          onClick={amplifyGap}
          disabled={isGenerating || !gapStatement.trim() || !researchField.trim() || selectedSignificance.length === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Zap size={16} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Amplifying Significance...' : 'Amplify Gap Significance'}</span>
        </button>

        {enhancedGap && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Your Amplified Research Gap
              </h3>
              <button
                onClick={handleUseEnhancedGap}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Use This Version</span>
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {enhancedGap}
              </p>
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="text-blue-600 dark:text-blue-400" size={16} />
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Why This Works
                </h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your enhanced gap statement now connects intellectual need with real-world impact. By articulating both the academic and practical significance, you've created a compelling rationale that will resonate with examiners, peers, and stakeholders. This approach demonstrates not just what is missing, but why it matters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GapSignificanceAmplifier;
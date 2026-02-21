import React, { useState } from 'react';
import { Type, ArrowRight, CheckCircle, Sparkles, MessageSquare, Zap } from 'lucide-react';

interface AcademicVoiceProps {
  onEnhancedTextGenerated: (text: string) => void;
}

const AcademicVoiceCalibrator: React.FC<AcademicVoiceProps> = ({ onEnhancedTextGenerated }) => {
  const [originalText, setOriginalText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [voicePreference, setVoicePreference] = useState<'authoritative' | 'balanced' | 'cautious'>('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<{
    tone: string;
    voice: string;
    suggestions: string[];
    strengths: string[];
  } | null>(null);

  const calibrateVoice = async () => {
    if (!originalText.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on text content and voice preference
    const hasPassiveVoice = /is|are|was|were|been|being|be made|be done|be created|be written/i.test(originalText);
    const hasInformalLanguage = /really|very|a lot|thing|stuff|kind of|sort of/i.test(originalText);
    const hasHedging = /may|might|could|possibly|perhaps|seems|appears/i.test(originalText);
    const hasStrongClaims = /clearly|obviously|certainly|undoubtedly|definitely|proves|demonstrates/i.test(originalText);
    
    const mockAnalysis = {
      tone: hasInformalLanguage ? 'Somewhat informal' : 'Appropriately formal',
      voice: hasPassiveVoice ? 'Primarily passive' : 'Primarily active',
      suggestions: [] as string[],
      strengths: [] as string[]
    };
    
    if (hasInformalLanguage) {
      mockAnalysis.suggestions.push('Replace informal language with more precise academic terminology');
    }
    
    if (hasPassiveVoice && voicePreference !== 'cautious') {
      mockAnalysis.suggestions.push('Consider using more active voice for stronger assertions');
    }
    
    if (hasHedging && voicePreference === 'authoritative') {
      mockAnalysis.suggestions.push('Reduce hedging language for a more authoritative stance');
    }
    
    if (hasStrongClaims && voicePreference === 'cautious') {
      mockAnalysis.suggestions.push('Consider more measured claims with appropriate hedging');
    }
    
    if (!hasInformalLanguage) {
      mockAnalysis.strengths.push('Maintains appropriate academic formality');
    }
    
    if (!hasPassiveVoice && voicePreference !== 'cautious') {
      mockAnalysis.strengths.push('Uses active voice effectively to establish authority');
    }
    
    if (hasHedging && voicePreference !== 'authoritative') {
      mockAnalysis.strengths.push('Shows appropriate scholarly caution with claims');
    }
    
    // If no strengths identified, add a generic one
    if (mockAnalysis.strengths.length === 0) {
      mockAnalysis.strengths.push('Shows potential for developing a strong academic voice');
    }
    
    setAnalysis(mockAnalysis);
    
    // Generate enhanced text based on voice preference
    let enhanced = originalText;
    
    if (voicePreference === 'authoritative') {
      // Make more authoritative
      enhanced = originalText
        .replace(/may|might|could possibly/g, 'likely')
        .replace(/some researchers suggest/g, 'research demonstrates')
        .replace(/it seems that/g, 'evidence indicates that')
        .replace(/is|are considered/g, 'is|are')
        .replace(/passive voice/g, 'active voice');
        
      if (!enhanced.includes('This demonstrates') && !enhanced.includes('This shows') && enhanced.length > 100) {
        enhanced += "\n\nThis analysis clearly demonstrates the significance of these findings for advancing our understanding of the field.";
      }
    } 
    else if (voicePreference === 'cautious') {
      // Make more cautious/hedged
      enhanced = originalText
        .replace(/clearly|obviously|certainly/g, 'potentially')
        .replace(/demonstrates|proves/g, 'suggests')
        .replace(/will/g, 'may')
        .replace(/shows/g, 'indicates');
        
      if (!enhanced.includes('limitations') && enhanced.length > 100) {
        enhanced += "\n\nHowever, these findings should be interpreted with appropriate caution, considering the potential limitations of the methodology and context.";
      }
    }
    else {
      // Balanced approach
      enhanced = originalText
        .replace(/really|very|a lot/g, 'significantly')
        .replace(/thing|stuff/g, 'element')
        .replace(/kind of|sort of/g, 'relatively');
        
      if (!enhanced.includes('While') && !enhanced.includes('However') && enhanced.length > 100) {
        enhanced += "\n\nWhile these findings offer valuable insights, further research is needed to fully establish their broader applicability and theoretical implications.";
      }
    }
    
    setEnhancedText(enhanced);
    setIsGenerating(false);
  };

  const handleUseEnhancedText = () => {
    if (enhancedText) {
      onEnhancedTextGenerated(enhancedText);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          <Type className="text-indigo-600 dark:text-indigo-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Academic Voice Calibrator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find your authentic scholarly voice and express your ideas with confidence
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Text
          </label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste a paragraph from your academic writing..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Voice Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 'authoritative', label: 'Authoritative', description: 'Confident, decisive, strong claims' },
              { id: 'balanced', label: 'Balanced', description: 'Measured confidence with appropriate caution' },
              { id: 'cautious', label: 'Cautious', description: 'Careful, hedged, emphasizes limitations' }
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => setVoicePreference(style.id as any)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  voicePreference === style.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {style.label}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {style.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="text-indigo-600 dark:text-indigo-400" size={16} />
            <h3 className="font-medium text-indigo-900 dark:text-indigo-100">
              Finding Your Authentic Academic Voice
            </h3>
          </div>
          <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-3">
            Your academic voice is the perfect balance between disciplinary conventions and your authentic self. It's how your ideas will resonate and be remembered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-indigo-700 dark:text-indigo-300">
            <div className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>Use "I" for your unique contributions and methodological decisions</span>
            </div>
            <div className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>Use "We" for guiding the reader through your argument</span>
            </div>
            <div className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>Balance confidence with appropriate scholarly humility</span>
            </div>
            <div className="flex items-start">
              <ArrowRight size={14} className="mr-2 mt-1 flex-shrink-0" />
              <span>Let your passion for your research subtly shine through</span>
            </div>
          </div>
        </div>

        <button
          onClick={calibrateVoice}
          disabled={isGenerating || !originalText.trim()}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Zap size={16} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Calibrating Voice...' : 'Calibrate Academic Voice'}</span>
        </button>

        {analysis && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                Voice Analysis
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Tone
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {analysis.tone}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Voice Style
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {analysis.voice}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {analysis.suggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Suggestions for Improvement
                  </h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Calibrated Academic Voice
                </h3>
                <button
                  onClick={handleUseEnhancedText}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Use This Version</span>
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <p className="text-gray-800 dark:text-gray-200">
                  {enhancedText}
                </p>
              </div>
              
              <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="text-purple-600 dark:text-purple-400" size={16} />
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">
                    Your Voice Matters
                  </h4>
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Your academic voice is more than just style—it's how your ideas will resonate and be remembered. The calibrated version maintains academic conventions while letting your authentic perspective shine through. Remember that finding your voice is a journey; continue to refine it as you grow as a scholar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicVoiceCalibrator;
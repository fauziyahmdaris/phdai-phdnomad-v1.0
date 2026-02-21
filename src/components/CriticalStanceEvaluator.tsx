import React, { useState } from 'react';
import { FileText, Lightbulb, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface CriticalStanceEvaluatorProps {
  onEnhancedTextGenerated: (text: string) => void;
}

const CriticalStanceEvaluator: React.FC<CriticalStanceEvaluatorProps> = ({ onEnhancedTextGenerated }) => {
  const [originalText, setOriginalText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [analysis, setAnalysis] = useState<{
    criticalLevel: 'low' | 'medium' | 'high';
    descriptiveElements: string[];
    criticalOpportunities: string[];
    powerUpPrompts: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!originalText.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on text content
    const wordCount = originalText.split(/\s+/).length;
    const hasDescriptiveMarkers = /reported|stated|mentioned|described|showed/i.test(originalText);
    const hasCriticalMarkers = /however|nevertheless|although|despite|critically|limitations|implications|suggests|argues|questions|challenges/i.test(originalText);
    
    let criticalLevel: 'low' | 'medium' | 'high' = 'medium';
    
    if (hasDescriptiveMarkers && !hasCriticalMarkers) {
      criticalLevel = 'low';
    } else if (hasCriticalMarkers && wordCount > 50) {
      criticalLevel = 'high';
    }
    
    const mockAnalysis = {
      criticalLevel,
      descriptiveElements: [
        "Summarizes findings without evaluating their significance",
        "Reports what authors said without questioning assumptions",
        "Lists multiple studies without synthesizing connections"
      ],
      criticalOpportunities: [
        "Question the methodology's appropriateness for the research questions",
        "Evaluate how context might influence the findings' applicability",
        "Consider alternative interpretations of the results",
        "Examine potential biases in the research design"
      ],
      powerUpPrompts: [
        "What unstated assumptions underlie this research?",
        "How might different theoretical frameworks interpret these findings?",
        "What are the practical implications of these results?",
        "How do these findings challenge or extend existing knowledge?"
      ]
    };
    
    setAnalysis(mockAnalysis);
    
    // Generate enhanced text with more critical stance
    let enhanced = originalText;
    
    if (criticalLevel === 'low') {
      // Add critical elements for low criticality text
      enhanced = originalText + "\n\nHowever, it is important to critically examine these findings in light of several considerations. The methodology employed raises questions about the generalizability of results across different contexts. Furthermore, the underlying assumptions about [relevant concept] merit closer scrutiny, as they may not fully account for the complexity of real-world situations. These limitations suggest that while the research provides valuable insights, its conclusions should be interpreted with appropriate caution.";
    } else if (criticalLevel === 'medium') {
      // Enhance medium criticality text
      enhanced = originalText.replace(/reported|stated|mentioned|described/gi, 'argued') + "\n\nThis perspective, while valuable, must be considered alongside alternative interpretations. A critical examination reveals potential limitations in how the concepts were operationalized, potentially affecting the validity of the conclusions. The implications extend beyond what the authors explicitly addressed, suggesting important directions for future research that would address these conceptual gaps.";
    }
    
    setEnhancedText(enhanced);
    setIsAnalyzing(false);
  };

  const handleUseEnhancedText = () => {
    if (enhancedText) {
      onEnhancedTextGenerated(enhancedText);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <FileText className="text-blue-600 dark:text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Critical Stance Evaluator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Transform descriptive writing into powerful critical analysis
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
            placeholder="Paste a paragraph from your literature review or discussion section..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-32"
          />
        </div>

        <button
          onClick={analyzeText}
          disabled={isAnalyzing || !originalText.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Lightbulb size={16} className={isAnalyzing ? 'animate-spin' : ''} />
          <span>{isAnalyzing ? 'Analyzing Critical Stance...' : 'Analyze Critical Stance'}</span>
        </button>

        {analysis && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Critical Thinking Analysis
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Critical Level:</span>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-6 rounded-sm ${
                      analysis.criticalLevel === 'low' || analysis.criticalLevel === 'medium' || analysis.criticalLevel === 'high'
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}></div>
                    <div className={`w-2 h-6 rounded-sm ${
                      analysis.criticalLevel === 'medium' || analysis.criticalLevel === 'high'
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}></div>
                    <div className={`w-2 h-6 rounded-sm ${
                      analysis.criticalLevel === 'high'
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <AlertCircle size={14} className="mr-2 text-yellow-500" />
                    Descriptive Elements
                  </h4>
                  <ul className="space-y-1">
                    {analysis.descriptiveElements.map((element, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Lightbulb size={14} className="mr-2 text-green-500" />
                    Critical Thinking Opportunities
                  </h4>
                  <ul className="space-y-1">
                    {analysis.criticalOpportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                <Sparkles size={16} className="mr-2" />
                Power-Up Prompts
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                Use these thought-provoking questions to deepen your critical analysis:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.powerUpPrompts.map((prompt, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border border-purple-200 dark:border-purple-700">
                    <p className="text-sm text-purple-900 dark:text-purple-100">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Enhanced Critical Version
                </h3>
                <button
                  onClick={handleUseEnhancedText}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Use Enhanced Version</span>
                </button>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {enhancedText}
                </p>
              </div>
              
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Remember:</strong> Critical thinking isn't about being negative—it's about thoughtful evaluation that reveals deeper insights. Your critical analysis is a gift to your field that advances knowledge and inspires new directions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriticalStanceEvaluator;
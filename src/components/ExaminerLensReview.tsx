import React, { useState } from 'react';
import { Target, CheckCircle, AlertCircle, ArrowRight, Lightbulb, Award, FileText } from 'lucide-react';

interface ExaminerLensReviewProps {
  onFeedbackAccepted: (feedback: string) => void;
}

const ExaminerLensReview: React.FC<ExaminerLensReviewProps> = ({ onFeedbackAccepted }) => {
  const [text, setText] = useState('');
  const [sectionType, setSectionType] = useState<'introduction' | 'literature-review' | 'methodology' | 'discussion' | 'conclusion'>('introduction');
  const [examinerFeedback, setExaminerFeedback] = useState<{
    strengths: string[];
    concerns: string[];
    suggestions: string;
    rating: 'excellent' | 'good' | 'needs-work';
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeFromExaminerPerspective = async () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate examiner feedback based on section type and content
    const strengths: string[] = [];
    const concerns: string[] = [];
    let suggestions = '';
    let rating: 'excellent' | 'good' | 'needs-work' = 'good';
    
    // Check for common positive elements
    const hasCriticalAnalysis = /however|nevertheless|although|despite|critically|limitations|implications|suggests|argues|questions|challenges/i.test(text);
    const hasClearStructure = /first|second|finally|in conclusion|therefore|consequently/i.test(text);
    const hasEvidenceSupport = /according to|as demonstrated by|research shows|studies indicate|evidence suggests/i.test(text);
    const hasOriginalContribution = /this research contributes|extends existing knowledge|addresses the gap|novel approach|unique perspective/i.test(text);
    
    // Check for common issues
    const hasVagueClaims = /many researchers|some studies|it is believed|people think|generally accepted/i.test(text);
    const hasInformalLanguage = /really|very|a lot|thing|stuff|kind of|sort of/i.test(text);
    const hasLongSentences = text.split(/[.!?]/).some(sentence => sentence.split(' ').length > 30);
    
    // Generate feedback based on section type
    if (sectionType === 'introduction') {
      if (hasOriginalContribution) {
        strengths.push('Clearly articulates the original contribution to knowledge');
        strengths.push('Establishes the significance of the research effectively');
      } else {
        concerns.push('The original contribution to knowledge could be more explicitly stated');
      }
      
      if (hasClearStructure) {
        strengths.push('Well-structured introduction with clear signposting');
      } else {
        concerns.push('Consider adding more explicit structure to guide the reader');
      }
      
      suggestions = 'To strengthen this introduction, ensure you explicitly state your research questions and objectives. An examiner will be looking for a clear articulation of the gap in knowledge and how your research addresses it. Consider adding a brief roadmap of the thesis structure at the end.';
    } 
    else if (sectionType === 'literature-review') {
      if (hasCriticalAnalysis) {
        strengths.push('Shows critical engagement with the literature rather than mere description');
        strengths.push('Evaluates the strengths and limitations of existing research');
      } else {
        concerns.push('The literature review appears more descriptive than analytical');
        concerns.push('Consider more critical evaluation of the sources');
      }
      
      if (hasEvidenceSupport) {
        strengths.push('Effectively integrates evidence from relevant sources');
      } else {
        concerns.push('More explicit reference to key literature would strengthen this section');
      }
      
      suggestions = 'Examiners particularly value literature reviews that demonstrate your ability to synthesize and critically evaluate existing knowledge, not just summarize it. Consider organizing your review thematically rather than chronologically, and explicitly show how the literature leads to your identified research gap.';
    }
    else if (sectionType === 'methodology') {
      if (hasClearStructure) {
        strengths.push('Methodology is clearly structured and logically presented');
      } else {
        concerns.push('The methodological approach could be more clearly structured');
      }
      
      if (text.includes('justif') || text.includes('rationale')) {
        strengths.push('Provides justification for methodological choices');
      } else {
        concerns.push('Include more explicit justification for your methodological decisions');
      }
      
      suggestions = 'Examiners will be looking for clear alignment between your research questions and your methodological approach. Ensure you justify each methodological decision and demonstrate awareness of limitations. Consider adding a section on ethical considerations if relevant.';
    }
    else if (sectionType === 'discussion' || sectionType === 'conclusion') {
      if (hasOriginalContribution) {
        strengths.push('Clearly articulates the contribution to knowledge');
      } else {
        concerns.push('The contribution to knowledge could be more explicitly stated');
      }
      
      if (text.includes('limitation') || text.includes('future research')) {
        strengths.push('Thoughtfully addresses limitations and future research directions');
      } else {
        concerns.push('Consider discussing limitations and future research directions');
      }
      
      suggestions = 'Examiners value conclusions that clearly restate the contribution to knowledge while acknowledging limitations. Ensure you discuss the implications of your findings for theory, practice, and future research. Avoid introducing new material in the conclusion.';
    }
    
    // Add general feedback
    if (hasVagueClaims) {
      concerns.push('Replace vague claims with more specific, evidence-based statements');
    }
    
    if (hasInformalLanguage) {
      concerns.push('Some language is too informal for academic writing');
    }
    
    if (hasLongSentences) {
      concerns.push('Consider breaking down overly long sentences for clarity');
    }
    
    // Determine overall rating
    if (strengths.length > 2 && concerns.length <= 1) {
      rating = 'excellent';
    } else if (concerns.length > 3) {
      rating = 'needs-work';
    }
    
    // Set feedback
    setExaminerFeedback({
      strengths,
      concerns,
      suggestions,
      rating
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <Target className="text-red-600 dark:text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Examiner's Lens Review
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            See your writing through your examiner's eyes
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Type
            </label>
            <select
              value={sectionType}
              onChange={(e) => setSectionType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="introduction">Introduction</option>
              <option value="literature-review">Literature Review</option>
              <option value="methodology">Methodology</option>
              <option value="discussion">Discussion</option>
              <option value="conclusion">Conclusion</option>
            </select>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex items-center space-x-3">
            <FileText className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
            <p className="text-sm text-red-800 dark:text-red-200">
              Seeing your work through an examiner's eyes helps you anticipate questions and strengthen your arguments.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Paste a section of your ${sectionType.replace('-', ' ')} here...`}
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          />
        </div>

        <button
          onClick={analyzeFromExaminerPerspective}
          disabled={isAnalyzing || !text.trim()}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Target size={16} className={isAnalyzing ? 'animate-spin' : ''} />
          <span>{isAnalyzing ? 'Analyzing Through Examiner\'s Eyes...' : 'Review Through Examiner\'s Eyes'}</span>
        </button>

        {examinerFeedback && (
          <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Examiner's Feedback
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                examinerFeedback.rating === 'excellent' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                  : examinerFeedback.rating === 'good'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
              }`}>
                {examinerFeedback.rating === 'excellent' ? 'Excellent' : examinerFeedback.rating === 'good' ? 'Good' : 'Needs Work'}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <CheckCircle size={16} className="mr-2" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {examinerFeedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-green-800 dark:text-green-200 flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                  {examinerFeedback.strengths.length === 0 && (
                    <li className="text-sm text-green-800 dark:text-green-200 italic">
                      No specific strengths identified. See suggestions for improvement.
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  Potential Concerns
                </h4>
                <ul className="space-y-2">
                  {examinerFeedback.concerns.map((concern, index) => (
                    <li key={index} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                  {examinerFeedback.concerns.length === 0 && (
                    <li className="text-sm text-yellow-800 dark:text-yellow-200 italic">
                      No significant concerns identified. Well done!
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                <Lightbulb size={16} className="mr-2" />
                Examiner's Suggestions
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                {examinerFeedback.suggestions}
              </p>
              
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Award className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Remember, examiners want you to succeed! Their feedback is designed to help you showcase your brilliant work in the most compelling way possible.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => onFeedbackAccepted(examinerFeedback.suggestions)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowRight size={16} />
              <span>Apply These Insights to My Writing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExaminerLensReview;
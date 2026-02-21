import React, { useState, useRef } from 'react';
import { 
  Wand2, 
  AlertCircle, 
  Lightbulb, 
  Copy, 
  RefreshCw,
  Target,
  Quote,
  Link2,
  Heart,
  Sparkles,
  Plus
} from 'lucide-react';

interface AIWritingAssistantProps {
  content: string;
  onContentChange: (content: string) => void;
  context?: string;
  sectionType?: 'introduction' | 'literature-review' | 'methodology' | 'conclusion' | 'general';
}

interface AIFeedback {
  type: 'grammar' | 'flow' | 'structure' | 'transition' | 'citation' | 'style';
  severity: 'error' | 'warning' | 'suggestion';
  message: string;
  suggestion?: string;
  position: { start: number; end: number };
  encouragement?: string;
}

interface ParagraphStructure {
  topicSentence: string;
  supportSentences: string[];
  concludingSentence: string;
}

const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({
  content,
  onContentChange,
  context: _context = '',
  sectionType = 'general'
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback[]>([]);
  const [showParagraphBuilder, setShowParagraphBuilder] = useState(false);
  const [showTransitionHelper, setShowTransitionHelper] = useState(false);
  const [showParaphraseHelper, setShowParaphraseHelper] = useState(false);
  const [paragraphStructure, setParagraphStructure] = useState<ParagraphStructure>({
    topicSentence: '',
    supportSentences: [''],
    concludingSentence: ''
  });
  const [paraphraseInput, setParaphraseInput] = useState('');
  const [paraphraseOutput, setParaphraseOutput] = useState('');
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [feedbackStyle, setFeedbackStyle] = useState<'direct' | 'encouraging' | 'coaching'>('encouraging');
  const [showCelebration, setShowCelebration] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Transition words categorized by function
  const transitionWords = {
    addition: ['Additionally', 'Furthermore', 'Moreover', 'In addition', 'Also', 'Besides'],
    contrast: ['However', 'Nevertheless', 'On the contrary', 'Conversely', 'In contrast', 'Although'],
    causation: ['Therefore', 'Consequently', 'As a result', 'Thus', 'Hence', 'Because of this'],
    exemplification: ['For example', 'For instance', 'Specifically', 'In particular', 'Such as', 'Namely'],
    conclusion: ['In conclusion', 'To summarize', 'Finally', 'In summary', 'Overall', 'To conclude'],
    sequence: ['First', 'Second', 'Next', 'Subsequently', 'Finally', 'Meanwhile']
  };

  // Academic writing prompts based on section type
  const sectionPrompts = {
    introduction: [
      "In recent years, there has been increasing interest in [topic] due to...",
      "Historically, [concept] has been thought to have significant influence on...",
      "This study focuses on [specific area], particularly examining...",
      "Within this context, it is crucial to define [key term] as...",
      "The primary purpose of this research is to [analyze/explore/evaluate]..."
    ],
    'literature-review': [
      "Previous research has established that...",
      "Several studies have investigated [topic], revealing...",
      "A significant gap exists in the literature regarding...",
      "While [Author] argues that..., other researchers suggest...",
      "The theoretical framework for this study draws from..."
    ],
    methodology: [
      "This study employs a [qualitative/quantitative/mixed-methods] approach to...",
      "Data collection will involve [method] to ensure...",
      "The research design is based on [framework/theory] because...",
      "Participants will be selected using [sampling method] to...",
      "Data analysis will be conducted using [software/technique] to..."
    ],
    conclusion: [
      "The findings of this study demonstrate that...",
      "These results have important implications for...",
      "Future research should focus on...",
      "The limitations of this study include...",
      "In conclusion, this research contributes to..."
    ],
    general: [
      "This research aims to...",
      "The significance of this study lies in...",
      "Building on previous work by [Author]...",
      "The results suggest that...",
      "Further investigation is needed to..."
    ]
  };

  // (Encouragement messages removed; using inline encouragement in feedback items.)

  // Simulate AI analysis with more encouraging feedback
  const analyzeContent = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockFeedback: AIFeedback[] = [];
    
    // Check for common issues
    if (content.includes('very')) {
      mockFeedback.push({
        type: 'style',
        severity: 'suggestion',
        message: 'Consider using more precise academic language instead of "very"',
        suggestion: 'Replace with more specific adjectives (e.g., "significant", "substantial", "considerable")',
        position: { start: content.indexOf('very'), end: content.indexOf('very') + 4 },
        encouragement: "Your attention to precise language shows your scholarly mindset!"
      });
    }
    
    if (!content.includes('.') && content.length > 50) {
      mockFeedback.push({
        type: 'grammar',
        severity: 'error',
        message: 'This appears to be a run-on sentence. Consider breaking it into shorter sentences.',
        position: { start: 0, end: content.length },
        encouragement: "Breaking this into clearer sentences will help your brilliant ideas shine through!"
      });
    }
    
    if (content.split('.').length > 3 && !content.includes('However') && !content.includes('Therefore') && !content.includes('Furthermore')) {
      mockFeedback.push({
        type: 'flow',
        severity: 'warning',
        message: 'Consider adding transition words to improve flow between sentences',
        suggestion: 'Add transitions like "However", "Furthermore", or "Therefore"',
        position: { start: 0, end: content.length },
        encouragement: "Your ideas are strong! Adding transitions will create an even more compelling narrative."
      });
    }
    
    // Check for passive voice
    if (/is|are|was|were|be|been|being analyzed|studied|examined|investigated/i.test(content)) {
      mockFeedback.push({
        type: 'style',
        severity: 'suggestion',
        message: 'Consider using active voice for stronger assertions where appropriate',
        suggestion: 'Try recasting some sentences to emphasize who is doing the action',
        position: { start: 0, end: content.length },
        encouragement: "Your academic voice is developing beautifully! Active voice can help establish your authority."
      });
    }
    
    // Check for critical analysis
    if (content.length > 100 && !(/however|nevertheless|although|despite|critically|limitations|implications|suggests|argues|questions|challenges/i.test(content))) {
      mockFeedback.push({
        type: 'structure',
        severity: 'suggestion',
        message: 'Consider adding more critical analysis to strengthen your scholarly voice',
        suggestion: 'Try evaluating implications, limitations, or alternative perspectives',
        position: { start: 0, end: content.length },
        encouragement: "Your writing shows potential for deeper analysis. Your unique critical perspective is valuable!"
      });
    }
    
    setFeedback(mockFeedback);
    setIsAnalyzing(false);
    
    // Show celebration if no major issues
    if (mockFeedback.length === 0 || (mockFeedback.length === 1 && mockFeedback[0].severity === 'suggestion')) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Generate paragraph from structure with more engaging transitions
  const generateParagraph = () => {
    const { topicSentence, supportSentences, concludingSentence } = paragraphStructure;
    const validSupportSentences = supportSentences.filter(s => s.trim());
    
    let paragraph = topicSentence;
    
    // More varied and engaging transitions
    const supportTransitions = [
      'Furthermore', 'Additionally', 'Moreover', 
      'Building on this idea', 'Equally important', 
      "What's more", 'Another key aspect is that'
    ];
    
    validSupportSentences.forEach((sentence, index) => {
      const transition = supportTransitions[index % supportTransitions.length];
      paragraph += ` ${transition}, ${sentence.toLowerCase()}`;
    });
    
    if (concludingSentence) {
      paragraph += ` Therefore, ${concludingSentence.toLowerCase()}`;
    }
    
    onContentChange(paragraph);
    setShowParagraphBuilder(false);
    setParagraphStructure({ topicSentence: '', supportSentences: [''], concludingSentence: '' });
    
    // Show celebration
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Simulate paraphrasing with more academic flair
  const paraphraseText = async () => {
    setIsParaphrasing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Enhanced paraphrasing with more scholarly tone
    const paraphrased = paraphraseInput
      .replace(/research/g, 'investigation')
      .replace(/study/g, 'examination')
      .replace(/shows/g, 'demonstrates')
      .replace(/important/g, 'significant')
      .replace(/because/g, 'due to the fact that')
      .replace(/look at/g, 'analyze')
      .replace(/find out/g, 'determine')
      .replace(/use/g, 'utilize')
      .replace(/big/g, 'substantial')
      .replace(/small/g, 'minimal')
      .replace(/a lot of/g, 'numerous')
      .replace(/get/g, 'obtain')
      .replace(/make/g, 'construct');
    
    setParaphraseOutput(paraphrased);
    setIsParaphrasing(false);
  };

  // Add support sentence field
  const addSupportSentence = () => {
    setParagraphStructure(prev => ({
      ...prev,
      supportSentences: [...prev.supportSentences, '']
    }));
  };

  // Update support sentence
  const updateSupportSentence = (index: number, value: string) => {
    setParagraphStructure(prev => ({
      ...prev,
      supportSentences: prev.supportSentences.map((sentence, i) => 
        i === index ? value : sentence
      )
    }));
  };

  // Insert transition word
  const insertTransition = (word: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + word + ' ' + content.substring(end);
      onContentChange(newContent);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start + word.length + 1, start + word.length + 1);
        }
      }, 0);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="font-medium">Excellent work! Your writing is powerful!</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Writing Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={analyzeContent}
            disabled={isAnalyzing || !content.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
          >
            <Wand2 size={16} />
            <span>{isAnalyzing ? 'Analyzing...' : 'AI Analysis'}</span>
          </button>
          
          <button
            onClick={() => setShowParagraphBuilder(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors"
          >
            <Target size={16} />
            <span>Paragraph Builder</span>
          </button>
          
          <button
            onClick={() => setShowTransitionHelper(!showTransitionHelper)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            <Link2 size={16} />
            <span>Transitions</span>
          </button>
          
          <button
            onClick={() => setShowParaphraseHelper(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
          >
            <Quote size={16} />
            <span>Paraphrase</span>
          </button>
          
          <div className="ml-auto">
            <select
              value={feedbackStyle}
              onChange={(e) => setFeedbackStyle(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="encouraging">Encouraging Feedback</option>
              <option value="coaching">Coaching Style</option>
              <option value="direct">Direct Feedback</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Text Editor + Suggestions (sticky on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="relative lg:col-span-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Start writing your academic content here... Your words have the power to transform understanding in your field!"
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        />
        
        {/* Word Count */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded">
          {content.split(/\s+/).filter(Boolean).length} words
        </div>
        
        {/* AI Feedback Overlay */}
        {feedback.length > 0 && (
          <div className="absolute top-2 right-2 z-10 space-y-2 max-w-xs">
            {feedback.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm ${
                  item.severity === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                  item.severity === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {item.severity === 'error' ? <AlertCircle size={16} /> :
                   item.severity === 'warning' ? <AlertCircle size={16} /> :
                   <Lightbulb size={16} />}
                  <div>
                    <p className="font-medium">{item.message}</p>
                    {item.suggestion && (
                      <p className="mt-1 opacity-90">{item.suggestion}</p>
                    )}
                    {feedbackStyle !== 'direct' && item.encouragement && (
                      <p className="mt-2 text-xs font-medium text-purple-700 dark:text-purple-300">
                        {item.encouragement}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

        {/* Suggestions Panel (second column) */}
        <div className="lg:sticky lg:top-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2 lg:mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Coaching Suggestions</h3>
            <details className="lg:hidden">
              <summary className="text-xs cursor-pointer text-gray-600 dark:text-gray-300">Toggle</summary>
              <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                <p>• Consider adding transition words to improve flow.</p>
                <p>• Use active voice for stronger assertions.</p>
                <p>• Ensure one paragraph has a clear topic and concluding sentence.</p>
              </div>
            </details>
          </div>
          <div className="hidden lg:block text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <div className="p-3 rounded bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">Consider adding transition words to improve flow.</div>
            <div className="p-3 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">Use active voice where appropriate to strengthen assertions.</div>
            <div className="p-3 rounded bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700">Ensure each paragraph has a topic sentence and a concluding sentence.</div>
          </div>
        </div>
      </div>

      {/* Section-Specific Writing Prompts */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
          <Lightbulb size={16} />
          <span>Writing Prompts for {sectionType.replace('-', ' ').toUpperCase()}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
          {sectionPrompts[sectionType].map((prompt, index) => (
            <button
              key={index}
              onClick={() => onContentChange(content + (content ? ' ' : '') + prompt)}
              className="w-full text-left p-3 text-sm bg-white dark:bg-gray-700 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-800/30 transition-colors break-words whitespace-normal overflow-hidden max-h-16"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Transition Helper */}
      {showTransitionHelper && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-purple-900 dark:text-purple-100 flex items-center">
              <Link2 size={16} className="mr-2" />
              Transition Words
            </h3>
            <button
              onClick={() => setShowTransitionHelper(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {Object.entries(transitionWords).map(([category, words]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2 capitalize">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {words.map((word) => (
                    <button
                      key={word}
                      onClick={() => insertTransition(word)}
                      className="px-3 py-1 text-sm bg-white dark:bg-gray-700 text-purple-800 dark:text-purple-200 rounded-full border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors transform hover:scale-105"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="text-pink-500" size={14} />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Why Transitions Matter
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thoughtful transitions create a seamless flow of ideas, guiding your reader through your scholarly narrative. They're the bridges that connect your brilliant insights into a cohesive, compelling argument.
            </p>
          </div>
        </div>
      )}

      {/* Paragraph Builder Modal */}
      {showParagraphBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Target size={20} className="mr-2 text-green-600" />
                  Paragraph Builder
                </h2>
                <button
                  onClick={() => setShowParagraphBuilder(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-lg mb-6 border border-green-200 dark:border-green-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="text-green-600" size={16} />
                    <h3 className="font-medium text-green-900 dark:text-green-100">
                      Crafting Powerful Paragraphs
                    </h3>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Strong academic paragraphs begin with a clear topic sentence, develop with supporting evidence, and conclude with a statement that reinforces your point or transitions to the next idea. This structure helps your reader follow your thinking and appreciate your unique insights.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic Sentence <span className="text-green-600">✓</span>
                  </label>
                  <textarea
                    value={paragraphStructure.topicSentence}
                    onChange={(e) => setParagraphStructure(prev => ({ ...prev, topicSentence: e.target.value }))}
                    placeholder="State the main idea of your paragraph with confidence..."
                    className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Supporting Sentences <span className="text-blue-600">✓</span>
                  </label>
                  {paragraphStructure.supportSentences.map((sentence, index) => (
                    <textarea
                      key={index}
                      value={sentence}
                      onChange={(e) => updateSupportSentence(index, e.target.value)}
                      placeholder={`Supporting point ${index + 1} (evidence, example, or explanation)...`}
                      className="w-full h-16 p-3 mb-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    />
                  ))}
                  <button
                    onClick={addSupportSentence}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus size={14} />
                    <span>Add Supporting Sentence</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Concluding Sentence <span className="text-purple-600">✓</span>
                  </label>
                  <textarea
                    value={paragraphStructure.concludingSentence}
                    onChange={(e) => setParagraphStructure(prev => ({ ...prev, concludingSentence: e.target.value }))}
                    placeholder="Summarize your point or transition to the next idea..."
                    className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={generateParagraph}
                    disabled={!paragraphStructure.topicSentence.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={16} />
                    <span>Generate Powerful Paragraph</span>
                  </button>
                  <button
                    onClick={() => setShowParagraphBuilder(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paraphrase Helper Modal */}
      {showParaphraseHelper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Quote size={20} className="mr-2 text-orange-600" />
                  Paraphrasing Assistant
                </h2>
                <button
                  onClick={() => setShowParaphraseHelper(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg mb-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="text-orange-600" size={16} />
                    <h3 className="font-medium text-orange-900 dark:text-orange-100">
                      Authentic Academic Voice
                    </h3>
                  </div>
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    Effective paraphrasing transforms ideas into your authentic voice while maintaining academic integrity. This tool helps you express concepts in your own words while preserving the original meaning—a crucial skill for showcasing your understanding and unique perspective.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Original Text
                  </label>
                  <textarea
                    value={paraphraseInput}
                    onChange={(e) => setParaphraseInput(e.target.value)}
                    placeholder="Paste the text you want to paraphrase..."
                    className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <button
                  onClick={paraphraseText}
                  disabled={!paraphraseInput.trim() || isParaphrasing}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <RefreshCw size={16} className={isParaphrasing ? 'animate-spin' : ''} />
                  <span>{isParaphrasing ? 'Transforming Text...' : 'Transform into Your Voice'}</span>
                </button>

                {paraphraseOutput && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Paraphrased Version
                    </label>
                    <div className="relative">
                      <textarea
                        value={paraphraseOutput}
                        readOnly
                        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(paraphraseOutput)}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        <strong>Remember:</strong> Always verify the paraphrased content maintains the original meaning and cite the source appropriately. This tool assists with rewording but doesn't replace your critical thinking and scholarly judgment.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      if (paraphraseOutput) {
                        onContentChange(content + (content ? ' ' : '') + paraphraseOutput);
                        setShowParaphraseHelper(false);
                        setParaphraseInput('');
                        setParaphraseOutput('');
                      }
                    }}
                    disabled={!paraphraseOutput}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Insert into Document
                  </button>
                  <button
                    onClick={() => setShowParaphraseHelper(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIWritingAssistant;
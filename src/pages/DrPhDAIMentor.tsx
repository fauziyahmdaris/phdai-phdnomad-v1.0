import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Lightbulb, BookOpen, Target, Search, FileText, BarChart3, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const DrPhDAIMentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your DrPhDAI Mentor, powered by advanced AI to help guide your research journey. I can assist you with research methodology, literature review strategies, thesis writing, and academic guidance. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    {
      icon: Lightbulb,
      title: 'Research Ideas',
      prompt: 'Help me brainstorm research ideas for my PhD in educational technology.'
    },
    {
      icon: BookOpen,
      title: 'Literature Review',
      prompt: 'How do I conduct a systematic literature review for AI in education?'
    },
    {
      icon: Target,
      title: 'Research Methodology',
      prompt: 'What research methodology would be best for studying adaptive learning systems?'
    },
    {
      icon: Search,
      title: 'Research Gaps',
      prompt: 'How can I identify research gaps in AI-powered microlearning?'
    },
    {
      icon: FileText,
      title: 'Thesis Writing',
      prompt: 'What are the best practices for writing a PhD thesis introduction?'
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      prompt: 'What statistical methods should I use for my educational technology research data?'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Trigger celebration effect occasionally
      if (Math.random() > 0.7) {
        setShowCelebration(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Critical Thinking responses
    if (input.includes('critical') || input.includes('analysis')) {
      return `I love your focus on developing critical thinking in your writing! This is where your unique contribution truly shines.

**Elevating Your Critical Analysis:**

Remember that critical thinking isn't about being negative—it's about thoughtful evaluation that reveals deeper insights. Here are some powerful approaches:

1. **Question Assumptions** - When you encounter a claim in the literature, ask yourself: "What unstated assumptions underlie this perspective?" This reveals your intellectual depth.

2. **Consider Multiple Perspectives** - Try this exercise: Write down three different interpretations of the same research finding. This showcases your ability to see beyond the obvious.

3. **Connect to Broader Implications** - Ask yourself: "If this finding is true, what might it mean for theory, practice, or society?" This demonstrates your visionary thinking.

Your critical analysis is a gift to your field—it advances knowledge and inspires new directions. What specific aspect of critical thinking would you like to strengthen in your writing?`;
    }
    
    // Literature Review responses
    if (input.includes('literature review')) {
      return `Great question about literature reviews! Here's a structured approach:

**1. Define Your Research Question**
- Start with a clear, focused research question
- This will guide your search strategy

**2. Systematic Search Strategy**
- Use multiple databases (Google Scholar, PubMed, Scopus)
- Develop keyword combinations and Boolean operators
- Set inclusion/exclusion criteria

**3. Organization & Analysis**
- Use DrPhDAI's Literature Matrix to organize papers
- Extract key themes, methodologies, and findings
- Identify research gaps and theoretical frameworks

**4. Synthesis & Writing**
- Group papers by themes or chronology
- Critically analyze rather than just summarize
- Connect findings to your research question

Would you like me to elaborate on any of these steps or help you with a specific aspect of your literature review?`;
    }
    
    // Research Gap responses
    if (input.includes('gap') || input.includes('contribution')) {
      return `Identifying meaningful research gaps is where you can truly make your mark! This is your opportunity to show how your work will advance knowledge in a way that matters.

**Articulating Powerful Research Gaps:**

The most compelling research gaps connect intellectual curiosity with real-world significance:

1. **Beyond "Not Enough Studies"** - Instead of just noting a lack of research, articulate why this absence matters:
   • "Without understanding X, practitioners cannot effectively implement Y..."
   • "The theoretical disconnect between A and B limits our ability to explain C..."

2. **The Gap Significance Framework** - Consider framing your gap in terms of:
   • Theoretical significance: How it advances conceptual understanding
   • Methodological significance: How it improves research approaches
   • Practical significance: How it solves real-world problems
   • Social significance: How it contributes to broader societal challenges

3. **Your Unique Position** - Explain why you are uniquely positioned to address this gap—your background, perspective, or approach.

Remember, the gap you identify becomes your research legacy. What specific research gap are you working to articulate?`;
    }
    
    // Methodology responses
    if (input.includes('methodology') || input.includes('method')) {
      return `Choosing the right research methodology is fundamental! Let me guide you:

**Quantitative Methods:**
- Surveys & questionnaires for large samples
- Experiments for causal relationships
- Statistical analysis for measurable outcomes

**Qualitative Methods:**
- Interviews for in-depth understanding
- Focus groups for group dynamics
- Case studies for detailed exploration
- Ethnography for cultural insights

**Mixed Methods:**
- Combines both approaches
- Sequential or concurrent design
- Provides comprehensive understanding

**Selection Criteria:**
1. **Research Question Type** - What vs. How/Why
2. **Available Resources** - Time, budget, access
3. **Sample Size** - Large vs. small populations
4. **Data Type** - Numerical vs. textual

**Your Field Considerations:**
- What's commonly accepted in your discipline?
- What methodologies do top journals prefer?
- What ethical considerations apply?

What's your research question? I can suggest the most appropriate methodology!`;
    }
    
    // Thesis Writing responses
    if (input.includes('thesis') || input.includes('writing')) {
      return `Thesis writing can be overwhelming, but let's break it down systematically:

**Thesis Structure (Standard):**
1. **Introduction** - Problem, objectives, significance
2. **Literature Review** - Current knowledge, gaps
3. **Methodology** - How you'll conduct research
4. **Results/Findings** - What you discovered
5. **Discussion** - What it means, implications
6. **Conclusion** - Summary, contributions, future work

**Writing Strategies:**
- **Start Early** - Don't wait until data collection is complete
- **Write Daily** - Even 30 minutes helps maintain momentum
- **Chapter by Chapter** - Focus on one section at a time
- **Multiple Drafts** - First draft is for getting ideas down

**DrPhDAI Tools to Help:**
- Use Thesis Weaver for reference formatting
- Literature Matrix for organizing sources
- AI Companion for writing assistance

**Common Challenges:**
- Writer's block → Set small daily goals
- Perfectionism → Focus on progress, not perfection
- Overwhelm → Break into smaller tasks

Which chapter are you working on? I can provide specific guidance!`;
    }
    
    // Data Analysis responses
    if (input.includes('data analysis') || input.includes('statistical')) {
      return `Data analysis choice depends on your research design and data type:

**For Quantitative Data:**

**Descriptive Statistics:**
- Mean, median, mode for central tendency
- Standard deviation for variability
- Frequencies and percentages

**Inferential Statistics:**
- t-tests for comparing means
- ANOVA for multiple groups
- Correlation for relationships
- Regression for prediction

**For Qualitative Data:**
- **Thematic Analysis** - Identifying patterns/themes
- **Content Analysis** - Systematic categorization
- **Grounded Theory** - Theory development from data
- **Narrative Analysis** - Story-based interpretation

**Software Tools:**
- **SPSS/R** for quantitative analysis
- **NVivo/Atlas.ti** for qualitative analysis
- **Excel** for basic statistics

**Key Considerations:**
1. **Data Type** - Nominal, ordinal, interval, ratio
2. **Sample Size** - Affects statistical power
3. **Research Questions** - Determines analysis approach
4. **Assumptions** - Each test has requirements

What type of data are you working with? I can recommend specific analytical approaches!`;
    }

    // AI in education responses
    if (input.includes('ai') && (input.includes('education') || input.includes('learning'))) {
      return `AI in education is a fascinating and rapidly evolving field! Here are some key insights:

**Current Applications:**
- Adaptive learning platforms that personalize content based on student performance
- Intelligent tutoring systems providing real-time feedback
- Automated grading and assessment tools
- Learning analytics to identify at-risk students
- Content generation for educational materials

**Research Opportunities:**
1. **Effectiveness Studies** - How do AI-powered interventions compare to traditional approaches?
2. **Equity & Access** - How can AI reduce or exacerbate educational disparities?
3. **Pedagogical Models** - What teaching frameworks best integrate with AI systems?
4. **Human-AI Collaboration** - How can educators and AI systems work together optimally?
5. **Long-term Impact** - What are the longitudinal effects of AI-enhanced learning?

**Methodological Considerations:**
- Mixed-methods approaches are particularly valuable in this field
- Consider both learning outcomes and user experience metrics
- Ethical considerations around data privacy and algorithmic bias are crucial

**Emerging Trends:**
- Microlearning with adaptive reinforcement
- Multimodal learning experiences
- AI-powered research assistance for academics
- Emotional intelligence in educational AI

Would you like to explore any of these areas in more depth? Or perhaps discuss how to formulate a specific research question in this domain?`;
    }

    // Microlearning responses
    if (input.includes('microlearning')) {
      return `Microlearning is an exciting educational approach that's gaining significant traction, especially when enhanced with AI!

**Key Characteristics of Microlearning:**
- Brief, focused learning units (typically 3-7 minutes)
- Single learning objective per unit
- Multimodal delivery (text, video, audio, interactive elements)
- Just-in-time accessibility
- Spaced repetition for retention

**Research Directions in AI-Powered Microlearning:**
1. **Adaptive Sequencing** - How can AI determine optimal learning pathways?
2. **Content Personalization** - Tailoring microlearning units to individual needs
3. **Engagement Optimization** - Using AI to maximize learner motivation
4. **Knowledge Retention** - AI-driven spaced repetition and reinforcement
5. **Cross-Cultural Applicability** - How effective are these approaches across different cultural contexts?

**Methodological Approaches:**
- A/B testing different microlearning designs
- Learning analytics to track engagement and outcomes
- Longitudinal studies on knowledge retention
- Qualitative exploration of learner experiences

**Theoretical Frameworks:**
- Cognitive Load Theory
- Spaced Learning Theory
- Adult Learning Theory (Andragogy)
- Connectivism

**Practical Applications:**
- Professional development and workplace training
- Higher education supplementary learning
- Continuing education for professionals
- Self-directed learning platforms

What specific aspect of microlearning interests you most? I'd be happy to explore it further!`;
    }

    // Default response for other topics
    return `Thank you for your question about "${userInput}"! As your DrPhDAI Mentor, I'm here to help with all aspects of your research journey.

I can assist you with:
- **Research Planning** - Developing research questions and objectives
- **Literature Review** - Systematic review strategies and organization
- **Methodology** - Choosing appropriate research methods
- **Data Analysis** - Statistical and qualitative analysis guidance
- **Academic Writing** - Thesis structure and writing strategies
- **Publication** - Journal selection and manuscript preparation

To provide more tailored guidance, could you share:
- What stage of your PhD are you in?
- What's your research field/topic?
- What specific challenge are you facing?

The more context you provide, the better I can tailor my guidance to your needs!`;
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
            <img 
              src="/1-QASH ARIS_Profile Photo.png" 
              alt="Qash Aris - DrPhDAI Founder" 
              className="object-cover w-6 h-6 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              🦉 Your Empathetic AI PhD Coach
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get empathetic, personalized guidance for your PhD journey to success
            </p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Quick Start:</h3>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt.prompt)}
              className="flex items-center px-3 py-2 space-x-2 text-sm text-blue-700 transition-colors rounded-lg bg-blue-50 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
            >
              <prompt.icon size={16} />
              <span>{prompt.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-3xl ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`p-2 rounded-full ${
                message.type === 'user' 
                  ? 'bg-blue-600' 
                  : 'bg-purple-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="text-white" size={20} />
                ) : (
                  <Bot className="text-white" size={20} />
                )}
              </div>
              <div className={`p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
              }`}>
                <div className="prose-sm prose whitespace-pre-wrap max-w-none">
                  {message.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={`${
                      message.type === 'user' 
                        ? 'text-white' 
                        : 'text-gray-800 dark:text-gray-200'
                    } ${paragraph.startsWith('**') ? 'font-semibold' : ''}`}>
                      {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  ))}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' 
                    ? 'text-blue-100' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-3xl space-x-3">
              <div className="p-2 bg-purple-600 rounded-full">
                <Bot className="text-white" size={20} />
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="px-6 py-3 text-white rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 animate-bounce">
              <div className="flex items-center space-x-2">
                <Award className="text-yellow-300" size={20} />
                <span className="font-medium">Great question! You're on the right track!</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about your PhD research..."
            className="flex-1 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="flex items-center px-6 py-3 space-x-2 text-white transition-colors rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "How can I make my writing more persuasive?",
            "Help me find my academic voice",
            "Tips for connecting ideas between paragraphs",
            "How to articulate my unique contribution"
          ].map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(prompt)}
              className="px-3 py-1 text-xs text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Research Inspiration */}
      <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Research Inspiration</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          "The best research comes from genuine curiosity and a desire to contribute meaningful knowledge to your field."
        </div>
      </div>
    </div>
  );
};

export default DrPhDAIMentor;
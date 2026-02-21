import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  User, 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb, 
  Target, 
  FileText, 
  BookOpen,
  ArrowRight,
  Award,
  Heart
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const WritingCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your personal writing coach, here to help you craft powerful academic prose that reflects your passion and purpose. What aspect of your writing would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const writingTopics = [
    {
      id: 'critical-thinking',
      title: 'Critical Thinking',
      icon: Lightbulb,
      description: 'Develop deeper analysis and evaluation'
    },
    {
      id: 'argument-building',
      title: 'Argument Building',
      icon: Target,
      description: 'Craft compelling, evidence-based arguments'
    },
    {
      id: 'academic-voice',
      title: 'Academic Voice',
      icon: FileText,
      description: 'Establish your scholarly authority'
    },
    {
      id: 'research-gaps',
      title: 'Research Gaps',
      icon: BookOpen,
      description: 'Articulate meaningful research gaps'
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
      const aiResponse = generateAIResponse(inputMessage, selectedTopic);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, topic: string | null): string => {
    const input = userInput.toLowerCase();
    
    // Critical Thinking responses
    if (topic === 'critical-thinking' || input.includes('critical') || input.includes('analysis')) {
      return `I love your focus on developing critical thinking in your writing! This is where your unique contribution truly shines.

**Elevating Your Critical Analysis:**

Remember that critical thinking isn't about being negative—it's about thoughtful evaluation that reveals deeper insights. Here are some powerful approaches:

1. **Question Assumptions** - When you encounter a claim in the literature, ask yourself: "What unstated assumptions underlie this perspective?" This reveals your intellectual depth.

2. **Consider Multiple Perspectives** - Try this exercise: Write down three different interpretations of the same research finding. This showcases your ability to see beyond the obvious.

3. **Connect to Broader Implications** - Ask yourself: "If this finding is true, what might it mean for theory, practice, or society?" This demonstrates your visionary thinking.

Your critical analysis is a gift to your field—it advances knowledge and inspires new directions. What specific aspect of critical thinking would you like to strengthen in your writing?`;
    }
    
    // Argument Building responses
    if (topic === 'argument-building' || input.includes('argument') || input.includes('persuasive')) {
      return `Building compelling arguments is where your research truly makes its mark on the world! I'm excited to help you craft arguments that resonate with power and purpose.

**Creating Persuasive Academic Arguments:**

The most influential academic arguments combine logical structure with meaningful evidence:

1. **Start with Your "Why"** - Before crafting your argument, reconnect with why this research matters to you personally. This passion will subtly infuse your writing with authenticity.

2. **Build a Logical Scaffold** - Structure your argument like a journey:
   • Begin with common ground (what's already accepted)
   • Introduce tension (the problem or gap)
   • Present your resolution (your unique contribution)
   • Explore implications (why it matters)

3. **Evidence Hierarchy** - Not all evidence carries equal weight. Consider arranging evidence from:
   • Most credible/recent to supporting
   • Most surprising to expected
   • Most relevant to contextual

Remember, your argument isn't just about being "right"—it's about advancing understanding in your field in a way that only you can. What specific argument are you currently developing?`;
    }
    
    // Academic Voice responses
    if (topic === 'academic-voice' || input.includes('voice') || input.includes('tone') || input.includes('style')) {
      return `Finding your authentic academic voice is such an exciting journey! Your unique perspective is what makes your contribution to knowledge truly special.

**Developing Your Scholarly Voice:**

Your academic voice is the perfect balance between disciplinary conventions and your authentic self:

1. **Authority with Humility** - Use confident language when presenting your analysis ("This demonstrates..." rather than "This might suggest..."), while maintaining appropriate humility when discussing limitations.

2. **Strategic Pronouns** - Consider when to use:
   • "I" - For your unique contributions and methodological decisions
   • "We" - For guiding the reader through your argument
   • Passive voice - For established processes or when the actor is less important

3. **Emotional Intelligence in Academic Writing** - While maintaining objectivity, you can still convey:
   • Enthusiasm: "This finding offers compelling evidence..."
   • Concern: "These results raise important questions about..."
   • Conviction: "The data clearly demonstrate..."

Your voice matters—it's how your ideas will resonate and be remembered. What aspect of your academic voice would you like to develop further?`;
    }
    
    // Research Gaps responses
    if (topic === 'research-gaps' || input.includes('gap') || input.includes('contribution')) {
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

    // Default response for other topics
    return `Thank you for sharing your thoughts! Your passion for your research shines through in your message.

As your writing coach, I'm here to help you express your ideas with clarity, conviction, and purpose. Your research has the potential to create meaningful impact, and effective writing is how you'll share that gift with the world.

I'd love to explore more about:
- The specific writing challenges you're facing
- What aspect of your research excites you most
- How you hope your writing will influence others in your field

Remember, your unique perspective is what makes your contribution valuable. What specific aspect of academic writing would you like guidance on today?`;
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    
    const topic = writingTopics.find(t => t.id === topicId);
    if (topic) {
      const message = `I'd like help with ${topic.title.toLowerCase()}, specifically ${topic.description.toLowerCase()}.`;
      setInputMessage(message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <MessageSquare className="mr-2" size={24} />
          Your Personal Writing Coach
        </h2>
        <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
          <Heart className="text-purple-600 dark:text-purple-400" size={16} />
          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Writing with Purpose</span>
        </div>
      </div>

      {/* Topic Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {writingTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicSelect(topic.id)}
            className={`p-4 rounded-lg border text-left transition-all transform hover:scale-105 ${
              selectedTopic === topic.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${
                selectedTopic === topic.id
                  ? 'bg-purple-100 dark:bg-purple-800'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                <topic.icon 
                  className={`${
                    selectedTopic === topic.id
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  size={16}
                />
              </div>
              <h3 className={`font-medium ${
                selectedTopic === topic.id
                  ? 'text-purple-900 dark:text-purple-100'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {topic.title}
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {topic.description}
            </p>
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                    ? 'bg-purple-600' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="text-white" size={20} />
                  ) : (
                    <Bot className="text-white" size={20} />
                  )}
                </div>
                <div className={`p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="whitespace-pre-wrap prose prose-sm max-w-none">
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
                      ? 'text-purple-200' 
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
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Bot className="text-white" size={20} />
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about academic writing, structure, or finding your voice..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "How can I make my writing more persuasive?",
              "Help me find my academic voice",
              "Tips for connecting ideas between paragraphs",
              "How to articulate my unique contribution"
            ].map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(prompt)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Writing Inspiration */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Sparkles className="mr-2" size={24} />
          Writing Inspiration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 p-5 rounded-lg">
            <h3 className="font-semibold mb-3">Connect to Your Purpose</h3>
            <p className="text-sm mb-4">
              Your research isn't just an academic exercise—it's your contribution to human knowledge and progress.
            </p>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Heart size={16} className="text-pink-200" />
              </div>
              <p className="text-sm italic">
                "The best writing comes from a place of genuine curiosity and purpose."
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 p-5 rounded-lg">
            <h3 className="font-semibold mb-3">Embrace Your Unique Voice</h3>
            <p className="text-sm mb-4">
              Academic writing doesn't have to be dry or impersonal. Your authentic perspective is what makes your work valuable.
            </p>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Award size={16} className="text-pink-200" />
              </div>
              <p className="text-sm italic">
                "Your voice is the thread that weaves your research into the fabric of your field."
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white/10 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <Target size={16} className="mr-2" />
            Today's Writing Goal
          </h3>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-2 bg-white rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <span className="ml-4 text-sm font-medium">65%</span>
          </div>
          <p className="text-sm mt-2">
            You're making excellent progress! Just 350 more words to reach today's goal.
          </p>
        </div>
      </div>

      {/* Examiner's Perspective */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Target className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Examiner's Lens
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              See your writing through your examiner's eyes
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
              What Examiners Love to See
            </h3>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Clear articulation of your original contribution to knowledge</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Critical engagement with literature, not just description</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Logical flow of arguments with strong transitions between sections</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Thoughtful consideration of limitations and alternative interpretations</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-r-lg">
            <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
              Common Examiner Concerns
            </h3>
            <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Lack of critical analysis ("descriptive rather than analytical")</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Unclear research contribution or significance</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Disconnected arguments without clear logical progression</span>
              </li>
              <li className="flex items-start">
                <ArrowRight size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>Overreliance on a limited range of sources</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Pro Tip:</strong> Periodically review your writing from an examiner's perspective. Ask yourself: "If I were evaluating this work, what questions or concerns might I have?" This perspective shift can significantly strengthen your arguments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WritingCoach;
import React, { useState } from 'react';
import { Bot, MessageSquare, Search, Lightbulb, BookOpen, FileText, Award, Copy, MessageCircle, HelpCircle, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AICompanionProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// No API keys needed in MVP: we deep-link users to their preferred GAI

const PROMPT_TEMPLATES = [
  {
    id: 'research-brainstorm',
    title: 'Research Brainstorming',
    icon: Lightbulb,
    recommendedGAI: ['ChatGPT', 'Claude'],
    prompt: `I need help brainstorming and exploring ideas for my PhD research. Let's have a creative, exploratory conversation about:

**My Current Situation:**
Research stage: [e.g., early exploration, proposal writing, data collection, analysis]
Research area/field: [YOUR FIELD]
Current focus: [WHAT YOU'RE WORKING ON]

**What I'm Struggling With:**
[Describe your current challenges, questions, or areas where you need creative input]

**Questions I Have:**
[List specific questions or areas where you need guidance]

Please help me:
1. Explore different angles and perspectives
2. Generate creative solutions to challenges
3. Identify potential research directions
4. Brainstorm methodological approaches
5. Consider interdisciplinary connections
6. Think through practical implications

Let's have an interactive conversation where you ask me probing questions and help me think through ideas systematically.`
  },
  {
    id: 'problem-solving',
    title: 'Research Problem Solver',
    icon: HelpCircle,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `I'm facing a specific challenge in my PhD research and need help problem-solving. Let's work through this systematically:

**The Problem:**
[Describe your specific challenge - could be methodological, theoretical, practical, writing-related, etc.]

**Context:**
Research topic: [YOUR RESEARCH TOPIC]
Current stage: [WHERE YOU ARE IN YOUR PhD]
What I've tried so far: [PREVIOUS ATTEMPTS]

**Constraints:**
[Any limitations - time, resources, access, etc.]

**Desired Outcome:**
[What would success look like?]

Please help me:
1. Break down the problem into manageable parts
2. Identify root causes and contributing factors
3. Generate multiple potential solutions
4. Evaluate pros and cons of each approach
5. Create an action plan with specific steps
6. Anticipate potential obstacles and solutions

Let's work through this step-by-step with a structured problem-solving approach.`
  },
  {
    id: 'motivation-support',
    title: 'Motivation & Support',
    icon: MessageCircle,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `I need some motivational support and guidance for my PhD journey. I'm looking for encouragement, perspective, and practical advice:

**Current Situation:**
Where I am in my PhD: [CURRENT STAGE]
Recent challenges: [WHAT'S BEEN DIFFICULT]
Current mood/motivation level: [HOW YOU'RE FEELING]

**Specific Areas Where I Need Support:**
[e.g., imposter syndrome, work-life balance, writer's block, research anxiety, time management]

**My Goals:**
Short-term: [IMMEDIATE GOALS]
Long-term: [BIGGER PICTURE GOALS]

Please provide:
1. Encouragement and perspective on PhD challenges
2. Practical strategies for staying motivated
3. Advice on managing PhD-specific stress
4. Reminders about the value and impact of my research
5. Suggestions for maintaining work-life balance
6. Tips for celebrating small wins and progress

I'd appreciate both emotional support and practical guidance to help me stay focused and motivated on this journey.`
  }
];

const aiTools = [
  {
    name: 'ChatGPT',
    description: 'Find Early Research Gaps',
    icon: MessageSquare,
    color: 'bg-green-600',
    prompt: 'I am researching [TOPIC]. Help me identify potential research gaps in this field that could be worth investigating for my PhD thesis.',
    url: 'https://chat.openai.com/'
  },
  {
    name: 'Perplexity',
    description: 'Research Ideas Brainstorming',
    icon: Lightbulb,
    color: 'bg-blue-600',
    prompt: 'Generate innovative research questions and methodological approaches for studying [TOPIC] in the context of [FIELD].',
    url: 'https://www.perplexity.ai/'
  },
  {
    name: 'Perplexity',
    description: 'Research Methodology Suggestions',
    icon: Search,
    color: 'bg-purple-600',
    prompt: 'What are the most appropriate research methodologies for investigating [RESEARCH QUESTION] in [FIELD]? Include both quantitative and qualitative approaches.',
    url: 'https://www.perplexity.ai/'
  },
  {
    name: 'Gemini',
    description: 'Fact Checking Sources',
    icon: BookOpen,
    color: 'bg-orange-600',
    prompt: 'Please help me verify the credibility and accuracy of these research claims: [PASTE CLAIMS]. Check for supporting evidence and potential contradictions.',
    url: 'https://gemini.google.com/'
  },
  {
    name: 'Perplexity',
    description: 'Find Latest Research',
    icon: Search,
    color: 'bg-teal-600',
    prompt: 'Find the most recent research papers (2023-2024) in [TOPIC]. Focus on high-impact journals and emerging trends.',
    url: 'https://www.perplexity.ai/'
  },
  {
    name: 'Gemini',
    description: 'Find Top Scholars',
    icon: Award,
    color: 'bg-indigo-600',
    prompt: 'Who are the leading researchers and scholars in [FIELD]? Provide their key contributions, recent publications, and institutional affiliations.',
    url: 'https://gemini.google.com/'
  },
  {
    name: 'ChatGPT',
    description: 'LR Matrix Synthesis Assistant',
    icon: FileText,
    color: 'bg-pink-600',
    prompt: 'Based on my literature review matrix data: [PASTE MATRIX DATA], help me synthesize the key themes, identify patterns, and suggest how to organize my literature review chapter.',
    url: 'https://chat.openai.com/'
  },
  {
    name: 'Perplexity',
    description: 'Write My LR Abstract',
    icon: FileText,
    color: 'bg-cyan-600',
    prompt: 'Help me write an abstract for my literature review chapter. My research focuses on [TOPIC], covers [KEY THEMES], and identifies [RESEARCH GAPS].',
    url: 'https://www.perplexity.ai/'
  },
  {
    name: 'Gemini',
    description: 'Grant Application Generator',
    icon: Award,
    color: 'bg-red-600',
    prompt: 'Help me draft a research grant proposal for my PhD project on [TOPIC]. Include objectives, methodology, significance, and budget considerations.',
    url: 'https://gemini.google.com/'
  },
  {
    name: 'Perplexity',
    description: 'Final Literature Review Draft',
    icon: BookOpen,
    color: 'bg-emerald-600',
    prompt: 'Based on my research on [TOPIC], help me create a structured outline for my literature review chapter with proper academic flow and organization.',
    url: 'https://www.perplexity.ai/'
  },
];

const AICompanion: React.FC<AICompanionProps> = ({ open, onOpenChange }) => {
  const [response] = useState<string | null>(null);
  const [, setSelectedPrompt] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use provided open/onOpenChange or internal state
  const dialogOpen = open !== undefined ? open : isDialogOpen;
  const handleOpenChange = onOpenChange || setIsDialogOpen;

  const handleAIToolClick = async (tool: typeof aiTools[0]) => {
    const userInput = prompt('Enter your research details (e.g., topic, field, claims):');
    if (userInput) {
      const fullPrompt = tool.prompt
        .replace(/\[TOPIC\]/g, userInput)
        .replace(/\[FIELD\]/g, userInput)
        .replace(/\[RESEARCH QUESTION\]/g, userInput)
        .replace(/\[PASTE CLAIMS\]/g, userInput)
        .replace(/\[PASTE MATRIX DATA\]/g, userInput)
        .replace(/\[KEY THEMES\]/g, userInput)
        .replace(/\[RESEARCH GAPS\]/g, userInput);
      // Copy prompt to clipboard for convenience
      copyToClipboard(fullPrompt);
      // Open the external tool in a new tab
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    });
  };

  const copyPrompt = (prompt: string) => {
    copyToClipboard(prompt);
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCustomPrompt(prompt);
  };

  // If used as a dialog component
  if (open !== undefined) {
    return (
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              AI Companion - Research Support & Guidance
            </DialogTitle>
            <DialogDescription>
              Your AI research companion for brainstorming, problem-solving, and motivational support. 
              Get personalized guidance for any aspect of your PhD journey.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {PROMPT_TEMPLATES.map((template) => {
                const Icon = template.icon;
                return (
                  <Card 
                    key={template.id} 
                    className="transition-shadow cursor-pointer hover:shadow-md"
                    onClick={() => handlePromptSelect(template.prompt)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-indigo-600" />
                        <CardTitle className="text-sm">{template.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {template.recommendedGAI.map((gai) => (
                          <Badge key={gai} variant="outline" className="text-xs">
                            {gai}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected Prompt</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(customPrompt)}
                  disabled={!customPrompt}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Prompt
                </Button>
              </div>
              
              <Textarea
                placeholder="Select a template above or write your custom prompt here..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
              <h4 className="mb-2 font-medium text-indigo-900">🤝 Companion Tips:</h4>
              <ul className="space-y-1 text-sm text-indigo-800">
                <li>• Use Claude for empathetic, nuanced conversations and creative brainstorming</li>
                <li>• Use ChatGPT for structured problem-solving and practical advice</li>
                <li>• Be specific about your challenges for more targeted support</li>
                <li>• Engage in back-and-forth conversations for deeper insights</li>
                <li>• Remember: AI companions supplement but don't replace human mentorship</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
              <Button 
                onClick={() => {
                  copyToClipboard(customPrompt);
                  handleOpenChange(false);
                }}
                disabled={!customPrompt}
              >
                Copy & Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Original full-page component
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
        <div className="flex items-center mb-4 space-x-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Research Companion</h1>
            <p className="text-orange-100">
              Direct access to AI tools for enhanced research assistance
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/10">
          <h3 className="mb-2 font-semibold">🚀 How to Use AI Companion</h3>
          <ol className="space-y-1 text-sm text-orange-100 list-decimal list-inside">
            <li>Click the "Generate Now" button on any AI tool card below</li>
            <li>Enter your research details when prompted</li>
            <li>View the AI-generated response directly here</li>
            <li>Copy the prompt or response for your work</li>
          </ol>
        </div>
      </div>

      {/* AI Ethics Notice */}
      <div className="p-6 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-700 rounded-xl">
        <h2 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
          ⚠️ AI Ethics & Academic Integrity
        </h2>
        <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
          <p><strong>Always verify and refine AI outputs</strong> — DrPhDAI is your research assistant, not your replacement.</p>
          <p><strong>You are the scholar. AI is your tool.</strong> Use AI to enhance your thinking, not replace critical analysis.</p>
          <p><strong>Maintain academic integrity:</strong> Always cite sources, fact-check claims, and add your own scholarly interpretation.</p>
          <p><strong>AI-generated content must be disclosed</strong> when required by your institution's policies.</p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="p-6 border border-blue-200 bg-blue-50 dark:bg-blue-900/40 dark:border-blue-800 rounded-xl">
        <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">Important Notice for DrPhDAI Users</h2>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          The Guided Prompts within ‘The Direct access to AI tools for enhanced research assistance’ were assisted by GAI-powered tools, inspired by and adapted from Dr. Andy Stapleton’s YouTube videos.
        </p>
        <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
          Reference: Andy Stapleton. (2025). YouTube. Retrieved April 26, 2025, from
          <a href="https://www.youtube.com/@DrAndyStapleton" target="_blank" rel="noopener noreferrer" className="ml-1 underline">https://www.youtube.com/@DrAndyStapleton</a>
        </p>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool, index) => (
          <div
            key={index}
            className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${tool.color}`}>
                <tool.icon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  {tool.name}
                </div>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              {tool.description}
            </h3>

            <div className="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <p className="font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {tool.prompt}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => handleAIToolClick(tool)}
                className={`flex-1 ${tool.color} text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
              >
                <ExternalLink size={16} />
                <span>Open {tool.name}</span>
              </Button>
              <Button
                onClick={() => copyPrompt(tool.prompt)}
                variant="outline"
                size="sm"
                className="flex items-center justify-center px-3 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                title="Copy prompt"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Response Display */}
      {response && (
        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            AI Response
          </h2>
          <div className="p-4 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-sm text-gray-700 whitespace-pre-wrap dark:text-gray-300">
              {response}
            </p>
          </div>
          <Button
            onClick={() => copyPrompt(response || '')}
            variant="outline"
            className="flex items-center justify-center px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            title="Copy response"
          >
            <Copy size={16} /> <span className="ml-2">Copy Response</span>
          </Button>
        </div>
      )}

      {/* Research Workflow Tips */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          🎯 Suggested Research Workflow
        </h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Phase 1: Exploration & Discovery
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-400">1</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Start with <strong>Research Ideas Brainstorming</strong> to explore your topic</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-400">2</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Use <strong>Find Latest Research</strong> to discover current literature</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-400">3</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Identify <strong>Top Scholars</strong> in your field for key perspectives</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Phase 2: Analysis & Synthesis
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-400">4</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Use <strong>Fact Checking</strong> to verify your sources and claims</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-400">5</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Apply <strong>LR Matrix Synthesis</strong> to organize your findings</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-400">6</div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Find <strong>Research Gaps</strong> to position your contribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Search, BookOpen, Network } from 'lucide-react';
import { toast } from 'sonner';

interface ResearchNavigatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROMPT_TEMPLATES = [
  {
    id: 'literature-search',
    title: 'Literature Search Strategy',
    icon: Search,
    recommendedGAI: ['ChatGPT', 'Gemini'],
    prompt: `Help me develop a comprehensive literature search strategy for my PhD research. I need guidance on:

1. Key search terms and synonyms
2. Relevant databases and sources
3. Inclusion/exclusion criteria
4. Search string combinations
5. Citation tracking methods

My research topic: [YOUR RESEARCH TOPIC]
My research questions: [YOUR RESEARCH QUESTIONS]
Discipline/Field: [YOUR ACADEMIC FIELD]
Time frame for literature: [e.g., last 10 years, all time]

Please provide a systematic approach to finding and organizing relevant literature, including Boolean search strategies and database recommendations.`
  },
  {
    id: 'literature-synthesis',
    title: 'Literature Review Synthesis',
    icon: BookOpen,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `I need help synthesizing my literature review findings. Please help me:

1. Identify major themes and patterns
2. Organize findings by theoretical frameworks
3. Highlight research gaps and contradictions
4. Connect studies to my research questions
5. Create a coherent narrative structure

My research area: [YOUR RESEARCH AREA]
Key papers I've found: [LIST 5-10 KEY PAPERS WITH AUTHORS]
My research focus: [YOUR SPECIFIC FOCUS]

Please guide me in creating a well-structured literature review that demonstrates deep understanding and identifies clear research gaps.`
  },
  {
    id: 'gap-analysis',
    title: 'Research Gap Analysis',
    icon: Network,
    recommendedGAI: ['Claude', 'Gemini'],
    prompt: `Help me conduct a thorough research gap analysis for my PhD project. I want to identify:

1. What has been studied extensively
2. What remains unexplored or understudied
3. Methodological gaps in existing research
4. Theoretical frameworks that need development
5. Practical applications that are missing

My research domain: [YOUR RESEARCH DOMAIN]
Current literature themes I've identified: [LIST MAIN THEMES]
My proposed contribution: [YOUR INTENDED CONTRIBUTION]

Please help me articulate clear, significant research gaps that justify my PhD project and demonstrate its potential impact.`
  }
];

export default function ResearchNavigator({ open, onOpenChange }: ResearchNavigatorProps) {
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied to clipboard!');
  };

  const handlePromptSelect = (prompt: string) => {
    setCustomPrompt(prompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Research Navigator - Literature Review & Synthesis
          </DialogTitle>
          <DialogDescription>
            Navigate through literature review and synthesis with AI-powered guidance. 
            Find, analyze, and synthesize academic sources effectively.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROMPT_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePromptSelect(template.prompt)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-green-600" />
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
                <Copy className="h-4 w-4 mr-1" />
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

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">📚 Literature Review Tips:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Use ChatGPT for fast literature summarization and theme identification</li>
              <li>• Use Claude for synthesizing complex findings and narrative development</li>
              <li>• Use Gemini for fact-checking and processing multiple document formats</li>
              <li>• Keep track of citation details for proper referencing</li>
              <li>• Organize findings by themes, methodologies, or chronological order</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                copyToClipboard(customPrompt);
                onOpenChange(false);
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
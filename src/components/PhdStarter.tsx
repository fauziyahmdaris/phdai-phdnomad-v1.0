import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, FileText, Lightbulb, Target } from 'lucide-react';
import { toast } from 'sonner';

interface PhdStarterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROMPT_TEMPLATES = [
  {
    id: 'proposal-structure',
    title: 'Research Proposal Structure',
    icon: FileText,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `I need help structuring a PhD research proposal. Please help me create a comprehensive outline that includes:

1. Research Title and Abstract
2. Problem Statement and Research Questions
3. Literature Review Framework
4. Methodology and Research Design
5. Timeline and Milestones
6. Expected Contributions

My research area is: [DESCRIBE YOUR RESEARCH AREA]
My preliminary research question is: [YOUR RESEARCH QUESTION]

Please provide a detailed structure with explanations for each section and suggest specific elements I should include in each part.`
  },
  {
    id: 'research-questions',
    title: 'Research Question Development',
    icon: Target,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `Help me develop and refine my PhD research questions. I want to ensure they are:
- Specific and focused
- Researchable and feasible
- Original and significant
- Aligned with my field's current gaps

My research topic/area: [DESCRIBE YOUR TOPIC]
My initial ideas: [YOUR INITIAL RESEARCH IDEAS]
Target methodology: [QUALITATIVE/QUANTITATIVE/MIXED METHODS]

Please help me formulate clear primary and secondary research questions, and explain why they are important for the field.`
  },
  {
    id: 'thesis-outline',
    title: 'Thesis Chapter Outline',
    icon: Lightbulb,
    recommendedGAI: ['Claude', 'Gemini'],
    prompt: `I need to create a comprehensive chapter outline for my PhD thesis. Please help me structure:

1. Introduction Chapter
2. Literature Review Chapter(s)
3. Methodology Chapter
4. Results/Findings Chapters
5. Discussion Chapter
6. Conclusion Chapter

My research focus: [YOUR RESEARCH FOCUS]
My methodology: [YOUR METHODOLOGY]
Expected length: [NUMBER OF PAGES/WORDS]

Please provide a detailed chapter breakdown with suggested subsections and approximate word counts for each chapter.`
  }
];

export default function PhdStarter({ open, onOpenChange }: PhdStarterProps) {
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
            <FileText className="h-5 w-5" />
            PhD Starter - Research Proposal & Structure
          </DialogTitle>
          <DialogDescription>
            Get started with your PhD journey using specialized prompts for proposal writing and thesis structuring.
            Choose a template below or create your custom prompt.
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
                      <Icon className="h-4 w-4 text-blue-600" />
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

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">💡 Usage Tips:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Replace bracketed placeholders [LIKE THIS] with your specific information</li>
              <li>• Use Claude for nuanced proposal structuring and ethical considerations</li>
              <li>• Use ChatGPT for detailed outlines and iterative refinements</li>
              <li>• Copy the prompt and paste it into your preferred GAI platform</li>
              <li>• Return here to access more specialized prompts for the next phase</li>
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
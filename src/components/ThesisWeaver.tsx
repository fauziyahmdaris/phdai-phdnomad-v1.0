import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, PenTool, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface ThesisWeaverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROMPT_TEMPLATES = [
  {
    id: 'chapter-writing',
    title: 'Chapter Writing Assistant',
    icon: PenTool,
    recommendedGAI: ['Claude', 'ChatGPT'],
    prompt: `Help me write a comprehensive chapter for my PhD thesis. I need assistance with structure, content development, and academic writing style.

**Chapter Details:**
Chapter: [e.g., Introduction, Literature Review, Methodology, Results, Discussion]
Chapter objectives: [WHAT THIS CHAPTER SHOULD ACHIEVE]
Key points to cover: [LIST MAIN POINTS]
Word count target: [TARGET WORD COUNT]

**My Research Context:**
Research topic: [YOUR RESEARCH TOPIC]
Research questions: [YOUR RESEARCH QUESTIONS]
Methodology: [YOUR METHODOLOGY]

**Specific Help Needed:**
[e.g., structuring arguments, connecting to literature, explaining methodology, presenting results]

Please provide:
1. Detailed chapter outline with subsections
2. Guidance on academic writing style and tone
3. Suggestions for smooth transitions between sections
4. Tips for integrating citations and evidence
5. Sample paragraphs or section starters if helpful`
  },
  {
    id: 'methodology-design',
    title: 'Methodology Design Guide',
    icon: BarChart3,
    recommendedGAI: ['Claude', 'Gemini'],
    prompt: `I need comprehensive guidance on designing and writing my methodology chapter. Help me create a robust methodological framework:

**Research Context:**
Research questions: [YOUR RESEARCH QUESTIONS]
Research objectives: [YOUR OBJECTIVES]
Discipline/Field: [YOUR ACADEMIC FIELD]
Research paradigm: [e.g., Positivist, Interpretivist, Pragmatic]

**Methodological Considerations:**
Preferred approach: [Qualitative/Quantitative/Mixed Methods]
Data collection methods: [WHAT YOU'RE CONSIDERING]
Sample/Participants: [WHO/WHAT YOU'RE STUDYING]
Analysis methods: [HOW YOU'LL ANALYZE DATA]

Please help me:
1. Justify my methodological choices
2. Design data collection procedures
3. Address validity and reliability concerns
4. Consider ethical implications
5. Structure the methodology chapter
6. Anticipate and address limitations`
  },
  {
    id: 'results-discussion',
    title: 'Results & Discussion Writer',
    icon: FileText,
    recommendedGAI: ['ChatGPT', 'Claude'],
    prompt: `Help me write compelling results and discussion sections that effectively present and interpret my findings:

**My Research:**
Research questions: [YOUR RESEARCH QUESTIONS]
Methodology used: [YOUR METHODOLOGY]
Key findings: [SUMMARIZE YOUR MAIN FINDINGS]
Data type: [Quantitative/Qualitative/Mixed]

**Results Section Needs:**
[Describe what results you need to present - statistics, themes, patterns, etc.]

**Discussion Points:**
- How findings answer research questions
- Connections to existing literature
- Implications for theory and practice
- Study limitations
- Future research directions

Please provide:
1. Structure for presenting results clearly
2. Guidance on interpreting findings
3. Ways to connect results to literature
4. Help with discussing implications
5. Strategies for addressing limitations
6. Suggestions for future research directions`
  }
];

export default function ThesisWeaver({ open, onOpenChange }: ThesisWeaverProps) {
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
            <PenTool className="h-5 w-5" />
            Thesis Weaver - Chapter Writing & Methodology
          </DialogTitle>
          <DialogDescription>
            Craft compelling thesis chapters with AI assistance. Get help with writing, structuring, 
            and developing your methodology, results, and discussion sections.
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
                      <Icon className="h-4 w-4 text-orange-600" />
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

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-2">✍️ Academic Writing Tips:</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Use Claude for expressive, nuanced academic writing and chapter structuring</li>
              <li>• Use ChatGPT for technical sections, methodology details, and iterative refinements</li>
              <li>• Use Gemini for integrating data visualizations and multimedia elements</li>
              <li>• Always maintain your academic voice and verify all claims</li>
              <li>• Break large chapters into manageable sections for better AI assistance</li>
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
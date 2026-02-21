import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Grid, BarChart, GitCompare } from 'lucide-react';
import { toast } from 'sonner';

interface LiteratureMatrixProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROMPT_TEMPLATES = [
  {
    id: 'comparison-matrix',
    title: 'Literature Comparison Matrix',
    icon: Grid,
    recommendedGAI: ['Claude', 'Gemini'],
    prompt: `Help me create a comprehensive literature comparison matrix for my research. I need to systematically compare studies across multiple dimensions:

**Studies to Compare:**
[LIST YOUR KEY STUDIES - Author, Year, Title]

**Comparison Dimensions:**
1. Research Questions/Objectives
2. Methodology (Qualitative/Quantitative/Mixed)
3. Sample Size and Demographics
4. Key Findings
5. Theoretical Framework
6. Limitations
7. Relevance to my research

My research focus: [YOUR RESEARCH FOCUS]
My research questions: [YOUR RESEARCH QUESTIONS]

Please create a structured matrix format and help me populate it with the key information from each study, highlighting similarities, differences, and gaps.`
  },
  {
    id: 'thematic-analysis',
    title: 'Thematic Analysis Matrix',
    icon: BarChart,
    recommendedGAI: ['ChatGPT', 'Claude'],
    prompt: `I need help creating a thematic analysis matrix to organize my literature review findings by themes and patterns:

**My Research Topic:** [YOUR RESEARCH TOPIC]

**Key Papers/Studies:** [LIST 8-12 KEY STUDIES]

**Potential Themes I've Identified:**
[LIST ANY THEMES YOU'VE NOTICED]

Please help me:
1. Identify major themes across the literature
2. Create a matrix showing which studies address which themes
3. Highlight theme intersections and relationships
4. Identify under-researched themes
5. Show how themes relate to my research questions

Format this as a clear, visual matrix that I can use to structure my literature review.`
  },
  {
    id: 'methodology-matrix',
    title: 'Methodology Comparison Matrix',
    icon: GitCompare,
    recommendedGAI: ['Gemini', 'ChatGPT'],
    prompt: `Create a methodology comparison matrix for my literature review. I want to analyze and compare the research methods used across different studies:

**Research Area:** [YOUR RESEARCH AREA]

**Studies to Analyze:** [LIST STUDIES WITH AUTHORS AND YEARS]

**Methodological Aspects to Compare:**
1. Research Design (Experimental, Survey, Case Study, etc.)
2. Data Collection Methods
3. Sample Selection and Size
4. Data Analysis Techniques
5. Validity and Reliability Measures
6. Ethical Considerations
7. Strengths and Limitations

Please create a comprehensive matrix that helps me:
- Identify methodological trends in my field
- Spot methodological gaps
- Justify my chosen methodology
- Learn from successful approaches`
  }
];

export default function LiteratureMatrix({ open, onOpenChange }: LiteratureMatrixProps) {
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
            <Grid className="h-5 w-5" />
            Literature Matrix - Comparative Analysis Tool
          </DialogTitle>
          <DialogDescription>
            Create systematic comparison matrices to analyze and organize your literature review findings. 
            Compare studies across multiple dimensions for deeper insights.
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
                      <Icon className="h-4 w-4 text-purple-600" />
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

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">🔍 Matrix Analysis Tips:</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Use Claude for nuanced comparative analysis and pattern identification</li>
              <li>• Use Gemini for processing multiple document formats and data visualization</li>
              <li>• Use ChatGPT for systematic organization and table formatting</li>
              <li>• Export matrices to spreadsheet tools for further analysis</li>
              <li>• Update matrices as you discover new relevant literature</li>
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
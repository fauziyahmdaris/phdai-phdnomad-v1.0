import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Copy, FileText, Lightbulb, Target, Search, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface PhdResearchProposalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESEARCH_STEPS = [
  { id: 'keywords', title: 'Research Keywords', icon: Search, active: true },
  { id: 'gap-search', title: 'Research Gap Search', icon: Target, active: false },
  { id: 'title-generator', title: 'Title Generator', icon: FileText, active: false },
  { id: 'research-aims', title: 'Research Aims', icon: Lightbulb, active: false },
  { id: 'complete-setup', title: 'Complete Setup', icon: BookOpen, active: false }
];

const PROMPT_TEMPLATES = [
  {
    id: 'keyword-generation',
    title: 'Research Keywords Generator',
    icon: Search,
    recommendedGAI: ['ChatGPT', 'Claude'],
    step: 'keywords',
    prompt: `You are an expert research consultant specializing in academic keyword development. Help me generate comprehensive research keywords for my PhD proposal.

**Task**: Generate a comprehensive list of research keywords and related terms

**My Research Interest**: [ENTER YOUR RESEARCH TOPIC/INTEREST]

**Instructions**:
1. Analyze the research topic and identify 15-20 primary keywords
2. For each primary keyword, suggest 3-5 related synonyms or alternative terms
3. Include both broad and specific terms relevant to the field
4. Consider interdisciplinary connections and emerging terminology
5. Organize keywords by themes or categories

**Output Format**:
- Primary Keywords: [List main terms]
- Related Terms: [Synonyms and variations]
- Interdisciplinary Terms: [Cross-field connections]
- Emerging Terms: [New or trending concepts]

**Example Structure**:
If researching "Digital Learning Platforms":
- Primary: Digital Learning, E-learning, Online Education
- Related: Virtual Classrooms, Educational Technology, Distance Learning
- Interdisciplinary: Human-Computer Interaction, Cognitive Psychology
- Emerging: Adaptive Learning, AI-Powered Education, Microlearning

Please provide a structured keyword analysis that will help identify relevant literature and research gaps.`
  },
  {
    id: 'research-gap-discovery',
    title: 'Research Gap Discovery',
    icon: Target,
    recommendedGAI: ['Claude', 'Gemini'],
    step: 'gap-search',
    prompt: `You are a senior academic researcher with expertise in identifying research gaps. Help me discover significant research gaps in my field.

**Research Area**: [YOUR RESEARCH AREA]
**Keywords Identified**: [LIST YOUR KEYWORDS FROM PREVIOUS STEP]

**Analysis Framework**:
1. **Current State Analysis**: What has been extensively studied?
2. **Methodological Gaps**: What research methods are underutilized?
3. **Theoretical Gaps**: Which theoretical frameworks need development?
4. **Empirical Gaps**: What populations/contexts are understudied?
5. **Temporal Gaps**: What recent developments need investigation?
6. **Practical Gaps**: What real-world applications are missing?

**Instructions**:
- Analyze each keyword cluster for potential gaps
- Identify contradictions in existing research
- Highlight emerging areas with limited investigation
- Consider interdisciplinary opportunities
- Suggest specific research questions for each gap

**Output Structure**:
1. **Major Research Gaps**: [3-5 significant gaps with explanations]
2. **Methodological Opportunities**: [Underused approaches]
3. **Emerging Areas**: [New directions for investigation]
4. **Practical Applications**: [Real-world implementation gaps]
5. **Recommended Focus**: [Most promising gap for PhD research]

Please provide detailed analysis with justifications for each identified gap.`
  },
  {
    id: 'title-generation',
    title: 'Research Title Generator',
    icon: FileText,
    recommendedGAI: ['ChatGPT', 'Claude'],
    step: 'title-generator',
    prompt: `You are an expert academic title consultant. Help me create compelling, precise research titles for my PhD proposal.

**Research Focus**: [YOUR CHOSEN RESEARCH GAP/FOCUS]
**Key Concepts**: [MAIN CONCEPTS FROM YOUR RESEARCH]
**Methodology Approach**: [QUALITATIVE/QUANTITATIVE/MIXED METHODS]
**Target Population/Context**: [WHO/WHAT YOU'RE STUDYING]

**Title Generation Criteria**:
1. **Clarity**: Immediately understandable to academics in the field
2. **Specificity**: Clearly defines scope and focus
3. **Academic Rigor**: Uses appropriate scholarly terminology
4. **Innovation**: Highlights novel contribution
5. **Searchability**: Includes key terms for database searches

**Generate 10 Different Title Options**:
- 3 Descriptive titles (clearly state what you're studying)
- 3 Question-based titles (pose the research question)
- 2 Hypothesis-driven titles (suggest expected outcomes)
- 2 Impact-focused titles (emphasize practical implications)

**Format for Each Title**:
Title: [PROPOSED TITLE]
Type: [Descriptive/Question/Hypothesis/Impact]
Strengths: [Why this title works]
Keywords: [Main searchable terms]

**Example Structure**:
Title: "Exploring the Impact of AI-Enhanced Learning Analytics on Student Engagement in Higher Education: A Mixed-Methods Investigation"
Type: Descriptive
Strengths: Clear scope, methodology mentioned, specific context
Keywords: AI, Learning Analytics, Student Engagement, Higher Education

Please provide varied options that capture different aspects of my research focus.`
  },
  {
    id: 'research-aims-development',
    title: 'Research Aims & Objectives',
    icon: Lightbulb,
    recommendedGAI: ['Claude', 'ChatGPT'],
    step: 'research-aims',
    prompt: `You are an expert research methodology consultant. Help me develop comprehensive research aims and objectives for my PhD proposal.

**Selected Research Title**: [YOUR CHOSEN TITLE FROM PREVIOUS STEP]
**Research Gap**: [THE GAP YOU'RE ADDRESSING]
**Research Context**: [FIELD/DISCIPLINE/SETTING]

**Development Framework**:

**1. Primary Research Aim** (Overarching goal):
- Should directly address the identified research gap
- Broad enough to encompass the entire study
- Specific enough to be achievable in a PhD timeframe

**2. Research Objectives** (3-5 specific objectives):
- Objective 1: [Literature/Theoretical objective]
- Objective 2: [Methodological/Design objective]  
- Objective 3: [Data Collection/Analysis objective]
- Objective 4: [Application/Implementation objective]
- Objective 5: [Evaluation/Impact objective]

**3. Research Questions** (2-4 questions):
- Primary Research Question: [Main question]
- Sub-questions: [Supporting questions]

**Quality Criteria**:
- **SMART**: Specific, Measurable, Achievable, Relevant, Time-bound
- **Aligned**: All objectives support the main aim
- **Progressive**: Objectives build upon each other logically
- **Feasible**: Realistic for PhD scope and timeline

**Expected Contributions**:
- Theoretical Contribution: [How it advances theory]
- Methodological Contribution: [New approaches/methods]
- Practical Contribution: [Real-world applications]
- Empirical Contribution: [New knowledge/evidence]

Please structure this as a formal research proposal section with clear, actionable aims and objectives.`
  },
  {
    id: 'complete-proposal-setup',
    title: 'Complete Proposal Framework',
    icon: BookOpen,
    recommendedGAI: ['Claude', 'Gemini'],
    step: 'complete-setup',
    prompt: `You are a senior PhD supervisor. Help me create a comprehensive research proposal framework integrating all previous elements.

**Integration Elements**:
- **Keywords**: [FROM STEP 1]
- **Research Gap**: [FROM STEP 2]
- **Research Title**: [FROM STEP 3]
- **Aims & Objectives**: [FROM STEP 4]

**Complete Proposal Structure**:

**1. Research Title & Abstract** (250 words)
- Compelling title
- Concise summary of research purpose, methods, and expected outcomes

**2. Background & Rationale** (500 words)
- Context and significance
- Why this research matters now
- Connection to current academic and practical needs

**3. Literature Review Framework** (300 words)
- Key theoretical foundations
- Major studies and gaps identified
- How your research fits into existing knowledge

**4. Research Aims, Objectives & Questions**
- [INTEGRATE FROM PREVIOUS STEPS]

**5. Methodology Overview** (400 words)
- Research paradigm and approach
- Data collection and analysis methods
- Ethical considerations
- Timeline and feasibility

**6. Expected Contributions** (200 words)
- Theoretical contributions
- Methodological innovations
- Practical implications
- Policy/industry relevance

**7. Preliminary Chapter Outline**
- Chapter 1: Introduction
- Chapter 2: Literature Review
- Chapter 3: Methodology
- Chapter 4-5: Data/Analysis Chapters
- Chapter 6: Discussion & Conclusions

**8. Timeline & Milestones** (3-4 year plan)
- Year 1: Literature review, methodology design
- Year 2: Data collection, preliminary analysis
- Year 3: Full analysis, writing
- Year 4: Completion, examination

Please create a cohesive, professional proposal framework ready for supervisor review.`
  }
];

export default function PhdResearchProposal({ open, onOpenChange }: PhdResearchProposalProps) {
  const [currentStep, setCurrentStep] = useState('keywords');
  const [researchKeywords, setResearchKeywords] = useState('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStepIndex = RESEARCH_STEPS.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / RESEARCH_STEPS.length) * 100;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Prompt copied to clipboard!');
  };

  const handlePromptSelect = (prompt: string) => {
    setCustomPrompt(prompt);
  };

  const handleStepChange = (stepId: string) => {
    setCurrentStep(stepId);
    const stepPrompt = PROMPT_TEMPLATES.find(template => template.step === stepId);
    if (stepPrompt) {
      handlePromptSelect(stepPrompt.prompt);
    }
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Move to next step
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < RESEARCH_STEPS.length) {
      const nextStep = RESEARCH_STEPS[nextStepIndex];
      setCurrentStep(nextStep.id);
      const nextPrompt = PROMPT_TEMPLATES.find(template => template.step === nextStep.id);
      if (nextPrompt) {
        handlePromptSelect(nextPrompt.prompt);
      }
    }
  };

  const currentTemplate = PROMPT_TEMPLATES.find(template => template.step === currentStep);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PhD Research Proposal Kit - Step {currentStepIndex + 1} of {RESEARCH_STEPS.length}
          </DialogTitle>
          <DialogDescription>
            Complete your PhD research proposal step-by-step with AI-powered guidance and advanced prompt templates.
          </DialogDescription>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Steps Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Research Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {RESEARCH_STEPS.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = completedSteps.includes(step.id);
                  const isCurrent = currentStep === step.id;
                  
                  return (
                    <Button
                      key={step.id}
                      variant={isCurrent ? "default" : isCompleted ? "secondary" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleStepChange(step.id)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Icon className="h-4 w-4" />
                        <div className="text-left flex-1">
                          <div className="text-sm font-medium">{step.title}</div>
                          {isCompleted && (
                            <div className="text-xs text-green-600">✓ Completed</div>
                          )}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Features Sidebar */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">PhD Proposal Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Keyword Inspiration Generator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Research Gap Discovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Title Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Research Aims Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Step-by-Step Guidance</span>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  📖 User Guide
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  🤖 AI Mentor
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  ❓ Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {currentTemplate && <currentTemplate.icon className="h-6 w-6 text-blue-600" />}
                  <div>
                    <CardTitle>
                      {currentStep === 'keywords' && '🔍 Define Your Research Keywords'}
                      {currentStep === 'gap-search' && '🎯 Discover Research Gaps'}
                      {currentStep === 'title-generator' && '📝 Generate Research Titles'}
                      {currentStep === 'research-aims' && '🎯 Develop Research Aims'}
                      {currentStep === 'complete-setup' && '📚 Complete Proposal Setup'}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 'keywords' && 'Start by entering keywords that describe your research interests'}
                      {currentStep === 'gap-search' && 'Identify significant gaps in your research area'}
                      {currentStep === 'title-generator' && 'Create compelling titles for your research proposal'}
                      {currentStep === 'research-aims' && 'Define clear aims and objectives for your study'}
                      {currentStep === 'complete-setup' && 'Integrate all elements into a comprehensive proposal'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step-specific input area */}
                {currentStep === 'keywords' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Research Keywords</label>
                      <Input
                        placeholder="e.g., AI Pedagogy for Adaptive Microlearning"
                        value={researchKeywords}
                        onChange={(e) => setResearchKeywords(e.target.value)}
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Type freely with spaces; parsed on generation
                      </p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      onClick={() => {
                        if (researchKeywords.trim()) {
                          const updatedPrompt = customPrompt.replace('[ENTER YOUR RESEARCH TOPIC/INTEREST]', researchKeywords);
                          setCustomPrompt(updatedPrompt);
                        }
                      }}
                    >
                      ✨ Generate Research Areas
                    </Button>
                  </div>
                )}

                {/* Prompt Template Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">AI Prompt Template</h3>
                    <div className="flex gap-2">
                      {currentTemplate && (
                        <div className="flex flex-wrap gap-1">
                          {currentTemplate.recommendedGAI.map((gai) => (
                            <Badge key={gai} variant="outline" className="text-xs">
                              {gai}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(customPrompt)}
                        disabled={!customPrompt}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={16}
                    className="font-mono text-sm"
                    placeholder="Select a step to see the AI prompt template..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const prevIndex = currentStepIndex - 1;
                      if (prevIndex >= 0) {
                        handleStepChange(RESEARCH_STEPS[prevIndex].id);
                      }
                    }}
                    disabled={currentStepIndex === 0}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(customPrompt)}
                      disabled={!customPrompt}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Prompt
                    </Button>
                    
                    <Button 
                      onClick={markStepComplete}
                      disabled={!customPrompt}
                    >
                      {currentStepIndex === RESEARCH_STEPS.length - 1 ? 'Complete' : 'Next'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Instructions */}
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 How to Use This Step:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Fill in any input fields specific to this step</li>
                    <li>• Copy the generated prompt template</li>
                    <li>• Paste it into your preferred GAI platform (ChatGPT, Claude, etc.)</li>
                    <li>• Replace bracketed placeholders with your specific information</li>
                    <li>• Use the AI response to inform your next step</li>
                    <li>• Return here to continue with the next phase</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Sparkles, 
  Target, 
  Map, 
  Brain,
  Compass, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Lightbulb, 
  CheckCircle, 
  MessageSquare,
  BookOpen,
  Edit3
} from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';
import { useProject } from '../contexts/ProjectContext';
import confetti from 'canvas-confetti';

interface PathfinderData {
  researchSpark: string;
  researchHorizon: string;
  discoveryTrail: string;
  problemStatement: string;
  researchQuestions: string[];
  significance: string;
  novelty: string;
  chapters: {
    title: string;
    purpose: string;
  }[];
}

interface AIResponse {
  content: string[];
  loading: boolean;
  error: string | null;
}

const ResearchPathfinder: React.FC = () => {
  const { createProject } = useProject();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponse, setAIResponse] = useState<AIResponse>({
    content: [],
    loading: false,
    error: null
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [pathfinderData, setPathfinderData] = useState<PathfinderData>({
    researchSpark: '',
    researchHorizon: '',
    discoveryTrail: '',
    problemStatement: '',
    researchQuestions: ['', '', ''],
    significance: '',
    novelty: '',
    chapters: [
      { title: 'Chapter 1: Introduction', purpose: '' },
      { title: 'Chapter 2: Literature Review', purpose: '' },
      { title: 'Chapter 3: Methodology', purpose: '' },
      { title: 'Chapter 4: Results', purpose: '' },
      { title: 'Chapter 5: Discussion & Conclusion', purpose: '' }
    ]
  });

  // Total number of steps in the pathfinder
  const totalSteps = 7;

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Function to simulate AI response (in a real app, this would call an API)
  const generateAIResponse = async (step: number,) => {
    setAIResponse({
      content: [],
      loading: true,
      error: null
    });
    setShowAIResponse(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      let responseContent: string[] = [];

      // Generate different responses based on the current step
      switch (step) {
        case 1: // Research Spark
          responseContent = [
            "DrPhDAI thinks your spark is brilliant! Based on your ideas, here are some related keywords or broader areas you might explore:",
            "• Artificial Intelligence in Education",
            "• Adaptive Learning Systems",
            "• Educational Technology Integration",
            "• Personalized Learning Pathways",
            "• Cognitive Load Theory Applications",
            "Can you think of a real-world problem connected to one of these ideas? Or a big question you'd love to answer?"
          ];
          break;
        case 2: // Research Horizon
          responseContent = [
            "Excellent! DrPhDAI suggests these related sub-fields or key concepts often associated with your area of interest:",
            "• Microlearning Design Principles",
            "• AI-Enhanced Instructional Systems",
            "• Adaptive Assessment Techniques",
            "• Learning Analytics for Personalization",
            "• Cognitive Scaffolding in Digital Environments",
            "Would you like to quickly search for top researchers or foundational papers in this newly defined area?"
          ];
          break;
        case 3: // Discovery Trail
          responseContent = [
            "This is a promising gap! To make it shine even brighter for your PhD, consider these questions:",
            "• What are the real-world implications if this gap remains unaddressed?",
            "• How does filling this gap challenge or extend current theories?",
            "• Is this gap truly original? Have you confirmed through a thorough literature search?",
            "• Is it feasible to address this gap within the scope of a PhD project?"
          ];
          break;
        case 4: // Research Compass
          responseContent = [
            "These are great questions! For academic rigor, ensure they are specific, measurable (where applicable), achievable, relevant, and time-bound (SMART).",
            "For your problem statement: Is it specific enough? Does it clearly flow from your identified gap?",
            "For your research questions: Consider refining them to be more focused on specific aspects of your research problem."
          ];
          break;
        case 5: // Contribution
          responseContent = [
            "Your significance is powerful! DrPhDAI suggests considering its:",
            "• Theoretical implications: How does your work extend or challenge existing theories?",
            "• Practical implications: How might practitioners apply your findings?",
            "• Methodological implications: Does your approach offer new ways to study this phenomenon?",
            "• Broader societal impact: How might your work contribute to addressing societal challenges?",
            "To highlight your novelty, try phrases like: 'This study is the first to...', 'Unlike previous research, this thesis offers a novel approach to...', 'This investigation provides a unique perspective on...'"
          ];
          break;
        case 6: // Expedition Plan
          responseContent = [
            "This is a solid roadmap! Remember, a typical PhD thesis will have at least 5 chapters, but your specific field might have variations.",
            "DrPhDAI suggests the typical purpose for each chapter:",
            "• Chapter 1: To introduce the research problem, context, significance, and outline the thesis structure",
            "• Chapter 2: To critically review relevant literature, identify gaps, and establish theoretical framework",
            "• Chapter 3: To detail and justify your research methodology, data collection, and analysis approaches",
            "• Chapter 4: To present your findings in a clear, organized manner without interpretation",
            "• Chapter 5: To interpret findings, discuss implications, acknowledge limitations, and suggest future research"
          ];
          break;
        case 7: // Reflect & Launch
          responseContent = [
            "Incredible work! You've transformed your initial ideas into a compelling research framework. This shows immense potential!",
            "What's next? DrPhDAI recommends:",
            "1. Refine & Expand: Use your Pathfinder draft to start writing your detailed PhD Proposal or Chapter 1.",
            "2. Deep Dive into Literature: Head to the 'Mastering the Literature Review' microlearning module.",
            "3. Engage with the Writing Coach: Use the AI writing tools to expand your sentences into paragraphs and sections."
          ];
          break;
        default:
          responseContent = ["I'm here to help with your research journey!"];
      }

      setAIResponse({
        content: responseContent,
        loading: false,
        error: null
      });
    } catch (error) {
      setAIResponse({
        content: [],
        loading: false,
        error: "Sorry, I couldn't generate a response. Please try again."
      });
    }
  };

  // Function to handle input changes
  const handleInputChange = (field: string, value: string, index?: number) => {
    setPathfinderData(prev => {
      if (field === 'researchQuestions' && typeof index === 'number') {
        const updatedQuestions = [...prev.researchQuestions];
        updatedQuestions[index] = value;
        return { ...prev, researchQuestions: updatedQuestions };
      } else if (field === 'chapters' && typeof index === 'number') {
        const updatedChapters = [...prev.chapters];
        updatedChapters[index] = { ...updatedChapters[index], purpose: value };
        return { ...prev, chapters: updatedChapters };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  // Function to handle AI assistance request
  const handleAIAssist = (step: number) => {
    generateAIResponse(step);
  };

  // Function to navigate to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Show mini-celebration
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      
      setCurrentStep(prev => prev + 1);
      setShowAIResponse(false);
    }
  };

  // Function to navigate to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setShowAIResponse(false);
    }
  };

  // Function to check if the current step is complete (for enabling/disabling Next button)
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return pathfinderData.researchSpark.trim().length > 0;
      case 2:
        return pathfinderData.researchHorizon.trim().length > 0;
      case 3:
        return pathfinderData.discoveryTrail.trim().length > 0;
      case 4:
        return pathfinderData.problemStatement.trim().length > 0 && 
               pathfinderData.researchQuestions[0].trim().length > 0;
      case 5:
        return pathfinderData.significance.trim().length > 0 && 
               pathfinderData.novelty.trim().length > 0;
      case 6:
        return pathfinderData.chapters.some(chapter => chapter.purpose.trim().length > 0);
      default:
        return true;
    }
  };

  // Function to export the pathfinder data
  const exportPathfinder = () => {
    const content = `
# DrPhDAI Research Pathfinder: Your Personalized Research Compass

## Research Spark ✨
${pathfinderData.researchSpark}

## Research Horizon 🧭
${pathfinderData.researchHorizon}

## Discovery Trail 🔍 (Research Gap)
${pathfinderData.discoveryTrail}

## Research Compass 🧭 (Problem Statement & Questions)
### Problem Statement:
${pathfinderData.problemStatement}

### Research Questions:
${pathfinderData.researchQuestions.filter(q => q.trim()).map((q, i) => `${i + 1}. ${q}`).join('\n')}

## Contribution 📈 (Significance & Novelty)
### Why my research matters (Significance):
${pathfinderData.significance}

### What makes my research unique (Novelty):
${pathfinderData.novelty}

## Expedition Plan 🗺️ (Thesis Structure)
${pathfinderData.chapters.map(chapter => `### ${chapter.title}\n${chapter.purpose}`).join('\n\n')}

---
Generated with DrPhDAI Pathfinder - Your Personalized Research Compass & Launchpad
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DrPhDAI-Research-Pathfinder.md';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Function to create a new project from pathfinder data
  const createProjectFromPathfinder = () => {
    createProject({
      title: pathfinderData.researchHorizon || 'My Research Project',
      objectives: pathfinderData.researchQuestions.filter(q => q.trim()),
      area: pathfinderData.researchHorizon,
      keywords: []
    });
    // Trigger confetti effect for the final celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Sparkles className="mr-2 text-blue-600" size={24} />
              Step 1: Your Research Spark ✨
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Every great research journey begins with a spark! What topics, problems, or questions excite you most right now? Don't worry about perfection, just let your ideas flow.
            </p>
            <textarea
              value={pathfinderData.researchSpark}
              onChange={(e) => handleInputChange('researchSpark', e.target.value)}
              placeholder="My initial ideas..."
              className="w-full h-40 p-4 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleAIAssist(1)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Suggestions</span>
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Map className="mr-2 text-green-600" size={24} />
              Step 2: Defining My Research Horizon 🧭
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Let's zoom in! From your sparks, what specific area within your field are you most interested in exploring for your PhD? Think about a particular discipline, context, or phenomenon.
            </p>
            <input
              type="text"
              value={pathfinderData.researchHorizon}
              onChange={(e) => handleInputChange('researchHorizon', e.target.value)}
              placeholder="My specific area of interest..."
              className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleAIAssist(2)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Suggestions</span>
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Target className="mr-2 text-red-600" size={24} />
              Step 3: Uncovering My Discovery Trail 🔍
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Now for the exciting part – finding your unique trail! Based on the existing knowledge in your defined area, what questions haven't been fully answered? What contradictions exist? What specific problem needs new investigation?
            </p>
            <textarea
              value={pathfinderData.discoveryTrail}
              onChange={(e) => handleInputChange('discoveryTrail', e.target.value)}
              placeholder="The gap I've noticed..."
              className="w-full h-40 p-4 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={() => handleAIAssist(3)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Suggestions</span>
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Compass className="mr-2 text-blue-600" size={24} />
              Step 4: Crafting My Research Compass 🧭
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Time to craft your compass! Based on the research gap you've identified, articulate the core problem your study will address. Then, formulate 1-3 clear, concise research questions that your thesis will answer.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  My Problem Statement (1-2 sentences):
                </label>
                <textarea
                  value={pathfinderData.problemStatement}
                  onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                  placeholder="The core problem my research addresses is..."
                  className="w-full h-24 p-4 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Research Question {index + 1}{index > 0 ? ' (Optional)' : ''}:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={pathfinderData.researchQuestions[index]}
                      onChange={(e) => handleInputChange('researchQuestions', e.target.value, index)}
                      placeholder={`Research question ${index + 1}...`}
                      className="flex-1 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={() => {
                        // Simulate AI refining this specific question
                        setAIResponse({
                          content: [
                            `DrPhDAI suggests refining Research Question ${index + 1}:`,
                            "• Make it more specific by clearly defining your variables",
                            "• Ensure it's answerable within your PhD timeframe",
                            "• Consider adding a clear population or context if applicable"
                          ],
                          loading: false,
                          error: null
                        });
                        setShowAIResponse(true);
                      }}
                      className="px-3 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Refine
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAIAssist(4)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Feedback</span>
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Target className="mr-2 text-purple-600" size={24} />
              Step 5: Charting My Contribution 📈
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Every research journey impacts the world! Why is your research important? How will it advance knowledge, impact practice, or solve a societal problem? What makes your contribution unique and original?
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Why my research matters (Significance):
                </label>
                <textarea
                  value={pathfinderData.significance}
                  onChange={(e) => handleInputChange('significance', e.target.value)}
                  placeholder="My research is significant because..."
                  className="w-full h-32 p-4 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  What makes my research unique (Novelty/Original Contribution):
                </label>
                <textarea
                  value={pathfinderData.novelty}
                  onChange={(e) => handleInputChange('novelty', e.target.value)}
                  placeholder="My research is original because..."
                  className="w-full h-32 p-4 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <button
              onClick={() => handleAIAssist(5)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Suggestions</span>
            </button>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Map className="mr-2 text-orange-600" size={24} />
              Step 6: My Expedition Plan 🗺️
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Let's outline your grand expedition! While your full thesis structure will evolve, drafting a high-level plan for your Chapters helps immensely. What will each main part of your thesis focus on?
            </p>
            <div className="space-y-4">
              {pathfinderData.chapters.map((chapter, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg dark:border-gray-600">
                  <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                    {chapter.title}
                  </h3>
                  <textarea
                    value={chapter.purpose}
                    onChange={(e) => handleInputChange('chapters', e.target.value, index)}
                    placeholder={`Key purpose of ${chapter.title}...`}
                    className="w-full h-20 p-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => {
                      // Simulate AI suggesting purpose for this specific chapter
                      const chapterNumber = index + 1;
                      setAIResponse({
                        content: [
                          `DrPhDAI suggests for ${chapter.title}:`,
                          `The primary purpose of Chapter ${chapterNumber} is to ${
                            index === 0 ? "introduce your research problem, establish context, and outline the thesis structure" :
                            index === 1 ? "critically review relevant literature, identify gaps, and establish your theoretical framework" :
                            index === 2 ? "detail and justify your research methodology, data collection, and analysis approaches" :
                            index === 3 ? "present your findings in a clear, organized manner without interpretation" :
                            "interpret findings, discuss implications, acknowledge limitations, and suggest future research"
                          }.`,
                          "Key elements typically include:",
                          `• ${
                            index === 0 ? "Background and context of the research problem" :
                            index === 1 ? "Analysis of current knowledge and theories" :
                            index === 2 ? "Research design and justification" :
                            index === 3 ? "Organized presentation of data and results" :
                            "Synthesis of findings with existing literature"
                          }`,
                          `• ${
                            index === 0 ? "Statement of the research problem and questions" :
                            index === 1 ? "Identification of research gaps" :
                            index === 2 ? "Data collection procedures and tools" :
                            index === 3 ? "Visual representation of key findings" :
                            "Implications for theory, practice, and policy"
                          }`,
                          `• ${
                            index === 0 ? "Significance and scope of the research" :
                            index === 1 ? "Theoretical framework development" :
                            index === 2 ? "Ethical considerations and limitations" :
                            index === 3 ? "Statistical analyses or thematic summaries" :
                            "Recommendations for future research"
                          }`
                        ],
                        loading: false,
                        error: null
                      });
                      setShowAIResponse(true);
                    }}
                    className="flex items-center mt-2 space-x-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Lightbulb size={14} />
                    <span>Get AI suggestions</span>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAIAssist(6)}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <OwlIcon size={16} />
              <span>Get Overall Structure Feedback</span>
            </button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
              <Rocket className="mr-2 text-red-600" size={24} />
              Step 7: Reflect & Launch 🚀
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You've just completed a monumental first step! Take a moment to review your personalized Research Pathfinder. Feel that sense of accomplishment? This is your foundation!
            </p>
            
            <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Your Research Pathfinder Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400">Research Spark ✨</h4>
                  <p className="p-3 mt-1 text-gray-700 rounded-lg dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                    {pathfinderData.researchSpark || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400">Research Horizon 🧭</h4>
                  <p className="p-3 mt-1 text-gray-700 rounded-lg dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                    {pathfinderData.researchHorizon || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400">Discovery Trail 🔍</h4>
                  <p className="p-3 mt-1 text-gray-700 rounded-lg dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                    {pathfinderData.discoveryTrail || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400">Research Compass 🧭</h4>
                  <div className="p-3 mt-1 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Problem Statement:</p>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">{pathfinderData.problemStatement || "Not provided"}</p>
                    
                    <p className="font-medium text-gray-700 dark:text-gray-300">Research Questions:</p>
                    <ul className="text-gray-700 list-disc list-inside dark:text-gray-300">
                      {pathfinderData.researchQuestions.map((question, index) => (
                        question.trim() ? <li key={index}>{question}</li> : null
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-purple-600 dark:text-purple-400">Contribution 📈</h4>
                  <div className="p-3 mt-1 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Significance:</p>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">{pathfinderData.significance || "Not provided"}</p>
                    
                    <p className="font-medium text-gray-700 dark:text-gray-300">Novelty:</p>
                    <p className="text-gray-700 dark:text-gray-300">{pathfinderData.novelty || "Not provided"}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-orange-600 dark:text-orange-400">Expedition Plan 🗺️</h4>
                  <div className="p-3 mt-1 rounded-lg bg-gray-50 dark:bg-gray-700">
                    {pathfinderData.chapters.map((chapter, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-medium text-gray-700 dark:text-gray-300">{chapter.title}:</p>
                        <p className="text-gray-700 dark:text-gray-300">{chapter.purpose || "Purpose not defined"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={exportPathfinder}
                className="flex items-center justify-center px-6 py-3 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Download size={20} />
                <span>Export My Pathfinder Draft</span>
              </button>
              
              <button
                onClick={createProjectFromPathfinder}
                className="flex items-center justify-center px-6 py-3 space-x-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
              >
                <Rocket size={20} />
                <span>Create Project & Continue</span>
              </button>
              
              <button
                onClick={() => {
                  // Navigate to Writing Coach (in a real app, this would use router)
                  window.location.href = '/app/writing-tools';
                }}
                className="flex items-center justify-center px-6 py-3 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <Edit3 size={20} />
                <span>Continue to Writing Coach</span>
              </button>
            </div>
            
            <button
              onClick={() => handleAIAssist(7)}
              className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <OwlIcon size={16} />
              <span>Get AI Guidance on Next Steps</span>
            </button>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  // Trigger final celebration when reaching the last step
  useEffect(() => {
    if (currentStep === totalSteps) {
      // Trigger confetti effect for the final celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStep, totalSteps]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
        <div className="flex items-center mb-4 space-x-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Rocket size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">DrPhDAI Pathfinder</h1>
            <p className="text-blue-100">
              Your Personalized Research Compass & Launchpad
            </p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/10">
          <h3 className="mb-2 font-semibold">🚀 Your PhD Journey Starts Here</h3>
          <p className="text-sm text-blue-100">
            This interactive guide will help you transform your initial research ideas into a clear, focused PhD proposal framework. 
            Take it step by step, and remember - every great research journey begins with a single step!
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Step Content */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm lg:col-span-2 dark:bg-gray-800 rounded-xl dark:border-gray-700">
          {renderStepContent()}
          
          {/* Mini Celebration Animation */}
          {showCelebration && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="px-6 py-3 text-white rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-blue-500 animate-bounce">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-white" size={20} />
                  <span className="font-medium">
                    {currentStep === 1 ? "Great start! You've captured your initial spark!" :
                     currentStep === 2 ? "You've successfully defined your research horizon!" :
                     currentStep === 3 ? "Fantastic! You've found your unique discovery trail!" :
                     currentStep === 4 ? "Your research compass is taking shape beautifully!" :
                     currentStep === 5 ? "You've clearly mapped your incredible contribution!" :
                     currentStep === 6 ? "Your expedition plan is taking shape!" :
                     "Congratulations on completing your research pathfinder!"}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-2 space-x-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  // Save draft functionality would go here
                  alert("Draft saved successfully!");
                }}
                className="flex items-center px-6 py-2 space-x-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Save size={16} />
                <span>Save Draft</span>
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepComplete()}
                  className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next Step</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={exportPathfinder}
                  className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Download size={16} />
                  <span>Export</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Co-Pilot Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 top-4">
            <div className="flex items-center mb-4 space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Brain className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Co-Pilot</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your research companion</p>
              </div>
            </div>
            
            {showAIResponse ? (
              <div className="space-y-4">
                {aiResponse.loading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="w-8 h-8 border-b-2 border-purple-600 rounded-full animate-spin"></div>
                  </div>
                ) : aiResponse.error ? (
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                    <p className="text-red-600 dark:text-red-400">{aiResponse.error}</p>
                  </div>
                ) : (
                  <div className="p-4 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
                    {aiResponse.content.map((line, index) => (
                      <p key={index} className={`text-sm ${
                        line.startsWith('•') || line.startsWith('-') || /^\d+\./.test(line)
                          ? 'text-gray-700 dark:text-gray-300 ml-4'
                          : index === 0
                            ? 'text-purple-800 dark:text-purple-200 font-medium mb-2'
                            : 'text-gray-700 dark:text-gray-300'
                      } ${index > 0 && index < aiResponse.content.length - 1 ? 'mb-1' : 'mb-2'}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={() => setShowAIResponse(false)}
                  className="text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center mb-2 space-x-2">
                    <MessageSquare className="text-blue-600 dark:text-blue-400" size={16} />
                    <h4 className="font-medium text-gray-900 dark:text-white">How I Can Help</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I'm your AI research co-pilot! I can help you brainstorm ideas, refine your research questions, and provide guidance at each step of your journey.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center mb-2 space-x-2">
                    <Lightbulb className="text-blue-600 dark:text-blue-400" size={16} />
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Step {currentStep} Tip</h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {currentStep === 1 ? "Don't worry about being too academic at this stage. Let your genuine curiosity and passion guide your initial ideas." :
                     currentStep === 2 ? "A well-defined research area helps focus your literature search and makes your project more manageable." :
                     currentStep === 3 ? "The best research gaps are those that are significant, original, and feasible within your PhD timeframe." :
                     currentStep === 4 ? "Strong research questions are specific, measurable, achievable, relevant, and time-bound (SMART)." :
                     currentStep === 5 ? "Your contribution should clearly articulate both 'what' your research will do and 'why' it matters." :
                     currentStep === 6 ? "Think of your thesis structure as a story - each chapter should flow logically to the next." :
                     "Take a moment to celebrate how far you've come! This framework is an excellent foundation for your PhD journey."}
                  </p>
                </div>
                
                <button
                  onClick={() => handleAIAssist(currentStep)}
                  className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <Brain size={16} />
                  <span>Get AI Assistance</span>
                </button>
              </div>
            )}
            
            {/* Resources Section */}
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="flex items-center mb-3 space-x-2 font-medium text-gray-900 dark:text-white">
                <BookOpen size={16} className="text-green-600" />
                <span>Helpful Resources</span>
              </h4>
              <div className="space-y-2">
                <a href="/app/matrix" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  <ArrowRight size={12} />
                  <span>Literature Matrix Tool</span>
                </a>
                <a href="/app/writing-tools" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  <ArrowRight size={12} />
                  <span>Writing Coach</span>
                </a>
                <a href="/app/microlearning" className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  <ArrowRight size={12} />
                  <span>Microlearning Modules</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPathfinder;
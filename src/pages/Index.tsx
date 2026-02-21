import { useState, useEffect } from 'react';
import { FileText, Search, Grid, PenTool, MessageCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FeatureCard from '@/components/FeatureCard';
import GAIConnectionPanel from '@/components/GAIConnectionPanel';
import PhdResearchProposal from '@/components/PhdResearchProposal';
import ResearchNavigator from '@/components/ResearchNavigator';
import LiteratureMatrix from '@/components/LiteratureMatrix';
import ThesisWeaver from '@/components/ThesisWeaver';
import AICompanion from '@/pages/AICompanion';

const FEATURES = [
  {
    id: 'phd-research-proposal',
    title: 'PhD Research Proposal',
    description: 'Step-by-step research proposal development with keyword generation, gap analysis, title creation, and aims development.',
    icon: FileText,
    recommendedGAI: ['Claude', 'ChatGPT'],
    phase: 'Proposal & Structure'
  },
  {
    id: 'research-navigator',
    title: 'Research Navigator',
    description: 'Literature review and synthesis assistant to help you navigate academic sources and identify research gaps systematically.',
    icon: Search,
    recommendedGAI: ['ChatGPT', 'Gemini'],
    phase: 'Literature Review'
  },
  {
    id: 'literature-matrix',
    title: 'Literature Matrix',
    description: 'Comparative analysis tool for organizing and synthesizing research findings across multiple studies and dimensions.',
    icon: Grid,
    recommendedGAI: ['Claude', 'Gemini'],
    phase: 'Analysis & Synthesis'
  },
  {
    id: 'thesis-weaver',
    title: 'Thesis Weaver',
    description: 'Chapter writing and methodology assistant for crafting compelling thesis sections with proper academic structure.',
    icon: PenTool,
    recommendedGAI: ['Claude', 'ChatGPT'],
    phase: 'Writing & Methods'
  },
  {
    id: 'ai-companion',
    title: 'AI Companion',
    description: 'General research support and brainstorming partner for problem-solving, motivation, and creative thinking.',
    icon: MessageCircle,
    recommendedGAI: ['Claude', 'ChatGPT'],
    phase: 'Support & Guidance'
  }
];

export default function Index() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(false);
  const [connectedCount, setConnectedCount] = useState(0);

  useEffect(() => {
    // Check connected GAI count
    const savedConnections = localStorage.getItem('gai-connections');
    if (savedConnections) {
      const connections = JSON.parse(savedConnections);
      const count = Object.values(connections).filter(Boolean).length;
      setConnectedCount(count);
    }
  }, [showConnections]);

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DrPhDAI</h1>
                <p className="text-sm text-gray-600">AI-Powered PhD Research Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={connectedCount > 0 ? "default" : "secondary"}>
                {connectedCount}/6 GAI Connected
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowConnections(true)}
              >
                <Settings className="w-4 h-4 mr-1" />
                Connect GAI
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Accelerate Your PhD Journey with DrPhDAI AI-empowered Companion
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-600">
            Connect your personal GAI accounts (ChatGPT, Claude, Gemini, Grok, Qwen, Manus) 
            to access specialized research tools and prompts for every phase of your PhD.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Research Proposals</Badge>
            <Badge variant="outline">Literature Reviews</Badge>
            <Badge variant="outline">Methodology Design</Badge>
            <Badge variant="outline">Thesis Writing</Badge>
            <Badge variant="outline">Data Analysis</Badge>
          </div>
        </div>

        {/* Connection Status */}
        {connectedCount === 0 && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-900">🚀 Get Started</CardTitle>
              <CardDescription className="text-amber-800">
                Connect your GAI accounts to unlock all research tools. Click "Connect GAI" above to begin.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              recommendedGAI={feature.recommendedGAI}
              phase={feature.phase}
              onClick={() => handleFeatureClick(feature.id)}
              disabled={connectedCount === 0}
            />
          ))}
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How DrPhDAI Works</CardTitle>
            <CardDescription>
              A simple 4-step process to enhance your PhD research with AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h3 className="mb-2 font-semibold">Connect GAI Accounts</h3>
                <p className="text-sm text-gray-600">Link your personal accounts with ChatGPT, Claude, Gemini, and others</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full">
                  <span className="font-bold text-green-600">2</span>
                </div>
                <h3 className="mb-2 font-semibold">Choose Research Tool</h3>
                <p className="text-sm text-gray-600">Select the appropriate tool for your current research phase</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full">
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <h3 className="mb-2 font-semibold">Get Custom Prompts</h3>
                <p className="text-sm text-gray-600">Receive specialized prompts tailored to your research needs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full">
                  <span className="font-bold text-orange-600">4</span>
                </div>
                <h3 className="mb-2 font-semibold">Execute & Iterate</h3>
                <p className="text-sm text-gray-600">Use prompts in your GAI platform and return for next steps</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <GAIConnectionPanel />
      
      {showConnections && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">GAI Account Connections</h2>
                <Button variant="outline" onClick={() => setShowConnections(false)}>
                  Close
                </Button>
              </div>
              <GAIConnectionPanel />
            </div>
          </div>
        </div>
      )}

      <PhdResearchProposal 
        open={activeFeature === 'phd-research-proposal'} 
        onOpenChange={closeFeature} 
      />
      <ResearchNavigator 
        open={activeFeature === 'research-navigator'} 
        onOpenChange={closeFeature} 
      />
      <LiteratureMatrix 
        open={activeFeature === 'literature-matrix'} 
        onOpenChange={closeFeature} 
      />
      <ThesisWeaver 
        open={activeFeature === 'thesis-weaver'} 
        onOpenChange={closeFeature} 
      />
      <AICompanion 
        open={activeFeature === 'ai-companion'} 
        onOpenChange={closeFeature} 
      />
    </div>
  );
}
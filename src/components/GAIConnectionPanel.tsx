import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface GAIProvider {
  id: string;
  name: string;
  description: string;
  url: string;
  connected: boolean;
  bestFor: string[];
}

const GAI_PROVIDERS: GAIProvider[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI for complex reasoning and technical drafts',
    url: 'https://chat.openai.com',
    connected: false,
    bestFor: ['Technical Writing', 'Literature Reviews', 'Code Analysis']
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI for nuanced analysis and ethical research guidance',
    url: 'https://claude.ai',
    connected: false,
    bestFor: ['Proposal Writing', 'Synthesis', 'Chapter Writing']
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI for data analysis and fact-checking',
    url: 'https://gemini.google.com',
    connected: false,
    bestFor: ['Data Analysis', 'Multimedia Research', 'Fact Verification']
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'X\'s AI assistant for real-time information and creative thinking',
    url: 'https://x.ai',
    connected: false,
    bestFor: ['Current Events', 'Creative Research', 'Trend Analysis']
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Alibaba\'s AI for multilingual research and cross-cultural analysis',
    url: 'https://tongyi.aliyun.com',
    connected: false,
    bestFor: ['Multilingual Research', 'Cross-cultural Studies', 'Global Literature']
  },
  {
    id: 'manus',
    name: 'Manus',
    description: 'Specialized AI for academic writing and research methodology',
    url: 'https://manus.ai',
    connected: false,
    bestFor: ['Academic Writing', 'Research Methods', 'Citation Management']
  }
];

export default function GAIConnectionPanel() {
  const [providers, setProviders] = useState<GAIProvider[]>(GAI_PROVIDERS);

  useEffect(() => {
    // Load connection status from localStorage
    const savedConnections = localStorage.getItem('gai-connections');
    if (savedConnections) {
      const connections = JSON.parse(savedConnections);
      setProviders(prev => prev.map(provider => ({
        ...provider,
        connected: connections[provider.id] || false
      })));
    }
  }, []);

  const toggleConnection = (providerId: string) => {
    const updatedProviders = providers.map(provider => 
      provider.id === providerId 
        ? { ...provider, connected: !provider.connected }
        : provider
    );
    setProviders(updatedProviders);

    // Save to localStorage
    const connections = updatedProviders.reduce((acc, provider) => ({
      ...acc,
      [provider.id]: provider.connected
    }), {});
    localStorage.setItem('gai-connections', JSON.stringify(connections));
  };

  const connectedCount = providers.filter(p => p.connected).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          GAI Account Connections
          <Badge variant={connectedCount > 0 ? "default" : "secondary"}>
            {connectedCount}/6 Connected
          </Badge>
        </CardTitle>
        <CardDescription>
          Connect your personal GAI accounts to access specialized research tools. 
          DrPhDAI provides prompts and workflows while you interact directly with each platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">{provider.name}</h3>
                {provider.connected ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
              <div className="flex flex-wrap gap-1">
                {provider.bestFor.map((use) => (
                  <Badge key={use} variant="outline" className="text-xs">
                    {use}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(provider.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Open
              </Button>
              <Switch
                checked={provider.connected}
                onCheckedChange={() => toggleConnection(provider.id)}
              />
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Mark GAI accounts as "connected" after creating your accounts</li>
            <li>• DrPhDAI provides specialized prompts for each research phase</li>
            <li>• Copy prompts and use them directly in your preferred GAI platform</li>
            <li>• Return to DrPhDAI to access the next step in your research workflow</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
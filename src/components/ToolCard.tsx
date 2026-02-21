// Add this to declare gtag globally for this file
declare global {
  interface Window {
    gtag?: (command: string, event: string, fields?: Record<string, any>) => void;
  }
}

import { useState } from 'react';

interface ToolCardProps {
  title: string; // e.g., "PhD Starter"
  description: string;
  promptTemplate: string; // Pre-loaded prompt from your research
  gais: Array<{ name: string; url: string; icon: string }>; // e.g., [{ name: 'Claude', url: 'https://claude.ai/chats', icon: '/icons/claude.png' }]
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, promptTemplate, gais }) => {
  const [selectedGAI, setSelectedGAI] = useState(gais[0]);

  const handleOpenGAI = () => {
    const fullPrompt = `${promptTemplate} [User Input Here]`;
    const encodedPrompt = encodeURIComponent(fullPrompt);
    window.open(`${selectedGAI.url}?prompt=${encodedPrompt}`, '_blank');
    // Safe GA4 tracking - fix for 'Cannot find name 'gtag''
    if (window.gtag) {
      window.gtag('event', 'gai_open', { tool: title, gai: selectedGAI.name });
    }
  };

  return (
    <div className="tool-card bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
      <select value={selectedGAI.name} onChange={(e) => setSelectedGAI(gais.find(g => g.name === e.target.value)!)} className="mt-2 p-2 border">
        {gais.map(gai => <option key={gai.name}>{gai.name}</option>)}
      </select>
      <button onClick={handleOpenGAI} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Open {selectedGAI.name} &gt;</button>
    </div>
  );
};
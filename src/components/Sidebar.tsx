import React from 'react';

const Sidebar: React.FC = () => {
  const generateNav = async () => {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer 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', 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: 'Generate navigation suggestions' })
      });
      const data = await response.json();
      console.log('Navigation:', data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-lg">
      <ul className="space-y-2">
        <li><a href="/app" className="text-blue-600 hover:text-blue-800">Dashboard</a></li>
        <li><a href="/app/research-starter-kit" className="text-blue-600 hover:text-blue-800">Research Starter Kit</a></li>
        <li><a href="/app/matrix" className="text-blue-600 hover:text-blue-800">Matrix</a></li>
        <li><a href="/app/ai-writing-assistant" className="text-blue-600 hover:text-blue-800">AI Writing Assistant</a></li>
        <li><a href="/app/thesis-outline-generator" className="text-blue-600 hover:text-blue-800">Thesis Outline</a></li>
        <li><a href="https://buymeacoffee.com/qasharis" className="text-green-600 hover:text-green-800" target="_blank" rel="noopener noreferrer">Support DrPhDAI</a></li>
        <li><a href="/app/help-support" className="text-blue-600 hover:text-blue-800">Help & Support</a></li>
      </ul>
      <button onClick={generateNav} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Generate Nav</button>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Wand2, Plus, Trash2, Lightbulb, Target, CheckCircle } from 'lucide-react';

interface Source {
  id: string;
  author: string;
  year: string;
  claim: string;
}

interface ArgumentWeaverProps {
  onArgumentGenerated: (argument: string) => void;
}

const ArgumentWeaver: React.FC<ArgumentWeaverProps> = ({ onArgumentGenerated }) => {
  const [sources, setSources] = useState<Source[]>([
    { id: '1', author: '', year: '', claim: '' }
  ]);
  const [mainArgument, setMainArgument] = useState('');
  const [generatedArgument, setGeneratedArgument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [connectionType, setConnectionType] = useState<'support' | 'contrast' | 'extension'>('support');

  const addSource = () => {
    setSources(prev => [...prev, { id: Date.now().toString(), author: '', year: '', claim: '' }]);
  };

  const removeSource = (id: string) => {
    if (sources.length > 1) {
      setSources(prev => prev.filter(source => source.id !== id));
    }
  };

  const updateSource = (id: string, field: keyof Source, value: string) => {
    setSources(prev => 
      prev.map(source => 
        source.id === id ? { ...source, [field]: value } : source
      )
    );
  };

  const generateArgument = async () => {
    if (!mainArgument.trim() || sources.some(s => !s.author.trim() || !s.claim.trim())) {
      alert('Please fill in all fields to generate an argument');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate argument based on connection type
    let argument = '';
    
    if (connectionType === 'support') {
      argument = `${mainArgument}. This perspective is well-supported by existing literature. ${sources[0].author} (${sources[0].year}) argues that "${sources[0].claim}", which directly reinforces this position.`;
      
      if (sources.length > 1) {
        argument += ` Similarly, ${sources[1].author} (${sources[1].year}) demonstrates that "${sources[1].claim}", further strengthening this argument.`;
      }
      
      if (sources.length > 2) {
        argument += ` This consensus is also echoed by ${sources[2].author} (${sources[2].year}), who found that "${sources[2].claim}".`;
      }
      
      argument += ` The consistent support across these studies provides robust evidence for the assertion that ${mainArgument.toLowerCase()}.`;
    } 
    else if (connectionType === 'contrast') {
      argument = `${mainArgument}. However, there are contrasting perspectives in the literature. While ${sources[0].author} (${sources[0].year}) contends that "${sources[0].claim}",`;
      
      if (sources.length > 1) {
        argument += ` ${sources[1].author} (${sources[1].year}) presents an alternative view, arguing that "${sources[1].claim}".`;
      } else {
        argument += ` this perspective can be challenged on several grounds.`;
      }
      
      if (sources.length > 2) {
        argument += ` Adding further complexity, ${sources[2].author} (${sources[2].year}) suggests that "${sources[2].claim}".`;
      }
      
      argument += ` These contrasting viewpoints highlight the nuanced nature of this topic and suggest that ${mainArgument.toLowerCase()} may be context-dependent or require further investigation.`;
    }
    else if (connectionType === 'extension') {
      argument = `${mainArgument}. Building on existing research, this perspective extends current understanding. ${sources[0].author} (${sources[0].year}) established that "${sources[0].claim}", which provides the foundation for this argument.`;
      
      if (sources.length > 1) {
        argument += ` Taking this further, ${sources[1].author} (${sources[1].year}) demonstrated that "${sources[1].claim}".`;
      }
      
      if (sources.length > 2) {
        argument += ` The work of ${sources[2].author} (${sources[2].year}) adds another dimension by showing that "${sources[2].claim}".`;
      }
      
      argument += ` This synthesis and extension of previous work reveals a more comprehensive understanding that ${mainArgument.toLowerCase()}, contributing a valuable new perspective to the field.`;
    }
    
    setGeneratedArgument(argument);
    setIsGenerating(false);
  };

  const handleUseArgument = () => {
    if (generatedArgument) {
      onArgumentGenerated(generatedArgument);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <Target className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Argument Weaver
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Craft powerful arguments by connecting multiple sources
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Main Argument
          </label>
          <textarea
            value={mainArgument}
            onChange={(e) => setMainArgument(e.target.value)}
            placeholder="Enter your central argument or claim..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-24"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This is the key point you want to establish or defend in your writing
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sources to Connect
            </label>
            <button
              onClick={addSource}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Add Source</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={source.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Source {index + 1}
                  </h3>
                  <button
                    onClick={() => removeSource(source.id)}
                    disabled={sources.length <= 1}
                    className="text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={source.author}
                      onChange={(e) => updateSource(source.id, 'author', e.target.value)}
                      placeholder="e.g., Smith"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={source.year}
                      onChange={(e) => updateSource(source.id, 'year', e.target.value)}
                      placeholder="e.g., 2023"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Key Claim or Finding
                  </label>
                  <textarea
                    value={source.claim}
                    onChange={(e) => updateSource(source.id, 'claim', e.target.value)}
                    placeholder="What does this source claim or demonstrate?"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Connection Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'support', label: 'Supporting', description: 'Sources reinforce your argument' },
              { id: 'contrast', label: 'Contrasting', description: 'Sources present different views' },
              { id: 'extension', label: 'Extending', description: 'Sources build upon each other' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setConnectionType(type.id as any)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  connectionType === type.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {type.label}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateArgument}
          disabled={isGenerating || !mainArgument.trim() || sources.some(s => !s.author.trim() || !s.claim.trim())}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Wand2 size={16} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Weaving Argument...' : 'Generate Powerful Argument'}</span>
        </button>

        {generatedArgument && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Your Woven Argument
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleUseArgument}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Use This Argument</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {generatedArgument}
              </p>
            </div>
            
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="text-yellow-600 dark:text-yellow-400" size={16} />
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                  Why This Works
                </h4>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This argument effectively {connectionType === 'support' ? 'builds a consensus view by showing multiple scholars who agree' : connectionType === 'contrast' ? 'presents a nuanced perspective by acknowledging different viewpoints' : 'shows the evolution of thinking by building on previous work'}. The structure creates a compelling narrative that guides your reader through the evidence toward your conclusion.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArgumentWeaver;
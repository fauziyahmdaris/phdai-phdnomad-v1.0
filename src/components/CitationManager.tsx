import React, { useState } from 'react';
import { BookOpen, Plus, Search, Download, Copy, Edit3, Trash2, ExternalLink, CheckCircle } from 'lucide-react';

interface Citation {
  id: string;
  type: 'journal' | 'book' | 'conference' | 'website' | 'thesis';
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publisher?: string;
  url?: string;
  doi?: string;
  abstract?: string;
}

interface CitationManagerProps {
  onCitationInsert?: (citation: string) => void;
}

const CitationManager: React.FC<CitationManagerProps> = ({ onCitationInsert }) => {
  const [citations, setCitations] = useState<Citation[]>([
    {
      id: '1',
      type: 'journal',
      title: 'Artificial Intelligence in Education: A Systematic Review',
      authors: ['Smith, J.', 'Johnson, M.', 'Brown, K.'],
      year: 2023,
      journal: 'Educational Technology Research',
      volume: '45',
      issue: '3',
      pages: '123-145',
      doi: '10.1234/etr.2023.45.3.123'
    },
    {
      id: '2',
      type: 'book',
      title: 'Machine Learning for Academic Research',
      authors: ['Davis, R.', 'Wilson, S.'],
      year: 2022,
      publisher: 'Academic Press',
      pages: '1-350'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCitations, setSelectedCitations] = useState<string[]>([]);
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'chicago'>('apa');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCitation, setNewCitation] = useState<Partial<Citation>>({
    type: 'journal',
    authors: [''],
    year: new Date().getFullYear()
  });

  const filteredCitations = citations.filter(citation =>
    citation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citation.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCitation = (citation: Citation, style: 'apa' | 'mla' | 'chicago' = 'apa'): string => {
    const authors = citation.authors.join(', ');
    
    switch (style) {
      case 'apa':
        if (citation.type === 'journal') {
          return `${authors} (${citation.year}). ${citation.title}. *${citation.journal}*, *${citation.volume}*(${citation.issue}), ${citation.pages}. ${citation.doi ? `https://doi.org/${citation.doi}` : ''}`;
        } else if (citation.type === 'book') {
          return `${authors} (${citation.year}). *${citation.title}*. ${citation.publisher}.`;
        }
        break;
      case 'mla':
        if (citation.type === 'journal') {
          return `${authors} "${citation.title}." *${citation.journal}*, vol. ${citation.volume}, no. ${citation.issue}, ${citation.year}, pp. ${citation.pages}.`;
        }
        break;
      case 'chicago':
        if (citation.type === 'journal') {
          return `${authors} "${citation.title}." *${citation.journal}* ${citation.volume}, no. ${citation.issue} (${citation.year}): ${citation.pages}.`;
        }
        break;
    }
    return `${authors} (${citation.year}). ${citation.title}.`;
  };

  const formatInTextCitation = (citation: Citation): string => {
    const firstAuthor = citation.authors[0]?.split(',')[0] || 'Unknown';
    if (citation.authors.length === 1) {
      return `(${firstAuthor}, ${citation.year})`;
    } else if (citation.authors.length === 2) {
      const secondAuthor = citation.authors[1]?.split(',')[0] || '';
      return `(${firstAuthor} & ${secondAuthor}, ${citation.year})`;
    } else {
      return `(${firstAuthor} et al., ${citation.year})`;
    }
  };

  const generateBibliography = (): string => {
    const selectedCites = citations.filter(c => selectedCitations.includes(c.id));
    return selectedCites
      .sort((a, b) => a.authors[0]?.localeCompare(b.authors[0] || '') || 0)
      .map(citation => formatCitation(citation, citationStyle))
      .join('\n\n');
  };

  const addAuthor = () => {
    setNewCitation(prev => ({
      ...prev,
      authors: [...(prev.authors || []), '']
    }));
  };

  const updateAuthor = (index: number, value: string) => {
    setNewCitation(prev => ({
      ...prev,
      authors: prev.authors?.map((author, i) => i === index ? value : author) || []
    }));
  };

  const saveCitation = () => {
    if (newCitation.title && newCitation.authors?.some(a => a.trim())) {
      const citation: Citation = {
        id: Date.now().toString(),
        type: newCitation.type || 'journal',
        title: newCitation.title,
        authors: newCitation.authors.filter(a => a.trim()),
        year: newCitation.year || new Date().getFullYear(),
        journal: newCitation.journal,
        volume: newCitation.volume,
        issue: newCitation.issue,
        pages: newCitation.pages,
        publisher: newCitation.publisher,
        url: newCitation.url,
        doi: newCitation.doi,
        abstract: newCitation.abstract
      };
      
      setCitations(prev => [citation, ...prev]);
      setNewCitation({ type: 'journal', authors: [''], year: new Date().getFullYear() });
      setShowAddForm(false);
    }
  };

  const toggleCitationSelection = (citationId: string) => {
    setSelectedCitations(prev =>
      prev.includes(citationId)
        ? prev.filter(id => id !== citationId)
        : [...prev, citationId]
    );
  };

  const insertCitation = (citation: Citation) => {
    const inTextCitation = formatInTextCitation(citation);
    if (onCitationInsert) {
      onCitationInsert(inTextCitation);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Citation Manager</h1>
            <p className="text-green-100">
              Organize references and generate citations in multiple formats
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search citations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <select
            value={citationStyle}
            onChange={(e) => setCitationStyle(e.target.value as 'apa' | 'mla' | 'chicago')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="apa">APA Style</option>
            <option value="mla">MLA Style</option>
            <option value="chicago">Chicago Style</option>
          </select>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Citation</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const bibliography = generateBibliography();
              navigator.clipboard.writeText(bibliography);
            }}
            disabled={selectedCitations.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Copy size={16} />
            <span>Copy Bibliography ({selectedCitations.length})</span>
          </button>
          
          <button
            onClick={() => {
              const bibliography = generateBibliography();
              const blob = new Blob([bibliography], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `bibliography-${citationStyle}.txt`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            disabled={selectedCitations.length === 0}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export Bibliography</span>
          </button>
        </div>
      </div>

      {/* Citations List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Citations ({filteredCitations.length})
        </h2>
        
        <div className="space-y-4">
          {filteredCitations.map((citation) => (
            <div
              key={citation.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedCitations.includes(citation.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedCitations.includes(citation.id)}
                    onChange={() => toggleCitationSelection(citation.id)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {citation.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {citation.authors.join(', ')} ({citation.year})
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-sm font-mono">
                      {formatCitation(citation, citationStyle)}
                    </div>
                    
                    {citation.abstract && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {citation.abstract}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => insertCitation(citation)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                    title="Insert in-text citation"
                  >
                    <Copy size={16} />
                  </button>
                  
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Edit citation"
                  >
                    <Edit3 size={16} />
                  </button>
                  
                  <button
                    onClick={() => setCitations(prev => prev.filter(c => c.id !== citation.id))}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                    title="Delete citation"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Open URL"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Citation Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add New Citation
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      value={newCitation.type}
                      onChange={(e) => setNewCitation(prev => ({ ...prev, type: e.target.value as Citation['type'] }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="journal">Journal Article</option>
                      <option value="book">Book</option>
                      <option value="conference">Conference Paper</option>
                      <option value="website">Website</option>
                      <option value="thesis">Thesis</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={newCitation.year}
                      onChange={(e) => setNewCitation(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newCitation.title || ''}
                    onChange={(e) => setNewCitation(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Authors *
                  </label>
                  {newCitation.authors?.map((author, index) => (
                    <input
                      key={index}
                      type="text"
                      value={author}
                      onChange={(e) => updateAuthor(index, e.target.value)}
                      placeholder="Last, F. M."
                      className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ))}
                  <button
                    onClick={addAuthor}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Author
                  </button>
                </div>

                {newCitation.type === 'journal' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Journal
                      </label>
                      <input
                        type="text"
                        value={newCitation.journal || ''}
                        onChange={(e) => setNewCitation(prev => ({ ...prev, journal: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Volume
                      </label>
                      <input
                        type="text"
                        value={newCitation.volume || ''}
                        onChange={(e) => setNewCitation(prev => ({ ...prev, volume: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={saveCitation}
                    disabled={!newCitation.title || !newCitation.authors?.some(a => a.trim())}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle size={16} />
                    <span>Save Citation</span>
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitationManager;
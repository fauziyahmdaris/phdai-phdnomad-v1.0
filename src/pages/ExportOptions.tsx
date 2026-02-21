import React, { useState } from 'react';
import { Download, FileText, File, Clipboard, CheckCircle, Settings, ArrowRight, BookOpen, PenTool, Grid3X3, Code, Copy } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const ExportOptions: React.FC = () => {
  const { currentProject, literatureEntries } = useProject();
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'docx' | 'latex' | 'markdown'>('pdf');
  const [selectedContent, setSelectedContent] = useState<'all' | 'literature' | 'thesis' | 'custom'>('all');
  const [customOptions, setCustomOptions] = useState({
    includeCover: true,
    includeTableOfContents: true,
    includeAbstract: true,
    includeReferences: true,
    includeAppendices: false
  });
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  
  const [latexTemplate, setLatexTemplate] = useState<'default' | 'apa' | 'ieee' | 'acm'>('default');
  const [docxTemplate, setDocxTemplate] = useState<'default' | 'apa' | 'mla' | 'chicago'>('default');
  const [citationStyle, setCitationStyle] = useState<'apa' | 'mla' | 'chicago' | 'harvard' | 'ieee'>('apa');

  const handleExport = () => {
    // Simulate export process
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: FileText, description: 'Portable Document Format for sharing and printing' },
    { id: 'docx', name: 'Word Document', icon: File, description: 'Editable Microsoft Word format for further editing' },
    { id: 'latex', name: 'LaTeX Source', icon: Code, description: 'LaTeX source code for academic publishing' },
    { id: 'markdown', name: 'Markdown', icon: FileText, description: 'Plain text format with simple formatting' }
  ];

  const contentTypes = [
    { id: 'all', name: 'Complete Project', description: 'Export all project content including literature, thesis, and notes' },
    { id: 'literature', name: 'Literature Matrix', description: 'Export only your literature matrix with all entries and analyses' },
    { id: 'thesis', name: 'Thesis Draft', description: 'Export your current thesis draft with all chapters' },
    { id: 'custom', name: 'Custom Selection', description: 'Select specific components to include in your export' }
  ];

  const referenceManagers = [
    { name: 'Zotero', logo: '📚', description: 'Export your literature entries to Zotero' },
    { name: 'Mendeley', logo: '📖', description: 'Export your literature entries to Mendeley' },
    { name: 'EndNote', logo: '📝', description: 'Export your literature entries to EndNote' },
    { name: 'RefWorks', logo: '📋', description: 'Export your literature entries to RefWorks' }
  ];

  const renderLatexCode = () => {
    return `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{natbib}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{amsmath}

\\title{${currentProject?.title || 'Research Project'}}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
This research examines the development and evaluation of AI-powered microlearning platforms for postgraduate education, with a specific focus on literature review skills. The study employs a mixed-methods approach to assess the effectiveness of adaptive learning technologies in enhancing research competencies among PhD students.
\\end{abstract}

\\section{Introduction}
% Introduction content here

\\section{Literature Review}
% Literature review content here
${literatureEntries.map(entry => `
\\subsection{${entry.title}}
${entry.authors.join(', ')} (${entry.year}). ${entry.journal}.

${entry.abstract}

${entry.researchGap ? `\\textbf{Research Gap:} ${entry.researchGap}` : ''}
`).join('\n')}

\\section{Methodology}
% Methodology content here

\\section{Results}
% Results content here

\\section{Discussion}
% Discussion content here

\\section{Conclusion}
% Conclusion content here

\\bibliographystyle{apalike}
\\bibliography{references}

\\end{document}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Download size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Enhanced Export Options</h1>
            <p className="text-green-100">
              Export your research in multiple formats for different purposes
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">🚀 Flexible Export Solutions</h3>
          <p className="text-sm text-green-100">
            Export your research in PDF, Word, LaTeX, or Markdown formats. Customize your exports with 
            different citation styles, templates, and content selections to meet your specific needs.
          </p>
        </div>
      </div>

      {/* Export Format Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          1. Choose Export Format
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exportFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id as any)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  selectedFormat === format.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <format.icon 
                    className={`${
                      selectedFormat === format.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`} 
                    size={20} 
                  />
                </div>
                <h3 className={`font-medium ${
                  selectedFormat === format.id
                    ? 'text-blue-900 dark:text-blue-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {format.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                {format.description}
              </p>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowFormatOptions(!showFormatOptions)}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
        >
          <Settings size={14} />
          <span>Format-Specific Options</span>
        </button>
        
        {showFormatOptions && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {selectedFormat === 'pdf' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">PDF Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Paper Size
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>A4</option>
                      <option>US Letter</option>
                      <option>US Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Font
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option>Times New Roman</option>
                      <option>Arial</option>
                      <option>Calibri</option>
                      <option>Garamond</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {selectedFormat === 'docx' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Word Document Options</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Template
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'default', label: 'Default' },
                      { id: 'apa', label: 'APA Style' },
                      { id: 'mla', label: 'MLA Style' },
                      { id: 'chicago', label: 'Chicago Style' }
                    ].map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setDocxTemplate(template.id as any)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          docxTemplate === template.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          docxTemplate === template.id
                            ? 'text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {template.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {selectedFormat === 'latex' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">LaTeX Options</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LaTeX Template
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'default', label: 'Default Article' },
                      { id: 'apa', label: 'APA Style' },
                      { id: 'ieee', label: 'IEEE Conference' },
                      { id: 'acm', label: 'ACM Paper' }
                    ].map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setLatexTemplate(template.id as any)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          latexTemplate === template.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          latexTemplate === template.id
                            ? 'text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {template.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LaTeX Code Preview
                  </label>
                  <div className="relative">
                    <pre className="p-4 bg-gray-800 text-gray-200 rounded-lg overflow-x-auto text-xs font-mono">
                      {renderLatexCode()}
                    </pre>
                    <button 
                      onClick={() => navigator.clipboard.writeText(renderLatexCode())}
                      className="absolute top-2 right-2 p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {selectedFormat === 'markdown' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Markdown Options</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-frontmatter"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="include-frontmatter" className="text-sm text-gray-700 dark:text-gray-300">
                    Include YAML frontmatter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-toc"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="include-toc" className="text-sm text-gray-700 dark:text-gray-300">
                    Generate table of contents
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          2. Select Content to Export
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {contentTypes.map((content) => (
            <button
              key={content.id}
              onClick={() => setSelectedContent(content.id as any)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedContent === content.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <h3 className={`font-medium ${
                selectedContent === content.id
                  ? 'text-blue-900 dark:text-blue-100'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {content.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {content.description}
              </p>
            </button>
          ))}
        </div>
        
        {selectedContent === 'custom' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Custom Content Selection
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-cover"
                  checked={customOptions.includeCover}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, includeCover: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-cover" className="text-sm text-gray-700 dark:text-gray-300">
                  Cover Page
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-toc"
                  checked={customOptions.includeTableOfContents}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, includeTableOfContents: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-toc" className="text-sm text-gray-700 dark:text-gray-300">
                  Table of Contents
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-abstract"
                  checked={customOptions.includeAbstract}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, includeAbstract: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-abstract" className="text-sm text-gray-700 dark:text-gray-300">
                  Abstract
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-references"
                  checked={customOptions.includeReferences}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, includeReferences: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-references" className="text-sm text-gray-700 dark:text-gray-300">
                  References
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-appendices"
                  checked={customOptions.includeAppendices}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, includeAppendices: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="include-appendices" className="text-sm text-gray-700 dark:text-gray-300">
                  Appendices
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Citation Style */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          3. Choose Citation Style
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { id: 'apa', label: 'APA 7th Edition' },
            { id: 'mla', label: 'MLA 9th Edition' },
            { id: 'chicago', label: 'Chicago 17th Edition' },
            { id: 'harvard', label: 'Harvard Style' },
            { id: 'ieee', label: 'IEEE Style' }
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setCitationStyle(style.id as any)}
              className={`p-3 border rounded-lg text-center transition-colors ${
                citationStyle === style.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <span className={`text-sm font-medium ${
                citationStyle === style.id
                  ? 'text-blue-900 dark:text-blue-100'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {style.label}
              </span>
            </button>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Citation Preview
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 font-mono">
            {citationStyle === 'apa' && 'Smith, J., & Johnson, M. (2023). Artificial intelligence in education: A systematic review. Educational Technology Research, 45(3), 123-145. https://doi.org/10.1234/etr.2023.45.3.123'}
            {citationStyle === 'mla' && 'Smith, John, and Mary Johnson. "Artificial Intelligence in Education: A Systematic Review." Educational Technology Research, vol. 45, no. 3, 2023, pp. 123-145.'}
            {citationStyle === 'chicago' && 'Smith, John, and Mary Johnson. "Artificial Intelligence in Education: A Systematic Review." Educational Technology Research 45, no. 3 (2023): 123-145.'}
            {citationStyle === 'harvard' && 'Smith, J. and Johnson, M. (2023) Artificial intelligence in education: A systematic review. Educational Technology Research, 45(3), pp. 123-145.'}
            {citationStyle === 'ieee' && 'J. Smith and M. Johnson, "Artificial intelligence in education: A systematic review," Educational Technology Research, vol. 45, no. 3, pp. 123-145, 2023.'}
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ready to Export
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your export will include {selectedContent === 'all' ? 'all project content' : 
                selectedContent === 'literature' ? 'your literature matrix' : 
                selectedContent === 'thesis' ? 'your thesis draft' : 
                'your custom selection'} in {selectedFormat.toUpperCase()} format
            </p>
          </div>
          
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            {exportSuccess ? (
              <>
                <CheckCircle size={20} />
                <span>Export Successful!</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Export Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reference Manager Integration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Reference Manager Integration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {referenceManagers.map((manager, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{manager.logo}</div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {manager.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {manager.description}
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2">
                <ArrowRight size={14} />
                <span>Export to {manager.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Export Formats Comparison */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Export Format Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  DOCX
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  LaTeX
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Markdown
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Best For
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Sharing, Printing
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Editing, Collaboration
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Academic Publishing
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Version Control, Web
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Editability
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Low
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  High
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Medium
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  High
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Formatting Control
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  High
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Medium
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Very High
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Low
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Citation Support
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Fixed
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Dynamic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Excellent
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Basic
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  File Size
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Large
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Medium
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Small
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  Very Small
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
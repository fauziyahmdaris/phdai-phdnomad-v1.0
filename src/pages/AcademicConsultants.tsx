import React from 'react';

interface Consultant {
  name: string;
  title: string;
  institution: string;
  country: string;
  areas: string[];
  website?: string;
  email?: string;
}

const AcademicConsultants: React.FC = () => {
  const [consultants, setConsultants] = React.useState<Consultant[]>([]);
  const [query, setQuery] = React.useState('');
  const [country, setCountry] = React.useState('');

  React.useEffect(() => {
    fetch('/consultants.json')
      .then(r => r.json())
      .then(setConsultants)
      .catch(() => setConsultants([]));
  }, []);

  const filtered = consultants.filter(c => {
    const q = query.toLowerCase();
    const matchQ = !q || [c.name, c.title, c.institution, c.areas.join(' ')].join(' ').toLowerCase().includes(q);
    const matchCountry = !country || c.country.toLowerCase() === country.toLowerCase();
    return matchQ && matchCountry;
  });

  const countries = Array.from(new Set(consultants.map(c => c.country))).sort();

  return (
    <div className="space-y-6">
      <div className="p-6 text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl">
        <h1 className="text-2xl font-bold">Research Consultants</h1>
        <p className="mt-2 text-white/90 text-sm max-w-3xl">Join our global pool of PhD supervisors and research consultants. Get featured and reach postgraduate students worldwide.</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <a href="https://buymeacoffee.com/qasharis" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-emerald-950 bg-emerald-300 rounded-lg hover:bg-emerald-400">Get Featured (Paid)</a>
        <a href="https://forms.gle/Ka3tF88YQu5c9SfT8" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800">Register as Consultant</a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, institution, expertise" className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700" />
        <select value={country} onChange={e => setCountry(e.target.value)} className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Listing */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((c, idx) => (
          <div key={idx} className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-1 w-12 rounded bg-emerald-500/80 mb-3" />
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.name}</h3>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{c.country}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{c.title}, {c.institution}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.areas.map(a => (<span key={a} className="text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200">{a}</span>))}
            </div>
            <div className="mt-3 flex gap-3">
              {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-sm underline">Website</a>}
              {c.email && <a href={`mailto:${c.email}`} className="text-sm underline">Email</a>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-300">No consultants found for your filters.</div>
        )}
      </div>
    </div>
  );
};

export default AcademicConsultants;
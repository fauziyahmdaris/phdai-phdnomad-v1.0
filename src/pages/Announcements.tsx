import React from 'react';

interface Announcement {
  title: string;
  university: string;
  country: string;
  type: string;
  date: string;
  deadline: string | null;
  summary: string;
  link: string;
  tags: string[];
}

const Announcements: React.FC = () => {
  const [items, setItems] = React.useState<Announcement[]>([]);
  const [q, setQ] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [type, setType] = React.useState('');

  React.useEffect(() => {
    fetch('/announcements.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const countries = Array.from(new Set(items.map(i => i.country))).sort();
  const types = Array.from(new Set(items.map(i => i.type))).sort();

  const filtered = items.filter(i => {
    const text = [i.title, i.university, i.summary, i.tags.join(' ')].join(' ').toLowerCase();
    const matchQ = !q || text.includes(q.toLowerCase());
    const matchCountry = !country || i.country.toLowerCase() === country.toLowerCase();
    const matchType = !type || i.type.toLowerCase() === type.toLowerCase();
    return matchQ && matchCountry && matchType;
  });

  const waLink = 'https://wa.me/60193438388?text=DRPHDAI:%20University%20Announcement%20Inquiry';

  return (
    <div className="space-y-6">
      <div className="p-6 text-white bg-gradient-to-r from-sky-600 to-cyan-600 rounded-xl">
        <h1 className="text-2xl font-bold">University Announcements</h1>
        <p className="mt-2 text-white/90 text-sm max-w-3xl">Latest postgraduate admissions, programme flyers, and official updates curated for DrPhDAI users.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search title, university, tags" className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700" />
        <select value={country} onChange={e => setCountry(e.target.value)} className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="ml-auto px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">Add Announcement (WhatsApp)</a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((i, idx) => (
          <div key={idx} className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-1 w-12 rounded bg-sky-500/80 mb-3" />
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{i.title}</h3>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{i.type}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{i.university} • {i.country}</p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{i.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {i.tags.map(t => (<span key={t} className="text-xs px-2 py-1 rounded bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200">{t}</span>))}
            </div>
            <div className="mt-3">
              <a href={i.link} target="_blank" rel="noopener noreferrer" className="text-sm underline">View details</a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-300">No announcements match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default Announcements;

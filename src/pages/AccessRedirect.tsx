import { useEffect, useRef, useState } from 'react';

const GOOGLE_FORM_URL = 'https://forms.gle/xqjpP5HjerehocLS6';

export default function AccessRedirect() {
  const TOTAL = 33;
  const [seconds, setSeconds] = useState(TOTAL);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          window.location.href = GOOGLE_FORM_URL;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      {/* Skip links for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded">Skip to content</a>
      <button
        onClick={() => {
          const root = document.documentElement;
          root.classList.toggle('dark');
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 bg-gray-900 text-white px-3 py-2 rounded"
      >
        Toggle dark mode
      </button>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid md:grid-cols-2" id="main">
          {/* Left: Video Panel */}
          <div className="relative aspect-video md:aspect-auto md:h-full bg-black">
            <iframe
              title="Welcome to DrPhDAI"
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/XYU0-8WWW60?rel=0&modestbranding=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Right: Access Instructions */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Request Access to DrPhDAI</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              To use the MVP features, please complete our short registration form. We will provide your special User ID and Password after review.
            </p>

            <div className="mt-4">
              <div aria-hidden className="h-2 w-full bg-amber-100 dark:bg-amber-900/40 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 dark:bg-amber-500" style={{ width: `${((TOTAL - seconds) / TOTAL) * 100}%` }} />
              </div>
              <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm" role="status" aria-live="polite">
                Redirecting to the form in <strong>{seconds}</strong> seconds...
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-indigo-950 bg-amber-300 rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
                aria-label="Open access form"
              >
                Open Access Form Now
              </a>
              <a
                href="https://buymeacoffee.com/qasharis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Support DrPhDAI
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Enter App (Homepage)
              </a>
              <button
                onClick={() => {
                  localStorage.setItem('access_granted', 'true');
                  window.location.href = '/app';
                }}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="I received my access"
              >
                I received my access
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              We use a privacy-friendly video embed and accessible controls. Keyboard users can tab to the buttons above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

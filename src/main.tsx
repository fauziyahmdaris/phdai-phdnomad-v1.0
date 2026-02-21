import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx loaded - entry point OK');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Disruptive: Track app initialization with GA4
if (window.gtag) {
  window.gtag('event', 'app_initialized', { 'event_category': 'PhD Journey', 'event_label': 'v2.0 Launch' });
}

createRoot(rootElement).render(<App />);
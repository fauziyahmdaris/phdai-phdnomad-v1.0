import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Navigator from './pages/Navigator';
import Matrix from './pages/Matrix';
import ThesisWeaver from './pages/ThesisWeaver';
import AICompanion from './pages/AICompanion';
import About from './pages/About';
import FounderStory from './pages/FounderStory';
import Login from './pages/Login';
import Auth from './pages/Auth';
import StarterKitRedirect from './pages/StarterKitRedirect';
import AccessRedirect from './pages/AccessRedirect';
import AITools from './pages/AITools';
import ResearchJournals from './pages/ResearchJournals';
import DrPhDAIMentor from './pages/DrPhDAIMentor';
import UserGuide from './pages/UserGuide';
import GoogleDrive from './pages/GoogleDrive';
import HelpSupport from './pages/HelpSupport';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Certifications from './pages/Certifications';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import GapScanner from './pages/GapScanner';
import AcademicConsultants from './pages/AcademicConsultants';
import WritingTools from './pages/WritingTools';
import Microlearning from './pages/Microlearning';
import AIWritingAssistant from './pages/AIWritingAssistant';
import ResearchPathfinder from './pages/ResearchPathfinder';
import CollaborativeResearch from './pages/CollaborativeResearch';
import LiteratureRecommendations from './pages/LiteratureRecommendations';
import ProgressAnalytics from './pages/ProgressAnalytics';
import ExportOptions from './pages/ExportOptions';
import Announcements from './pages/Announcements';
import MobileAppPromo from './pages/MobileAppPromo';
import PersonalizedLearning from './pages/PersonalizedLearning';
import FreeResources from './pages/FreeResources';
import Store from './pages/Store';
import NetworkCommunity from './pages/NetworkCommunity';
import Root from './pages/Root';
import QuickMenu from './components/QuickMenu';
import Footer from './components/Footer';
import PaymentMethods from './pages/PaymentMethods';
import NotFound from './pages/NotFound';
import { hasMVPAccess } from './plan';
import Paywall from './components/Paywall';
import Homepage from './pages/Homepage';

const queryClient = new QueryClient();

// Component to handle initial route
const AppContent = () => {
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has paid access
    setHasAccess(hasMVPAccess());
    
    console.log('App.tsx mounted - routes initializing...', location.pathname);
    if (window.gtag) {
      window.gtag('event', 'route_change', {
        'event_category': 'PhD Navigation',
        'event_label': location.pathname,
        'value': 1
      });
    }
    const handleError = (error: ErrorEvent) => {
      console.error('Global error caught:', error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [location]);

  // For public pages, don't check access
  const isPublicPage = ['/', '/about', '/founder-story', '/privacy-policy', '/terms-of-service', '/payment-methods'].includes(location.pathname);

  if (!isPublicPage && hasAccess === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🚀</div>
          <div>Loading drphdai.my...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Show QuickMenu only on public pages except homepage */}
      {!location.pathname.startsWith('/app') && location.pathname !== '/' && <QuickMenu />}
      
      <Routes>
        {/* New Homepage */}
        <Route path="/" element={<Homepage />} />
        
        {/* Public pages */}
        <Route path="/about" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <About />
          </div>
        } />
        <Route path="/founder-story" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <FounderStory />
            <Footer />
          </div>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<AccessRedirect />} />
        <Route path="/starter-kit" element={<StarterKitRedirect />} />
        <Route path="/pathfinder" element={<ResearchPathfinder />} />
        <Route path="/privacy-policy" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl px-4 py-8 mx-auto">
              <PrivacyPolicy />
            </div>
            <Footer />
          </div>
        } />
        <Route path="/terms-of-service" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl px-4 py-8 mx-auto">
              <TermsOfService />
            </div>
            <Footer />
          </div>
        } />
        <Route path="/payment-methods" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl px-4 py-8 mx-auto">
              <PaymentMethods />
            </div>
            <Footer />
          </div>
        } />

        {/* App Routes - Show full-screen paywall if no access */}
        <Route path="/app" element={
          hasAccess ? (
            <Layout />
          ) : (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {/* Show the app layout in the background but disabled */}
              <div className="opacity-50 pointer-events-none">
                <Layout />
              </div>
              
              {/* Full-screen paywall overlay */}
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8">
                    <Paywall />
                  </div>
                </div>
              </div>
            </div>
          )
        }>
          <Route index element={<Dashboard />} />
          <Route path="root" element={<Root />} />
          <Route path="navigator" element={<Navigator />} />
          <Route path="matrix" element={<Matrix />} />
          <Route path="thesis-weaver" element={<ThesisWeaver />} />
          <Route path="ai-companion" element={<AICompanion />} />
          <Route path="gap-scanner" element={<GapScanner />} />
          <Route path="writing-tools" element={<WritingTools />} />
          <Route path="ai-writing-assistant" element={<AIWritingAssistant />} />
          <Route path="microlearning" element={<Microlearning />} />
          <Route path="ai-tools" element={<AITools />} />
          <Route path="research-journals" element={<ResearchJournals />} />
          <Route path="mentor" element={<DrPhDAIMentor />} />
          <Route path="consultants" element={<AcademicConsultants />} />
          <Route path="user-guide" element={<UserGuide />} />
          <Route path="google-drive" element={<GoogleDrive />} />
          <Route path="help-support" element={<HelpSupport />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="pathfinder" element={<ResearchPathfinder />} />
          <Route path="collaborative-research" element={<CollaborativeResearch />} />
          <Route path="literature-recommendations" element={<LiteratureRecommendations />} />
          <Route path="progress-analytics" element={<ProgressAnalytics />} />
          <Route path="export-options" element={<ExportOptions />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="mobile-app" element={<MobileAppPromo />} />
          <Route path="personalized-learning" element={<PersonalizedLearning />} />
          <Route path="free-resources" element={<FreeResources />} />
          <Route path="store" element={<Store />} />
          <Route path="network" element={<NetworkCommunity />} />
        </Route>

        {/* Add catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ThemeProvider>
          <AuthProvider>
            <ProjectProvider>
              <Router>
                <AppContent />
              </Router>
            </ProjectProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
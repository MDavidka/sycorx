import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Import all route components
import { Header } from './components/header';
import { Footer } from './components/footer';
import { HomePage } from './components/home-page';
import { AboutPage } from './components/about-page';
import { ServicesPage } from './components/services-page';
import { ContactPage } from './components/contact-page';
import { PricingPage } from './components/pricing-page';
import { DashboardPage } from './components/dashboard-page';
import { SupportPage } from './components/support-page';

// Import types
import type { UserSession } from './types';

function App() {
  // Simple client-side routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState<UserSession | null>(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper to pass down to components
  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mock authentication handlers
  const handleLogin = () => {
    setUser({
      id: 'usr_123',
      name: 'Demo User',
      email: 'demo@nexushost.com',
      role: 'user',
    });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Route matching logic
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/contact':
        return <ContactPage />;
      case '/pricing':
        return <PricingPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/support':
        return <SupportPage onNavigate={navigate} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-muted-foreground">404</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Return to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Header 
        currentPath={currentPath} 
        onNavigate={navigate} 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col w-full">
        {renderPage()}
      </main>
      
      <Footer onNavigate={navigate} />
    </div>
  );
}

// Exported initialization function to safely mount the React app
export function init() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Failed to find the root element. Ensure index.html has a <div id="root"></div>');
    return;
  }
  
  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Auto-initialize if this script is loaded directly in the browser
if (typeof window !== 'undefined') {
  // Use a small timeout to ensure the DOM is fully parsed if script is not deferred
  setTimeout(init, 0);
}
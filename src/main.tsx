import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Import Types
import type { UserSession } from './types';

// Import Layout Components
import { Header } from './components/header';
import { Footer } from './components/footer';

// Import Page Components
import { HomePage } from './components/home-page';
import { PricingPage } from './components/pricing-page';
import { DashboardPage } from './components/dashboard-page';
import { SupportPage } from './components/support-page';

// Mock User for Demonstration
const MOCK_USER: UserSession = {
  id: 'usr_01H9X',
  name: 'Alex Developer',
  email: 'alex@example.com',
  role: 'user',
  avatarUrl: 'https://i.pravatar.cc/150?u=alex'
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState<UserSession | null>(null);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom navigation function
  const navigate = useCallback((path: string) => {
    // Handle hash links (e.g., /pricing#vps)
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if (basePath && basePath !== currentPath) {
        window.history.pushState({}, '', basePath);
        setCurrentPath(basePath);
      }
      // Allow browser to handle the hash scroll after a short delay for render
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Mock Authentication Handlers
  const handleLogin = useCallback(() => {
    setUser(MOCK_USER);
    // Optionally redirect to dashboard on login if on home page
    if (currentPath === '/') {
      navigate('/dashboard');
    }
  }, [currentPath, navigate]);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('/');
  }, [navigate]);

  // Route matching logic
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/pricing':
        return <PricingPage onNavigate={navigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case '/support':
        return <SupportPage onNavigate={navigate} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="text-6xl font-extrabold tracking-tight text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Page not found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Header 
        currentPath={currentPath} 
        onNavigate={navigate} 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 flex flex-col">
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

// Execute initialization
init();
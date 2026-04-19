import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider, Button } from '@heroui/react';
import './style.css';

// Layout Components
import { Header } from './components/header';
import { Footer } from './components/footer';

// Page Components
import { HomePage } from './components/home-page';
import { PricingPage } from './components/pricing-page';
import { DashboardPage } from './components/dashboard-page';
import { SupportPage } from './components/support-page';

function App() {
  // Simple client-side routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Mock authentication state for the prototype
  // In a real app, this would be managed by an AuthProvider (e.g., JWT, session)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Redirect to dashboard after login if on a public page
    if (currentPath === '/' || currentPath === '/pricing') {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Redirect to home if on a protected route
    if (currentPath === '/dashboard' || currentPath === '/support') {
      navigate('/');
    }
  };

  // Protected Route Wrapper
  const renderProtectedRoute = (Component: React.ComponentType<{ onNavigate: (path: string) => void }>) => {
    if (!isLoggedIn) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 w-full">
          <div className="w-20 h-20 bg-[#233554] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#8892B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#CCD6F6] mb-4">Authentication Required</h2>
          <p className="text-[#8892B0] max-w-md mb-8">
            You need to be logged in to access this page. Please sign in to manage your hosting services and support tickets.
          </p>
          <Button 
            color="primary" 
            size="lg"
            className="bg-[#64FFDA] text-[#0A192F] font-semibold px-8"
            onPress={handleLogin}
          >
            Log In Now
          </Button>
        </div>
      );
    }
    return <Component onNavigate={navigate} />;
  };

  // Route matching
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/pricing':
        return <PricingPage onNavigate={navigate} />;
      case '/dashboard':
        return renderProtectedRoute(DashboardPage);
      case '/support':
        return renderProtectedRoute(SupportPage);
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 w-full">
            <h1 className="text-8xl font-bold text-[#64FFDA] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-[#CCD6F6] mb-4">Page Not Found</h2>
            <p className="text-[#8892B0] max-w-md mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Button 
              variant="bordered" 
              size="lg"
              className="border-[#233554] text-[#CCD6F6] hover:bg-[#112240]"
              onPress={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        );
    }
  };

  return (
    <HeroUIProvider>
      <div className="flex flex-col min-h-screen bg-[#0A192F] text-[#CCD6F6] font-sans selection:bg-[#64FFDA] selection:text-[#0A192F]">
        <Header 
          currentPath={currentPath} 
          onNavigate={navigate} 
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow flex flex-col items-center w-full">
          {renderPage()}
        </main>
        
        <Footer />
      </div>
    </HeroUIProvider>
  );
}

// Safely mount the React application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element to mount the React application.');
}
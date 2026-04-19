import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import './style.css';

// Import Layout Components
import { Header } from './components/header';
import { Footer } from './components/footer';

// Import Page Components
import { HomePage } from './components/home-page';
import { PricingPage } from './components/pricing-page';
import { DashboardPage } from './components/dashboard-page';
import { ContactPage } from './components/contact-page';

/**
 * ScrollToTop component ensures that navigating to a new route
 * scrolls the window back to the top of the page.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/**
 * Main Application Layout and Routing
 */
function App() {
  return (
    <HeroUIProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground font-body selection:bg-primary/30">
        <Header />
        
        <main className="flex-grow flex flex-col relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Fallback route for 404s - redirects to home for simplicity in this demo */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HeroUIProvider>
  );
}

/**
 * Initialize and render the React application.
 * Wrapped in an exported function to prevent unsafe top-level DOM access.
 */
export function init() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Failed to find the root element with id "root".');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Execute initialization if running in a browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Since this script is loaded as a module, the DOM is generally ready,
  // but we check readyState just to be perfectly safe.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
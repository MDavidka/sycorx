import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

// Import UI Components
import { Card, CardBody, Button } from "@heroui/react";
import { Database, Settings, ArrowLeft } from "lucide-react";

// Import Page & Layout Components
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomePage } from "./components/home-page";
import { LeaderboardPage } from "./components/leaderboard-page";

/**
 * Settings Page Component
 * Renders a placeholder for database connection and user preferences.
 */
function SettingsPage(): JSX.Element {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500 min-h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-black text-foreground tracking-tight">Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className="bg-warning-50/50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-900/50 shadow-sm">
          <CardBody className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-100 dark:bg-warning-900/50 rounded-full shrink-0">
                <Database className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h2 className="text-xl font-bold text-warning-800 dark:text-warning-300">
                Database Connection Required
              </h2>
            </div>
            <p className="text-warning-700 dark:text-warning-400/90 leading-relaxed">
              Cloud saving, cross-device synchronization, and global leaderboards are currently disabled. 
              Please connect a MongoDB integration in the Integrations tab to enable persistent storage for your bakery.
            </p>
            <Button 
              color="warning" 
              variant="solid" 
              className="w-fit font-bold mt-2 shadow-sm" 
              onClick={() => alert("Please configure the MongoDB integration in the Integrations tab.")}
            >
              Connect Database
            </Button>
          </CardBody>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardBody className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Local Save Data</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your game progress is currently only saved in this browser session. 
              Clearing your browser data will reset your bakery.
            </p>
            <Button 
              color="danger" 
              variant="flat" 
              className="w-fit font-bold"
              onClick={() => {
                if (confirm("Are you sure you want to reset your local progress? This cannot be undone.")) {
                  window.location.reload();
                }
              }}
            >
              Reset Local Progress
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

/**
 * Main Application Component
 * Handles client-side routing and layout wrapping.
 */
function App(): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward navigation
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Intercept link clicks for SPA routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        // Do not intercept if it has target="_blank" or modifier keys are pressed
        if (anchor.getAttribute("target") === "_blank" || e.ctrlKey || e.metaKey) return;
        
        e.preventDefault();
        const path = new URL(anchor.href).pathname;
        window.history.pushState({}, "", path);
        setCurrentPath(path);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  // Note: In a fully centralized state architecture, `cookies` and `cps` would be 
  // lifted here and passed down to both Header and HomePage. Since HomePage encapsulates 
  // the core game loop and state for this iteration, we pass placeholder values to the Header.
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Global Navigation Header */}
      <Header currentCookies={0} cps={0} />
      
      {/* Main Content Area (Router) */}
      <main className="flex-grow relative z-10">
        {currentPath === "/" && <HomePage />}
        
        {currentPath === "/upgrades" && (
          <div className="max-w-3xl mx-auto px-4 py-24 text-center animate-in fade-in duration-500 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
               <Settings className="w-12 h-12 text-primary" />
             </div>
             <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight">Upgrades Shop</h1>
             <p className="text-lg text-muted-foreground mb-8 max-w-md">
               The upgrade shop has been integrated directly into your main Bakery dashboard for easier access!
             </p>
             <Button 
               color="primary" 
               size="lg"
               className="font-bold shadow-md"
               startContent={<ArrowLeft className="w-5 h-5" />}
               onClick={() => navigateTo("/")}
             >
               Return to Bakery
             </Button>
          </div>
        )}
        
        {currentPath === "/leaderboard" && <LeaderboardPage />}
        
        {currentPath === "/settings" && <SettingsPage />}
        
        {/* 404 Fallback Route */}
        {!["/", "/upgrades", "/leaderboard", "/settings"].includes(currentPath) && (
          <div className="max-w-3xl mx-auto px-4 py-24 text-center min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Looks like this part of the bakery is still under construction.
            </p>
            <Button 
              color="primary" 
              variant="flat"
              className="font-bold"
              onClick={() => navigateTo("/")}
            >
              Go Home
            </Button>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

/**
 * Initializes the React application and mounts it to the DOM.
 * Wrapped in an exported function to ensure safe DOM access.
 */
export function init(): void {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Failed to find the root element. Ensure index.html has a <div id=\"root\"></div>");
    return;
  }

  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Auto-initialize the application when the script loads
init();
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@heroui/react";
import { Server } from "lucide-react";

import "./style.css";

// Import all page components
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomePage } from "./components/home-page";
import { DashboardPage } from "./components/dashboard-page";
import { InstanceDetailPage } from "./components/instance-detail-page";
import { BillingPage } from "./components/billing-page";
import { LoginPage } from "./components/login-page";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for popstate events to handle browser back/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Simple SPA router
  const renderPage = () => {
    if (currentPath === "/") {
      return <HomePage />;
    }
    if (currentPath === "/login") {
      return <LoginPage />;
    }
    if (currentPath === "/dashboard") {
      return <DashboardPage />;
    }
    if (currentPath === "/billing") {
      return <BillingPage />;
    }
    if (currentPath.startsWith("/instance/")) {
      return <InstanceDetailPage />;
    }

    // 404 Not Found Fallback
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-16rem)]">
        <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mb-6">
          <Server className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground tracking-tight">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button 
          color="primary"
          size="lg"
          className="font-medium"
          onClick={() => {
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new Event("popstate"));
          }}
        >
          Return to Home
        </Button>
      </div>
    );
  };

  return (
    // The 'dark' class enforces the Dark-Tech aesthetic by default as specified
    <div className="dark min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex-1 flex flex-col w-full relative">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Auto-initialize if we're in a browser environment
if (typeof window !== "undefined") {
  init();
}
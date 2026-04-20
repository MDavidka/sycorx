import React, { useEffect, useState } from "react";
import { Button, Link } from "@heroui/react";
import { Moon, Sun, Github, Cookie } from "lucide-react";

export function Footer(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme state based on current document class
  useEffect(() => {
    // Check if dark mode is currently active
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    // Optional: Listen for system theme changes if no explicit class is set initially
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!document.documentElement.classList.contains("dark") && !document.documentElement.classList.contains("light")) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      root.classList.add("light");
      setIsDark(false);
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-md py-6 mt-auto z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-primary" />
          <p className="text-sm font-medium text-foreground">
            Cookie Clicker <span className="text-muted-foreground ml-1">v1.0.0</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p className="hidden sm:block">
            © {new Date().getFullYear()} Bakery Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <Button 
              isIconOnly 
              variant="light" 
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button 
              isIconOnly 
              variant="light" 
              as={Link} 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
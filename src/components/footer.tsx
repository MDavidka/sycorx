import React from 'react';
import { Link } from "@heroui/react";
import { Github, Twitter, Cookie, Heart } from 'lucide-react';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-md py-6 mt-auto z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand & Version */}
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground tracking-tight">Cookie Clicker</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground border border-border/50">
            v1.0.0
          </span>
        </div>

        {/* Copyright & Credits */}
        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            Baked with <Heart className="w-3.5 h-3.5 text-destructive animate-pulse" /> by the Open Source Community
          </p>
          <p className="text-xs opacity-80">&copy; {currentYear} Bakery Games. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-secondary/50"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-secondary/50"
            aria-label="Twitter Profile"
          >
            <Twitter className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
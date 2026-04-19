import React from "react";
import { Github, Twitter, Disc, Zap } from "lucide-react";
import { cn } from "../utils";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t bg-background", className)} {...props}>
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">NexusHost</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              High-performance cloud infrastructure and web hosting for modern applications. Built for speed, security, and scale.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a>
              </li>
              <li>
                <a href="/support" className="hover:text-primary transition-colors">Support</a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Acceptable Use</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-border bg-background hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
                aria-label="Discord"
              >
                <Disc className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} NexusHost Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Status:</span>
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
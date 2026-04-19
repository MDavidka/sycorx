import React from 'react';
import { Server, Twitter, Github, Disc as Discord } from 'lucide-react';
import { cn } from '../utils';

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Shared Hosting', href: '/pricing#shared' },
      { label: 'VPS Hosting', href: '/pricing#vps' },
      { label: 'Dedicated Servers', href: '/pricing#dedicated' },
      { label: 'Domain Registration', href: '/domains' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'System Status', href: '/status' },
      { label: 'Community Forums', href: '/community' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Acceptable Use', href: '/aup' },
    ],
  },
];

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <footer className="w-full border-t border-border bg-background pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:gap-12">
          
          {/* Brand & Description */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer w-fit"
              onClick={(e) => handleNavigation(e as any, '/')}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Server className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Nexus<span className="text-primary">Host</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              High-performance cloud infrastructure and web hosting solutions for developers, startups, and enterprise teams.
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigation(e, link.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} NexusHost Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Discord"
            >
              <Discord className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
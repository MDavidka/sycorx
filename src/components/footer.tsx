import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Divider, Button } from '@heroui/react';
import { Server, Twitter, Github, MessageSquare } from 'lucide-react';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Shared Hosting', href: '/pricing' },
      { name: 'VPS Hosting', href: '/pricing' },
      { name: 'Dedicated Servers', href: '/pricing' },
      { name: 'Domain Registration', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Contact Support', href: '/contact' },
      { name: 'System Status', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Service Level Agreement', href: '#' },
    ],
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                <Server size={24} strokeWidth={2.5} />
              </div>
              <p className="font-heading font-bold text-xl tracking-tight text-gradient">
                nivle
              </p>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              High-performance cloud hosting built for developers and growing businesses. 
              Experience unmatched speed, reliability, and 24/7 expert support.
            </p>
            <div className="flex gap-3 mt-2">
              <Button isIconOnly variant="light" aria-label="Twitter" className="text-muted hover:text-primary">
                <Twitter size={20} />
              </Button>
              <Button isIconOnly variant="light" aria-label="GitHub" className="text-muted hover:text-primary">
                <Github size={20} />
              </Button>
              <Button isIconOnly variant="light" aria-label="Discord" className="text-muted hover:text-primary">
                <MessageSquare size={20} />
              </Button>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Products</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    as={RouterLink} 
                    to={link.href}
                    color="foreground"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    as={RouterLink} 
                    to={link.href}
                    color="foreground"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    as={RouterLink} 
                    to={link.href}
                    color="foreground"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-8 bg-border" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {currentYear} Nivle Hosting. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="flex h-2 w-2 rounded-full bg-accent"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { Link, Divider } from '@heroui/react';

const NivleLogo = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-[var(--color-primary)] mr-2"
  >
    <rect x="4" y="6" width="24" height="8" rx="2" fill="currentColor" />
    <rect x="4" y="18" width="24" height="8" rx="2" fill="currentColor" opacity="0.6" />
    <circle cx="9" cy="10" r="1.5" fill="var(--color-bg)" />
    <circle cx="14" cy="10" r="1.5" fill="var(--color-bg)" />
    <circle cx="9" cy="22" r="1.5" fill="var(--color-bg)" />
    <circle cx="14" cy="22" r="1.5" fill="var(--color-bg)" />
  </svg>
);

const footerLinks = {
  products: [
    { name: 'Shared Hosting', href: '#shared' },
    { name: 'VPS Hosting', href: '#vps' },
    { name: 'Dedicated Servers', href: '#dedicated' },
    { name: 'Cloud Hosting', href: '#cloud' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
    { name: 'Partners', href: '#partners' },
  ],
  resources: [
    { name: 'Documentation', href: '#docs' },
    { name: 'System Status', href: '#status' },
    { name: 'Community Forum', href: '#forum' },
    { name: 'Blog', href: '#blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Acceptable Use', href: '#aup' },
  ],
};

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)] pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <NivleLogo />
              <span className="text-xl font-bold tracking-tight text-[var(--color-text)]">Nivle</span>
            </div>
            <p className="text-sm text-[var(--color-secondary)] max-w-xs leading-relaxed">
              High-performance, scalable web hosting solutions engineered for developers and growing businesses worldwide.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <Link href="#twitter" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#github" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase">Products</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.products.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase">Resources</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-[var(--color-text)] tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Divider className="my-8 bg-[var(--color-border)]" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-secondary)]">
            &copy; {currentYear} Nivle Hosting. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-[var(--color-secondary)]">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
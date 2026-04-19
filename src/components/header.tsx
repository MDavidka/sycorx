import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { NavItem } from '../types';

const NivleLogo = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary mr-2"
  >
    <rect x="4" y="6" width="24" height="8" rx="2" fill="currentColor" />
    <rect x="4" y="18" width="24" height="8" rx="2" fill="currentColor" opacity="0.6" />
    <circle cx="9" cy="10" r="1.5" fill="var(--color-bg)" />
    <circle cx="14" cy="10" r="1.5" fill="var(--color-bg)" />
    <circle cx="9" cy="22" r="1.5" fill="var(--color-bg)" />
    <circle cx="14" cy="22" r="1.5" fill="var(--color-bg)" />
  </svg>
);

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { label: 'Products', href: '#products' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'System Status', href: '#status' },
  ];

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-background/80 backdrop-blur-md border-b border-border"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NivleLogo />
          <p className="font-bold text-inherit text-xl tracking-tight">Nivle</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.label}>
            <Link color="foreground" href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#login" color="foreground" className="text-sm font-medium">
            Client Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button 
            as={Link} 
            color="primary" 
            href="#get-started" 
            variant="shadow"
            className="font-medium"
          >
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-6 bg-background/95 backdrop-blur-lg">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color="foreground"
              className="w-full text-lg py-2"
              href={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-4">
          <Link
            color="primary"
            className="w-full text-lg py-2 font-medium"
            href="#login"
            size="lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Client Login
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
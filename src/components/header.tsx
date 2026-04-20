import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { Cookie, ShoppingCart, Trophy, Info } from 'lucide-react';
import { formatNumber } from '../utils';

export interface HeaderProps {
  /** Total number of cookies the player currently has */
  cookieCount: number;
  /** Current Cookies Per Second */
  cps: number;
  /** The currently active route path (e.g., '/', '/shop') */
  currentRoute: string;
  /** Callback to handle navigation between views */
  onRouteChange: (route: string) => void;
}

export function Header({ 
  cookieCount = 0, 
  cps = 0, 
  currentRoute = '/', 
  onRouteChange 
}: HeaderProps): JSX.Element {
  
  const navItems = [
    { name: 'Home', route: '/', icon: Cookie },
    { name: 'Shop', route: '/shop', icon: ShoppingCart },
    { name: 'Leaderboard', route: '/leaderboard', icon: Trophy },
    { name: 'About', route: '/about', icon: Info },
  ];

  return (
    <Navbar 
      maxWidth="xl" 
      className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50"
    >
      <NavbarBrand>
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onRouteChange('/')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onRouteChange('/')}
          aria-label="Go to Home"
        >
          <Cookie className="w-8 h-8 text-primary group-hover:animate-cookie-bounce transition-transform" />
          <p className="font-bold text-foreground text-xl hidden md:block tracking-tight">
            Cookie Clicker
          </p>
        </div>
      </NavbarBrand>

      <NavbarContent className="flex gap-1 sm:gap-4" justify="center">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <NavbarItem key={item.route} isActive={isActive}>
              <Link 
                color={isActive ? "primary" : "foreground"}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onRouteChange(item.route);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                }`}
                title={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-sm">{item.name}</span>
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex flex-col items-end">
          <div 
            className="flex items-center gap-2 bg-secondary/40 px-3 py-1.5 rounded-full border border-border/50 shadow-sm"
            title={`${cookieCount} Total Cookies`}
          >
            <Cookie className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground tabular-nums tracking-tight">
              {formatNumber(cookieCount)}
            </span>
          </div>
          <span 
            className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 mr-2 tabular-nums"
            title={`${cps} Cookies Per Second`}
          >
            {formatNumber(cps)} CPS
          </span>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
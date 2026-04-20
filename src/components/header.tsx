import React from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link,
  Chip
} from "@heroui/react";
import { Cookie, TrendingUp, Trophy, Settings } from "lucide-react";
import { HeaderProps } from "../types";
import { formatNumber } from "../utils";

export function Header({ currentCookies, cps }: HeaderProps): JSX.Element {
  // Helper to determine if a link is active based on current path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <Navbar 
      maxWidth="xl" 
      className="bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <Cookie className="w-8 h-8 text-primary mr-2 animate-pulse-slow" />
        <p className="font-bold text-inherit text-xl tracking-tight hidden sm:block">
          Cookie Clicker
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={currentPath === '/'}>
          <Link 
            color={currentPath === '/' ? "primary" : "foreground"} 
            href="/" 
            className="flex items-center gap-2 font-medium transition-colors hover:text-primary"
          >
            <Cookie className="w-4 h-4" />
            Bakery
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentPath === '/upgrades'}>
          <Link 
            color={currentPath === '/upgrades' ? "primary" : "foreground"} 
            href="/upgrades" 
            className="flex items-center gap-2 font-medium transition-colors hover:text-primary"
          >
            <TrendingUp className="w-4 h-4" />
            Upgrades
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentPath === '/leaderboard'}>
          <Link 
            color={currentPath === '/leaderboard' ? "primary" : "foreground"} 
            href="/leaderboard" 
            className="flex items-center gap-2 font-medium transition-colors hover:text-primary"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex flex-col items-end justify-center">
          <div className="flex items-center gap-2">
            <Chip 
              color="primary" 
              variant="flat" 
              size="lg"
              className="font-bold text-lg px-2"
              startContent={<Cookie className="w-5 h-5 mx-1" />}
            >
              {formatNumber(currentCookies)}
            </Chip>
          </div>
          <div className="text-xs text-muted-foreground font-semibold mt-1 px-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {formatNumber(cps)} per second
          </div>
        </NavbarItem>
        
        {/* Mobile Settings/Menu Icon */}
        <NavbarItem className="sm:hidden ml-2">
          <Link color="foreground" href="/settings">
            <Settings className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
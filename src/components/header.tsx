import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from '@heroui/react';
import { NavItem } from '../types';

export interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const publicNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
];

const privateNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', requiresAuth: true },
  { label: 'Support', href: '/support', requiresAuth: true },
];

export function Header({
  currentPath,
  onNavigate,
  isLoggedIn,
  onLogin,
  onLogout
}: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  const navItems = isLoggedIn 
    ? [...publicNavItems, ...privateNavItems] 
    : publicNavItems;

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      className="bg-[#0A192F]/90 backdrop-blur-md border-b border-[#233554]"
    >
      {/* Mobile Menu Toggle & Brand */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarBrand>
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-[#64FFDA] rounded flex items-center justify-center">
              <span className="text-[#0A192F] font-bold text-xl leading-none">n</span>
            </div>
            <p className="font-bold text-inherit text-xl tracking-tight text-[#CCD6F6]">nivle</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Brand */}
      <NavbarContent className="hidden sm:flex pr-3" justify="start">
        <NavbarBrand>
          <div 
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" 
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-[#64FFDA] rounded flex items-center justify-center shadow-[0_0_15px_rgba(100,255,218,0.3)]">
              <span className="text-[#0A192F] font-bold text-xl leading-none">n</span>
            </div>
            <p className="font-bold text-inherit text-xl tracking-tight text-[#CCD6F6]">nivle</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation Links */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <Link
                color={isActive ? "primary" : "foreground"}
                className={`cursor-pointer font-medium transition-colors ${
                  isActive ? 'text-[#64FFDA]' : 'text-[#8892B0] hover:text-[#CCD6F6]'
                }`}
                onPress={() => handleNavigation(item.href)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* End Content (Auth / User Profile) */}
      <NavbarContent justify="end">
        {!isLoggedIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button 
                onPress={onLogin} 
                variant="light" 
                className="text-[#CCD6F6] font-medium hover:bg-[#112240]"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button 
                onPress={onLogin} 
                color="primary" 
                variant="flat"
                className="font-medium bg-[#64FFDA]/10 text-[#64FFDA] hover:bg-[#64FFDA]/20"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end" className="bg-[#112240] border border-[#233554]">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="User"
                  size="sm"
                  src="https://placehold.co/150x150.png?text=U"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2 text-[#CCD6F6]">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-[#8892B0]">user@nivle.com</p>
                </DropdownItem>
                <DropdownItem 
                  key="dashboard" 
                  className="text-[#CCD6F6]"
                  onPress={() => handleNavigation('/dashboard')}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem 
                  key="support" 
                  className="text-[#CCD6F6]"
                  onPress={() => handleNavigation('/support')}
                >
                  Support Tickets
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  className="text-[#CCD6F6]"
                >
                  Account Settings
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  className="text-[#FF6B6B]"
                  onPress={() => {
                    onLogout();
                    handleNavigation('/');
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#0A192F]/95 backdrop-blur-md pt-6 border-t border-[#233554]">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.href;
          return (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                color={isActive ? "primary" : "foreground"}
                className={`w-full text-lg py-2 ${
                  isActive ? 'text-[#64FFDA] font-semibold' : 'text-[#8892B0]'
                }`}
                onPress={() => handleNavigation(item.href)}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {!isLoggedIn && (
          <NavbarMenuItem className="mt-4 flex flex-col gap-3">
            <Button 
              onPress={() => {
                onLogin();
                setIsMenuOpen(false);
              }} 
              variant="bordered" 
              className="w-full border-[#233554] text-[#CCD6F6]"
            >
              Login
            </Button>
            <Button 
              onPress={() => {
                onLogin();
                setIsMenuOpen(false);
              }} 
              color="primary" 
              className="w-full bg-[#64FFDA] text-[#0A192F] font-semibold"
            >
              Sign Up
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
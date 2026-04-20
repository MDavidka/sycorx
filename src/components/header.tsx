import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@heroui/react";
import { Server, Activity, CreditCard, User, ChevronDown } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for route changes to update active states and auth UI
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Simple mock auth state based on current route for SPA demonstration
  const isLoggedIn = currentPath.includes('/dashboard') || currentPath.includes('/instance') || currentPath.includes('/billing');

  // SPA Navigation handler
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    setIsMenuOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  const publicMenuItems = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/#pricing" },
    { name: "Features", path: "/#features" },
  ];

  const privateMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: "Billing", path: "/billing", icon: <CreditCard className="w-4 h-4 mr-2" /> },
  ];

  const menuItems = isLoggedIn ? privateMenuItems : publicMenuItems;

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      isMenuOpen={isMenuOpen} 
      maxWidth="xl" 
      className="border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, "/")} 
            className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
          >
            <Server className="w-6 h-6" />
            <p className="font-bold text-inherit text-foreground text-lg tracking-tight">
              Modern<span className="text-primary">Hosting</span>
            </p>
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`} isActive={currentPath === item.path}>
            <Link
              color={currentPath === item.path ? "primary" : "foreground"}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
            >
              {item.icon}
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" className="flex items-center gap-2 px-2 min-w-0">
                <Avatar 
                  size="sm" 
                  icon={<User className="w-4 h-4" />} 
                  className="bg-primary/20 text-primary" 
                />
                <span className="hidden sm:inline-block text-sm font-medium truncate max-w-[100px]">
                  Demo User
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
                <p className="font-semibold text-xs text-muted-foreground">Signed in as</p>
                <p className="font-semibold text-sm text-foreground truncate">demo@modernhosting.com</p>
              </DropdownItem>
              <DropdownItem 
                key="dashboard" 
                onClick={() => navigateTo("/dashboard")}
                textValue="Dashboard"
              >
                Dashboard
              </DropdownItem>
              <DropdownItem 
                key="billing" 
                onClick={() => navigateTo("/billing")}
                textValue="Billing"
              >
                Billing
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                className="text-danger"
                onClick={() => navigateTo("/")}
                textValue="Log Out"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link 
                href="/login" 
                onClick={(e) => handleLinkClick(e, "/login")} 
                color="foreground" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button 
                as={Link} 
                color="primary" 
                href="/login" 
                onClick={(e) => handleLinkClick(e, "/login")} 
                variant="flat" 
                className="font-medium"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-md pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={currentPath === item.path ? "primary" : "foreground"}
              className="w-full flex items-center py-2 text-lg"
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
            >
              {item.icon}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!isLoggedIn && (
          <NavbarMenuItem className="mt-4 border-t border-border/50 pt-4">
            <Link
              color="primary"
              className="w-full py-2 text-lg font-medium"
              href="/login"
              onClick={(e) => handleLinkClick(e, "/login")}
            >
              Login / Sign Up
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@heroui/react';
import { Server, LogOut, LayoutDashboard, Settings, Database } from 'lucide-react';
import { User } from '../types';
import { IS_DB_CONNECTED } from '../db';

// Mock user for demonstration purposes since auth isn't wired up yet
const MOCK_USER: User = {
  _id: 'user_1',
  name: 'Alex Developer',
  email: 'alex@example.com',
  role: 'customer',
  createdAt: new Date().toISOString()
};

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogin = () => {
    if (!IS_DB_CONNECTED) {
      // In a real app, this would redirect to an auth provider or login page
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <Navbar 
        isBordered 
        isMenuOpen={isMenuOpen} 
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        className="bg-background/70 backdrop-blur-md"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand as={RouterLink} to="/" className="gap-2 cursor-pointer">
            <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
              <Server size={24} strokeWidth={2.5} />
            </div>
            <p className="font-heading font-bold text-xl tracking-tight text-gradient">
              nivle
            </p>
            {!IS_DB_CONNECTED && (
              <Chip 
                size="sm" 
                color="warning" 
                variant="flat" 
                className="ml-2 hidden md:flex cursor-pointer"
                onClick={onOpen}
              >
                Demo Mode
              </Chip>
            )}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <Link
                  as={RouterLink}
                  to={item.href}
                  color={isActive ? "primary" : "foreground"}
                  className={`font-medium text-sm transition-colors hover:text-primary ${isActive ? 'font-semibold' : ''}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={MOCK_USER.name}
                  size="sm"
                  src="https://placehold.co/150x150.png?text=AD"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-muted">{MOCK_USER.email}</p>
                </DropdownItem>
                <DropdownItem 
                  key="dashboard" 
                  startContent={<LayoutDashboard size={16} />}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  startContent={<Settings size={16} />}
                >
                  Account Settings
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button 
                  as={Link} 
                  color="foreground" 
                  variant="light" 
                  onClick={handleLogin}
                  className="font-medium"
                >
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  as={Link} 
                  color="primary" 
                  variant="shadow" 
                  onClick={handleLogin}
                  className="font-medium"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <NavbarMenuItem key={`${item.label}-${index}`} isActive={isActive}>
                <Link
                  as={RouterLink}
                  to={item.href}
                  color={isActive ? "primary" : "foreground"}
                  className="w-full text-lg py-2"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            );
          })}
          {!isLoggedIn && (
            <NavbarMenuItem>
              <Link
                color="primary"
                className="w-full text-lg py-2 cursor-pointer"
                size="lg"
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
              >
                Login / Sign Up
              </Link>
            </NavbarMenuItem>
          )}
          {!IS_DB_CONNECTED && (
            <NavbarMenuItem>
              <Button 
                color="warning" 
                variant="flat" 
                className="w-full mt-4 justify-start"
                startContent={<Database size={18} />}
                onClick={() => {
                  onOpen();
                  setIsMenuOpen(false);
                }}
              >
                Connect Database
              </Button>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>

      {/* Database Connection Modal for Disconnected State */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Database className="text-warning" size={20} />
                  Database Not Connected
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-muted text-sm">
                  The Nivle Hosting platform is currently running in <strong>Demo Mode</strong> using static placeholder data.
                </p>
                <p className="text-muted text-sm">
                  To enable real user authentication, dynamic hosting plans, and live service provisioning, please connect a MongoDB Atlas database via the Integrations tab.
                </p>
                <div className="bg-surface p-4 rounded-lg border border-border mt-2">
                  <p className="text-xs font-mono text-muted-foreground">
                    Status: <span className="text-warning font-semibold">Disconnected</span><br/>
                    Data Source: <span className="text-foreground">Mock Data (db.ts)</span>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Continue in Demo Mode
                </Button>
                <Button color="primary" onPress={onClose}>
                  Understood
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
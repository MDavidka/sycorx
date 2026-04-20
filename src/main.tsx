import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

// Components
import { Header } from './components/header';
import { Footer } from './components/footer';
import { CookieClicker } from './components/cookie-clicker';
import { ShopPage, UPGRADE_DEFINITIONS } from './components/shop-page';
import { LeaderboardPage } from './components/leaderboard-page';

// Utils & DB
import { calculateTotalCPS, calculateOfflineEarnings, generateGuestId, formatNumber } from './utils';
import { loadPlayerData, savePlayerData, saveHighScore } from './db';

// UI Primitives for the About page
import { Card, CardBody, Button, Link } from "@heroui/react";
import { Info, Github, Cookie, Heart } from 'lucide-react';

/**
 * Main Application Component
 */
function App() {
  // --- Routing State ---
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname || '/');

  // --- Game State ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [playerId, setPlayerId] = useState<string>('');
  const [cookieCount, setCookieCount] = useState<number>(0);
  const [ownedUpgrades, setOwnedUpgrades] = useState<Record<string, number>>({});
  const [offlineEarnings, setOfflineEarnings] = useState<number>(0);

  // --- Derived State ---
  const cps = useMemo(() => calculateTotalCPS(ownedUpgrades, UPGRADE_DEFINITIONS), [ownedUpgrades]);
  
  // Click power scales slightly with CPS so clicking remains relevant (1 + 5% of CPS)
  const clickPower = useMemo(() => Math.max(1, Math.floor(1 + (cps * 0.05))), [cps]);

  // --- Initialization & Loading ---
  useEffect(() => {
    let mounted = true;
    
    async function initializeGame() {
      // Get or create player ID
      let id = localStorage.getItem('cookie_clicker_player_id');
      if (!id) {
        id = generateGuestId();
        localStorage.setItem('cookie_clicker_player_id', id);
      }
      
      if (mounted) setPlayerId(id);

      // Load saved data
      const savedData = await loadPlayerData(id);
      
      if (mounted) {
        if (savedData) {
          setCookieCount(savedData.cookieCount || 0);
          setOwnedUpgrades(savedData.ownedUpgrades || {});
          
          // Calculate offline earnings
          if (savedData.lastSaved) {
            const savedCps = calculateTotalCPS(savedData.ownedUpgrades || {}, UPGRADE_DEFINITIONS);
            const earnings = calculateOfflineEarnings(savedCps, savedData.lastSaved);
            if (earnings > 0) {
              setOfflineEarnings(earnings);
              setCookieCount(prev => prev + earnings);
            }
          }
        }
        setIsLoaded(true);
      }
    }

    initializeGame();

    return () => {
      mounted = false;
    };
  }, []);

  // --- Game Loop (CPS) ---
  useEffect(() => {
    if (!isLoaded || cps === 0) return;

    // Add 1/10th of CPS every 100ms for a smooth counter animation
    const interval = setInterval(() => {
      setCookieCount(prev => prev + (cps / 10));
    }, 100);

    return () => clearInterval(interval);
  }, [isLoaded, cps]);

  // --- Auto-Save Loop ---
  useEffect(() => {
    if (!isLoaded || !playerId) return;

    const saveInterval = setInterval(() => {
      savePlayerData(playerId, {
        cookieCount,
        ownedUpgrades
      });
      
      // Also update high score periodically if they have a decent amount
      if (cookieCount > 100) {
        // Using a generic name for guest players, in a full app we'd prompt for a username
        const playerName = playerId.startsWith('guest_') ? `Baker_${playerId.substring(6, 10)}` : 'Player';
        saveHighScore(playerId, playerName, Math.floor(cookieCount));
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [isLoaded, playerId, cookieCount, ownedUpgrades]);

  // --- Routing Logic ---
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
  }, []);

  // --- Interaction Handlers ---
  const handleCookieClick = useCallback(() => {
    setCookieCount(prev => prev + clickPower);
  }, [clickPower]);

  const handlePurchase = useCallback((upgradeId: string, cost: number) => {
    setCookieCount(prev => {
      if (prev >= cost) {
        setOwnedUpgrades(current => ({
          ...current,
          [upgradeId]: (current[upgradeId] || 0) + 1
        }));
        return prev - cost;
      }
      return prev;
    });
  }, []);

  const dismissOfflineEarnings = useCallback(() => {
    setOfflineEarnings(0);
  }, []);

  // --- Render Helpers ---
  const renderContent = () => {
    if (!isLoaded) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <Cookie className="w-12 h-12 text-primary animate-spin-slow" />
            <p className="text-muted-foreground font-medium">Warming up the ovens...</p>
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case '/shop':
        return (
          <ShopPage 
            cookieCount={Math.floor(cookieCount)} 
            ownedUpgrades={ownedUpgrades} 
            onPurchase={handlePurchase} 
          />
        );
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/about':
        return <AboutPage />;
      case '/':
      default:
        return (
          <CookieClicker 
            cookieCount={Math.floor(cookieCount)} 
            cps={cps} 
            clickPower={clickPower} 
            onCookieClick={handleCookieClick} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Header 
        cookieCount={Math.floor(cookieCount)} 
        cps={cps} 
        currentRoute={currentRoute} 
        onRouteChange={navigate} 
      />
      
      <main className="flex-1 flex flex-col relative w-full max-w-7xl mx-auto">
        {/* Offline Earnings Toast */}
        {offlineEarnings > 0 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in slide-in-from-top-4 fade-in duration-500">
            <Card className="bg-primary/10 border-primary/30 shadow-lg backdrop-blur-md">
              <CardBody className="flex flex-row items-center justify-between p-4 gap-4">
                <div>
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-primary" />
                    Welcome Back!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your bakery earned <strong className="text-foreground">{formatNumber(offlineEarnings)}</strong> cookies while you were away.
                  </p>
                </div>
                <Button size="sm" color="primary" variant="flat" onClick={dismissOfflineEarnings}>
                  Awesome
                </Button>
              </CardBody>
            </Card>
          </div>
        )}

        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

/**
 * Simple About Page Component
 */
function AboutPage() {
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500 gap-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-sm">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">About the Game</h1>
          <p className="text-muted-foreground font-medium">The story behind the cookies.</p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm bg-card">
        <CardBody className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Cookie className="w-5 h-5 text-primary" />
              How to Play
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookie Clicker is an incremental game where the goal is to bake as many cookies as possible. 
              Start by clicking the giant cookie to bake them manually. Once you have enough cookies, 
              visit the Shop to purchase upgrades like Auto-Clickers and Grandmas to bake cookies automatically over time.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              Open Source
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This project is built using modern web technologies including React, Vite, Tailwind CSS, and HeroUI. 
              It demonstrates state management, game loops, and responsive design principles.
            </p>
            <div className="mt-4">
              <Button 
                as={Link} 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                color="default" 
                variant="bordered" 
                startContent={<Github className="w-4 h-4" />}
              >
                View Source Code
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

/**
 * Application Initialization
 * Wraps DOM access in an exported function to ensure safe mounting.
 */
export function init() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Failed to find the root element. Ensure index.html has a <div id="root"></div>');
    return;
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Execute initialization
init();
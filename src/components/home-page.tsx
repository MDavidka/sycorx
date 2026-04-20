import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { AlertTriangle, TrendingUp, Store, Database } from "lucide-react";
import { CookieButton } from "./cookie-button";
import { UpgradeShop } from "./upgrade-shop";
import { Upgrade } from "../types";
import { formatNumber } from "../utils";

// Define the base upgrades available in the game
const AVAILABLE_UPGRADES: Upgrade[] = [
  { 
    id: "cursor", 
    name: "Auto-Cursor", 
    description: "Auto-clicks once every 10 seconds.", 
    baseCost: 15, 
    cpsBoost: 0.1 
  },
  { 
    id: "grandma", 
    name: "Grandma", 
    description: "A nice grandma to bake more cookies.", 
    baseCost: 100, 
    cpsBoost: 1 
  },
  { 
    id: "farm", 
    name: "Cookie Farm", 
    description: "Grows cookie plants from cookie seeds.", 
    baseCost: 1100, 
    cpsBoost: 8 
  },
  { 
    id: "mine", 
    name: "Cookie Mine", 
    description: "Mines out cookie dough and chocolate chips.", 
    baseCost: 12000, 
    cpsBoost: 47 
  },
  { 
    id: "factory", 
    name: "Cookie Factory", 
    description: "Produces large quantities of cookies.", 
    baseCost: 130000, 
    cpsBoost: 260 
  },
];

export function HomePage(): JSX.Element {
  const [cookies, setCookies] = useState<number>(0);
  const [ownedUpgrades, setOwnedUpgrades] = useState<Record<string, number>>({});
  const [showDbWarning, setShowDbWarning] = useState<boolean>(true);

  // Calculate CPS dynamically based on owned upgrades
  const currentCPS = useMemo(() => {
    return AVAILABLE_UPGRADES.reduce((total, upgrade) => {
      const count = ownedUpgrades[upgrade.id] || 0;
      return total + (upgrade.cpsBoost * count);
    }, 0);
  }, [ownedUpgrades]);

  // Game loop for automatic cookie generation
  useEffect(() => {
    if (currentCPS === 0) return;
    
    // Run 10 times a second for smoother visual updates
    const interval = setInterval(() => {
      setCookies(prev => prev + (currentCPS / 10));
    }, 100);
    
    return () => clearInterval(interval);
  }, [currentCPS]);

  const handleCookieClick = useCallback(() => {
    // Base click power is 1. Could be expanded with click upgrades later.
    setCookies(prev => prev + 1);
  }, []);

  const handlePurchase = useCallback((upgradeId: string, cost: number) => {
    setCookies(prev => {
      if (prev >= cost) {
        setOwnedUpgrades(prevUpgrades => ({
          ...prevUpgrades,
          [upgradeId]: (prevUpgrades[upgradeId] || 0) + 1
        }));
        return prev - cost;
      }
      return prev;
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* Database Integration Warning Banner */}
      {showDbWarning && (
        <Card className="mb-8 bg-warning-50/50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-900/50 shadow-none">
          <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-100 dark:bg-warning-900/50 rounded-full shrink-0">
                <Database className="text-warning-600 dark:text-warning-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-warning-800 dark:text-warning-300">
                  Cloud Saving Disabled
                </p>
                <p className="text-xs text-warning-700 dark:text-warning-400/80 mt-0.5">
                  Connect a database integration to save your bakery's progress across devices.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                size="sm" 
                color="warning" 
                variant="solid" 
                className="w-full sm:w-auto font-medium shadow-sm"
                onClick={() => alert("Please configure the MongoDB integration in the Integrations tab to enable cloud saves.")}
              >
                Connect Database
              </Button>
              <Button 
                size="sm" 
                color="warning" 
                variant="light" 
                isIconOnly
                aria-label="Dismiss warning"
                onClick={() => setShowDbWarning(false)}
              >
                ✕
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Cookie & Stats */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8 bg-card rounded-3xl p-8 shadow-sm border border-border relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-3 relative z-10">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-secondary/50 border border-border text-sm font-bold text-foreground mb-2">
              Local Bakery
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-foreground tracking-tight drop-shadow-sm">
              {formatNumber(Math.floor(cookies))}
            </h2>
            <p className="text-muted-foreground font-medium text-lg uppercase tracking-widest">Cookies</p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-2xl bg-primary/10 text-primary text-base font-bold border border-primary/20">
              <TrendingUp className="w-5 h-5" />
              {formatNumber(currentCPS)} CPS
            </div>
          </div>

          <div className="relative z-10 w-full max-w-[320px] aspect-square flex items-center justify-center">
            <CookieButton 
              onClick={handleCookieClick} 
              clickPower={1} 
            />
          </div>
        </div>
        
        {/* Right Column: Upgrade Shop */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Store className="w-6 h-6 text-primary" />
                Upgrade Shop
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Purchase upgrades to increase your automatic cookie production.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Available Balance</p>
              <p className="text-xl font-bold text-primary">{formatNumber(Math.floor(cookies))}</p>
            </div>
          </div>
          
          <UpgradeShop 
            currentCookies={cookies}
            upgrades={AVAILABLE_UPGRADES}
            ownedUpgrades={ownedUpgrades}
            onPurchase={handlePurchase}
          />
        </div>

      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Cookie, MousePointer2, User, Tractor, Pickaxe, Factory, Rocket, Gem, Store } from 'lucide-react';
import { formatNumber, formatExactNumber, calculateUpgradeCost, cn } from '../utils';

export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  cps: number;
  icon: React.ElementType;
}

/**
 * Master list of all available upgrades in the game.
 * Exported so the main game loop can use it to calculate total CPS.
 */
export const UPGRADE_DEFINITIONS: UpgradeDefinition[] = [
  { 
    id: 'cursor', 
    name: 'Auto-Clicker', 
    description: 'Automatically clicks the cookie for you.', 
    baseCost: 15, 
    cps: 1, 
    icon: MousePointer2 
  },
  { 
    id: 'grandma', 
    name: 'Grandma', 
    description: 'A nice grandma to bake more cookies.', 
    baseCost: 100, 
    cps: 5, 
    icon: User 
  },
  { 
    id: 'farm', 
    name: 'Cookie Farm', 
    description: 'Grows cookie plants from cookie seeds.', 
    baseCost: 1100, 
    cps: 50, 
    icon: Tractor 
  },
  { 
    id: 'mine', 
    name: 'Cookie Mine', 
    description: 'Mines out cookie dough and chocolate chips.', 
    baseCost: 12000, 
    cps: 400, 
    icon: Pickaxe 
  },
  { 
    id: 'factory', 
    name: 'Cookie Factory', 
    description: 'Produces large quantities of cookies.', 
    baseCost: 130000, 
    cps: 2000, 
    icon: Factory 
  },
  { 
    id: 'bank', 
    name: 'Cookie Bank', 
    description: 'Generates cookies from interest.', 
    baseCost: 1400000, 
    cps: 10000, 
    icon: Gem 
  },
  { 
    id: 'rocket', 
    name: 'Cookie Rocket', 
    description: 'Brings cookies from the cookie planet.', 
    baseCost: 20000000, 
    cps: 50000, 
    icon: Rocket 
  },
];

export interface ShopPageProps {
  /** Total number of cookies the player currently has */
  cookieCount: number;
  /** Record of upgrade IDs to the amount owned */
  ownedUpgrades: Record<string, number>;
  /** Callback fired when an upgrade is purchased */
  onPurchase: (upgradeId: string, cost: number) => void;
}

export function ShopPage({ 
  cookieCount, 
  ownedUpgrades, 
  onPurchase 
}: ShopPageProps): JSX.Element {
  
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-sm">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Upgrades Shop</h1>
          <p className="text-muted-foreground font-medium">Spend your cookies to automate your bakery!</p>
        </div>
      </div>

      {/* Upgrades List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {UPGRADE_DEFINITIONS.map((upgrade) => {
          const ownedCount = ownedUpgrades[upgrade.id] || 0;
          const currentCost = calculateUpgradeCost(upgrade.baseCost, ownedCount);
          const canAfford = cookieCount >= currentCost;
          const Icon = upgrade.icon;

          return (
            <Card 
              key={upgrade.id}
              className={cn(
                "border-2 transition-all duration-200",
                canAfford 
                  ? "border-border/50 hover:border-primary/50 bg-card shadow-sm hover:shadow-md" 
                  : "border-border/20 bg-card/50 opacity-80 grayscale-[0.2]"
              )}
            >
              <CardBody className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                
                <div className="flex flex-row items-center gap-4 w-full sm:flex-1">
                  {/* Icon Area */}
                  <div className={cn(
                    "p-3 sm:p-4 rounded-2xl shrink-0 transition-colors",
                    canAfford ? "bg-secondary/50 text-foreground" : "bg-secondary/20 text-muted-foreground"
                  )}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
                  {/* Info Area */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg sm:text-xl truncate text-foreground">
                        {upgrade.name}
                      </h3>
                      <Chip size="sm" variant="flat" color="secondary" className="font-bold">
                        +{formatNumber(upgrade.cps)} CPS
                      </Chip>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {upgrade.description}
                    </p>
                  </div>
                </div>

                {/* Action Area */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 sm:gap-2 shrink-0 border-t sm:border-t-0 border-border/20 pt-4 sm:pt-0">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Owned
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-foreground leading-none">
                      {ownedCount}
                    </span>
                  </div>
                  
                  <Button 
                    color={canAfford ? "primary" : "default"}
                    variant={canAfford ? "solid" : "flat"}
                    isDisabled={!canAfford}
                    onClick={() => onPurchase(upgrade.id, currentCost)}
                    className="w-full sm:w-32 font-bold shadow-sm"
                    startContent={
                      <Cookie className={cn(
                        "w-4 h-4", 
                        canAfford ? "text-primary-foreground" : "text-muted-foreground"
                      )} />
                    }
                    title={`Cost: ${formatExactNumber(currentCost)} cookies`}
                  >
                    {formatNumber(currentCost)}
                  </Button>
                </div>

              </CardBody>
            </Card>
          );
        })}
      </div>
      
    </div>
  );
}
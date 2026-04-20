import React from "react";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Chip, 
  Divider 
} from "@heroui/react";
import { 
  TrendingUp, 
  MousePointerClick, 
  Users, 
  Factory, 
  Zap, 
  Cookie, 
  Rocket 
} from "lucide-react";
import { Upgrade, UpgradeCardProps } from "../types";
import { calculateUpgradeCost, formatNumber, cn } from "../utils";

// Extend the imported UpgradeCardProps to guarantee the properties we need exist,
// even if the types.ts generation was slightly different.
export interface LocalUpgradeCardProps extends Partial<UpgradeCardProps> {
  upgrade: Upgrade;
  owned: number;
  currentCookies: number;
  onPurchase: (id: string, cost: number) => void;
}

export interface UpgradeShopProps {
  currentCookies: number;
  upgrades: Upgrade[];
  ownedUpgrades: Record<string, number>;
  onPurchase: (upgradeId: string, cost: number) => void;
}

/**
 * Helper to assign a relevant icon based on the upgrade ID or name.
 */
const getIconForUpgrade = (id: string) => {
  const lowerId = id.toLowerCase();
  if (lowerId.includes('cursor') || lowerId.includes('click')) {
    return <MousePointerClick className="w-6 h-6" />;
  }
  if (lowerId.includes('grandma') || lowerId.includes('baker')) {
    return <Users className="w-6 h-6" />;
  }
  if (lowerId.includes('farm') || lowerId.includes('plantation')) {
    return <Factory className="w-6 h-6" />;
  }
  if (lowerId.includes('mine') || lowerId.includes('factory')) {
    return <Zap className="w-6 h-6" />;
  }
  return <Rocket className="w-6 h-6" />;
};

/**
 * Individual card component for a single upgrade.
 */
export function UpgradeCard({ 
  upgrade, 
  owned, 
  currentCookies, 
  onPurchase 
}: LocalUpgradeCardProps): JSX.Element {
  const cost = calculateUpgradeCost(upgrade.baseCost, owned);
  const canAfford = currentCookies >= cost;

  return (
    <Card 
      className={cn(
        "w-full transition-all duration-200 border border-transparent", 
        canAfford 
          ? "hover:border-primary hover:shadow-md bg-card" 
          : "opacity-80 bg-card/50 grayscale-[20%]"
      )}
    >
      <CardHeader className="flex gap-3 justify-between items-start pt-5 px-5">
        <div className="flex gap-3 items-center w-full">
          <div className={cn(
            "p-2.5 rounded-xl shrink-0",
            canAfford ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {getIconForUpgrade(upgrade.id)}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="text-base font-bold text-foreground truncate">{upgrade.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
              {upgrade.description}
            </p>
          </div>
        </div>
        <Chip 
          color={owned > 0 ? "secondary" : "default"} 
          variant="flat" 
          size="sm" 
          className="font-bold shrink-0 ml-2"
        >
          {owned}
        </Chip>
      </CardHeader>
      
      <Divider className="my-2 opacity-50" />
      
      <CardBody className="py-3 px-5 gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">Cost</span>
          <span className={cn(
            "font-bold flex items-center gap-1.5 text-base", 
            canAfford ? "text-foreground" : "text-destructive"
          )}>
            <Cookie className="w-4 h-4" />
            {formatNumber(cost)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">Effect</span>
          <span className="font-bold text-accent flex items-center gap-1.5 text-sm">
            <TrendingUp className="w-4 h-4" />
            +{formatNumber(upgrade.cpsBoost)} CPS
          </span>
        </div>
      </CardBody>
      
      <CardFooter className="pt-2 pb-5 px-5">
        <Button 
          className="w-full font-bold shadow-sm transition-transform active:scale-[0.98]" 
          color={canAfford ? "primary" : "default"}
          variant={canAfford ? "solid" : "flat"}
          isDisabled={!canAfford}
          onClick={() => onPurchase(upgrade.id, cost)}
          startContent={canAfford ? <TrendingUp className="w-4 h-4" /> : null}
        >
          {canAfford ? "Purchase" : "Need more cookies"}
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * The main Upgrade Shop component that renders a grid of UpgradeCards.
 */
export function UpgradeShop({ 
  currentCookies, 
  upgrades, 
  ownedUpgrades, 
  onPurchase 
}: UpgradeShopProps): JSX.Element {
  
  if (!upgrades || upgrades.length === 0) {
    return (
      <div className="w-full p-12 text-center border-2 border-dashed border-border rounded-2xl bg-muted/20">
        <Factory className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-foreground mb-1">Shop is Empty</h3>
        <p className="text-muted-foreground">No upgrades are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {upgrades.map((upgrade) => (
        <UpgradeCard 
          key={upgrade.id}
          upgrade={upgrade}
          owned={ownedUpgrades[upgrade.id] || 0}
          currentCookies={currentCookies}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
}
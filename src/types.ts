/**
 * Shared TypeScript interfaces for the Cookie Clicker game.
 */

export interface GameState {
  cookies: number;
  cookiesPerSecond: number;
  cookiesPerClick: number;
  upgrades: Record<string, number>; // Map of upgradeId to quantity owned
  username: string;
  lastUpdated: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseProduction: number; // Can be per click or per second
  type: 'click' | 'passive';
  icon: string;
}

export interface LeaderboardEntry {
  $id: string;
  username: string;
  totalCookies: number;
  updatedAt: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  version: string;
}

export interface NavItem {
  label: string;
  href: string;
}
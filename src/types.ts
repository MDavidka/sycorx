export interface Building {
  id: string;
  name: string;
  baseCost: number;
  baseProduction: number;
  count: number;
  description: string;
}

export interface GameState {
  cookies: number;
  totalCookiesEarned: number;
  cookiesPerSecond: number;
  buildings: Building[];
  lastUpdated: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number;
}

export interface SiteConfig {
  title: string;
  version: string;
  maxLeaderboardEntries: number;
}

export type ViewState = 'game' | 'leaderboard' | 'settings';

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  effect: (state: GameState) => GameState;
  purchased: boolean;
}
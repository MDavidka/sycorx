import './style.css';
import { GameState, Upgrade } from './types';
import { renderAuthModal } from './components/auth-modal';
import { renderCookie } from './components/cookie';
import { renderScoreboard, updateScoreboard } from './components/scoreboard';
import { renderStore } from './components/store';
import { renderLeaderboard } from './components/leaderboard';
import { databases, DATABASE_ID, COLLECTION_LEADERBOARD, updateLeaderboard } from './appwrite';
import { ID } from 'appwrite';

// Initial Game State
let gameState: GameState = {
  cookies: 0,
  cookiesPerSecond: 0,
  cookiesPerClick: 1,
  upgrades: {},
  username: '',
  lastUpdated: new Date().toISOString(),
};

const app = document.getElementById('app') as HTMLElement;

/**
 * Main initialization function
 */
function init() {
  renderAuthModal(app, (username) => {
    gameState.username = username;
    startGame();
  });
}

/**
 * Starts the game loop and renders the main UI
 */
function startGame() {
  app.innerHTML = `
    <div class="min-h-screen p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div id="leaderboard-container" class="lg:order-1"></div>
      <div id="game-container" class="lg:order-2 flex flex-col items-center justify-center gap-8">
        <div id="scoreboard-container"></div>
        <div id="cookie-container"></div>
      </div>
      <div id="store-container" class="lg:order-3"></div>
    </div>
  `;

  // Initial render
  renderScoreboard(document.getElementById('scoreboard-container')!, gameState);
  renderCookie(document.getElementById('cookie-container')!, gameState, handleCookieClick);
  renderStore(document.getElementById('store-container')!, gameState, handlePurchase);
  renderLeaderboard(document.getElementById('leaderboard-container')!);

  // Game Loop: Passive Income (1 tick per second)
  setInterval(() => {
    gameState.cookies += gameState.cookiesPerSecond;
    updateScoreboard(gameState);
    
    // Refresh store to update button states
    renderStore(document.getElementById('store-container')!, gameState, handlePurchase);
  }, 1000);

  // Sync to Leaderboard (every 10 seconds)
  setInterval(async () => {
    await updateLeaderboard(gameState.username, Math.floor(gameState.cookies));
    renderLeaderboard(document.getElementById('leaderboard-container')!);
  }, 10000);
}

/**
 * Handles manual cookie clicks
 */
function handleCookieClick() {
  gameState.cookies += gameState.cookiesPerClick;
  updateScoreboard(gameState);
}

/**
 * Handles upgrade purchases
 */
function handlePurchase(upgrade: Upgrade, cost: number) {
  if (gameState.cookies >= cost) {
    gameState.cookies -= cost;
    gameState.upgrades[upgrade.id] = (gameState.upgrades[upgrade.id] || 0) + 1;
    
    // Recalculate stats
    if (upgrade.type === 'click') {
      gameState.cookiesPerClick += upgrade.baseProduction;
    } else {
      gameState.cookiesPerSecond += upgrade.baseProduction;
    }

    updateScoreboard(gameState);
    renderStore(document.getElementById('store-container')!, gameState, handlePurchase);
  }
}

// Start the app
init();
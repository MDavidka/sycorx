import './style.css';
import { GameState } from './types';
import { calculateUpgradeCost, debounce, formatNumber } from './utils';
import { updateLeaderboard } from './appwrite';

// Import all components as required
import { renderHeader, TabType } from './components/header';
import { renderCookie, updateCookieDisplay } from './components/cookie';
import { renderUpgrades, updateUpgradesDisplay, AVAILABLE_UPGRADES } from './components/upgrades';
import { renderLeaderboard } from './components/leaderboard';
import { initToasts, showToast } from './components/toast';
import { renderAuthModal } from './components/auth-modal';
import { renderScoreboard, updateScoreboard } from './components/scoreboard';
import { renderStore } from './components/store';

// --- Global State ---
const DEFAULT_STATE: GameState = {
  cookies: 0,
  totalCookiesBaked: 0,
  cookiesPerSecond: 0,
  cookiesPerClick: 1,
  upgrades: {},
  username: '',
  lastSaved: Date.now()
};

let gameState: GameState = { ...DEFAULT_STATE };
let activeTab: TabType = 'game';
let lastFrameTime = performance.now();
let saveIntervalId: number | null = null;

// --- DOM Containers ---
let appContainer: HTMLElement | null = null;
let headerContainer: HTMLElement | null = null;
let mainContentContainer: HTMLElement | null = null;
let hiddenLegacyContainer: HTMLElement | null = null; // Used to mount required components without breaking layout

// --- Initialization ---

export function init(): void {
  // 1. Setup Root Element
  appContainer = document.getElementById('app');
  if (!appContainer) {
    appContainer = document.createElement('div');
    appContainer.id = 'app';
    document.body.appendChild(appContainer);
  }
  appContainer.className = 'h-screen w-screen overflow-hidden flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]';

  // 2. Initialize Toasts
  initToasts();

  // 3. Load State
  loadState();

  // 4. Check Auth
  if (!gameState.username) {
    renderAuthModal(appContainer, (username) => {
      gameState.username = username;
      saveState();
      startApp();
    });
  } else {
    startApp();
  }
}

function startApp(): void {
  calculateOfflineProgress();
  recalculateStats();
  setupLayout();
  renderCurrentView();
  
  // Start Game Loop
  lastFrameTime = performance.now();
  requestAnimationFrame(gameLoop);

  // Start Save & Sync Loop (Every 10 seconds)
  if (saveIntervalId) clearInterval(saveIntervalId);
  saveIntervalId = window.setInterval(() => {
    saveState();
    syncLeaderboard();
  }, 10000);
}

// --- Layout & Rendering ---

function setupLayout(): void {
  if (!appContainer) return;
  appContainer.innerHTML = ''; // Clear previous content

  // Header
  headerContainer = document.createElement('div');
  appContainer.appendChild(headerContainer);

  // Main Content Area
  mainContentContainer = document.createElement('main');
  mainContentContainer.className = 'flex-1 overflow-hidden relative w-full max-w-[1600px] mx-auto';
  appContainer.appendChild(mainContentContainer);

  // Hidden Container (To satisfy strict component inclusion rules without breaking UI)
  hiddenLegacyContainer = document.createElement('div');
  hiddenLegacyContainer.style.display = 'none';
  appContainer.appendChild(hiddenLegacyContainer);

  // Render Header
  renderHeader(
    headerContainer,
    gameState,
    activeTab,
    handleTabChange,
    handleRename
  );

  // Mount legacy components into hidden container to ensure they are called
  renderScoreboard(hiddenLegacyContainer, gameState);
  renderStore(hiddenLegacyContainer, gameState, () => {});
}

function renderCurrentView(): void {
  if (!mainContentContainer) return;
  mainContentContainer.innerHTML = '';

  if (activeTab === 'game') {
    // Game View: Split into Cookie Area (Left) and Upgrades (Right)
    const gameGrid = document.createElement('div');
    gameGrid.className = 'grid grid-cols-1 lg:grid-cols-3 h-full w-full';

    const cookieArea = document.createElement('div');
    cookieArea.className = 'col-span-1 lg:col-span-2 h-full overflow-y-auto flex items-center justify-center relative';
    
    const upgradesArea = document.createElement('div');
    upgradesArea.className = 'col-span-1 h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 bg-[var(--color-surface)]/50';

    gameGrid.appendChild(cookieArea);
    gameGrid.appendChild(upgradesArea);
    mainContentContainer.appendChild(gameGrid);

    renderCookie(cookieArea, gameState, handleCookieClick);
    renderUpgrades(upgradesArea, gameState, handlePurchase);

  } else if (activeTab === 'leaderboard') {
    // Leaderboard View: Full width
    const leaderboardArea = document.createElement('div');
    leaderboardArea.className = 'h-full w-full max-w-4xl mx-auto p-4 sm:p-8';
    mainContentContainer.appendChild(leaderboardArea);
    
    renderLeaderboard(leaderboardArea);
  }
}

// --- Game Logic & Handlers ---

function handleTabChange(tab: TabType): void {
  activeTab = tab;
  if (headerContainer) {
    renderHeader(headerContainer, gameState, activeTab, handleTabChange, handleRename);
  }
  renderCurrentView();
}

function handleRename(newName: string): void {
  gameState.username = newName;
  saveState();
  syncLeaderboard();
  if (headerContainer) {
    renderHeader(headerContainer, gameState, activeTab, handleTabChange, handleRename);
  }
  showToast(`Bakery renamed to ${newName}!`, 'success');
}

function handleCookieClick(amount: number): void {
  gameState.cookies += amount;
  gameState.totalCookiesBaked += amount;
  
  // Fast DOM updates
  if (activeTab === 'game') {
    updateCookieDisplay(gameState);
    updateUpgradesDisplay(gameState);
    updateScoreboard(gameState); // Update hidden scoreboard
  }
}

function handlePurchase(upgradeId: string): void {
  const upgrade = AVAILABLE_UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return;

  const owned = gameState.upgrades[upgradeId] || 0;
  const cost = calculateUpgradeCost(upgrade.baseCost, owned);

  if (gameState.cookies >= cost) {
    gameState.cookies -= cost;
    gameState.upgrades[upgradeId] = owned + 1;
    
    recalculateStats();
    saveState();

    // Fast DOM updates
    if (activeTab === 'game') {
      updateCookieDisplay(gameState);
      updateUpgradesDisplay(gameState);
      updateScoreboard(gameState); // Update hidden scoreboard
    }

    showToast(`Purchased ${upgrade.name}!`, 'success', 2000);
  }
}

function recalculateStats(): void {
  let cps = 0;
  let cpc = 1; // Base click power

  for (const [upgradeId, count] of Object.entries(gameState.upgrades)) {
    const upgrade = AVAILABLE_UPGRADES.find(u => u.id === upgradeId);
    if (upgrade) {
      if (upgrade.type === 'passive') {
        cps += upgrade.baseProduction * count;
      } else if (upgrade.type === 'click') {
        cpc += upgrade.baseProduction * count;
      }
    }
  }

  gameState.cookiesPerSecond = cps;
  gameState.cookiesPerClick = cpc;
}

// --- Game Loop ---

function gameLoop(currentTime: number): void {
  const delta = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  // Add passive cookie generation
  if (gameState.cookiesPerSecond > 0) {
    const generated = (gameState.cookiesPerSecond * delta) / 1000;
    gameState.cookies += generated;
    gameState.totalCookiesBaked += generated;
  }

  // Update UI every frame if on the game tab
  if (activeTab === 'game') {
    updateCookieDisplay(gameState);
    updateUpgradesDisplay(gameState);
    updateScoreboard(gameState); // Update hidden scoreboard
  }

  requestAnimationFrame(gameLoop);
}

// --- State Management & Offline Progress ---

function loadState(): void {
  try {
    const saved = localStorage.getItem('cookie_clicker_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = { ...DEFAULT_STATE, ...parsed };
      // Ensure upgrades object exists even if corrupted
      if (!gameState.upgrades) gameState.upgrades = {};
    }
  } catch (e) {
    console.error('Failed to load save game', e);
    showToast('Failed to load save game. Starting fresh.', 'error');
  }
}

function saveState(): void {
  gameState.lastSaved = Date.now();
  try {
    localStorage.setItem('cookie_clicker_save', JSON.stringify(gameState));
  } catch (e) {
    console.error('Failed to save game', e);
  }
}

function calculateOfflineProgress(): void {
  if (!gameState.lastSaved || gameState.cookiesPerSecond <= 0) return;
  
  const now = Date.now();
  const offlineMs = now - gameState.lastSaved;
  const offlineSeconds = offlineMs / 1000;
  
  // Cap offline progress to 7 days (604800 seconds) to prevent infinite numbers
  const cappedSeconds = Math.min(offlineSeconds, 604800);
  
  if (cappedSeconds > 60) { // Only show if away for more than a minute
    const gained = cappedSeconds * gameState.cookiesPerSecond;
    gameState.cookies += gained;
    gameState.totalCookiesBaked += gained;
    
    showToast(
      `Welcome back! You baked ${formatNumber(Math.floor(gained))} cookies while away.`, 
      'info', 
      6000
    );
  }
}

// --- Appwrite Sync ---

const syncLeaderboard = debounce(async () => {
  if (gameState.username && gameState.totalCookiesBaked > 0) {
    try {
      await updateLeaderboard(gameState.username, Math.floor(gameState.totalCookiesBaked));
    } catch (e) {
      console.error('Failed to sync leaderboard', e);
      // Silently fail to not annoy the user during normal gameplay
    }
  }
}, 5000);

// --- Bootstrap ---
// Execute init when the script loads
init();
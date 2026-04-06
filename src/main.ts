import './style.css';
import { GameState, ViewState } from './types';
import { loadGame, saveGame, generateGuestName, createElement } from './utils';
import { initHeader, HeaderComponent } from './components/header';
import { initCookieArea, CookieAreaComponent } from './components/cookieArea';
import { initShop, ShopComponent, UPGRADES, calculateCost } from './components/shop';
import { initLeaderboard, LeaderboardComponent } from './components/leaderboard';
import { initSettings, SettingsComponent } from './components/settings';

// --- Configuration ---
const TICK_RATE_MS = 100; // 10 ticks per second for smooth updates
const SAVE_INTERVAL_MS = 10000; // Auto-save every 10 seconds

// --- Global State ---
let state: GameState;
let currentView: ViewState = 'game';

// Component references for updating UI
let headerComponent: HeaderComponent;
let cookieAreaComponent: CookieAreaComponent;
let shopComponent: ShopComponent;
let leaderboardComponent: LeaderboardComponent;
let settingsComponent: SettingsComponent;

/**
 * Generates a fresh default game state.
 */
function getDefaultState(): GameState {
    return {
        playerName: generateGuestName(),
        cookies: 0,
        totalCookies: 0,
        cookiesPerSecond: 0,
        inventory: {},
        lastSaveTime: Date.now()
    };
}

/**
 * Recalculates the total Cookies Per Second (CPS) based on the current inventory.
 */
function recalculateCPS() {
    let totalCps = 0;
    for (const upgrade of UPGRADES) {
        const owned = state.inventory[upgrade.id] || 0;
        totalCps += owned * upgrade.baseCps;
    }
    state.cookiesPerSecond = totalCps;
}

/**
 * Calculates and applies cookies earned while the player was away.
 */
function processOfflineProgress() {
    const now = Date.now();
    if (state.lastSaveTime && state.cookiesPerSecond > 0) {
        const secondsOffline = (now - state.lastSaveTime) / 1000;
        // Cap offline progress to 7 days to prevent overflow/exploits
        const maxOfflineSeconds = 7 * 24 * 60 * 60;
        const effectiveSeconds = Math.min(secondsOffline, maxOfflineSeconds);

        if (effectiveSeconds > 0) {
            const earned = effectiveSeconds * state.cookiesPerSecond;
            state.cookies += earned;
            state.totalCookies += earned;
            console.log(`Welcome back! You earned ${Math.floor(earned)} cookies while offline.`);
        }
    }
    state.lastSaveTime = now;
}

/**
 * Pushes the current state to all UI components.
 */
function updateAllUI() {
    headerComponent?.updateState(state);
    cookieAreaComponent?.updateState(state);
    shopComponent?.updateState(state);
    leaderboardComponent?.updateState(state);
    settingsComponent?.updateState(state);
}

/**
 * Handles switching between different main views (Game, Leaderboard, Settings).
 */
function switchView(newView: ViewState, containers: Record<ViewState, HTMLElement>) {
    currentView = newView;
    
    // Update Header UI
    headerComponent.updateView(currentView);

    // Toggle container visibility
    Object.entries(containers).forEach(([viewId, el]) => {
        if (viewId === currentView) {
            el.classList.remove('hidden');
            el.classList.add('flex');
            
            // Refresh leaderboard data when switching to it
            if (viewId === 'leaderboard') {
                leaderboardComponent.refresh();
            }
        } else {
            el.classList.remove('flex');
            el.classList.add('hidden');
        }
    });
}

/**
 * Initializes the entire application.
 */
export function initApp() {
    const root = document.getElementById('app');
    if (!root) {
        console.error('Root element #app not found!');
        return;
    }

    // 1. Load State & Process Offline Progress
    const savedState = loadGame();
    state = savedState ? { ...getDefaultState(), ...savedState } : getDefaultState();
    
    recalculateCPS();
    processOfflineProgress();

    // 2. Setup Main DOM Structure
    root.className = 'h-screen w-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden font-body';
    
    const headerContainer = createElement('div', { className: 'shrink-0 z-20 relative' });
    const mainContent = createElement('main', { className: 'flex-1 relative overflow-hidden' });
    
    root.appendChild(headerContainer);
    root.appendChild(mainContent);

    // View Containers
    const gameContainer = createElement('div', { 
        className: 'h-full w-full flex flex-col md:flex-row hidden' 
    });
    
    const leaderboardContainer = createElement('div', { 
        className: 'h-full w-full hidden overflow-y-auto' 
    });
    
    const settingsContainer = createElement('div', { 
        className: 'h-full w-full hidden overflow-y-auto' 
    });

    mainContent.appendChild(gameContainer);
    mainContent.appendChild(leaderboardContainer);
    mainContent.appendChild(settingsContainer);

    const viewContainers: Record<ViewState, HTMLElement> = {
        'game': gameContainer,
        'leaderboard': leaderboardContainer,
        'settings': settingsContainer
    };

    // Game View Sub-containers
    const cookieAreaContainer = createElement('div', { 
        className: 'flex-1 h-[50%] md:h-full relative' 
    });
    const shopContainer = createElement('div', { 
        className: 'h-[50%] md:h-full w-full md:w-80 lg:w-96 shrink-0 z-10 relative' 
    });
    
    gameContainer.appendChild(cookieAreaContainer);
    gameContainer.appendChild(shopContainer);

    // 3. Initialize Components
    
    // Header
    headerComponent = initHeader(headerContainer, (view) => switchView(view, viewContainers));

    // Cookie Area
    cookieAreaComponent = initCookieArea(cookieAreaContainer, () => {
        // Manual click adds 1 cookie (could be expanded with click upgrades later)
        state.cookies += 1;
        state.totalCookies += 1;
        updateAllUI();
    });

    // Shop
    shopComponent = initShop(shopContainer, (upgradeId) => {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (!upgrade) return;

        const owned = state.inventory[upgradeId] || 0;
        const cost = calculateCost(upgrade.baseCost, upgrade.costMultiplier, owned);

        if (state.cookies >= cost) {
            state.cookies -= cost;
            state.inventory[upgradeId] = owned + 1;
            recalculateCPS();
            updateAllUI();
        }
    });

    // Leaderboard
    leaderboardComponent = initLeaderboard(leaderboardContainer);

    // Settings
    settingsComponent = initSettings(
        settingsContainer,
        (newName) => {
            state.playerName = newName;
            saveGame(state);
            updateAllUI();
        },
        () => {
            // Hard Reset
            state = getDefaultState();
            recalculateCPS();
            saveGame(state);
            updateAllUI();
            switchView('game', viewContainers);
        }
    );

    // 4. Start Game Loops
    
    // Main Tick Loop (CPS)
    setInterval(() => {
        if (state.cookiesPerSecond > 0) {
            const cookiesToAdd = state.cookiesPerSecond * (TICK_RATE_MS / 1000);
            state.cookies += cookiesToAdd;
            state.totalCookies += cookiesToAdd;
            updateAllUI();
        }
    }, TICK_RATE_MS);

    // Auto-Save Loop
    setInterval(() => {
        state.lastSaveTime = Date.now();
        saveGame(state);
    }, SAVE_INTERVAL_MS);

    // 5. Finalize Initialization
    updateAllUI();
    switchView('game', viewContainers);
}

// Boot the app when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
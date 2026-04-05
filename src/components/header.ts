import { GameState } from '../types';

export type TabType = 'game' | 'leaderboard';

/**
 * Escapes HTML characters to prevent XSS attacks when displaying user input.
 */
function escapeHTML(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Renders the main navigation header for the game.
 * Includes the logo, navigation tabs, and player profile/rename functionality.
 * 
 * @param container The DOM element to mount the header into.
 * @param gameState The current state of the game (used for username).
 * @param activeTab The currently active navigation tab.
 * @param onTabChange Callback fired when a navigation tab is clicked.
 * @param onRename Callback fired when the user changes their username.
 */
export function renderHeader(
  container: HTMLElement,
  gameState: GameState,
  activeTab: TabType,
  onTabChange: (tab: TabType) => void,
  onRename: (newName: string) => void
): void {
  const safeUsername = escapeHTML(gameState.username || 'Anonymous Baker');
  const initial = safeUsername.charAt(0).toUpperCase();

  // Helper to determine tab styling based on active state
  const navClass = (tab: TabType) =>
    activeTab === tab
      ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
      : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-white/30 border-b-2 border-transparent';

  container.innerHTML = `
    <header class="bg-[var(--color-surface)] border-b border-white/10 sticky top-0 z-40 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <!-- Logo / Title -->
          <div class="flex items-center gap-2 cursor-pointer group" id="logo-btn" title="Back to Bakery">
            <span class="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">🍪</span>
            <h1 class="text-xl font-bold text-[var(--color-accent)] tracking-wider hidden sm:block font-heading">
              Cookie Clicker
            </h1>
          </div>

          <!-- Navigation Tabs -->
          <nav class="flex space-x-2 sm:space-x-8 h-full">
            <button data-tab="game" class="h-full px-3 flex items-center font-medium transition-colors ${navClass('game')}">
              <svg class="w-4 h-4 mr-2 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Bakery
            </button>
            <button data-tab="leaderboard" class="h-full px-3 flex items-center font-medium transition-colors ${navClass('leaderboard')}">
              <svg class="w-4 h-4 mr-2 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Leaderboard
            </button>
          </nav>

          <!-- Player Info -->
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-end hidden sm:flex">
              <span class="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Master Baker</span>
              <button id="rename-btn" class="text-sm font-bold text-white hover:text-[var(--color-accent)] transition-colors flex items-center gap-1 group" title="Change Name">
                ${safeUsername}
                <svg class="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
            </div>
            <button id="rename-btn-mobile" class="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold border-2 border-[var(--color-accent)] shadow-lg hover:scale-105 transition-transform" title="Change Name">
              ${initial}
            </button>
          </div>

        </div>
      </div>
    </header>
  `;

  // --- Attach Event Listeners ---

  // Tab Navigation
  const tabButtons = container.querySelectorAll<HTMLButtonElement>('button[data-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab') as TabType;
      if (tab && tab !== activeTab) {
        onTabChange(tab);
      }
    });
  });

  // Logo Click (Returns to Game/Bakery)
  const logoBtn = container.querySelector('#logo-btn');
  logoBtn?.addEventListener('click', () => {
    if (activeTab !== 'game') {
      onTabChange('game');
    }
  });

  // Rename Functionality
  const handleRename = () => {
    const newName = window.prompt('Enter your new bakery name:', gameState.username);
    if (newName !== null) {
      const trimmedName = newName.trim();
      if (trimmedName !== '' && trimmedName !== gameState.username) {
        // Limit username length to 20 characters for UI consistency
        onRename(trimmedName.substring(0, 20));
      }
    }
  };

  const renameBtn = container.querySelector('#rename-btn');
  const renameBtnMobile = container.querySelector('#rename-btn-mobile');
  
  renameBtn?.addEventListener('click', handleRename);
  renameBtnMobile?.addEventListener('click', handleRename);
}
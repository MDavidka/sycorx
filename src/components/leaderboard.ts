import { getLeaderboard } from '../appwrite';
import { formatNumber } from '../utils';
import { LeaderboardEntry } from '../types';

/**
 * Escapes HTML characters to prevent XSS attacks when displaying user input
 * fetched from the database.
 */
function escapeHTML(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Renders the global leaderboard panel, fetching the top players from Appwrite.
 * Handles loading, error, and empty states gracefully.
 * 
 * @param container The DOM element to mount the leaderboard into.
 */
export async function renderLeaderboard(container: HTMLElement): Promise<void> {
  // 1. Render Loading State
  container.innerHTML = `
    <div class="flex flex-col h-full bg-[var(--color-surface)] border-l border-white/5 shadow-2xl">
      <div class="sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-white/10 shadow-md">
        <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
          <span>🏆</span> Global Leaderboard
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">Connecting to Appwrite...</p>
      </div>
      <div class="flex-1 flex items-center justify-center pb-24">
        <div class="flex flex-col items-center gap-4">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-accent)]"></div>
          <span class="text-gray-400 text-sm font-medium animate-pulse">Fetching top bakers...</span>
        </div>
      </div>
    </div>
  `;

  try {
    // 2. Fetch Data from Appwrite
    // We request the top 50 players. The getLeaderboard function handles the Appwrite Query.
    const entries = await getLeaderboard(50) as LeaderboardEntry[];

    // 3. Render Empty State (if no data)
    if (!entries || entries.length === 0) {
      container.innerHTML = `
        <div class="flex flex-col h-full bg-[var(--color-surface)] border-l border-white/5 shadow-2xl">
          <div class="sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-white/10 shadow-md flex justify-between items-center">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
                <span>🏆</span> Global Leaderboard
              </h2>
              <p class="text-xs sm:text-sm text-gray-400 mt-1">Top bakers worldwide</p>
            </div>
            <button id="refresh-leaderboard" class="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white" title="Refresh">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 flex flex-col items-center justify-center pb-24 text-center px-6">
            <div class="text-6xl mb-4 opacity-50 grayscale">🍪</div>
            <h3 class="text-lg font-bold text-white mb-2">No Bakers Yet!</h3>
            <p class="text-gray-400 text-sm">Be the first to bake some cookies and claim the #1 spot!</p>
          </div>
        </div>
      `;
      attachRefreshListener(container);
      return;
    }

    // 4. Render Populated List
    const listHtml = entries.map((entry, index) => {
      const rank = index + 1;
      let medal = '';
      let rowClass = 'bg-black/20 border-white/5 hover:bg-black/40';
      let rankClass = 'text-gray-500';

      // Special styling for top 3
      if (rank === 1) {
        medal = '🥇';
        rowClass = 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/20';
      } else if (rank === 2) {
        medal = '🥈';
        rowClass = 'bg-gray-300/10 border-gray-300/30 hover:bg-gray-300/20';
      } else if (rank === 3) {
        medal = '🥉';
        rowClass = 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/20';
      } else {
        medal = `<span class="font-mono text-sm">#${rank}</span>`;
      }

      const safeUsername = escapeHTML(entry.username || 'Anonymous Baker');

      return `
        <div class="flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 ${rowClass}">
          <div class="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <div class="text-xl sm:text-2xl w-8 sm:w-10 text-center flex-shrink-0 flex items-center justify-center ${rankClass}">
              ${medal}
            </div>
            <div class="flex flex-col min-w-0">
              <div class="font-bold text-white truncate text-sm sm:text-base" title="${safeUsername}">
                ${safeUsername}
              </div>
              <div class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                Rank ${rank}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end flex-shrink-0 pl-2">
            <div class="text-[var(--color-accent)] font-mono font-bold text-base sm:text-lg">
              ${formatNumber(entry.totalCookies)}
            </div>
            <div class="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
              <span class="opacity-70">🍪</span> Baked
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="flex flex-col h-full bg-[var(--color-surface)] border-l border-white/5 shadow-2xl">
        <div class="sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-white/10 shadow-md flex justify-between items-center">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
              <span>🏆</span> Global Leaderboard
            </h2>
            <p class="text-xs sm:text-sm text-gray-400 mt-1">Top bakers worldwide</p>
          </div>
          <button id="refresh-leaderboard" class="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white group" title="Refresh Leaderboard">
            <svg class="w-5 h-5 group-active:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
          ${listHtml}
        </div>
      </div>
    `;

    attachRefreshListener(container);

  } catch (error) {
    // 5. Render Error State
    console.error('Failed to fetch leaderboard:', error);
    container.innerHTML = `
      <div class="flex flex-col h-full bg-[var(--color-surface)] border-l border-white/5 shadow-2xl">
        <div class="sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-white/10 shadow-md">
          <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
            <span>🏆</span> Global Leaderboard
          </h2>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center pb-24 text-center px-6">
          <div class="text-5xl mb-4">🔌</div>
          <h3 class="text-lg font-bold text-red-400 mb-2">Connection Error</h3>
          <p class="text-gray-400 text-sm mb-6 max-w-xs">Could not connect to the Appwrite database to fetch scores. Please check your connection or try again later.</p>
          <button id="retry-leaderboard" class="btn-secondary text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
          </button>
        </div>
      </div>
    `;
    
    container.querySelector('#retry-leaderboard')?.addEventListener('click', () => {
      renderLeaderboard(container);
    });
  }
}

/**
 * Helper to attach the refresh button event listener.
 */
function attachRefreshListener(container: HTMLElement): void {
  const refreshBtn = container.querySelector('#refresh-leaderboard');
  refreshBtn?.addEventListener('click', () => {
    // Re-render the component to trigger a new fetch
    renderLeaderboard(container);
  });
}
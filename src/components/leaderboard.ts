import { Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTION_PROFILES } from '../appwrite';
import { formatNumber } from '../utils';
import { PlayerProfile } from '../types';

/**
 * Renders the global leaderboard, fetching the top players from Appwrite.
 * 
 * @param container The DOM element to append the leaderboard to.
 */
export function renderLeaderboard(container: HTMLElement): void {
  // Main wrapper for the leaderboard area
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col h-full w-full bg-[#FFF8E1] overflow-hidden relative animate-fade-in';

  // ==========================================
  // HEADER
  // ==========================================
  const header = document.createElement('div');
  header.className = 'p-6 border-b border-[#D7CCC8] bg-white shrink-0 z-10 shadow-sm flex justify-between items-center';
  
  const titleContainer = document.createElement('div');
  titleContainer.innerHTML = `
    <h2 class="text-2xl font-extrabold text-[#5D4037] tracking-tight flex items-center gap-2">
      <span>🏆</span> Global Leaderboard
    </h2>
    <p class="text-sm text-[#8D6E63] mt-1 font-medium">Top 50 Bakers Worldwide</p>
  `;

  const refreshBtn = document.createElement('button');
  refreshBtn.className = 'p-2 rounded-full hover:bg-[#FFF8E1] text-[#8D6E63] hover:text-[#FF9800] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC107]';
  refreshBtn.innerHTML = '🔄';
  refreshBtn.title = 'Refresh Leaderboard';

  header.appendChild(titleContainer);
  header.appendChild(refreshBtn);
  wrapper.appendChild(header);

  // ==========================================
  // CONTENT AREA
  // ==========================================
  const content = document.createElement('div');
  content.className = 'flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative';
  wrapper.appendChild(content);

  // ==========================================
  // DATA FETCHING & RENDERING
  // ==========================================
  
  const loadLeaderboard = async () => {
    // Show loading state
    content.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-[#8D6E63] space-y-4">
        <div class="text-5xl animate-spin-slow origin-center inline-block">🍪</div>
        <div class="font-bold text-lg animate-pulse">Fetching high scores...</div>
      </div>
    `;

    try {
      // Fetch top 50 players ordered by cookies descending
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_PROFILES,
        [
          Query.orderDesc('cookies'),
          Query.limit(50)
        ]
      );

      // Clear loading state
      content.innerHTML = '';

      if (response.documents.length === 0) {
        content.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-[#8D6E63] space-y-2">
            <div class="text-4xl">📭</div>
            <div class="font-bold text-lg">No scores yet.</div>
            <div class="text-sm">Start baking to be the first!</div>
          </div>
        `;
        return;
      }

      const list = document.createElement('div');
      list.className = 'space-y-3 max-w-3xl mx-auto pb-8';

      response.documents.forEach((doc, index) => {
        // Cast document to our PlayerProfile type (assuming it contains username, cookies, cps)
        const profile = doc as unknown as PlayerProfile & { username?: string, cookies?: number, cps?: number };
        const rank = index + 1;

        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-[#D7CCC8] hover:border-[#FFC107] hover:shadow-md transition-all duration-200 group';

        // Left Side: Rank & Name
        const leftSide = document.createElement('div');
        leftSide.className = 'flex items-center gap-4';

        const rankBadge = document.createElement('div');
        
        // Style top 3 ranks specially
        let badgeClass = 'bg-[#FFF8E1] text-[#8D6E63] border border-[#D7CCC8]';
        if (rank === 1) badgeClass = 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-white shadow-md border-none scale-110';
        else if (rank === 2) badgeClass = 'bg-gradient-to-br from-[#E0E0E0] to-[#9E9E9E] text-white shadow-sm border-none';
        else if (rank === 3) badgeClass = 'bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white shadow-sm border-none';

        rankBadge.className = `w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg shrink-0 ${badgeClass}`;
        rankBadge.textContent = `#${rank}`;

        const nameEl = document.createElement('div');
        nameEl.className = 'font-bold text-[#3E2723] text-lg truncate max-w-[140px] sm:max-w-[250px] group-hover:text-[#FF9800] transition-colors';
        nameEl.textContent = profile.username || 'Anonymous Baker';

        leftSide.appendChild(rankBadge);
        leftSide.appendChild(nameEl);

        // Right Side: Score & CPS
        const rightSide = document.createElement('div');
        rightSide.className = 'text-right flex flex-col items-end';

        const scoreContainer = document.createElement('div');
        scoreContainer.className = 'flex items-center gap-1.5';
        
        const scoreEl = document.createElement('div');
        scoreEl.className = 'font-extrabold text-[#FF9800] text-lg md:text-xl tracking-tight';
        scoreEl.textContent = formatNumber(profile.cookies || 0);
        
        const cookieIcon = document.createElement('span');
        cookieIcon.textContent = '🍪';
        cookieIcon.className = 'text-sm md:text-base';

        scoreContainer.appendChild(scoreEl);
        scoreContainer.appendChild(cookieIcon);

        const cpsEl = document.createElement('div');
        cpsEl.className = 'text-xs text-[#8D6E63] font-semibold mt-0.5 bg-[#FFF8E1] px-2 py-0.5 rounded-md';
        cpsEl.textContent = `${formatNumber(profile.cps || 0)} CPS`;

        rightSide.appendChild(scoreContainer);
        rightSide.appendChild(cpsEl);

        item.appendChild(leftSide);
        item.appendChild(rightSide);

        list.appendChild(item);
      });

      content.appendChild(list);

    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      content.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-[#5D4037] space-y-4 text-center px-4">
          <div class="text-5xl drop-shadow-sm">⚠️</div>
          <div class="font-bold text-xl text-[#3E2723]">Connection Error</div>
          <div class="text-sm text-[#8D6E63] max-w-xs">
            Failed to load the leaderboard. Please check your internet connection or try again later.
          </div>
          <button id="retry-btn" class="mt-4 px-6 py-2 bg-[#FFC107] hover:bg-[#FF9800] text-[#3E2723] font-bold rounded-full shadow-sm transition-colors">
            Try Again
          </button>
        </div>
      `;

      // Attach retry listener
      const retryBtn = content.querySelector('#retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', loadLeaderboard);
      }
    }
  };

  // Bind refresh button
  refreshBtn.addEventListener('click', () => {
    // Add a quick spin animation to the button
    refreshBtn.classList.add('animate-spin');
    setTimeout(() => refreshBtn.classList.remove('animate-spin'), 500);
    loadLeaderboard();
  });

  // Initial load
  loadLeaderboard();

  // Append to container
  container.appendChild(wrapper);
}
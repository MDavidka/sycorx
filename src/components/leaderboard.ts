import { getLeaderboard, submitScore } from '../db';
import { LeaderboardEntry } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the leaderboard component.
 * Fetches data from MongoDB and displays the top players.
 */
export async function renderLeaderboard(
  container: HTMLElement,
  currentScore: number,
  onScoreSubmit: (username: string) => Promise<void>
): Promise<void> {
  // Initial structure
  if (!container.querySelector('#leaderboard-container')) {
    container.innerHTML = `
      <div id="leaderboard-container" class="game-card flex flex-col gap-6">
        <h2 class="text-2xl font-black text-[var(--color-primary)] border-b-2 border-amber-200 pb-2">Global Leaderboard</h2>
        
        <div id="leaderboard-list" class="space-y-2">
          <div class="text-center py-8 text-amber-700">Loading rankings...</div>
        </div>

        <div class="mt-6 pt-6 border-t border-amber-100">
          <h3 class="text-sm font-bold text-amber-900 mb-3">Submit your score</h3>
          <div class="flex gap-2">
            <input 
              type="text" 
              id="username-input" 
              placeholder="Enter your name" 
              maxlength="12"
              class="flex-1 p-2 rounded border border-amber-200 bg-amber-50 focus:ring-2 focus:ring-[var(--color-secondary)] outline-none"
            />
            <button id="submit-score-btn" class="btn-primary px-4 py-2">Submit</button>
          </div>
        </div>
      </div>
    `;
  }

  const listEl = container.querySelector('#leaderboard-list') as HTMLElement;
  const submitBtn = container.querySelector('#submit-score-btn') as HTMLButtonElement;
  const inputEl = container.querySelector('#username-input') as HTMLInputElement;

  // Fetch and display data
  try {
    const data = await getLeaderboard(10);
    const entries: LeaderboardEntry[] = data.documents || [];

    if (entries.length === 0) {
      listEl.innerHTML = '<p class="text-center text-amber-600">No scores yet. Be the first!</p>';
    } else {
      listEl.innerHTML = entries
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => `
          <div class="flex items-center justify-between p-3 bg-white rounded border border-amber-100 shadow-sm">
            <div class="flex items-center gap-3">
              <span class="font-black text-amber-300 text-xl w-6">#${index + 1}</span>
              <span class="font-bold text-[var(--color-text)]">${entry.username}</span>
            </div>
            <span class="font-mono font-bold text-[var(--color-primary)]">${formatNumber(entry.score)}</span>
          </div>
        `)
        .join('');
    }
  } catch (err) {
    listEl.innerHTML = '<p class="text-center text-red-600">Failed to load leaderboard.</p>';
  }

  // Handle submission
  submitBtn.onclick = async () => {
    const username = inputEl.value.trim();
    if (!username) {
      alert('Please enter a name!');
      return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    await onScoreSubmit(username);
    
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
    // Refresh leaderboard after submission
    renderLeaderboard(container, currentScore, onScoreSubmit);
  };
}
import { databases, DATABASE_ID, COLLECTION_LEADERBOARD } from '../appwrite';
import { LeaderboardEntry } from '../types';
import { formatNumber } from '../utils';
import { Query } from 'appwrite';

/**
 * Renders the leaderboard component, fetching top 10 players from Appwrite.
 * 
 * @param container The HTMLElement to mount the leaderboard into.
 */
export async function renderLeaderboard(container: HTMLElement): Promise<void> {
  container.innerHTML = `
    <div class="card w-full max-w-md mx-auto">
      <h2 class="text-xl font-bold text-[var(--color-accent)] mb-4 border-b border-white/10 pb-2">Global Leaderboard</h2>
      <div id="leaderboard-content" class="space-y-2">
        <p class="text-center py-4 opacity-50">Loading rankings...</p>
      </div>
    </div>
  `;

  const contentEl = container.querySelector('#leaderboard-content') as HTMLElement;

  try {
    // Fetch top 10 players sorted by totalCookies descending
    const response = await databases.listDocuments(
      DATABASE_ID, 
      COLLECTION_LEADERBOARD,
      [
        Query.orderDesc('totalCookies'),
        Query.limit(10)
      ]
    );

    const entries = response.documents as unknown as LeaderboardEntry[];

    if (entries.length === 0) {
      contentEl.innerHTML = '<p class="text-center py-4 opacity-50">No players yet. Be the first!</p>';
      return;
    }

    contentEl.innerHTML = entries.map((entry, index) => `
      <div class="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg border border-white/5">
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold ${index < 3 ? 'text-[var(--color-accent)]' : 'opacity-50'}">
            #${index + 1}
          </span>
          <span class="font-medium">${entry.username}</span>
        </div>
        <span class="font-bold text-[var(--color-secondary)] tabular-nums">
          ${formatNumber(entry.totalCookies)} 🍪
        </span>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    contentEl.innerHTML = `
      <div class="text-center py-4 text-red-400">
        <p>Failed to load leaderboard.</p>
      </div>
    `;
  }
}
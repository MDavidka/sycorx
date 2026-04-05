import { GameState, Upgrade } from '../types';
import { formatNumber } from '../utils';
import { databases, DATABASE_ID } from '../appwrite';

// Collection ID for upgrades (User should create this in Appwrite)
export const COLLECTION_UPGRADES = 'upgrades';

/**
 * Renders the store component and handles purchase logic.
 * 
 * @param container The HTMLElement to mount the store into.
 * @param gameState The current game state object.
 * @param onPurchase Callback triggered when an upgrade is successfully bought.
 */
export async function renderStore(
  container: HTMLElement,
  gameState: GameState,
  onPurchase: (upgrade: Upgrade, cost: number) => void
): Promise<void> {
  try {
    // Fetch available upgrades from Appwrite
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_UPGRADES);
    const upgrades = response.documents as unknown as Upgrade[];

    container.innerHTML = `
      <div class="card h-full flex flex-col gap-4">
        <h2 class="text-xl font-bold text-[var(--color-accent)] border-b border-white/10 pb-2">Upgrades</h2>
        <div id="upgrade-list" class="flex flex-col gap-3 overflow-y-auto pr-2">
          ${upgrades.map(upgrade => {
            const owned = gameState.upgrades[upgrade.id] || 0;
            const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, owned));
            const canAfford = gameState.cookies >= cost;
            
            return `
              <div class="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg border border-white/5">
                <div>
                  <p class="font-bold">${upgrade.name}</p>
                  <p class="text-xs opacity-60">${upgrade.description}</p>
                  <p class="text-xs text-[var(--color-secondary)] mt-1">Owned: ${owned}</p>
                </div>
                <button 
                  data-id="${upgrade.id}"
                  class="purchase-btn btn-primary text-sm py-1 px-3"
                  ${!canAfford ? 'disabled' : ''}
                >
                  ${formatNumber(cost)} 🍪
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Attach event listeners
    container.querySelectorAll('.purchase-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const upgrade = upgrades.find(u => u.id === id);
        if (upgrade) {
          const owned = gameState.upgrades[upgrade.id] || 0;
          const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, owned));
          onPurchase(upgrade, cost);
        }
      });
    });
  } catch (error) {
    console.error('Error loading store:', error);
    container.innerHTML = `<p class="text-red-400">Failed to load store. Please check your Appwrite configuration.</p>`;
  }
}

/**
 * Calculates the cost of an upgrade based on quantity owned.
 */
export function calculateCost(baseCost: number, quantity: number): number {
  return Math.floor(baseCost * Math.pow(1.15, quantity));
}
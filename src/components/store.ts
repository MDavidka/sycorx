import { GameState, Building } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the store component.
 * Displays available buildings and handles purchase logic.
 */
export function renderStore(
  container: HTMLElement,
  state: GameState,
  onPurchase: (buildingId: string) => void
): void {
  // Initial structure
  if (!container.querySelector('#store-container')) {
    container.innerHTML = `
      <div id="store-container" class="game-card flex flex-col gap-4">
        <h2 class="text-xl font-bold text-[var(--color-primary)] border-b border-amber-100 pb-2">Store</h2>
        <div id="buildings-list" class="flex flex-col gap-3"></div>
      </div>
    `;
  }

  const listEl = container.querySelector('#buildings-list') as HTMLElement;
  if (!listEl) return;

  // Render building items
  listEl.innerHTML = state.buildings
    .map((building) => {
      const currentCost = Math.floor(building.baseCost * Math.pow(1.15, building.count));
      const canAfford = state.cookies >= currentCost;

      return `
        <div class="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div>
            <h3 class="font-bold text-amber-900">${building.name}</h3>
            <p class="text-xs text-amber-700">${building.description}</p>
            <p class="text-xs font-semibold mt-1">Owned: ${building.count}</p>
          </div>
          <button 
            data-id="${building.id}"
            class="purchase-btn btn-primary text-sm py-2 px-4 ${!canAfford ? 'opacity-50 cursor-not-allowed' : ''}"
            ${!canAfford ? 'disabled' : ''}
          >
            ${formatNumber(currentCost)}
          </button>
        </div>
      `;
    })
    .join('');

  // Attach event listeners
  const buttons = listEl.querySelectorAll('.purchase-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) onPurchase(id);
    });
  });
}

/**
 * Calculates the cost of the next building based on current count
 */
export function calculateCost(building: Building): number {
  return Math.floor(building.baseCost * Math.pow(1.15, building.count));
}
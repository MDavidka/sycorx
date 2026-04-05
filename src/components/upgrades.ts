import { GameState, Upgrade } from '../types';
import { formatNumber, calculateUpgradeCost } from '../utils';

/**
 * The static list of all available upgrades in the game.
 * This acts as the source of truth for base costs and production rates.
 */
export const AVAILABLE_UPGRADES: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'Auto-clicks once every 10 seconds.',
    baseCost: 15,
    baseProduction: 0.1,
    type: 'passive',
    icon: '🖱️'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'A nice grandma to bake more cookies.',
    baseCost: 100,
    baseProduction: 1,
    type: 'passive',
    icon: '👵'
  },
  {
    id: 'farm',
    name: 'Cookie Farm',
    description: 'Grows cookie plants from cookie seeds.',
    baseCost: 1100,
    baseProduction: 8,
    type: 'passive',
    icon: '🌱'
  },
  {
    id: 'mine',
    name: 'Mine',
    description: 'Mines out cookie dough and chocolate chips.',
    baseCost: 12000,
    baseProduction: 47,
    type: 'passive',
    icon: '⛏️'
  },
  {
    id: 'factory',
    name: 'Factory',
    description: 'Produces large quantities of cookies.',
    baseCost: 130000,
    baseProduction: 260,
    type: 'passive',
    icon: '🏭'
  },
  {
    id: 'bank',
    name: 'Bank',
    description: 'Generates cookies from interest.',
    baseCost: 1400000,
    baseProduction: 1400,
    type: 'passive',
    icon: '🏦'
  },
  {
    id: 'click_power_1',
    name: 'Reinforced Finger',
    description: 'Clicking is more powerful.',
    baseCost: 500,
    baseProduction: 1,
    type: 'click',
    icon: '👆'
  },
  {
    id: 'click_power_2',
    name: 'Titanium Mouse',
    description: 'Heavy duty clicking power.',
    baseCost: 5000,
    baseProduction: 10,
    type: 'click',
    icon: '🦾'
  }
];

// Cache for DOM elements to avoid querying the DOM on every frame
const domCache = new Map<string, { card: HTMLElement, costEl: HTMLElement, ownedEl: HTMLElement }>();

/**
 * Renders the upgrades store panel.
 * 
 * @param container The DOM element to mount the store into.
 * @param gameState The current state of the game.
 * @param onPurchase Callback fired when an upgrade is clicked and can be afforded.
 */
export function renderUpgrades(
  container: HTMLElement,
  gameState: GameState,
  onPurchase: (upgradeId: string) => void
): void {
  const upgradesHTML = AVAILABLE_UPGRADES.map(upgrade => {
    const owned = gameState.upgrades[upgrade.id] || 0;
    const currentCost = calculateUpgradeCost(upgrade.baseCost, owned);
    const canAfford = gameState.cookies >= currentCost;
    const productionLabel = upgrade.type === 'passive' ? 'CPS' : 'CPC';

    return `
      <div class="upgrade-card ${canAfford ? '' : 'disabled'} active:scale-[0.98] transition-transform" data-upgrade-id="${upgrade.id}">
        <div class="flex items-center gap-3 sm:gap-4 w-full">
          <div class="text-3xl sm:text-4xl bg-black/30 p-2 rounded-lg border border-white/10 shadow-inner flex-shrink-0">
            ${upgrade.icon}
          </div>
          <div class="flex flex-col flex-grow min-w-0">
            <h3 class="text-base sm:text-lg font-bold text-white leading-tight truncate font-heading">${upgrade.name}</h3>
            <p class="text-[10px] sm:text-xs text-gray-400 mb-1 truncate" title="${upgrade.description}">${upgrade.description}</p>
            <div class="text-sm font-medium text-[var(--color-accent)] flex items-center gap-1">
              <span class="text-xs opacity-80">🍪</span>
              <span class="upgrade-cost font-mono" data-cost-id="${upgrade.id}">${formatNumber(currentCost)}</span>
            </div>
          </div>
          <div class="text-right flex flex-col items-end justify-center flex-shrink-0 pl-2 border-l border-white/10">
            <div class="text-xl sm:text-2xl font-black text-white/20 upgrade-owned font-mono" data-owned-id="${upgrade.id}">
              ${owned}
            </div>
            <div class="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider mt-1 whitespace-nowrap font-bold">
              +${formatNumber(upgrade.baseProduction)} ${productionLabel}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="flex flex-col h-full bg-[var(--color-surface)] border-l border-white/5 shadow-2xl">
      <div class="sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-sm z-10 p-4 sm:p-6 border-b border-white/10 shadow-md">
        <h2 class="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
          <span>🏪</span> Upgrades Store
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 mt-1">Spend your cookies to bake even faster!</p>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        ${upgradesHTML}
      </div>
    </div>
  `;

  // Clear and rebuild the DOM cache for fast updates
  domCache.clear();

  // Attach event listeners and populate cache
  const cards = container.querySelectorAll<HTMLElement>('.upgrade-card');
  cards.forEach(card => {
    const upgradeId = card.getAttribute('data-upgrade-id');
    if (!upgradeId) return;

    const costEl = container.querySelector<HTMLElement>(`.upgrade-cost[data-cost-id="${upgradeId}"]`);
    const ownedEl = container.querySelector<HTMLElement>(`.upgrade-owned[data-owned-id="${upgradeId}"]`);

    if (costEl && ownedEl) {
      domCache.set(upgradeId, { card, costEl, ownedEl });
    }

    card.addEventListener('click', () => {
      // Re-evaluate cost dynamically based on current state reference
      const upgrade = AVAILABLE_UPGRADES.find(u => u.id === upgradeId);
      if (!upgrade) return;

      const owned = gameState.upgrades[upgrade.id] || 0;
      const currentCost = calculateUpgradeCost(upgrade.baseCost, owned);

      if (gameState.cookies >= currentCost) {
        onPurchase(upgrade.id);
      }
    });
  });
}

/**
 * Fast DOM update function to refresh the store display (costs, availability, owned count)
 * without re-rendering the entire component. Designed to be called inside the game loop.
 * 
 * @param gameState The current state of the game.
 */
export function updateUpgradesDisplay(gameState: GameState): void {
  AVAILABLE_UPGRADES.forEach(upgrade => {
    const elements = domCache.get(upgrade.id);
    if (!elements) return;

    const owned = gameState.upgrades[upgrade.id] || 0;
    const currentCost = calculateUpgradeCost(upgrade.baseCost, owned);
    const canAfford = gameState.cookies >= currentCost;

    // Update visual disabled state
    if (canAfford) {
      elements.card.classList.remove('disabled');
    } else {
      elements.card.classList.add('disabled');
    }

    // Update cost text only if it changed (prevents unnecessary DOM writes)
    const formattedCost = formatNumber(currentCost);
    if (elements.costEl.textContent !== formattedCost) {
      elements.costEl.textContent = formattedCost;
    }

    // Update owned count text only if it changed
    const ownedStr = owned.toString();
    if (elements.ownedEl.textContent !== ownedStr) {
      elements.ownedEl.textContent = ownedStr;
    }
  });
}
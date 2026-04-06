import { AVAILABLE_UPGRADES, getState, purchaseUpgrade, subscribe } from '../engine';
import { formatNumber, calculateUpgradeCost } from '../utils';

/**
 * Renders the shop area containing all available upgrades.
 * Dynamically updates the cost, owned count, and affordability state
 * based on the current game state.
 * 
 * @param container The DOM element to append the shop area to.
 */
export function renderShopArea(container: HTMLElement): void {
  // Main wrapper for the shop area
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col h-full w-full bg-white border-l border-[#D7CCC8] shadow-sm overflow-hidden';

  // ==========================================
  // HEADER
  // ==========================================
  const header = document.createElement('div');
  header.className = 'p-4 border-b border-[#D7CCC8] bg-[#FFF8E1] shrink-0 z-10 shadow-sm';
  
  const title = document.createElement('h2');
  title.className = 'text-xl font-extrabold text-[#5D4037] tracking-tight flex items-center gap-2';
  title.innerHTML = '<span>🏪</span> Upgrades';
  
  header.appendChild(title);
  wrapper.appendChild(header);

  // ==========================================
  // UPGRADES LIST
  // ==========================================
  const listContainer = document.createElement('div');
  listContainer.className = 'flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar bg-[#ffffff]';

  // Store references to DOM elements that need frequent updates
  const upgradeRefs: Record<string, {
    btn: HTMLButtonElement;
    costEl: HTMLElement;
    countEl: HTMLElement;
  }> = {};

  AVAILABLE_UPGRADES.forEach((upgrade) => {
    // Create the button container for the upgrade
    const btn = document.createElement('button');
    btn.className = 'w-full flex items-center p-3 rounded-xl border-2 border-transparent bg-white shadow-sm transition-all duration-200 text-left relative overflow-hidden group select-none';
    
    // Click handler
    btn.addEventListener('click', () => {
      // Add a quick visual pop on click if successful
      if (purchaseUpgrade(upgrade.id)) {
        btn.classList.add('scale-[0.98]');
        setTimeout(() => btn.classList.remove('scale-[0.98]'), 100);
      }
    });

    // Icon
    const iconContainer = document.createElement('div');
    iconContainer.className = 'text-4xl mr-4 drop-shadow-md group-hover:scale-110 transition-transform duration-200';
    iconContainer.textContent = upgrade.icon;

    // Details (Name, Cost, Description)
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'flex-1 min-w-0';

    const nameEl = document.createElement('div');
    nameEl.className = 'font-bold text-[#3E2723] text-lg leading-tight truncate';
    nameEl.textContent = upgrade.name;

    const costContainer = document.createElement('div');
    costContainer.className = 'text-sm flex items-center gap-1.5 mt-0.5 font-bold';
    
    const cookieIcon = document.createElement('span');
    cookieIcon.textContent = '🍪';
    cookieIcon.className = 'text-xs';
    
    const costEl = document.createElement('span');
    costEl.className = 'text-[#FF9800] tracking-tight';
    costEl.textContent = '0'; // Will be updated immediately by subscription

    costContainer.appendChild(cookieIcon);
    costContainer.appendChild(costEl);

    const descEl = document.createElement('div');
    descEl.className = 'text-xs text-[#8D6E63] mt-1 leading-snug opacity-80 line-clamp-2';
    descEl.textContent = upgrade.description;

    detailsContainer.appendChild(nameEl);
    detailsContainer.appendChild(costContainer);
    detailsContainer.appendChild(descEl);

    // Owned Count
    const countEl = document.createElement('div');
    countEl.className = 'text-3xl font-extrabold text-[#3E2723]/10 ml-3 w-12 text-right tracking-tighter';
    countEl.textContent = '0'; // Will be updated immediately by subscription

    // Assemble the button
    btn.appendChild(iconContainer);
    btn.appendChild(detailsContainer);
    btn.appendChild(countEl);

    // Save references for fast updates
    upgradeRefs[upgrade.id] = { btn, costEl, countEl };

    listContainer.appendChild(btn);
  });

  wrapper.appendChild(listContainer);
  container.appendChild(wrapper);

  // ==========================================
  // STATE SUBSCRIPTION
  // ==========================================
  
  // Subscribe to engine state changes to update costs, counts, and affordability
  subscribe((state) => {
    AVAILABLE_UPGRADES.forEach((upgrade) => {
      const refs = upgradeRefs[upgrade.id];
      if (!refs) return;

      const currentLevel = state.upgrades[upgrade.id] || 0;
      const cost = calculateUpgradeCost(upgrade.baseCost, upgrade.costMultiplier, currentLevel);
      const isAffordable = state.cookies >= cost;

      // Update text content
      if (refs.countEl.textContent !== currentLevel.toString()) {
        refs.countEl.textContent = currentLevel.toString();
        // Highlight count if > 0
        if (currentLevel > 0) {
          refs.countEl.classList.remove('text-[#3E2723]/10');
          refs.countEl.classList.add('text-[#3E2723]/40');
        }
      }
      
      const formattedCost = formatNumber(cost);
      if (refs.costEl.textContent !== formattedCost) {
        refs.costEl.textContent = formattedCost;
      }

      // Update visual state based on affordability
      if (isAffordable) {
        if (refs.btn.disabled) {
          refs.btn.disabled = false;
          refs.btn.classList.remove('opacity-50', 'grayscale', 'cursor-not-allowed', 'bg-[#E0E0E0]');
          refs.btn.classList.add('hover:bg-[#F5F5F5]', 'hover:border-[#FFC107]', 'cursor-pointer', 'active:scale-[0.98]');
          refs.costEl.classList.replace('text-[#8D6E63]', 'text-[#FF9800]');
        }
      } else {
        if (!refs.btn.disabled) {
          refs.btn.disabled = true;
          refs.btn.classList.add('opacity-50', 'grayscale', 'cursor-not-allowed', 'bg-[#E0E0E0]');
          refs.btn.classList.remove('hover:bg-[#F5F5F5]', 'hover:border-[#FFC107]', 'cursor-pointer', 'active:scale-[0.98]');
          refs.costEl.classList.replace('text-[#FF9800]', 'text-[#8D6E63]');
        }
      }
    });
  });
}
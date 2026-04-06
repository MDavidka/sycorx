import { GameState, UpgradeItem } from '../types';
import { createElement, formatNumber } from '../utils';

/**
 * The master list of all available upgrades in the game.
 * Exported so the main game loop can use it to calculate total CPS.
 */
export const UPGRADES: UpgradeItem[] = [
    {
        id: 'cursor',
        name: 'Cursor',
        description: 'Autoclicks once every 10 seconds.',
        baseCost: 15,
        costMultiplier: 1.15,
        baseCps: 0.1,
        iconUrl: 'https://placehold.co/64x64.png?text=%F0%9F%91%86&bg=fdf5e6&text_color=3e2723'
    },
    {
        id: 'grandma',
        name: 'Grandma',
        description: 'A nice grandma to bake more cookies.',
        baseCost: 100,
        costMultiplier: 1.15,
        baseCps: 1,
        iconUrl: 'https://placehold.co/64x64.png?text=%F0%9F%91%B5&bg=fdf5e6&text_color=3e2723'
    },
    {
        id: 'farm',
        name: 'Cookie Farm',
        description: 'Grows cookie plants from cookie seeds.',
        baseCost: 1100,
        costMultiplier: 1.15,
        baseCps: 8,
        iconUrl: 'https://placehold.co/64x64.png?text=%F0%9F%8C%BE&bg=fdf5e6&text_color=3e2723'
    },
    {
        id: 'mine',
        name: 'Mine',
        description: 'Mines out cookie dough and chocolate chips.',
        baseCost: 12000,
        costMultiplier: 1.15,
        baseCps: 47,
        iconUrl: 'https://placehold.co/64x64.png?text=%E2%9B%8F%EF%B8%8F&bg=fdf5e6&text_color=3e2723'
    },
    {
        id: 'factory',
        name: 'Factory',
        description: 'Produces large quantities of cookies.',
        baseCost: 130000,
        costMultiplier: 1.15,
        baseCps: 260,
        iconUrl: 'https://placehold.co/64x64.png?text=%F0%9F%8F%AD&bg=fdf5e6&text_color=3e2723'
    },
    {
        id: 'bank',
        name: 'Bank',
        description: 'Generates cookies from interest.',
        baseCost: 1400000,
        costMultiplier: 1.15,
        baseCps: 1400,
        iconUrl: 'https://placehold.co/64x64.png?text=%F0%9F%8F%A6&bg=fdf5e6&text_color=3e2723'
    }
];

/**
 * Calculates the current cost of an upgrade based on how many are already owned.
 * Formula: BaseCost * (Multiplier ^ Owned)
 * 
 * @param baseCost The initial cost of the upgrade
 * @param multiplier The cost multiplier (usually 1.15)
 * @param owned The number of this upgrade currently owned
 * @returns The calculated cost, rounded up to the nearest integer
 */
export function calculateCost(baseCost: number, multiplier: number, owned: number): number {
    return Math.ceil(baseCost * Math.pow(multiplier, owned));
}

/**
 * Interface for the returned Shop component instance.
 */
export interface ShopComponent {
    /** Updates the shop UI with the latest game state */
    updateState: (state: GameState) => void;
}

/**
 * Initializes and renders the upgrade shop.
 * 
 * @param container The DOM element to append the shop to
 * @param onPurchase Callback function triggered when an upgrade is successfully purchased
 * @returns A ShopComponent instance with update methods
 */
export function initShop(
    container: HTMLElement,
    onPurchase: (upgradeId: string) => void
): ShopComponent {
    // Keep a local reference to the latest state to validate clicks
    let currentState: GameState | null = null;

    // Main wrapper for the shop
    const wrapper = createElement('div', {
        className: 'flex flex-col h-full bg-white bg-opacity-40 backdrop-blur-md border-l border-[var(--color-primary)] border-opacity-10 shadow-inner overflow-hidden'
    });

    // Shop Header
    const header = createElement('div', {
        className: 'p-4 bg-[var(--color-primary)] text-[var(--color-bg)] shadow-md z-10 flex justify-between items-center shrink-0'
    });
    
    header.appendChild(createElement('h2', {
        className: 'text-xl font-bold tracking-wide',
        text: 'Store'
    }));

    // Scrollable list container
    const listContainer = createElement('div', {
        className: 'flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 custom-scrollbar'
    });

    // Store references to DOM elements that need frequent updates
    const itemElements: Record<string, {
        button: HTMLButtonElement;
        costText: HTMLElement;
        ownedText: HTMLElement;
    }> = {};

    // Build the UI for each upgrade
    UPGRADES.forEach(upgrade => {
        const btn = createElement('button', {
            className: 'w-full flex items-center p-2 sm:p-3 rounded-lg border-2 border-transparent bg-white bg-opacity-60 shadow-sm transition-all duration-200 text-left group relative overflow-hidden'
        });

        // Icon
        const icon = createElement('img', {
            className: 'w-12 h-12 sm:w-14 sm:h-14 rounded shadow-sm mr-3 sm:mr-4 bg-[var(--color-bg)] object-cover shrink-0',
            attributes: {
                src: upgrade.iconUrl,
                alt: upgrade.name,
                draggable: 'false'
            }
        });

        // Info Container (Name, Cost, CPS)
        const infoContainer = createElement('div', {
            className: 'flex-1 min-w-0'
        });

        const nameEl = createElement('div', {
            className: 'font-bold text-[var(--color-text)] text-base sm:text-lg truncate',
            text: upgrade.name
        });

        const costContainer = createElement('div', {
            className: 'flex items-center text-sm sm:text-base font-medium mt-0.5'
        });
        
        const cookieIcon = createElement('span', {
            className: 'mr-1 text-[var(--color-primary)]',
            text: '🍪'
        });

        const costText = createElement('span', {
            className: 'text-[var(--color-primary)] transition-colors duration-200',
            text: formatNumber(upgrade.baseCost)
        });

        costContainer.appendChild(cookieIcon);
        costContainer.appendChild(costText);

        const cpsEl = createElement('div', {
            className: 'text-xs text-[var(--color-text)] opacity-60 mt-0.5 truncate',
            text: `+${formatNumber(upgrade.baseCps)} CPS`
        });

        infoContainer.appendChild(nameEl);
        infoContainer.appendChild(costContainer);
        infoContainer.appendChild(cpsEl);

        // Owned Count
        const ownedText = createElement('div', {
            className: 'text-2xl sm:text-3xl font-black text-[var(--color-text)] opacity-20 ml-2 w-12 text-right shrink-0 transition-opacity duration-200',
            text: '0'
        });

        // Assemble Button
        btn.appendChild(icon);
        btn.appendChild(infoContainer);
        btn.appendChild(ownedText);

        // Click Handler
        btn.addEventListener('click', () => {
            if (!currentState) return;
            
            const owned = currentState.inventory[upgrade.id] || 0;
            const currentCost = calculateCost(upgrade.baseCost, upgrade.costMultiplier, owned);
            
            // Only trigger purchase if the player can afford it
            if (currentState.cookies >= currentCost) {
                // Add a quick click effect
                btn.style.transform = 'scale(0.97)';
                setTimeout(() => { btn.style.transform = ''; }, 100);
                
                onPurchase(upgrade.id);
            }
        });

        // Save references for fast updates
        itemElements[upgrade.id] = {
            button: btn,
            costText: costText,
            ownedText: ownedText
        };

        listContainer.appendChild(btn);
    });

    wrapper.appendChild(header);
    wrapper.appendChild(listContainer);
    container.appendChild(wrapper);

    // --- Update Methods ---

    /**
     * Updates the shop UI based on the current game state.
     * Recalculates costs, updates owned counts, and toggles affordable states.
     */
    const updateState = (state: GameState) => {
        currentState = state;

        UPGRADES.forEach(upgrade => {
            const elements = itemElements[upgrade.id];
            if (!elements) return;

            const owned = state.inventory[upgrade.id] || 0;
            const currentCost = calculateCost(upgrade.baseCost, upgrade.costMultiplier, owned);
            const canAfford = state.cookies >= currentCost;

            // Update text values
            const formattedCost = formatNumber(currentCost);
            if (elements.costText.textContent !== formattedCost) {
                elements.costText.textContent = formattedCost;
            }

            const ownedStr = owned.toString();
            if (elements.ownedText.textContent !== ownedStr) {
                elements.ownedText.textContent = ownedStr;
                // Make the owned number more visible if they own at least one
                elements.ownedText.className = `text-2xl sm:text-3xl font-black ml-2 w-12 text-right shrink-0 transition-opacity duration-200 ${owned > 0 ? 'text-[var(--color-primary)] opacity-80' : 'text-[var(--color-text)] opacity-20'}`;
            }

            // Update visual state based on affordability
            if (canAfford) {
                elements.button.className = 'w-full flex items-center p-2 sm:p-3 rounded-lg border-2 border-[var(--color-primary)] border-opacity-20 bg-white shadow-sm transition-all duration-200 text-left group relative overflow-hidden cursor-pointer hover:bg-[var(--color-secondary)] hover:bg-opacity-20 hover:border-opacity-50 hover:shadow-md transform hover:-translate-y-0.5';
                elements.costText.classList.remove('text-red-500');
                elements.costText.classList.add('text-[var(--color-primary)]');
            } else {
                elements.button.className = 'w-full flex items-center p-2 sm:p-3 rounded-lg border-2 border-transparent bg-white bg-opacity-40 shadow-sm transition-all duration-200 text-left group relative overflow-hidden cursor-not-allowed opacity-60 grayscale-[0.5]';
                elements.costText.classList.remove('text-[var(--color-primary)]');
                elements.costText.classList.add('text-red-500');
            }
        });
    };

    return {
        updateState
    };
}
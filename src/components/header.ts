import { GameState, ViewState } from '../types';
import { createElement } from '../utils';

/**
 * Interface for the returned Header component instance,
 * allowing the main game loop to update its UI when state changes.
 */
export interface HeaderComponent {
    /** Updates the header UI with the latest game state (e.g., player name) */
    updateState: (state: GameState) => void;
    /** Updates the active state of the navigation buttons */
    updateView: (view: ViewState) => void;
}

/**
 * Initializes and renders the top navigation header.
 * 
 * @param container The DOM element to append the header to
 * @param onViewChange Callback function triggered when a navigation button is clicked
 * @returns A HeaderComponent instance with update methods
 */
export function initHeader(container: HTMLElement, onViewChange: (view: ViewState) => void): HeaderComponent {
    // Main header container
    const headerEl = createElement('header', {
        className: 'flex items-center justify-between p-3 sm:p-4 bg-[var(--color-primary)] text-[var(--color-bg)] shadow-md select-none z-10 relative'
    });

    // Logo / Title Area
    const titleEl = createElement('div', {
        className: 'text-xl sm:text-2xl font-bold text-[var(--color-secondary)] tracking-wide flex items-center gap-2 cursor-pointer',
        html: '<span class="text-2xl sm:text-3xl drop-shadow-md">🍪</span><span class="hidden sm:inline">Cookie Clicker</span>'
    });
    // Clicking the logo returns to the game view
    titleEl.addEventListener('click', () => onViewChange('game'));

    // Navigation Menu
    const navEl = createElement('nav', {
        className: 'flex gap-1 sm:gap-2'
    });

    const views: { id: ViewState; label: string; icon: string }[] = [
        { id: 'game', label: 'Bakery', icon: '🏪' },
        { id: 'leaderboard', label: 'Top Bakers', icon: '🏆' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    const navButtons: Record<string, HTMLButtonElement> = {};

    views.forEach(view => {
        const btn = createElement('button', {
            className: 'px-2 sm:px-4 py-1.5 rounded font-medium transition-all duration-200 text-sm sm:text-base flex items-center gap-1.5',
            html: `<span>${view.icon}</span><span class="hidden md:inline">${view.label}</span>`
        });
        
        btn.addEventListener('click', () => onViewChange(view.id));
        navButtons[view.id] = btn;
        navEl.appendChild(btn);
    });

    // Player Info Area
    const playerInfoEl = createElement('div', {
        className: 'flex items-center gap-2 bg-black bg-opacity-20 px-3 py-1.5 rounded border border-black border-opacity-10'
    });
    
    const playerNameEl = createElement('span', {
        className: 'font-medium text-sm max-w-[100px] sm:max-w-[150px] truncate',
        text: 'Loading...'
    });

    playerInfoEl.appendChild(createElement('span', { text: '👤', className: 'text-xs opacity-80' }));
    playerInfoEl.appendChild(playerNameEl);

    // Assemble the header
    headerEl.appendChild(titleEl);
    headerEl.appendChild(navEl);
    headerEl.appendChild(playerInfoEl);

    container.appendChild(headerEl);

    // --- Update Methods ---

    /**
     * Updates the visual state of the navigation buttons based on the current view.
     */
    const updateView = (currentView: ViewState) => {
        Object.entries(navButtons).forEach(([id, btn]) => {
            if (id === currentView) {
                // Active state
                btn.className = 'px-2 sm:px-4 py-1.5 rounded font-bold transition-all duration-200 text-sm sm:text-base flex items-center gap-1.5 bg-[var(--color-secondary)] text-[var(--color-primary)] shadow-sm transform scale-105';
            } else {
                // Inactive state
                btn.className = 'px-2 sm:px-4 py-1.5 rounded font-medium transition-all duration-200 text-sm sm:text-base flex items-center gap-1.5 hover:bg-white hover:bg-opacity-10 text-[var(--color-bg)] opacity-80 hover:opacity-100';
            }
        });
    };

    /**
     * Updates the header with the latest game state data.
     */
    const updateState = (state: GameState) => {
        if (playerNameEl.textContent !== state.playerName) {
            playerNameEl.textContent = state.playerName;
            playerNameEl.title = state.playerName; // Add tooltip for truncated names
        }
    };

    return {
        updateState,
        updateView
    };
}
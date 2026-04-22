import { GameState } from './types';

const SAVE_KEY = 'cookie_clicker_save_v1';

/**
 * Formats a large number into a human-readable string (e.g., 1.2M, 4.5B).
 * @param num The number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
    if (num < 1000) return Math.floor(num).toString();
    
    const units = ['k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    const order = Math.floor(Math.log10(num) / 3);
    
    // Cap the order to the maximum unit we have defined
    const safeOrder = Math.min(order, units.length);
    const unitName = units[safeOrder - 1];
    
    const numInUnit = num / Math.pow(10, safeOrder * 3);
    
    // Keep one decimal place, but remove it if it's .0
    return numInUnit.toFixed(1).replace(/\.0$/, '') + unitName;
}

/**
 * Saves the current game state to local storage.
 * @param state The current GameState
 */
export function saveGame(state: GameState): void {
    try {
        const stateToSave: GameState = { 
            ...state, 
            lastSaveTime: Date.now() 
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
        console.error("Failed to save game to local storage:", e);
    }
}

/**
 * Loads the game state from local storage.
 * @returns The saved GameState, or null if none exists or an error occurs
 */
export function loadGame(): GameState | null {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (!saved) return null;
        return JSON.parse(saved) as GameState;
    } catch (e) {
        console.error("Failed to load game from local storage:", e);
        return null;
    }
}

/**
 * Clears the saved game state from local storage.
 */
export function clearSave(): void {
    try {
        localStorage.removeItem(SAVE_KEY);
    } catch (e) {
        console.error("Failed to clear save from local storage:", e);
    }
}

/**
 * Helper options for creating DOM elements.
 */
interface CreateElementOptions {
    className?: string;
    id?: string;
    text?: string;
    html?: string;
    attributes?: Record<string, string>;
}

/**
 * Safely creates a DOM element with the specified options.
 * @param tagName The HTML tag name (e.g., 'div', 'span')
 * @param options Configuration options for the element
 * @returns The created HTML element
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: CreateElementOptions
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tagName);
    
    if (options?.className) el.className = options.className;
    if (options?.id) el.id = options.id;
    if (options?.text) el.textContent = options.text;
    if (options?.html) el.innerHTML = options.html;
    
    if (options?.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            el.setAttribute(key, value);
        }
    }
    
    return el;
}

/**
 * Creates a floating text animation at the specified coordinates.
 * Used for showing "+1" when clicking the cookie.
 * @param x The X coordinate (usually from MouseEvent.clientX)
 * @param y The Y coordinate (usually from MouseEvent.clientY)
 * @param text The text to display
 * @param container The DOM element to append the floating text to
 */
export function createFloatingText(x: number, y: number, text: string, container: HTMLElement): void {
    const el = document.createElement('div');
    el.textContent = text;
    
    // Uses Tailwind classes and the custom 'animate-float-up' defined in style.css
    el.className = 'fixed pointer-events-none text-2xl font-bold text-white drop-shadow-md animate-float-up z-50 select-none';
    
    // Add a slight random offset so multiple rapid clicks don't stack perfectly
    const offsetX = (Math.random() - 0.5) * 40;
    
    el.style.left = `${x + offsetX}px`;
    el.style.top = `${y}px`;
    
    container.appendChild(el);
    
    // Remove the element from the DOM after the animation completes (1 second)
    setTimeout(() => {
        if (container.contains(el)) {
            container.removeChild(el);
        }
    }, 1000);
}

/**
 * Generates a random guest name for new players.
 * @returns A string like "Guest_1234"
 */
export function generateGuestName(): string {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `Guest_${randomNum}`;
}
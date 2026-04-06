import { GameState } from './types';

/**
 * Formats large numbers into human-readable strings (e.g., 1.2M, 3.4B)
 */
export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString();
  
  const suffixes = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx'];
  const suffixNum = Math.floor(('' + Math.floor(num)).length / 3);
  
  let shortValue = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
  
  if (shortValue % 1 !== 0) {
    shortValue = parseFloat(shortValue.toFixed(1));
  }
  
  return shortValue + (suffixes[suffixNum] || '');
}

/**
 * LocalStorage wrapper for game state persistence
 */
export const Storage = {
  save(state: GameState): void {
    try {
      localStorage.setItem('cookie_clicker_save', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  },

  load(): GameState | null {
    try {
      const saved = localStorage.getItem('cookie_clicker_save');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to load game state:', e);
      return null;
    }
  },

  clear(): void {
    localStorage.removeItem('cookie_clicker_save');
  }
};

/**
 * Utility to create a floating text element for click feedback
 */
export function createFloatingText(x: number, y: number, text: string): void {
  const el = document.createElement('div');
  el.className = 'floating-text';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.textContent = text;
  document.body.appendChild(el);
  
  el.addEventListener('animationend', () => {
    el.remove();
  });
}
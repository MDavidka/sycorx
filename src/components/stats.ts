import { GameState } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the statistics panel showing current cookies and CPS.
 * This component updates the DOM elements directly based on the provided state.
 */
export function renderStats(container: HTMLElement, state: GameState): void {
  // Check if the container already has the stats structure, if not, create it
  if (!container.querySelector('#stats-container')) {
    container.innerHTML = `
      <div id="stats-container" class="game-card flex flex-col gap-4 items-center text-center">
        <div class="space-y-1">
          <h2 class="text-sm uppercase tracking-widest text-amber-800 font-bold">Cookies</h2>
          <div id="cookie-count" class="text-5xl font-black text-[var(--color-primary)]">0</div>
        </div>
        <div class="w-full border-t border-amber-100 pt-4">
          <p class="text-sm text-amber-700">
            per second: <span id="cps-count" class="font-bold text-[var(--color-text)]">0</span>
          </p>
        </div>
      </div>
    `;
  }

  // Update the values
  const cookieEl = container.querySelector('#cookie-count') as HTMLElement;
  const cpsEl = container.querySelector('#cps-count') as HTMLElement;

  if (cookieEl) {
    cookieEl.textContent = formatNumber(Math.floor(state.cookies));
  }
  
  if (cpsEl) {
    cpsEl.textContent = formatNumber(state.cookiesPerSecond);
  }
}
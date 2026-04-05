import { GameState } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the scoreboard component displaying current cookies and production rate.
 * 
 * @param container The HTMLElement to mount the scoreboard into.
 * @param gameState The current game state object.
 */
export function renderScoreboard(
  container: HTMLElement,
  gameState: GameState
): void {
  // We use a template that updates dynamically. 
  // In a real app, we might use a reactive framework, but here we re-render or update specific nodes.
  container.innerHTML = `
    <div class="card flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto">
      <div class="text-center">
        <h3 class="text-sm uppercase tracking-widest opacity-70 mb-1">Total Cookies</h3>
        <div id="cookie-count" class="text-5xl font-black text-[var(--color-accent)] tabular-nums">
          ${formatNumber(gameState.cookies)}
        </div>
      </div>
      
      <div class="flex items-center gap-6 pt-4 border-t border-white/10 w-full justify-center">
        <div class="text-center">
          <p class="text-xs opacity-60">Per Second</p>
          <p id="cps-count" class="text-xl font-bold text-[var(--color-secondary)]">
            ${formatNumber(gameState.cookiesPerSecond)}
          </p>
        </div>
        <div class="text-center">
          <p class="text-xs opacity-60">Per Click</p>
          <p id="cpc-count" class="text-xl font-bold text-[var(--color-secondary)]">
            ${formatNumber(gameState.cookiesPerClick)}
          </p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Updates the scoreboard values without re-rendering the entire component.
 * 
 * @param gameState The current game state object.
 */
export function updateScoreboard(gameState: GameState): void {
  const cookieEl = document.getElementById('cookie-count');
  const cpsEl = document.getElementById('cps-count');
  const cpcEl = document.getElementById('cpc-count');

  if (cookieEl) cookieEl.textContent = formatNumber(gameState.cookies);
  if (cpsEl) cpsEl.textContent = formatNumber(gameState.cookiesPerSecond);
  if (cpcEl) cpcEl.textContent = formatNumber(gameState.cookiesPerClick);
}
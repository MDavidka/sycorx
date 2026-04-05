import { GameState } from '../types';

/**
 * Renders the interactive cookie component and handles click logic.
 * 
 * @param container The HTMLElement to mount the cookie into.
 * @param gameState The current game state object.
 * @param onCookieClick Callback function triggered when the cookie is clicked.
 */
export function renderCookie(
  container: HTMLElement,
  gameState: GameState,
  onCookieClick: () => void
): void {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center gap-8 p-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-[var(--color-accent)]">Bake Cookies</h2>
        <p class="text-sm opacity-70">Click the cookie to start baking!</p>
      </div>
      
      <button 
        id="cookie-btn"
        class="cookie-click relative w-64 h-64 rounded-full bg-[var(--color-primary)] border-8 border-[var(--color-secondary)] shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform active:scale-95"
        aria-label="Click to bake a cookie"
      >
        <div class="absolute inset-4 rounded-full border-4 border-white/20"></div>
        <span class="text-8xl">🍪</span>
      </button>
    </div>
  `;

  const cookieBtn = container.querySelector('#cookie-btn') as HTMLButtonElement;

  cookieBtn.addEventListener('click', (e) => {
    // Trigger the game logic callback
    onCookieClick();
    
    // Create floating text animation
    createFloatingText(e.clientX, e.clientY, `+${Math.floor(gameState.cookiesPerClick)}`);
  });
}

/**
 * Creates a floating text element at the click position.
 */
function createFloatingText(x: number, y: number, text: string): void {
  const floatEl = document.createElement('div');
  floatEl.textContent = text;
  floatEl.className = 'fixed text-2xl font-bold text-[var(--color-accent)] pointer-events-none float-up z-50';
  floatEl.style.left = `${x}px`;
  floatEl.style.top = `${y}px`;
  
  document.body.appendChild(floatEl);
  
  // Remove element after animation completes
  setTimeout(() => {
    floatEl.remove();
  }, 1000);
}
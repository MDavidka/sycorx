import { GameState } from '../types';
import { formatNumber } from '../utils';

/**
 * Spawns a floating number particle at the specified coordinates.
 * The animation is handled by the .floating-number CSS class.
 * 
 * @param x The clientX coordinate of the click
 * @param y The clientY coordinate of the click
 * @param amount The amount of cookies gained
 */
function spawnFloatingNumber(x: number, y: number, amount: number): void {
  const particle = document.createElement('div');
  particle.className = 'floating-number no-select';
  particle.textContent = `+${formatNumber(amount)}`;
  
  // Add slight random jitter to the X coordinate so numbers don't perfectly overlap
  const jitterX = (Math.random() - 0.5) * 40;
  
  // Position the particle exactly where the user clicked (adjusted for jitter)
  particle.style.left = `${x + jitterX}px`;
  particle.style.top = `${y - 20}px`; // Start slightly above the cursor
  
  document.body.appendChild(particle);

  // Remove the element from the DOM after the animation completes (1s)
  setTimeout(() => {
    if (document.body.contains(particle)) {
      particle.remove();
    }
  }, 1000);
}

/**
 * Renders the main interactive cookie area, including the score display
 * and the clickable cookie image.
 * 
 * @param container The DOM element to mount the cookie section into.
 * @param gameState The current state of the game.
 * @param onClick Callback fired when the cookie is clicked, passing the amount gained.
 */
export function renderCookie(
  container: HTMLElement,
  gameState: GameState,
  onClick: (amount: number) => void
): void {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full w-full p-4 sm:p-8 select-none">
      
      <!-- Score Display -->
      <div class="text-center mb-8 panel w-full max-w-md relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <h2 class="text-lg sm:text-xl text-gray-400 font-medium mb-1 uppercase tracking-widest">Bakery Inventory</h2>
        <div class="text-4xl sm:text-6xl font-black text-[var(--color-accent)] drop-shadow-lg font-mono tracking-tight" id="cookie-count-display">
          ${formatNumber(gameState.cookies)}
        </div>
        <div class="text-sm sm:text-base text-gray-300 mt-2 font-medium bg-black/30 inline-block px-4 py-1 rounded-full border border-white/10">
          <span id="cps-display" class="text-white font-bold">${formatNumber(gameState.cookiesPerSecond)}</span> cookies per second
        </div>
      </div>

      <!-- Interactive Cookie -->
      <div class="relative flex items-center justify-center w-full max-w-[300px] sm:max-w-[400px] aspect-square mt-4 sm:mt-8">
        <!-- Glowing background effect -->
        <div class="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"></div>
        
        <img 
          id="main-cookie-btn"
          src="https://placehold.co/400x400/78350f/f59e0b.png?text=COOKIE" 
          alt="Giant Clickable Cookie" 
          class="cookie-btn w-full h-full object-contain rounded-full shadow-[0_0_50px_rgba(217,119,6,0.3)] border-4 border-[var(--color-secondary)]/30"
          draggable="false"
          role="button"
          tabindex="0"
          aria-label="Click to bake cookies"
        />
      </div>

    </div>
  `;

  const cookieBtn = container.querySelector<HTMLImageElement>('#main-cookie-btn');

  if (cookieBtn) {
    // Use pointerdown for better responsiveness on both mobile and desktop
    cookieBtn.addEventListener('pointerdown', (e: PointerEvent) => {
      // Prevent default behavior (like dragging the image or double-tap zooming)
      e.preventDefault();
      
      // Trigger the state update
      onClick(gameState.cookiesPerClick);
      
      // Spawn the visual particle effect
      spawnFloatingNumber(e.clientX, e.clientY, gameState.cookiesPerClick);
    });

    // Handle keyboard interaction (Space or Enter)
    cookieBtn.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(gameState.cookiesPerClick);
        
        // For keyboard events, spawn the particle in the center of the cookie
        const rect = cookieBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        spawnFloatingNumber(centerX, centerY, gameState.cookiesPerClick);
      }
    });
  }
}

/**
 * Fast DOM update function to refresh the score and CPS displays
 * without re-rendering the entire component (which would interrupt animations).
 * 
 * @param gameState The current state of the game.
 */
export function updateCookieDisplay(gameState: GameState): void {
  const countDisplay = document.getElementById('cookie-count-display');
  const cpsDisplay = document.getElementById('cps-display');

  if (countDisplay) {
    countDisplay.textContent = formatNumber(gameState.cookies);
  }
  
  if (cpsDisplay) {
    cpsDisplay.textContent = formatNumber(gameState.cookiesPerSecond);
  }
}
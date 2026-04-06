import { getState, clickCookie, subscribe } from '../engine';
import { formatNumber, spawnFloatingText } from '../utils';

/**
 * Renders the main interactive cookie area, including the score display
 * and the giant clickable cookie.
 * 
 * @param container The DOM element to append the cookie area to.
 */
export function renderCookieArea(container: HTMLElement): void {
  // Main wrapper for the cookie area
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col items-center justify-center w-full h-full p-6 relative select-none';

  // ==========================================
  // SCORE DISPLAY
  // ==========================================
  const scoreContainer = document.createElement('div');
  scoreContainer.className = 'text-center mb-8 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-sm border border-white/60';

  const cookieCountEl = document.createElement('div');
  cookieCountEl.className = 'text-5xl md:text-6xl font-extrabold text-[#3E2723] drop-shadow-sm tracking-tight transition-all duration-100';
  cookieCountEl.textContent = '0 cookies';

  const cpsEl = document.createElement('div');
  cpsEl.className = 'text-lg md:text-xl text-[#8D6E63] font-bold mt-1';
  cpsEl.textContent = 'per second: 0';

  scoreContainer.appendChild(cookieCountEl);
  scoreContainer.appendChild(cpsEl);

  // ==========================================
  // GIANT COOKIE
  // ==========================================
  const cookieBtn = document.createElement('button');
  // Remove default button styles and add touch manipulation to prevent zooming
  cookieBtn.className = 'relative outline-none touch-manipulation tap-highlight-transparent group';
  cookieBtn.setAttribute('aria-label', 'Click to bake a cookie');

  const cookieImg = document.createElement('img');
  // Using a placeholder image styled to look like a cookie
  cookieImg.src = 'https://placehold.co/400x400/5D4037/FFC107.png?text=COOKIE';
  cookieImg.alt = 'Giant Cookie';
  cookieImg.draggable = false;
  // Apply custom animation classes defined in style.css
  cookieImg.className = 'w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-[12px] border-[#3E2723] shadow-[0_20px_50px_rgba(93,64,55,0.5)] animate-breathe cookie-idle group-hover:brightness-110 transition-all';

  cookieBtn.appendChild(cookieImg);

  // ==========================================
  // INTERACTIONS
  // ==========================================
  
  // Handle the press down (visual feedback + logic + particles)
  cookieBtn.addEventListener('pointerdown', (e: PointerEvent) => {
    // Prevent default to stop potential double-firing on some touch devices
    if (e.cancelable) {
      e.preventDefault();
    }

    // Visual active state
    cookieImg.classList.remove('cookie-idle');
    cookieImg.classList.add('cookie-active');

    // Game logic
    const state = getState();
    clickCookie();

    // Spawn floating text at the pointer's coordinates
    spawnFloatingText(e.clientX, e.clientY, state.clickPower);
  });

  // Handle the release/cancel (reset visual state)
  const resetCookieState = () => {
    cookieImg.classList.remove('cookie-active');
    cookieImg.classList.add('cookie-idle');
  };

  cookieBtn.addEventListener('pointerup', resetCookieState);
  cookieBtn.addEventListener('pointerleave', resetCookieState);
  cookieBtn.addEventListener('pointercancel', resetCookieState);

  // ==========================================
  // STATE SUBSCRIPTION
  // ==========================================
  
  // Subscribe to engine state changes to update the UI
  subscribe((state) => {
    const flooredCookies = Math.floor(state.cookies);
    const suffix = flooredCookies === 1 ? 'cookie' : 'cookies';
    
    // Update text content
    cookieCountEl.textContent = `${formatNumber(flooredCookies)} ${suffix}`;
    cpsEl.textContent = `per second: ${formatNumber(state.cps)}`;
  });

  // ==========================================
  // ASSEMBLE & APPEND
  // ==========================================
  wrapper.appendChild(scoreContainer);
  wrapper.appendChild(cookieBtn);

  container.appendChild(wrapper);
}
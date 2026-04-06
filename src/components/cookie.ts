import { createFloatingText } from '../utils';

/**
 * Renders the main clickable cookie component.
 * Handles the click event, triggers animations, and updates the game state.
 */
export function renderCookie(
  container: HTMLElement, 
  onCookieClick: () => void
): void {
  // Create the cookie container if it doesn't exist
  if (!container.querySelector('#cookie-wrapper')) {
    container.innerHTML = `
      <div id="cookie-wrapper" class="flex flex-col items-center justify-center p-8">
        <button 
          id="main-cookie" 
          class="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-amber-700 shadow-2xl 
                 border-8 border-amber-900 cursor-pointer transition-transform duration-75 
                 active:scale-95 hover:scale-[1.02] flex items-center justify-center overflow-hidden"
          aria-label="Click the cookie"
        >
          <!-- Cookie Texture/Design -->
          <div class="absolute inset-0 bg-[url('https://placehold.co/400x400/D7CCC8/3E2723.png?text=COOKIE')] bg-cover opacity-90"></div>
          <div class="absolute top-10 left-10 w-8 h-8 bg-amber-950 rounded-full opacity-40"></div>
          <div class="absolute bottom-16 right-12 w-12 h-12 bg-amber-950 rounded-full opacity-40"></div>
          <div class="absolute top-20 right-20 w-6 h-6 bg-amber-950 rounded-full opacity-40"></div>
        </button>
        <p class="mt-6 text-amber-900 font-medium italic">Click the cookie to bake!</p>
      </div>
    `;
  }

  const cookieBtn = container.querySelector('#main-cookie') as HTMLButtonElement;

  if (cookieBtn) {
    // Remove existing listeners to prevent duplication
    const newBtn = cookieBtn.cloneNode(true) as HTMLButtonElement;
    cookieBtn.parentNode?.replaceChild(newBtn, cookieBtn);

    newBtn.addEventListener('click', (e: MouseEvent) => {
      // Trigger the game logic callback
      onCookieClick();

      // Trigger floating text effect at click position
      createFloatingText(e.clientX, e.clientY, '+1');
    });
  }
}
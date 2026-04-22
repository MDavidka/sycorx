import { GameState } from '../types';
import { createElement, createFloatingText, formatNumber } from '../utils';

/**
 * Interface for the returned CookieArea component instance.
 */
export interface CookieAreaComponent {
    /** Updates the cookie count and CPS display with the latest game state */
    updateState: (state: GameState) => void;
}

/**
 * Initializes and renders the main interactive cookie area.
 * 
 * @param container The DOM element to append the cookie area to
 * @param onCookieClick Callback function triggered when the cookie is clicked
 * @returns A CookieAreaComponent instance with update methods
 */
export function initCookieArea(
    container: HTMLElement,
    onCookieClick: () => void
): CookieAreaComponent {
    // Main wrapper for the cookie area
    const wrapper = createElement('div', {
        className: 'flex flex-col items-center justify-center h-full w-full p-4 relative select-none bg-[var(--color-bg)]'
    });

    // --- Score Display ---
    const scoreContainer = createElement('div', {
        className: 'text-center mb-8 md:mb-12 flex flex-col items-center z-10'
    });

    // A subtle background pill for the score to make it pop
    const scorePill = createElement('div', {
        className: 'bg-white bg-opacity-50 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-sm border border-[var(--color-primary)] border-opacity-10'
    });

    const cookieCountEl = createElement('div', {
        className: 'text-5xl md:text-6xl font-bold text-[var(--color-primary)] drop-shadow-sm mb-1 tracking-tight',
        text: '0 cookies'
    });

    const cpsEl = createElement('div', {
        className: 'text-lg md:text-xl font-medium text-[var(--color-text)] opacity-80',
        text: 'per second: 0'
    });

    scorePill.appendChild(cookieCountEl);
    scorePill.appendChild(cpsEl);
    scoreContainer.appendChild(scorePill);

    // --- Interactive Cookie ---
    // We use a button for semantic HTML and accessibility, removing default styles
    const cookieBtn = createElement('button', {
        className: 'relative outline-none focus:outline-none group touch-manipulation'
    });

    // A glowing background effect behind the cookie
    const glowEffect = createElement('div', {
        className: 'absolute inset-0 bg-[var(--color-secondary)] opacity-20 rounded-full blur-3xl scale-150 transition-transform duration-1000 group-hover:scale-125 group-hover:opacity-30 pointer-events-none'
    });

    // The giant cookie image
    const cookieImg = createElement('img', {
        className: 'w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl cursor-pointer animate-cookie-idle relative z-10',
        attributes: {
            // Using a placeholder PNG as requested. In a real app, this would be a custom cookie graphic.
            src: 'https://placehold.co/400x400.png?text=COOKIE&bg=5c3a21&text_color=f4d03f',
            alt: 'Giant Interactive Cookie',
            draggable: 'false' // Prevent ghost dragging
        }
    });

    cookieBtn.appendChild(glowEffect);
    cookieBtn.appendChild(cookieImg);

    // --- Event Listeners ---
    
    // Use pointerdown for immediate response on both mouse and touch devices
    cookieBtn.addEventListener('pointerdown', (e: PointerEvent) => {
        // Prevent default to stop text selection or double-tap zoom on mobile
        e.preventDefault();

        // 1. Visual Feedback: Trigger the click animation
        // We temporarily remove the idle animation and apply the click animation
        cookieImg.classList.remove('animate-cookie-idle');
        cookieImg.classList.add('animate-cookie-click');

        // Reset back to idle animation after the click animation completes (100ms)
        setTimeout(() => {
            cookieImg.classList.remove('animate-cookie-click');
            cookieImg.classList.add('animate-cookie-idle');
        }, 100);

        // 2. Visual Feedback: Floating "+1" text
        // We append to document.body so it overlays everything and isn't clipped by overflow
        createFloatingText(e.clientX, e.clientY, '+1', document.body);

        // 3. Game Logic: Notify the main engine
        onCookieClick();
    });

    // Prevent context menu on right click or long press
    cookieBtn.addEventListener('contextmenu', (e) => e.preventDefault());

    // Assemble the component
    wrapper.appendChild(scoreContainer);
    wrapper.appendChild(cookieBtn);
    container.appendChild(wrapper);

    // --- Update Methods ---

    /**
     * Updates the UI with the latest game state.
     * Called by the main game loop.
     */
    const updateState = (state: GameState) => {
        // Floor the cookies for display so we don't show decimals
        const displayCookies = Math.floor(state.cookies);
        const formattedCookies = formatNumber(displayCookies);
        
        // Handle pluralization
        const suffix = displayCookies === 1 ? 'cookie' : 'cookies';
        
        // Only update DOM if the value actually changed to save performance
        const newCountText = `${formattedCookies} ${suffix}`;
        if (cookieCountEl.textContent !== newCountText) {
            cookieCountEl.textContent = newCountText;
        }

        const formattedCps = formatNumber(state.cookiesPerSecond);
        const newCpsText = `per second: ${formattedCps}`;
        if (cpsEl.textContent !== newCpsText) {
            cpsEl.textContent = newCpsText;
        }
    };

    return {
        updateState
    };
}
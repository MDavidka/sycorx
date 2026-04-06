import { ViewState } from '../types';

/**
 * Renders the main application shell.
 * Provides a navigation bar and a main content area for different views.
 */
export function renderLayout(
  container: HTMLElement,
  currentView: ViewState,
  onNavigate: (view: ViewState) => void
): void {
  container.innerHTML = `
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans flex flex-col">
      <header class="bg-[var(--color-surface)] border-b border-amber-200 p-4 shadow-sm">
        <nav class="max-w-4xl mx-auto flex items-center justify-between">
          <h1 class="text-2xl font-black text-[var(--color-primary)] tracking-tight">CookieClicker</h1>
          <div class="flex gap-2">
            <button data-view="game" class="nav-btn ${currentView === 'game' ? 'bg-amber-200' : ''} px-4 py-2 rounded-lg font-bold hover:bg-amber-100 transition">Game</button>
            <button data-view="leaderboard" class="nav-btn ${currentView === 'leaderboard' ? 'bg-amber-200' : ''} px-4 py-2 rounded-lg font-bold hover:bg-amber-100 transition">Rankings</button>
          </div>
        </nav>
      </header>

      <main id="main-content" class="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
        <!-- Content injected here -->
      </main>

      <footer class="text-center p-6 text-amber-800 text-sm opacity-70">
        Built with Vite + Tailwind + MongoDB
      </footer>
    </div>
  `;

  // Attach navigation listeners
  const navButtons = container.querySelectorAll('.nav-btn');
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view') as ViewState;
      if (view) onNavigate(view);
    });
  });
}

/**
 * Returns the main content container where views should be rendered.
 */
export function getContentContainer(container: HTMLElement): HTMLElement {
  return container.querySelector('#main-content') as HTMLElement;
}
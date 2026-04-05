/**
 * Auth Modal Component
 * Captures the player's username and initializes the game session.
 */

export function renderAuthModal(
  container: HTMLElement,
  onComplete: (username: string) => void
): void {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4';
  
  modalOverlay.innerHTML = `
    <div class="card w-full max-w-sm p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-300">
      <h2 class="text-2xl font-black text-[var(--color-accent)] text-center">Welcome, Baker!</h2>
      <p class="text-sm opacity-70 text-center">Enter your name to start your cookie empire and join the global leaderboard.</p>
      
      <input 
        type="text" 
        id="username-input" 
        placeholder="Enter your name..." 
        maxlength="15"
        class="w-full bg-[var(--color-bg)] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
      />
      
      <button 
        id="start-btn" 
        class="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-accent)] text-[var(--color-bg)] font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Start Baking
      </button>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const input = modalOverlay.querySelector('#username-input') as HTMLInputElement;
  const btn = modalOverlay.querySelector('#start-btn') as HTMLButtonElement;

  const handleStart = () => {
    const username = input.value.trim();
    if (username.length >= 2) {
      modalOverlay.remove();
      onComplete(username);
    } else {
      input.classList.add('border-red-500');
      input.placeholder = 'Name too short!';
    }
  };

  btn.addEventListener('click', handleStart);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleStart();
  });
}
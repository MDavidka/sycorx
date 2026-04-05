import { ToastNotification } from '../types';
import { generateId } from '../utils';

// Global reference to the container where toasts will be mounted
let toastContainer: HTMLElement | null = null;

/**
 * Initializes the toast notification container in the DOM.
 * This is called automatically when the first toast is shown,
 * but can also be called manually during app initialization.
 */
export function initToasts(): void {
  if (document.getElementById('toast-container')) {
    toastContainer = document.getElementById('toast-container');
    return;
  }

  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  // Positioned at the bottom right, stacking upwards
  toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none items-end';
  document.body.appendChild(toastContainer);
}

/**
 * Displays a toast notification on the screen.
 * 
 * @param message The text message to display.
 * @param type The type of notification (success, info, warning, error).
 * @param duration How long the toast should stay visible in milliseconds (default: 3000). Set to 0 for persistent.
 */
export function showToast(
  message: string, 
  type: ToastNotification['type'] = 'info', 
  duration: number = 3000
): void {
  if (!toastContainer) {
    initToasts();
  }

  const id = generateId();
  const toastEl = document.createElement('div');

  // Determine styling and icon based on the notification type
  let bgClass = 'bg-[var(--color-surface)] border-white/10 text-white';
  let icon = 'ℹ️';

  switch (type) {
    case 'success':
      bgClass = 'bg-green-900/90 border-green-500/50 text-green-50';
      icon = '✅';
      break;
    case 'warning':
      bgClass = 'bg-yellow-900/90 border-yellow-500/50 text-yellow-50';
      icon = '⚠️';
      break;
    case 'error':
      bgClass = 'bg-red-900/90 border-red-500/50 text-red-50';
      icon = '❌';
      break;
    case 'info':
    default:
      bgClass = 'bg-[var(--color-surface)] border-[var(--color-secondary)]/50 text-white';
      icon = '🍪';
      break;
  }

  // Apply base classes and animation class defined in style.css
  toastEl.className = `toast-enter pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md min-w-[250px] max-w-sm ${bgClass}`;
  toastEl.id = `toast-${id}`;

  toastEl.innerHTML = `
    <span class="text-xl flex-shrink-0 drop-shadow-md">${icon}</span>
    <p class="text-sm font-medium flex-grow leading-snug">${message}</p>
    <button class="text-white/50 hover:text-white transition-colors flex-shrink-0 p-1 rounded-md hover:bg-white/10" aria-label="Close notification">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  toastContainer?.appendChild(toastEl);

  // Attach event listener to the close button
  const closeBtn = toastEl.querySelector('button');
  closeBtn?.addEventListener('click', () => {
    removeToast(toastEl);
  });

  // Automatically remove the toast after the specified duration
  if (duration > 0) {
    setTimeout(() => {
      removeToast(toastEl);
    }, duration);
  }
}

/**
 * Handles the exit animation and removal of a toast element from the DOM.
 * 
 * @param toastEl The HTML element of the toast to remove.
 */
function removeToast(toastEl: HTMLElement): void {
  // Prevent double-removal if already animating out
  if (!document.body.contains(toastEl) || toastEl.classList.contains('toast-exit')) {
    return;
  }

  // Swap the enter animation class for the exit animation class
  toastEl.classList.remove('toast-enter');
  toastEl.classList.add('toast-exit');

  // Wait for the CSS animation to complete before removing the node
  toastEl.addEventListener('animationend', () => {
    if (document.body.contains(toastEl)) {
      toastEl.remove();
    }
  });
}
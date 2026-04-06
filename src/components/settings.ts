import { GameState } from '../types';
import { createElement, clearSave } from '../utils';

export interface SettingsComponent {
    /** Updates the settings UI with the latest game state */
    updateState: (state: GameState) => void;
}

/**
 * Initializes and renders the settings component.
 * 
 * @param container The DOM element to append the settings to
 * @param onNameChange Callback triggered when the player updates their name
 * @param onHardReset Callback triggered when the player wipes their save
 * @returns A SettingsComponent instance
 */
export function initSettings(
    container: HTMLElement,
    onNameChange: (newName: string) => void,
    onHardReset: () => void
): SettingsComponent {
    let currentState: GameState | null = null;

    // Main wrapper
    const wrapper = createElement('div', {
        className: 'flex flex-col h-full w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-[var(--color-bg)] overflow-y-auto custom-scrollbar'
    });

    // Header
    const headerContainer = createElement('div', {
        className: 'mb-8 shrink-0'
    });

    const title = createElement('h2', {
        className: 'text-3xl sm:text-4xl font-bold text-[var(--color-primary)] drop-shadow-sm flex items-center gap-3',
        html: '<span>⚙️</span> Settings'
    });

    const subtitle = createElement('p', {
        className: 'text-[var(--color-text)] opacity-70 mt-2 text-sm sm:text-base',
        text: 'Manage your bakery profile and save data.'
    });

    headerContainer.appendChild(title);
    headerContainer.appendChild(subtitle);

    // --- Profile Section ---
    const profileSection = createElement('div', {
        className: 'bg-white bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-[var(--color-primary)] border-opacity-10 shadow-sm mb-8'
    });

    const profileTitle = createElement('h3', {
        className: 'text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-2',
        html: '<span>👤</span> Baker Profile'
    });

    const inputGroup = createElement('div', {
        className: 'flex flex-col sm:flex-row gap-3'
    });

    const nameInput = createElement('input', {
        className: 'flex-1 px-4 py-2.5 rounded-lg border-2 border-[var(--color-primary)] border-opacity-20 bg-white text-[var(--color-text)] font-medium focus:outline-none focus:border-opacity-50 focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all',
        attributes: {
            type: 'text',
            placeholder: 'Enter your baker name...',
            maxLength: '20'
        }
    }) as HTMLInputElement;

    const saveNameBtn = createElement('button', {
        className: 'px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap',
        text: 'Update Name'
    });

    const nameFeedback = createElement('div', {
        className: 'text-sm font-medium text-green-600 mt-2 h-5 opacity-0 transition-opacity duration-300',
        text: 'Name updated successfully!'
    });

    inputGroup.appendChild(nameInput);
    inputGroup.appendChild(saveNameBtn);
    
    profileSection.appendChild(profileTitle);
    profileSection.appendChild(inputGroup);
    profileSection.appendChild(nameFeedback);

    // --- Danger Zone Section ---
    const dangerSection = createElement('div', {
        className: 'bg-red-50 bg-opacity-50 p-6 rounded-xl border border-red-200 shadow-sm mt-auto'
    });

    const dangerTitle = createElement('h3', {
        className: 'text-xl font-bold text-red-700 mb-2 flex items-center gap-2',
        html: '<span>⚠️</span> Danger Zone'
    });

    const dangerDesc = createElement('p', {
        className: 'text-red-600 opacity-80 text-sm mb-4',
        text: 'Wiping your save data will permanently delete all your cookies, upgrades, and progress. This action cannot be undone!'
    });

    const wipeBtn = createElement('button', {
        className: 'px-6 py-2.5 bg-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2',
        html: '<span>🗑️</span> Wipe Save Data'
    });

    dangerSection.appendChild(dangerTitle);
    dangerSection.appendChild(dangerDesc);
    dangerSection.appendChild(wipeBtn);

    // Assemble main wrapper
    wrapper.appendChild(headerContainer);
    wrapper.appendChild(profileSection);
    wrapper.appendChild(dangerSection);
    container.appendChild(wrapper);

    // --- Event Listeners ---

    saveNameBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName && newName.length > 0 && newName.length <= 20) {
            onNameChange(newName);
            
            // Show feedback
            nameFeedback.style.opacity = '1';
            setTimeout(() => {
                nameFeedback.style.opacity = '0';
            }, 2000);
        } else {
            // Shake animation for invalid input
            nameInput.classList.add('animate-bounce');
            setTimeout(() => nameInput.classList.remove('animate-bounce'), 500);
            
            // Reset to current state name if invalid
            if (currentState) {
                nameInput.value = currentState.playerName;
            }
        }
    });

    // Allow pressing Enter to save
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveNameBtn.click();
        }
    });

    wipeBtn.addEventListener('click', () => {
        const confirmed = window.confirm(
            'Are you absolutely sure you want to wipe your save?\n\nAll your cookies and upgrades will be lost forever!'
        );

        if (confirmed) {
            // Double confirmation for safety
            const doubleConfirmed = window.confirm('Final warning: Delete all progress?');
            if (doubleConfirmed) {
                clearSave();
                onHardReset();
            }
        }
    });

    // --- Update Methods ---

    const updateState = (state: GameState) => {
        currentState = state;
        
        // Only update the input value if the user isn't currently typing in it
        if (document.activeElement !== nameInput) {
            nameInput.value = state.playerName;
        }
    };

    return {
        updateState
    };
}
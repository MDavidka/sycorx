import { GameState, PlayerScore } from '../types';
import { createElement, formatNumber } from '../utils';
import { getLeaderboard, submitScore } from '../db';

export interface LeaderboardComponent {
    /** Updates the component with the latest game state */
    updateState: (state: GameState) => void;
    /** Refreshes the leaderboard data from the database */
    refresh: () => Promise<void>;
}

/**
 * Initializes and renders the global leaderboard component.
 * 
 * @param container The DOM element to append the leaderboard to
 * @returns A LeaderboardComponent instance
 */
export function initLeaderboard(container: HTMLElement): LeaderboardComponent {
    let currentState: GameState | null = null;
    let isSubmitting = false;

    // Main wrapper
    const wrapper = createElement('div', {
        className: 'flex flex-col h-full w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-[var(--color-bg)] overflow-hidden'
    });

    // Header
    const headerContainer = createElement('div', {
        className: 'text-center mb-6 sm:mb-8 shrink-0'
    });

    const title = createElement('h2', {
        className: 'text-3xl sm:text-4xl font-bold text-[var(--color-primary)] drop-shadow-sm flex items-center justify-center gap-3',
        html: '<span>🏆</span> Global Top Bakers'
    });

    const subtitle = createElement('p', {
        className: 'text-[var(--color-text)] opacity-70 mt-2 text-sm sm:text-base',
        text: 'Compete with players worldwide for the highest cookie count!'
    });

    headerContainer.appendChild(title);
    headerContainer.appendChild(subtitle);

    // Leaderboard List Container
    const listWrapper = createElement('div', {
        className: 'flex-1 overflow-hidden flex flex-col bg-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-[var(--color-primary)] border-opacity-10 shadow-inner'
    });

    const listHeader = createElement('div', {
        className: 'flex items-center px-4 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] font-bold text-sm sm:text-base shrink-0'
    });
    
    listHeader.appendChild(createElement('div', { className: 'w-12 sm:w-16 text-center', text: 'Rank' }));
    listHeader.appendChild(createElement('div', { className: 'flex-1 px-2', text: 'Baker Name' }));
    listHeader.appendChild(createElement('div', { className: 'w-24 sm:w-32 text-right', text: 'Cookies' }));

    const listContent = createElement('div', {
        className: 'flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1'
    });

    listWrapper.appendChild(listHeader);
    listWrapper.appendChild(listContent);

    // Footer / Action Area
    const footerContainer = createElement('div', {
        className: 'mt-6 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white bg-opacity-60 p-4 rounded-xl border border-[var(--color-primary)] border-opacity-10 shadow-sm'
    });

    const playerStatsEl = createElement('div', {
        className: 'text-[var(--color-text)] font-medium text-center sm:text-left'
    });

    const submitBtn = createElement('button', {
        className: 'px-6 py-2.5 bg-[var(--color-secondary)] text-[var(--color-primary)] font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2',
        html: '<span>📤</span> Submit My Score'
    });

    footerContainer.appendChild(playerStatsEl);
    footerContainer.appendChild(submitBtn);

    // Assemble main wrapper
    wrapper.appendChild(headerContainer);
    wrapper.appendChild(listWrapper);
    wrapper.appendChild(footerContainer);
    container.appendChild(wrapper);

    // --- Helper Functions ---

    const renderLoading = () => {
        listContent.innerHTML = '';
        const loadingEl = createElement('div', {
            className: 'flex flex-col items-center justify-center h-32 text-[var(--color-text)] opacity-60 gap-3',
            html: '<div class="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div><p>Fetching top bakers...</p>'
        });
        listContent.appendChild(loadingEl);
    };

    const renderError = (message: string) => {
        listContent.innerHTML = '';
        const errorEl = createElement('div', {
            className: 'flex flex-col items-center justify-center h-32 text-red-500 opacity-80 gap-2 text-center px-4',
            html: `<span>⚠️</span><p>${message}</p>`
        });
        listContent.appendChild(errorEl);
    };

    const renderList = (scores: PlayerScore[]) => {
        listContent.innerHTML = '';

        if (scores.length === 0) {
            const emptyEl = createElement('div', {
                className: 'flex items-center justify-center h-32 text-[var(--color-text)] opacity-60',
                text: 'No scores yet. Be the first to submit!'
            });
            listContent.appendChild(emptyEl);
            return;
        }

        scores.forEach((score, index) => {
            const rank = index + 1;
            const row = createElement('div', {
                className: 'flex items-center px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white hover:bg-opacity-60 transition-colors duration-150 group'
            });

            // Rank styling
            let rankHtml = `<span class="text-[var(--color-text)] opacity-50 font-bold">#${rank}</span>`;
            if (rank === 1) rankHtml = '<span class="text-2xl drop-shadow-sm" title="1st Place">🥇</span>';
            else if (rank === 2) rankHtml = '<span class="text-2xl drop-shadow-sm" title="2nd Place">🥈</span>';
            else if (rank === 3) rankHtml = '<span class="text-2xl drop-shadow-sm" title="3rd Place">🥉</span>';

            const rankEl = createElement('div', {
                className: 'w-10 sm:w-12 text-center flex justify-center items-center shrink-0',
                html: rankHtml
            });

            // Name
            const nameEl = createElement('div', {
                className: 'flex-1 px-2 sm:px-4 font-bold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors',
                text: score.playerName
            });

            // Score
            const scoreEl = createElement('div', {
                className: 'w-24 sm:w-32 text-right font-mono font-medium text-[var(--color-primary)] shrink-0',
                text: formatNumber(Math.floor(score.score))
            });

            row.appendChild(rankEl);
            row.appendChild(nameEl);
            row.appendChild(scoreEl);
            listContent.appendChild(row);
        });
    };

    const fetchAndRender = async () => {
        renderLoading();
        try {
            const scores = await getLeaderboard();
            renderList(scores);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
            renderError('Could not load leaderboard. Database might not be configured.');
        }
    };

    // --- Event Listeners ---

    submitBtn.addEventListener('click', async () => {
        if (!currentState || isSubmitting) return;

        isSubmitting = true;
        submitBtn.disabled = true;
        const originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div> Submitting...';

        try {
            const success = await submitScore(currentState.playerName, Math.floor(currentState.cookies));
            if (success) {
                // Show success state briefly
                submitBtn.innerHTML = '<span>✅</span> Submitted!';
                submitBtn.classList.add('bg-green-400');
                await fetchAndRender();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Failed to submit score:', error);
            submitBtn.innerHTML = '<span>❌</span> Failed';
            submitBtn.classList.add('bg-red-400');
        } finally {
            // Reset button after 2 seconds
            setTimeout(() => {
                isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
                submitBtn.classList.remove('bg-green-400', 'bg-red-400');
            }, 2000);
        }
    });

    // --- Public Methods ---

    const updateState = (state: GameState) => {
        currentState = state;
        
        // Update the footer text with current player info
        const formattedScore = formatNumber(Math.floor(state.cookies));
        playerStatsEl.innerHTML = `
            <div class="text-sm opacity-70">Playing as</div>
            <div class="font-bold text-lg text-[var(--color-primary)]">${state.playerName}</div>
            <div class="text-sm mt-0.5">Current Score: <span class="font-bold">${formattedScore}</span></div>
        `;
    };

    const refresh = async () => {
        await fetchAndRender();
    };

    // Initial fetch
    fetchAndRender();

    return {
        updateState,
        refresh
    };
}
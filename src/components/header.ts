import { CONFIG } from '../engine';

/**
 * Renders the top header bar containing the game title, player name, 
 * and a toggle button for the leaderboard.
 * 
 * @param container The DOM element to append the header to.
 * @param username The current player's username.
 * @param onToggleLeaderboard Callback fired when the leaderboard button is clicked. 
 *                            Passes a boolean indicating if the leaderboard should be shown.
 */
export function renderHeader(
  container: HTMLElement,
  username: string,
  onToggleLeaderboard: (isLeaderboardVisible: boolean) => void
): void {
  // Create the main header container
  const header = document.createElement('header');
  header.className = 'w-full bg-white shadow-sm border-b border-[#D7CCC8] px-4 py-3 sm:px-6 flex justify-between items-center z-20 relative shrink-0';

  // ==========================================
  // LEFT SECTION: Title & Player Badge
  // ==========================================
  const leftSection = document.createElement('div');
  leftSection.className = 'flex items-center gap-4';

  // Game Title (Hidden on very small screens to save space)
  const title = document.createElement('h1');
  title.className = 'text-xl font-extrabold text-[#5D4037] hidden md:block tracking-tight';
  title.textContent = CONFIG.title;

  // Player Badge
  const playerBadge = document.createElement('div');
  playerBadge.className = 'flex items-center gap-2 bg-[#FFF8E1] px-3 py-1.5 rounded-full border border-[#FFC107] shadow-sm';
  
  const playerIcon = document.createElement('span');
  playerIcon.textContent = '🧑‍🍳';
  playerIcon.className = 'text-lg leading-none';

  const playerName = document.createElement('span');
  playerName.className = 'font-bold text-[#3E2723] text-sm truncate max-w-[120px] sm:max-w-[200px]';
  playerName.textContent = username;
  playerName.title = username; // Tooltip for long names

  playerBadge.appendChild(playerIcon);
  playerBadge.appendChild(playerName);

  leftSection.appendChild(title);
  leftSection.appendChild(playerBadge);

  // ==========================================
  // RIGHT SECTION: Controls
  // ==========================================
  const rightSection = document.createElement('div');
  rightSection.className = 'flex items-center gap-3';

  // Leaderboard Toggle Button
  const leaderboardBtn = document.createElement('button');
  leaderboardBtn.className = 'flex items-center gap-2 text-sm py-1.5 px-4 transition-all duration-200';
  
  const btnIcon = document.createElement('span');
  btnIcon.className = 'text-base leading-none';
  
  const btnText = document.createElement('span');
  btnText.className = 'hidden sm:inline-block'; // Hide text on mobile, show only icon

  leaderboardBtn.appendChild(btnIcon);
  leaderboardBtn.appendChild(btnText);

  let showingLeaderboard = false;
  
  // Function to update button appearance based on state
  const updateBtnState = () => {
    if (showingLeaderboard) {
      btnIcon.textContent = '🔙';
      btnText.textContent = 'Back to Bakery';
      leaderboardBtn.classList.remove('btn-secondary');
      leaderboardBtn.classList.add('btn-primary');
    } else {
      btnIcon.textContent = '🏆';
      btnText.textContent = 'Leaderboard';
      leaderboardBtn.classList.remove('btn-primary');
      leaderboardBtn.classList.add('btn-secondary');
    }
  };

  // Initialize button state
  updateBtnState();

  // Handle click event
  leaderboardBtn.addEventListener('click', () => {
    showingLeaderboard = !showingLeaderboard;
    updateBtnState();
    onToggleLeaderboard(showingLeaderboard);
  });

  rightSection.appendChild(leaderboardBtn);

  // ==========================================
  // ASSEMBLE & APPEND
  // ==========================================
  header.appendChild(leftSection);
  header.appendChild(rightSection);

  container.appendChild(header);
}
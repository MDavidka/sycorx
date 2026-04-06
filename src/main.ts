import './style.css';
import { ID, Query } from 'appwrite';
import { account, databases, DATABASE_ID, COLLECTION_PROFILES } from './appwrite';
import { initEngine, startEngine } from './engine';
import { renderHeader } from './components/header';
import { renderCookieArea } from './components/cookie-area';
import { renderShopArea } from './components/shop-area';
import { renderLeaderboard } from './components/leaderboard';
import { PlayerProfile } from './types';

/**
 * Initializes the application, handles Appwrite authentication,
 * fetches or creates the player profile, and mounts the UI.
 */
async function initApp() {
  const appEl = document.getElementById('app');
  if (!appEl) {
    console.error('Root element #app not found');
    return;
  }

  // Show loading state
  appEl.innerHTML = `
    <div class="flex flex-col h-screen w-screen items-center justify-center bg-[#FFF8E1] text-[#5D4037]">
      <div class="text-6xl animate-spin-slow origin-center mb-6">🍪</div>
      <h1 class="text-2xl font-extrabold tracking-tight animate-pulse">Heating up the ovens...</h1>
      <p class="text-[#8D6E63] mt-2 text-sm">Connecting to database</p>
    </div>
  `;

  try {
    // 1. Handle Authentication (Anonymous Session)
    let user;
    try {
      user = await account.get();
    } catch (e) {
      // If account.get() fails, the user is not logged in. Create an anonymous session.
      console.log('No active session found. Creating anonymous session...');
      await account.createAnonymousSession();
      user = await account.get();
    }

    // 2. Fetch or Create Player Profile
    const profileDocs = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_PROFILES,
      [Query.equal('userId', user.$id)]
    );

    let profile: PlayerProfile;

    if (profileDocs.documents.length > 0) {
      // Profile exists, load it
      profile = profileDocs.documents[0] as unknown as PlayerProfile;
      console.log('Profile loaded:', profile.username);
    } else {
      // No profile exists, prompt for username and create one
      let username = prompt('Welcome to Cookie Clicker! Enter your baker name:')?.trim();
      if (!username) {
        username = `Baker${Math.floor(Math.random() * 10000)}`;
      }

      // Initial empty game state
      const initialGameState = {
        cookies: 0,
        totalCookies: 0,
        cps: 0,
        clickPower: 1,
        upgrades: {},
        lastSaveTime: Date.now()
      };

      const newProfileData = {
        userId: user.$id,
        username: username,
        gameState: JSON.stringify(initialGameState),
        totalCookies: 0,
        cps: 0
      };

      console.log('Creating new profile for:', username);
      const newDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_PROFILES,
        ID.unique(),
        newProfileData
      );
      
      profile = newDoc as unknown as PlayerProfile;
    }

    // 3. Initialize and Start the Game Engine
    initEngine(profile);
    startEngine();

    // 4. Render the UI
    renderUI(appEl, profile.username);

  } catch (error) {
    console.error('Initialization failed:', error);
    appEl.innerHTML = `
      <div class="flex flex-col h-screen w-screen items-center justify-center bg-[#FFF8E1] text-[#5D4037] p-6 text-center">
        <div class="text-6xl mb-4 drop-shadow-sm">⚠️</div>
        <h1 class="text-2xl font-extrabold mb-2 text-[#3E2723]">Failed to load game</h1>
        <p class="text-[#8D6E63] max-w-md mb-6">
          Could not connect to the database. Please ensure your Appwrite project is configured correctly and the collections exist.
        </p>
        <button onclick="window.location.reload()" class="btn-primary">
          Reload Page
        </button>
      </div>
    `;
  }
}

/**
 * Constructs the layout and mounts all UI components.
 * 
 * @param appEl The root application element.
 * @param username The current player's username.
 */
function renderUI(appEl: HTMLElement, username: string) {
  // Clear loading screen and set base layout classes
  appEl.innerHTML = '';
  appEl.className = 'flex flex-col h-screen w-screen overflow-hidden bg-[#FFF8E1] text-[#3E2723]';

  // ==========================================
  // LAYOUT STRUCTURE
  // ==========================================
  
  // Header Container
  const headerContainer = document.createElement('div');
  headerContainer.className = 'shrink-0 z-30 relative shadow-sm';
  appEl.appendChild(headerContainer);

  // Main Content Area (relative for absolute positioning of views)
  const mainContent = document.createElement('main');
  mainContent.className = 'flex-1 relative overflow-hidden flex flex-col';
  appEl.appendChild(mainContent);

  // --- View 1: Game View (Cookie + Shop) ---
  const gameView = document.createElement('div');
  gameView.className = 'absolute inset-0 flex flex-col md:flex-row transition-opacity duration-300 opacity-100 z-20 bg-[#FFF8E1]';
  
  const cookieContainer = document.createElement('div');
  cookieContainer.className = 'flex-1 relative h-1/2 md:h-full';
  
  const shopContainer = document.createElement('div');
  shopContainer.className = 'w-full md:w-80 lg:w-96 shrink-0 h-1/2 md:h-full border-t md:border-t-0 md:border-l border-[#D7CCC8] bg-white z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.03)]';

  gameView.appendChild(cookieContainer);
  gameView.appendChild(shopContainer);

  // --- View 2: Leaderboard View ---
  const leaderboardView = document.createElement('div');
  leaderboardView.className = 'absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none z-10 bg-[#FFF8E1]';

  mainContent.appendChild(gameView);
  mainContent.appendChild(leaderboardView);

  // ==========================================
  // VIEW TOGGLE LOGIC
  // ==========================================
  
  const onToggleLeaderboard = (showLeaderboard: boolean) => {
    if (showLeaderboard) {
      // Hide Game View
      gameView.classList.replace('opacity-100', 'opacity-0');
      gameView.classList.replace('z-20', 'z-10');
      gameView.classList.add('pointer-events-none');
      
      // Show Leaderboard View
      leaderboardView.classList.replace('opacity-0', 'opacity-100');
      leaderboardView.classList.replace('z-10', 'z-20');
      leaderboardView.classList.remove('pointer-events-none');
    } else {
      // Hide Leaderboard View
      leaderboardView.classList.replace('opacity-100', 'opacity-0');
      leaderboardView.classList.replace('z-20', 'z-10');
      leaderboardView.classList.add('pointer-events-none');
      
      // Show Game View
      gameView.classList.replace('opacity-0', 'opacity-100');
      gameView.classList.replace('z-10', 'z-20');
      gameView.classList.remove('pointer-events-none');
    }
  };

  // ==========================================
  // MOUNT COMPONENTS
  // ==========================================
  
  renderHeader(headerContainer, username, onToggleLeaderboard);
  renderCookieArea(cookieContainer);
  renderShopArea(shopContainer);
  renderLeaderboard(leaderboardView);
}

// Boot the application when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
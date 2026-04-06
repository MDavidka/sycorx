import './style.css';
import { GameState, ViewState, Building } from './types';
import { renderLayout, getContentContainer } from './components/layout';
import { renderStats } from './components/stats';
import { renderCookie } from './components/cookie';
import { renderStore } from './components/store';
import { renderLeaderboard } from './components/leaderboard';
import { submitScore } from './db';

// Initial Game State
let state: GameState = {
  cookies: 0,
  totalCookiesEarned: 0,
  cookiesPerSecond: 0,
  lastUpdated: Date.now(),
  buildings: [
    { id: 'cursor', name: 'Cursor', baseCost: 15, baseProduction: 0.1, count: 0, description: 'Clicks the cookie for you.' },
    { id: 'grandma', name: 'Grandma', baseCost: 100, baseProduction: 1, count: 0, description: 'Bakes cookies with love.' },
    { id: 'factory', name: 'Factory', baseCost: 1100, baseProduction: 8, count: 0, description: 'Produces cookies in bulk.' }
  ]
};

let currentView: ViewState = 'game';

function updateCPS() {
  state.cookiesPerSecond = state.buildings.reduce((acc, b) => acc + (b.count * b.baseProduction), 0);
}

function handleCookieClick() {
  state.cookies += 1;
  state.totalCookiesEarned += 1;
  render();
}

function handlePurchase(buildingId: string) {
  const building = state.buildings.find(b => b.id === buildingId);
  if (!building) return;

  const cost = Math.floor(building.baseCost * Math.pow(1.15, building.count));
  if (state.cookies >= cost) {
    state.cookies -= cost;
    building.count += 1;
    updateCPS();
    render();
  }
}

async function handleScoreSubmit(username: string) {
  await submitScore(username, Math.floor(state.totalCookiesEarned));
}

function render() {
  const app = document.getElementById('app')!;
  
  // Ensure layout is rendered
  if (!app.querySelector('header')) {
    renderLayout(app, currentView, (view) => {
      currentView = view;
      render();
    });
  }

  const content = getContentContainer(app);
  
  if (currentView === 'game') {
    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="left-col" class="flex flex-col gap-6"></div>
        <div id="right-col" class="flex flex-col gap-6"></div>
      </div>
    `;
    renderStats(content.querySelector('#left-col')!, state);
    renderCookie(content.querySelector('#left-col')!, handleCookieClick);
    renderStore(content.querySelector('#right-col')!, state, handlePurchase);
  } else if (currentView === 'leaderboard') {
    renderLeaderboard(content, state.totalCookiesEarned, handleScoreSubmit);
  }
}

// Game Loop
setInterval(() => {
  const now = Date.now();
  const delta = (now - state.lastUpdated) / 1000;
  state.cookies += state.cookiesPerSecond * delta;
  state.totalCookiesEarned += state.cookiesPerSecond * delta;
  state.lastUpdated = now;
  
  // Only re-render if we are in the game view to keep UI responsive
  if (currentView === 'game') {
    render();
  }
}, 1000);

// Initial Mount
render();
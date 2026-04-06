# 🍪 Cookie Baker Idle

A modern, high-performance Cookie Clicker clone built with **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**. 

This project features a fully functional idle game loop, offline progress calculation, an upgrade shop, and a global leaderboard powered by the **MongoDB Atlas Data API**.

## ✨ Features

- **Interactive Gameplay:** Click the giant cookie to earn cookies. Satisfying animations and responsive design.
- **Upgrade Shop:** Purchase buildings and upgrades (Cursors, Grandmas, Bakeries, etc.) to increase your Cookies Per Second (CPS).
- **Offline Progress:** Close the tab and come back later! The game calculates how many cookies you baked while you were away (capped at 7 days).
- **Global Leaderboard:** Compete with players worldwide. High scores are saved to a MongoDB database.
- **Persistent Local Save:** Your game state is automatically saved to your browser's `localStorage` every 10 seconds.
- **Responsive Design:** Playable on desktop and mobile devices.

## 🚀 Tech Stack

- **Frontend:** Vite, Vanilla TypeScript, HTML5
- **Styling:** Tailwind CSS (via CDN for rapid deployment/prototyping)
- **Backend/Database:** MongoDB Atlas Data API (Serverless HTTP requests)
- **Deployment Target:** Cloudflare Pages

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (Free tier is perfect)

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd cookie-clicker-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## 🗄️ Database Configuration (Leaderboard)

To enable the global leaderboard, you need to configure the MongoDB Atlas Data API.

1. Log in to your MongoDB Atlas dashboard.
2. Create a new Cluster (the free `M0` cluster is fine).
3. Create a Database named `cookie_game` and a Collection named `leaderboard`.
4. Go to **Data API** in the left sidebar and enable it.
5. Generate an **API Key** and copy your **URL Endpoint**.
6. Open `src/db.ts` in your code editor and update the configuration constants:

```typescript
// src/db.ts
export const MONGO_ENDPOINT = 'YOUR_DATA_API_ENDPOINT_HERE';
export const MONGO_API_KEY = 'YOUR_DATA_API_KEY_HERE';
export const DATA_SOURCE = 'Cluster0'; // Your cluster name
export const DATABASE_NAME = 'cookie_game';
export const COLLECTION_SCORES = 'leaderboard';
```

*Note: For a production application, you should use environment variables (`import.meta.env.VITE_MONGO_API_KEY`) and a serverless function/proxy to hide your API key. Since this is a client-side playground, the fetch calls are made directly from the browser.*

## 🎮 How to Play

1. **Bake Cookies:** Click the big cookie on the left side of the screen to manually bake cookies.
2. **Buy Upgrades:** Once you have enough cookies, the shop items on the right will light up. Click them to purchase.
3. **Idle:** Upgrades generate Cookies Per Second (CPS) automatically. Leave the game open or close it—your bakers will keep working!
4. **Compete:** Check the Leaderboard tab to see how you stack up against other players.
5. **Settings:** Change your display name or hard reset your progress in the Settings tab.

## ☁️ Deployment (Cloudflare Pages)

This project is optimized for deployment on Cloudflare Pages.

1. Push your code to a GitHub/GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Pages**.
3. Click **Create a project** -> **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   - **Framework preset:** None / Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **Save and Deploy**.

## 📁 Project Structure

```text
project/
├── index.html              # Main HTML entry point
├── src/
│   ├── main.ts             # Game engine loop and initialization
│   ├── types.ts            # TypeScript interfaces and types
│   ├── utils.ts            # Helper functions (save/load, formatting)
│   ├── db.ts               # MongoDB Data API integration
│   ├── style.css           # Tailwind imports and custom animations
│   └── components/         # UI Components
│       ├── header.ts       # Navigation and stats
│       ├── cookieArea.ts   # The clickable cookie
│       ├── shop.ts         # Upgrades and purchasing logic
│       ├── leaderboard.ts  # Global high scores view
│       └── settings.ts     # Player configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

## 📝 License

MIT License - feel free to modify and use this code for your own projects!
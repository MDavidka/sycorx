# 🍪 Cookie Clicker Bakery

A modern, responsive, and highly addictive incremental game built with React, Vite, TypeScript, and HeroUI. Bake cookies, purchase upgrades, increase your Cookies Per Second (CPS), and climb the leaderboard!

## ✨ Features

- **Core Gameplay Loop**: Click the giant cookie to earn cookies. Spend cookies on upgrades to automate your bakery.
- **Upgrade Shop**: Purchase various buildings and upgrades (Cursors, Grandmas, Farms, etc.) that increase your CPS. Costs scale dynamically as you buy more.
- **Responsive Design**: Fully playable on desktop, tablet, and mobile devices.
- **Theming**: Supports both Light ("Bakery Day") and Dark ("Night Shift Bakery") modes.
- **Local Persistence**: Your game progress is automatically saved to your browser's local storage so you never lose your bakery.
- **Offline Progress**: (Planned) Earn cookies even while you are away based on your last save time and CPS.
- **Database Ready**: Structured to easily connect to MongoDB Atlas Data API for cloud saves and global leaderboards.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [HeroUI](https://heroui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd cookie-clicker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to start baking!

## 📁 Project Structure

```text
cookie-clicker/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── src/
│   ├── main.tsx            # React entry point and SPA Router
│   ├── style.css           # Global styles and Tailwind/Theme tokens
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── utils.ts            # Game logic and helper functions
│   ├── db.ts               # Database API wrappers (MongoDB Data API)
│   └── components/         # React UI Components
│       ├── header.tsx      # Global navigation and stats
│       ├── footer.tsx      # Footer and theme toggle
│       ├── home-page.tsx   # Main game loop and dashboard
│       ├── cookie-button.tsx # Interactive cookie component
│       ├── upgrade-shop.tsx  # Upgrade purchasing logic
│       └── leaderboard-page.tsx # Global rankings view
```

## 💾 Database Integration (Optional)

By default, the game uses local browser storage to save your progress. To enable cloud saves and the global leaderboard, you can connect a MongoDB database using the MongoDB Atlas Data API.

1. Set up a MongoDB Atlas cluster and enable the Data API.
2. Create a `.env` file in the root directory.
3. Add your MongoDB credentials (replace with your actual keys):

```env
VITE_MONGO_ENDPOINT="https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1"
VITE_MONGO_API_KEY="your_api_key_here"
```

Once configured, the `src/db.ts` file will automatically route save data and leaderboard requests to your database.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production into the `dist` folder.
- `npm run preview`: Locally previews the production build.
- `npm run check`: Runs TypeScript type checking without emitting files.

## 📄 License

This project is open-source and available under the MIT License.
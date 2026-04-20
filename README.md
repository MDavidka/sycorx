# 🍪 Cookie Clicker

An addictive, modern incremental game built with React, Vite, TypeScript, Tailwind CSS, and HeroUI. Bake cookies, purchase upgrades, and watch your bakery empire grow!

## ✨ Features

- **Click to Bake:** The core mechanic. Click the giant cookie to earn cookies manually.
- **Upgrades & Auto-Baking:** Purchase upgrades like Auto-Clickers, Grandmas, and Cookie Farms to increase your Cookies Per Second (CPS).
- **Offline Earnings:** Your bakery keeps working even when you're away! Return to claim cookies baked while you were offline.
- **Auto-Save:** Game progress is automatically saved to your local storage (and database if connected) every 30 seconds.
- **Responsive Design:** Play seamlessly on desktop, tablet, or mobile devices.
- **Modern UI:** Built with HeroUI and Tailwind CSS for a clean, accessible, and beautiful interface.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [HeroUI](https://heroui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database (Optional):** MongoDB Atlas Data API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cookie-clicker.git
   cd cookie-clicker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🗄️ Database Integration (Optional)

By default, the game runs using local storage to save your progress. If you want to enable global leaderboards and cloud saves, you can connect a MongoDB Atlas database using the Data API.

1. Create a MongoDB Atlas cluster and enable the Data API.
2. Create a `.env` file in the root directory.
3. Add the following environment variables:

```env
VITE_MONGO_ENDPOINT="https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1"
VITE_MONGO_API_KEY="your_data_api_key_here"
```

The application will automatically detect these variables and switch to cloud-saving mode.

## 📁 Project Structure

```text
├── index.html              # Entry HTML file
├── src/
│   ├── main.tsx            # React entry point & routing logic
│   ├── style.css           # Global styles and Tailwind directives
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── utils.ts            # Game logic helpers (CPS calculation, formatting)
│   ├── db.ts               # Database integration wrappers
│   └── components/         # React components
│       ├── cookie-clicker.tsx  # Main game loop
│       ├── shop-page.tsx       # Upgrades store
│       ├── leaderboard-page.tsx# Global high scores
│       ├── header.tsx          # Navigation and stats header
│       └── footer.tsx          # Application footer
```

## 📜 License

This project is open-source and available under the MIT License.
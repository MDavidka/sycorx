# Cookie Clicker Pro

A high-performance, production-ready incremental idle game built with **Vite**, **TypeScript**, and **Tailwind CSS**. Designed for deployment on **Cloudflare Pages**.

## 🚀 How to Play
1. **Click the Cookie:** Click the giant cookie in the center of the screen to earn your first cookies.
2. **Buy Upgrades:** Use your cookies to purchase buildings (Cursors, Grandmas, Factories) in the store. Each building generates a set amount of cookies per second (CPS).
3. **Watch it Grow:** Your cookies will accumulate automatically based on your CPS.
4. **Compete:** Visit the **Leaderboard** tab to see how you rank against other players. Enter your username to submit your total lifetime cookies earned!

## 🛠️ Configuration (MongoDB Atlas)
This project uses the **MongoDB Atlas Data API** to handle global leaderboards without a dedicated backend server. To enable the leaderboard, follow these steps:

1. **Create a MongoDB Atlas Account:** Set up a free cluster.
2. **Enable Data API:** 
   - Go to your Cluster settings in the Atlas dashboard.
   - Enable the "Data API" and create an API Key.
3. **Configure `src/db.ts`:**
   - Open `src/db.ts` in your project.
   - Update the constants with your specific details:
     - `MONGO_ENDPOINT`: Your Data API endpoint URL.
     - `MONGO_API_KEY`: Your generated API key.
     - `DATA_SOURCE`: Your cluster name (e.g., "Cluster0").
     - `DATABASE_NAME`: The name of your database.
     - `COLLECTION_LEADERBOARD`: The name of your collection (e.g., "scores").

## 💻 Development
- **Install Dependencies:** `npm install`
- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Type Checking:** `npm run check`

## 🎨 Design System
The project uses a custom design system defined in `src/style.css` with the following tokens:
- **Primary:** `#3E2723` (Dark Chocolate)
- **Secondary:** `#FFCA28` (Golden Cookie)
- **Background:** `#FFF8E1` (Creamy Dough)
- **Typography:** Inter (System-UI)

## 📦 Deployment
This project is optimized for **Cloudflare Pages**.
1. Push your code to a GitHub repository.
2. Connect your repository to Cloudflare Pages.
3. Set the Build Command to `npm run build` and the Output Directory to `dist`.
4. Deploy!
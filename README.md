# 🍪 Cookie Clicker - Global Bakery

A modern, high-performance idle clicker game built with Vite, Vanilla TypeScript, and Tailwind CSS. Features a global leaderboard powered by Appwrite, offline progress calculation, and a responsive glassmorphism UI.

## ✨ Features

- **Classic Idle Mechanics:** Click the giant cookie to bake, buy upgrades to increase your Cookies Per Second (CPS) and Cookies Per Click (CPC).
- **Offline Progress:** The game calculates how many cookies you baked while you were away (capped at 7 days).
- **Global Leaderboard:** Compete with players worldwide. Your total cookies baked are synced to the cloud.
- **Responsive Design:** Fully playable on desktop and mobile devices with touch-optimized interactions.
- **Modern UI:** Built with Tailwind CSS featuring glassmorphism panels, smooth animations, and floating damage numbers.

## 🚀 Tech Stack

- **Frontend:** Vite, TypeScript, HTML5, CSS3
- **Styling:** Tailwind CSS
- **Backend/BaaS:** Appwrite (Database & Cloud Sync)
- **Deployment:** Cloudflare Pages (Recommended)

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## ☁️ Appwrite Database Setup (Required for Leaderboard)

This project uses Appwrite to store and retrieve the global leaderboard. To make the leaderboard work, you need to set up the database and collection in your Appwrite Console.

### 1. Project Details
The app is already configured to connect to your Appwrite instance in `src/appwrite.ts`:
- **Endpoint:** `https://fra.cloud.appwrite.io/v1`
- **Project ID:** `69c2b4a10015a5c19a9f`

### 2. Create the Database
1. Go to your Appwrite Console -> **Databases**.
2. Click **Create database**.
3. Name it `Cookie Clicker` (or similar).
4. **IMPORTANT:** Check `src/appwrite.ts` for the exact `DATABASE_ID` exported constant and use that as the Database ID (e.g., `main` or `cookie_clicker`).

### 3. Create the Collection
1. Inside your new Database, click **Create collection**.
2. Name it `Leaderboard`.
3. **IMPORTANT:** Check `src/appwrite.ts` for the exact `COLLECTION_LEADERBOARD` exported constant and use that as the Collection ID (e.g., `leaderboard`).

### 4. Add Attributes
Go to the **Attributes** tab of your new collection and create the following attributes:

| Attribute Key  | Type    | Size | Required | Array |
| :---           | :---    | :--- | :---     | :---  |
| `username`     | String  | 255  | Yes      | No    |
| `totalCookies` | Integer | -    | Yes      | No    |

*(Note: If players can reach extremely high numbers, you may want to use `Double` or `Float` for `totalCookies` instead of Integer).*

### 5. Add Indexes (For Sorting)
Go to the **Indexes** tab to ensure the leaderboard fetches the top players efficiently:
1. Click **Create index**.
2. **Index Key:** `score_desc`
3. **Index Type:** `Key`
4. **Attributes:** `totalCookies`
5. **Order:** `DESC`

### 6. Set Permissions
Go to the **Settings** tab of your collection to allow the game to read and write scores:
1. Under **Permissions**, click **Add Role**.
2. Select **Any** (or **Guests** depending on your Appwrite version).
3. Check the boxes for: **Create**, **Read**, and **Update**.
4. Click **Update** to save.

## 🌐 Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub/GitLab repository.
2. Go to the Cloudflare Dashboard -> Pages -> Create a project -> Connect to Git.
3. Select your repository.
4. **Build Settings:**
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**.

---
*Happy Baking! 🍪*
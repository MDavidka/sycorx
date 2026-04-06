# 🍪 Cookie Clicker Clone

A high-performance, browser-based incremental game built with Vite, Vanilla TypeScript, Tailwind CSS, and Appwrite. 

Players can click the giant cookie to earn points, purchase upgrades to increase their Cookies Per Second (CPS), and compete on a global leaderboard. The game features real-time saving and anonymous authentication powered by Appwrite.

## 🚀 Tech Stack

*   **Frontend Framework:** Vite + Vanilla TypeScript
*   **Styling:** Tailwind CSS
*   **Backend/BaaS:** Appwrite (Authentication, Databases)
*   **Deployment:** Cloudflare Pages

## 🛠️ Prerequisites

*   Node.js (v18+ recommended)
*   An [Appwrite](https://appwrite.io/) account and project.

## ⚙️ Appwrite Database Setup (CRITICAL)

For the game to save progress and display the leaderboard, you **must** configure your Appwrite database collections to match the data structures expected by the application.

### 1. Create the Database
1. Go to your Appwrite Console.
2. Navigate to **Databases** and click **Create database**.
3. Name it `Cookie Clicker` (or similar).
4. Note the **Database ID**. Open `src/appwrite.ts` and ensure the `DATABASE_ID` constant matches this ID.

### 2. Create the Profiles Collection
1. Inside your new database, click **Create collection**.
2. Name it `Profiles`.
3. Note the **Collection ID**. Open `src/appwrite.ts` and ensure the `COLLECTION_PROFILES` constant matches this ID.

### 3. Add Attributes to the Profiles Collection
Navigate to the **Attributes** tab of your `Profiles` collection and create the following attributes exactly as named:

| Attribute Key | Type | Size / Format | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | String | 255 | Yes | The Appwrite Auth User ID |
| `username` | String | 255 | Yes | Player's display name |
| `gameState` | String | 65535 | Yes | JSON stringified save data |
| `totalCookies` | Double (Float) | - | Yes | Lifetime cookies (for leaderboard) |
| `cps` | Double (Float) | - | Yes | Current Cookies Per Second |

### 4. Create Indexes (For the Leaderboard)
Navigate to the **Indexes** tab of your `Profiles` collection and create the following index so the leaderboard can sort players by their score:

*   **Index Key:** `leaderboard_rank`
*   **Index Type:** `key`
*   **Attributes:** `totalCookies`
*   **Order:** `DESC`

### 5. Configure Permissions
Navigate to the **Settings** tab of your `Profiles` collection. Under **Permissions**:
1. Click **Add Role** and select **Any** (or **Users** since the app creates anonymous sessions).
2. Grant **Create**, **Read**, **Update**, and **Delete** permissions.
3. Click **Update** to save.

## 💻 Local Development

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

## 🌐 Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub/GitLab repository.
2. Log in to the Cloudflare Dashboard and navigate to **Pages**.
3. Click **Create a project** > **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   *   **Framework preset:** None (or Vite if available)
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
6. Click **Save and Deploy**.

## 🎮 How to Play

1. **Click the Cookie:** Earn cookies manually by clicking the giant cookie on the screen.
2. **Buy Upgrades:** Spend your cookies in the shop on the right to buy upgrades like "Auto Clicker", "Grandma", and "Cookie Factory".
3. **Idle Progression:** Upgrades will automatically generate cookies for you every second (CPS).
4. **Compete:** Click the "Leaderboard" button in the header to see how you rank against other bakers globally! Your progress is automatically saved to the cloud.
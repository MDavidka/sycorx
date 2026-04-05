# Cookie Clicker Empire

A high-performance, real-time Cookie Clicker game built with **Vite**, **TypeScript**, **Tailwind CSS**, and **Appwrite**.

## 🚀 Features
- **Real-time Gameplay**: Passive income calculation and manual click tracking.
- **Persistent Leaderboard**: Global rankings powered by Appwrite Databases.
- **Responsive Design**: Mobile-first layout using Tailwind CSS.
- **Modern Stack**: Type-safe development with TypeScript.

## 🛠 Appwrite Setup Instructions

To run this project, you must configure your Appwrite project to match the expected schema.

### 1. Create Project
- Create a new project in your [Appwrite Console](https://cloud.appwrite.io/).
- Copy your **Project ID** and **API Endpoint**.
- Update `src/appwrite.ts` with these values.

### 2. Database Setup
Create a Database with the ID: `game_db`

### 3. Collections
Create the following collections within `game_db`:

#### Collection: `leaderboard`
- **Permissions**: Set to `Document` level or `Collection` level (Read: Any, Write: Any).
- **Attributes**:
  - `username` (String, required)
  - `totalCookies` (Integer, required)
  - `updatedAt` (Datetime, required)

#### Collection: `upgrades` (Optional/Future)
- **Attributes**:
  - `name` (String)
  - `baseCost` (Integer)
  - `baseProduction` (Integer)
  - `type` (String: 'click' or 'passive')

## 📦 Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment
This project is optimized for **Cloudflare Pages**.
- Connect your GitHub repository to Cloudflare Pages.
- Set the Build Command to `npm run build`.
- Set the Output Directory to `dist`.
- Add your Appwrite environment variables in the Cloudflare dashboard if you choose to move configuration out of the source code.
# Nivle Hosting Platform

A modern, high-performance hosting provider frontend built with React, TypeScript, Hero UI, and Tailwind CSS. Designed for deployment on Cloudflare Pages.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **UI Library:** Hero UI (`@heroui/react`)
- **Styling:** Tailwind CSS
- **Routing:** Custom lightweight client-side routing
- **Database Integration:** MongoDB Atlas Data API (Ready)

## 📁 Project Structure

```text
project/
├── index.html          # Entry HTML file
├── src/
│   ├── main.tsx        # React entry point & Router
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── utils.ts        # Helper functions (formatting, colors)
│   ├── db.ts           # MongoDB Data API wrappers
│   ├── style.css       # Global styles & Design System tokens
│   └── components/     # Hero UI React components
│       ├── header.tsx
│       ├── footer.tsx
│       ├── home-page.tsx
│       ├── pricing-page.tsx
│       ├── dashboard-page.tsx
│       └── support-page.tsx
```

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

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🗄️ Database Setup (MongoDB Atlas)

This project is configured to use the **MongoDB Atlas Data API** for serverless database interactions. Currently, the application runs in a disconnected state with static fallback UI.

To enable live data:

1. Create a MongoDB Atlas cluster.
2. Enable the **Data API** in your Atlas dashboard.
3. Generate a Data API Key.
4. Open `src/db.ts` and update the configuration constants:
   ```typescript
   export const IS_DB_CONNECTED = true; // Change to true
   const MONGO_ENDPOINT = 'YOUR_DATA_API_ENDPOINT';
   const MONGO_API_KEY = 'YOUR_DATA_API_KEY';
   const DATA_SOURCE = 'Cluster0';
   const DATABASE_NAME = 'nivle_hosting';
   ```
5. Create the following collections in your database:
   - `plans` (Hosting plans)
   - `users` (User profiles)
   - `services` (Active hosting services)
   - `tickets` (Support tickets)

## ☁️ Deployment (Cloudflare Pages)

This project is optimized for Cloudflare Pages.

1. Connect your GitHub/GitLab repository to Cloudflare Pages.
2. Set the build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Add any necessary environment variables in the Cloudflare Pages dashboard.
4. Deploy!

## 🎨 Design System

The application uses a custom dark-mode-first design system defined in `src/style.css`. It leverages CSS variables to maintain consistency across Tailwind utility classes and Hero UI components.

- **Background:** Deep Midnight Blue (`#0A192F`)
- **Primary:** Electric Cyan (`#64FFDA`)
- **Text:** Light Slate (`#CCD6F6`)
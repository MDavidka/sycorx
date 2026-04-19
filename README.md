# NexusHost | Modern Cloud Infrastructure

A high-performance, production-ready web hosting platform landing page and dashboard. Built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Modern Minimalist Design**: Clean, breathable layouts with a professional dark/light theme.
- **Responsive SPA**: Fast, client-side routing with distinct pages (Home, Pricing, Dashboard, Support).
- **Interactive Dashboard**: Mock authenticated view for managing server instances, domains, and resource usage.
- **Accessible UI**: Built with Radix UI primitives via shadcn/ui for keyboard navigation and screen reader support.
- **Type-Safe**: Strict TypeScript configuration for robust development.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```
The compiled assets will be output to the `dist` directory.

## Database Configuration (MongoDB Atlas Data API)

Currently, the application is running in **Mock Mode** (`IS_DB_CONNECTED = false` in `src/db.ts`). It uses static placeholder data to demonstrate the UI without requiring immediate backend configuration.

To connect a real database using the **MongoDB Atlas Data API**:

1. **Create a MongoDB Atlas Cluster**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new cluster and database (e.g., `nexushost_db`).

2. **Enable the Data API**:
   - In your Atlas dashboard, navigate to **Data API** under the Services menu.
   - Enable the Data API for your cluster.
   - Generate an **API Key** and copy your **URL Endpoint**.

3. **Update `src/db.ts`**:
   - Open `src/db.ts`.
   - Change `IS_DB_CONNECTED` to `true`.
   - Implement the fetch wrappers using your new endpoint and API key. 
   *(Note: For a production application, never hardcode API keys in the frontend. You should proxy these requests through Cloudflare Workers or Pages Functions to keep your MongoDB API key secure).*

## Deployment to Cloudflare Pages

This project is optimized for deployment on Cloudflare Pages.

### Option 1: Deploy via GitHub/GitLab (Recommended)

1. Push this repository to GitHub or GitLab.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**.

### Option 2: Deploy via Wrangler CLI

If you prefer using the command line:

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```
2. Login to Cloudflare:
   ```bash
   wrangler login
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Deploy the `dist` folder:
   ```bash
   wrangler pages deploy dist
   ```

## Project Structure

```text
project/
├── index.html          # Root HTML shell
├── src/
│   ├── main.tsx        # React entry point & routing logic
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── utils.ts        # Helper functions (formatting, etc.)
│   ├── style.css       # Tailwind directives & design tokens
│   ├── db.ts           # Data fetching layer (Mock/MongoDB)
│   └── components/     # UI Components and Route Pages
│       ├── header.tsx
│       ├── footer.tsx
│       ├── home-page.tsx
│       ├── pricing-page.tsx
│       ├── dashboard-page.tsx
│       └── support-page.tsx
├── public/             # Static assets
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```
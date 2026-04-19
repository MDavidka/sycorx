# Nivle - Cloud Hosting for Modern Teams ☁️

Nivle is a modern, high-performance web hosting platform interface designed to provide users with scalable hosting solutions. It features a clean, "Cloud-Native" aesthetic, real-time server status monitoring, and a seamless checkout experience.

Built with **React**, **Vite**, **TypeScript**, and **Hero UI**, this project is optimized for speed, accessibility, and easy deployment to edge networks like Cloudflare Pages.

## ✨ Features

- **Modern UI/UX:** Built entirely with [Hero UI](https://heroui.com/) components for a cohesive, accessible, and beautiful design system.
- **Responsive Design:** Mobile-first approach ensuring the platform looks great on all devices.
- **Dynamic Pricing Plans:** Toggle between monthly and yearly billing cycles with automatic price calculations and savings badges.
- **Server Status Dashboard:** Real-time monitoring table displaying the operational status, uptime, and regions of core infrastructure services.
- **Interactive Checkout Flow:** Integrated modal system for seamless plan selection and subscription.
- **Dark Mode Ready:** Configured with Tailwind CSS dark mode and Hero UI's semantic color tokens.

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Hero UI](https://heroui.com/) (`@heroui/react`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository (or download the source code).
2. Navigate to the project directory:
   ```bash
   cd nivle-hosting
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
project/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── src/
    ├── main.tsx            # React entry point & App component
    ├── style.css           # Global styles & Design System tokens
    ├── types.ts            # Shared TypeScript interfaces
    ├── utils.ts            # Helper functions (formatting, etc.)
    ├── db.ts               # Data fetching logic & API wrappers
    └── components/         # Reusable Hero UI components
        ├── header.tsx      # Navigation bar
        ├── footer.tsx      # Site footer
        ├── plan-card.tsx   # Hosting plan display cards
        └── status-table.tsx# Server status monitoring table
```

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production into the `dist/` folder.
- `npm run preview`: Previews the production build locally.
- `npm run check`: Runs TypeScript type checking without emitting files.

## ☁️ Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub/GitLab repository.
2. Connect the repository to Cloudflare Pages.
3. Use the following build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

## 🎨 Design System

The application uses a custom CSS variable system defined in `src/style.css` that integrates seamlessly with Tailwind CSS and Hero UI. 

- **Primary:** Deep Indigo (`#3730a3` / `#6366f1`)
- **Accent:** Vibrant Cyan (`#0891b2` / `#22d3ee`)
- **Typography:** Inter (Sans-serif)

## 📄 License

This project is licensed under the MIT License.
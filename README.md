# Nivle Hosting Platform

Welcome to the **Nivle Hosting Platform** repository. This project is a modern, high-performance, cloud-native hosting company website built with React, Vite, TypeScript, Tailwind CSS, and Hero UI.

## 🚀 Features

- **Modern Minimalist Design:** A clean, breathable layout with a developer-first aesthetic.
- **Dark Mode First:** Native dark mode support using Hero UI and Tailwind CSS.
- **Responsive Layout:** Fully mobile-responsive design ensuring a seamless experience across all devices.
- **Interactive UI Components:** Built entirely using `@heroui/react` primitives (Cards, Modals, Tables, Navbars, etc.).
- **Client-Side Routing:** Fast, seamless navigation using `react-router-dom`.
- **Dashboard Area:** A protected user area for managing hosting instances, viewing active services, and checking billing status.
- **Database Ready:** Structured to integrate seamlessly with the MongoDB Atlas Data API for managing plans, users, and support tickets.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Hero UI](https://heroui.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

```text
nivle-hosting/
├── index.html                # Root HTML shell
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite bundler configuration
├── src/
│   ├── main.tsx              # React entry point and routing logic
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── utils.ts              # Shared helper functions
│   ├── style.css             # Global styles and Tailwind directives
│   ├── db.ts                 # Database integration logic (MongoDB Data API)
│   └── components/           # Hero UI React Components
│       ├── header.tsx        # Global navigation bar
│       ├── footer.tsx        # Global footer
│       ├── home-page.tsx     # Landing page
│       ├── pricing-page.tsx  # Hosting plans and pricing table
│       ├── dashboard-page.tsx# User dashboard for active services
│       └── contact-page.tsx  # Support ticket form
```

## 🚦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd nivle-hosting
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be output to the `dist/` directory. You can preview the production build locally using:

```bash
npm run preview
```

## 🗄️ Database Integration

This project is designed to use the **MongoDB Atlas Data API** to avoid heavy Node.js driver dependencies in edge environments like Cloudflare Pages. 

Currently, the application runs in a "mocked" state if no database is connected. To connect your database:

1. Open `src/db.ts`.
2. Update the `MONGO_ENDPOINT`, `MONGO_API_KEY`, `DATA_SOURCE`, and `DATABASE_NAME` constants with your MongoDB Atlas Data API credentials.
3. Set `export const IS_DB_CONNECTED = true;` to enable live data fetching.

## ☁️ Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub or GitLab repository.
2. Log in to the Cloudflare Dashboard and navigate to **Pages**.
3. Create a new project and connect your repository.
4. Configure the build settings:
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

## 📄 License

This project is proprietary and created for Nivle Hosting.
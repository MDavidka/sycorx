# The Mystery Nursery 🪴

Welcome to **The Mystery Nursery**, a playful, modern e-commerce storefront where customers purchase beautifully crafted pots and receive a randomly planted mystery seed. Embrace the surprise!

This project is built using a lightweight, high-performance stack featuring **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**, utilizing a custom client-side "mesh routing" system for a seamless Single Page Application (SPA) experience without the overhead of heavy frameworks.

## 🚀 Features

- **Vanilla TS SPA Routing**: Custom, lightweight client-side router (`src/main.ts`) handling navigation without page reloads.
- **State Management**: Cart state is persisted across sessions using `localStorage` (`src/utils.ts`).
- **Tailwind CSS Styling**: Utility-first styling with a custom earthy, botanical design system defined via CSS variables (`src/style.css`).
- **Responsive Design**: Mobile-first layouts ensuring a great experience on any device.
- **Playful UI**: Custom utility classes for slight, randomized rotational offsets to give the product cards an organic, "randomly planted" feel.

## 🛠 Tech Stack

- **Bundler**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN for rapid prototyping, mapped to custom CSS variables)
- **Deployment**: Ready for Cloudflare Pages or any static hosting provider.

## 📂 Project Structure

```text
project/
├── index.html                # Main HTML shell and entry point
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite bundler configuration
├── .gitignore                # Git ignore rules
├── README.md                 # Project documentation
└── src/
    ├── main.ts               # App entry point, layout orchestrator, and router
    ├── types.ts              # Shared TypeScript interfaces (Product, CartItem, Route, etc.)
    ├── utils.ts              # Helper functions (Cart management, currency formatting, randomizers)
    ├── style.css             # Global styles and design system CSS variables
    ├── components/           # Reusable UI components
    │   ├── header.ts         # Global navigation and cart counter
    │   ├── footer.ts         # Global footer with TOS links
    │   └── productCard.ts    # Reusable product display card
    └── pages/                # Route-level view components
        ├── home.ts           # Landing page with hero and featured items
        ├── shop.ts           # Full product catalog
        ├── checkout.ts       # Mock cart review and checkout form
        └── tos.ts            # Terms of Service and policies
```

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Starts the Vite development server with Hot Module Replacement (HMR).

- **Build for Production**:
  ```bash
  npm run build
  ```
  Compiles TypeScript and bundles the application into the `dist/` directory.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
  Locally serves the `dist/` directory to verify the production build.

- **Type Checking**:
  ```bash
  npm run check
  ```
  Runs the TypeScript compiler to check for type errors without emitting files.

## 🏗 Architecture Notes

### Mesh Routing
The application uses a custom router defined in `src/main.ts`. It intercepts clicks on elements with the `data-link` attribute, prevents the default browser navigation, updates the URL via the History API (`window.history.pushState`), and dynamically renders the corresponding page component into the `<main>` container.

### State Management
Cart data is managed via pure functions in `src/utils.ts` (`getCartItems`, `addToCart`, `updateCartQuantity`, etc.) which read from and write to the browser's `localStorage`. The Header component listens for a custom `cartUpdated` event to dynamically update the cart counter badge whenever items are added or removed.

### Styling Strategy
Global design tokens (colors, fonts, border radii) are defined as CSS custom properties in `:root` within `src/style.css`. Tailwind CSS utility classes are then used throughout the TypeScript components to apply these styles, ensuring a consistent and easily maintainable design system.
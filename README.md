# Modern Hosting Site

A high-performance, production-ready landing page and multi-page SPA built for modern hosting providers or tech businesses. Designed with a clean, minimalist aesthetic, it features a fully responsive layout, dark/light mode support, and seamless client-side routing.

## 🚀 Features

- **Multi-Page SPA:** Includes Home, About, Services, Pricing, Support, and Contact pages with smooth client-side routing.
- **Modern UI/UX:** Built with [shadcn/ui](https://ui.shadcn.com/) primitives and [Tailwind CSS](https://tailwindcss.com/) for a beautiful, accessible, and consistent design system.
- **Theming:** Built-in support for light and dark modes using CSS variables.
- **Responsive Design:** Mobile-first approach ensuring a perfect experience across all device sizes.
- **Type-Safe:** Developed entirely in [TypeScript](https://www.typescriptlang.org/) for robust and maintainable code.
- **Fast Development:** Powered by [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized production builds.

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Routing:** Custom lightweight History API router

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd modern-hosting-site
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

### Build for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be generated in the `dist` directory.

## 📂 Project Structure

```text
project/
├── index.html              # Root HTML shell
├── src/
│   ├── main.tsx            # React entry point & routing logic
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── utils.ts            # Utility functions (cn, formatters, etc.)
│   ├── style.css           # Tailwind directives & design system tokens
│   └── components/         # React components
│       ├── header.tsx      # Global navigation
│       ├── footer.tsx      # Global footer
│       ├── home-page.tsx   # Landing page
│       ├── about-page.tsx  # About us page
│       ├── services-page.tsx # Services overview
│       └── contact-page.tsx  # Contact form
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## ☁️ Deployment (Cloudflare Pages)

This project is optimized for deployment on **Cloudflare Pages**.

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. Configure the build settings:
   - **Framework preset:** `Vite` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

Cloudflare will automatically build and deploy your site, providing you with a live URL. Future pushes to your main branch will trigger automatic deployments.

## 📄 License

This project is licensed under the MIT License.
# Juspay Assignment - React Dashboard

A react dashboard built with shadcn/ui, tailwind css, motion, and zustand.
Features responsive layout, theming, data tables, charts, and client-side routing.

Live demo

- URL: https://juspay-assignment-zeta.vercel.app/dashboard/default

Tech stack

- Framework: React 19 + vite
- Routing: react-router v7
- State management: Zustand
- UI primitives: shadcn/ui, Recharts, TanStack Table
- Animations: Motion
- Maps: react-simple-maps + topojson-client
- Icons & toasts: lucide-react, sonner
- Tooling: eslint, prettier, husky, lint-staged
- Package manager: pnpm

Requirements

- Node.js 18.18+ (or 20+)
- pnpm 8+

Getting started

1. Clone and install

- pnpm install

2. Run the dev server

- pnpm dev
- App will be available at the URL printed by Vite (typically http://localhost:5173)

3. Build and preview production build

- pnpm build

Available scripts

- pnpm dev: Start Vite dev server
- pnpm build: Build for production
- pnpm preview: Preview the production build locally
- pnpm lint: Run ESLint

Development notes

- Path aliases
  - @ → ./src
  - Enabled in vite.config.js and jsconfig.json
  - Example: import Component from '@/components/Component'

- Styling and UI
  - Tailwind configured in tailwind.config.js with darkMode: 'class'
  - shadcn/ui components live in src/components/ui
  - Animation utilities: tailwindcss-animate

- Keyboard shortcuts
  - Toggle left sidebar: Ctrl/Cmd + B
  - Toggle activity sidebar: Ctrl/Cmd + Alt + B

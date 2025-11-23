# Juspay Assignment - React Dashboard

This project is a responsive React dashboard application built using `shadcn/ui`, Tailwind CSS, Motion, and Zustand. It features a modern design with theming, dynamic data tables, interactive charts, and client-side routing.

## Live Demo

- **URL**: https://juspay-assignment-zeta.vercel.app/dashboard/default

## Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **State Management**: Zustand
- **UI Primitives**: shadcn/ui, Recharts, TanStack Table
- **Animations**: Motion
- **Maps**: react-simple-maps + topojson-client
- **Tooling**: eslint, prettier
- **Package Manager**: pnpm

## Requirements

To run this project, you will need:

- Node.js 18.18+ (or 20+)
- pnpm 8+

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository and install dependencies**:

    ```bash
    git clone <repository-url>
    cd juspay-assignment
    pnpm install
    ```

2.  **Run the development server**:

    ```bash
    pnpm dev
    ```

    The application will be available at the URL printed by Vite (typically `http://localhost:5173`).

3.  **Build and preview the production build**:

    ```bash
    pnpm build
    pnpm preview
    ```

## Available Scripts

- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Builds the application for production.
- `pnpm preview`: Serves the production build locally for preview.
- `pnpm lint`: Runs ESLint to check for code quality issues.
- `pnpm test`: Runs the tests.

## Testing

This project utilizes Vitest for unit and integration testing.

To execute the tests:

```bash
pnpm test
```

## Development Notes

### Path Aliases

- `@` → `./src`
- Enabled in `vite.config.js` and `jsconfig.json`.
- Example: `import Component from '@/components/Component'`

### Styling and UI

- Tailwind CSS is configured in `tailwind.config.js` with `darkMode: 'class'`.
- `shadcn/ui` components are located in `src/components/ui`.
- Animation utilities are provided by `tailwindcss-animate`.

### Keyboard Shortcuts

- Toggle left sidebar: `Ctrl/Cmd + B`
- Toggle activity sidebar: `Ctrl/Cmd + Alt + B`

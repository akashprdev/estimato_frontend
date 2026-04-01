# quick-tanstack-start

A TanStack Start app with authentication, protected routes, husky, eslint, prettier setup.

## Tech stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, Vite 7)
- **Routing**: [TanStack Router](https://tanstack.com/router) with file-based routing
- **Data**: TanStack Query
- **UI**: Tailwind CSS, Base UI, Radix UI, shadcn-style components, Lucide icons
- **Tooling**: Eslint (lint & format)

## Getting started

```bash
pnpm install
pnpm dev
```

Runs the app at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description                  |
| -------------- | ---------------------------- |
| `pnpm dev`     | Start dev server (port 3000) |
| `pnpm build`   | Production build             |
| `pnpm preview` | Preview production build     |
| `pnpm test`    | Run tests (Vitest)           |
| `pnpm lint`    | Lint (eslint)                |
| `pnpm format`  | Format (eslint)              |

## Project structure

- **`src/routes/`** – File-based routes:
  - `/` – Home
  - `_authenticated/login` – Login page
  - `_protected/` – Dashboard, profile, settings (auth required)
- **`src/features/auth/`** – Auth feature (e.g. login form)
- **`src/components/ui/`** – Reusable UI components (button, card, input, select, etc.)
- **`src/services/`** – Services (e.g. auth)
- **`src/lib/utils.ts`** – Shared utilities

## Styling

The project uses [Tailwind CSS](https://tailwindcss.com/). Main styles live in `src/styles.css`.

To remove Tailwind:

1. Remove any demo pages in `src/routes/demo/` if present
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall: `pnpm remove @tailwindcss/vite tailwindcss`

## Routing

Routes are defined by files under `src/routes/`. Use `Link` from `@tanstack/react-router` for SPA navigation:

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/about">About</Link>;
```

Layout is in `src/routes/__root.tsx`. Route content is rendered where `{children}` is used in the root.

## Server functions

You can run server-only code via TanStack Start server functions:

```tsx
import { createServerFn } from '@tanstack/react-start';

const getServerTime = createServerFn({ method: 'GET' }).handler(async () => {
  return new Date().toISOString();
});
```

## API routes

Define API handlers in route files with the `server` property:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
});
```

- [Please provide feedback](https://www.linkedin.com/in/akash-pradhan/)

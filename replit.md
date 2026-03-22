# Overview

DevIt is a web development studio portfolio/landing page built as a full-stack application. The frontend is a single-page marketing site with sections for hero, services, portfolio, process, testimonials, contact, and footer. The backend is an Express server with PostgreSQL database support via Drizzle ORM. Currently the app is primarily a static landing page with minimal backend functionality (basic user CRUD scaffolding).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with two routes: Home (`/`) and a 404 catch-all
- **Styling**: Tailwind CSS with CSS variables for theming. Dark theme by default. Custom design tokens defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (new-york style) located in `client/src/components/ui/`. These are copy-pasted components, not installed as a package
- **Animations**: Framer Motion for scroll-triggered animations and transitions
- **Data Fetching**: TanStack React Query with a custom `apiRequest` helper in `client/src/lib/queryClient.ts`
- **Fonts**: Inter (sans), Space Grotesk (display), JetBrains Mono (mono) loaded from Google Fonts
- **Icons**: Lucide React icons and react-icons (for social media brand icons)

## Backend
- **Runtime**: Node.js with TypeScript, executed via `tsx`
- **Framework**: Express 5 with a raw HTTP server
- **API Pattern**: All API routes should be prefixed with `/api` and registered in `server/routes.ts`
- **Storage Layer**: Abstract `IStorage` interface in `server/storage.ts` with a `MemStorage` in-memory implementation as default. This can be swapped to a database-backed implementation
- **Dev Server**: Vite dev server runs as middleware in development mode (`server/vite.ts`), providing HMR
- **Production**: Static files served from `dist/public` via `server/static.ts`

## Build System
- **Client Build**: Vite builds to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`, with selected dependencies bundled (allowlist in `script/build.ts`) and others kept external
- **Scripts**: `dev` for development, `build` for production build, `start` for production run, `db:push` for schema migrations

## Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` — currently has a `users` table with `id` (UUID), `username`, and `password`
- **Validation**: Zod schemas auto-generated from Drizzle schema via `drizzle-zod`
- **Migrations**: Output to `./migrations` directory, managed by `drizzle-kit push`
- **Connection**: Requires `DATABASE_URL` environment variable pointing to a PostgreSQL instance
- **Session Store**: `connect-pg-simple` is listed as a dependency for PostgreSQL-backed sessions

## Project Structure
```
client/           # Frontend React app
  src/
    components/   # Page sections (hero, services, etc.) and ui/ (shadcn components)
    hooks/        # Custom React hooks
    lib/          # Utilities (queryClient, cn helper)
    pages/        # Route pages (home, not-found)
    index.css     # Global styles and theme variables
    main.tsx      # App entry point
server/           # Backend Express server
  index.ts        # Server entry point
  routes.ts       # API route registration
  storage.ts      # Data access layer
  static.ts       # Production static file serving
  vite.ts         # Dev server Vite integration
shared/           # Shared between client and server
  schema.ts       # Drizzle database schema and Zod types
```

## Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

# External Dependencies

- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable. Required for Drizzle ORM operations and session storage
- **Google Fonts**: Inter, Space Grotesk, and JetBrains Mono loaded via CDN
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` used in development on Replit
- **No external APIs currently integrated**: The contact form submits mock data with a simulated delay. Routes file is scaffolded but empty
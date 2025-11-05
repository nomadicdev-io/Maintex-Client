# Technology Stack & Build System

## Core Technologies

- **Runtime**: Bun (package manager and JavaScript runtime)
- **Frontend Framework**: React 19 with concurrent features
- **Build Tool**: Vite 7.2.0 with HMR and fast builds
- **Language**: TypeScript with strict null checks
- **Router**: TanStack Router with file-based routing and auto code splitting

## UI & Styling

- **UI Components**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS v4 with mobile-first approach
- **Animation**: Framer Motion for declarative animations
- **Theme System**: Next Themes with dark/light mode support
- **Icons**: Lucide React icon library

## State Management & Data

- **Global State**: Zustand for application-wide state
- **Atomic State**: Jotai for granular component state
- **Data Fetching**: TanStack Query with caching and synchronization
- **Forms**: TanStack Form with type-safe validation
- **Schema Validation**: Zod for runtime type checking

## Development Tools

- **Linting**: ESLint 9 with React hooks and refresh plugins
- **Type Checking**: TypeScript compiler with strict settings
- **CSS Processing**: PostCSS with Tailwind and autoprefixer
- **SCSS Support**: Sass with modern compiler API

## Authentication & Security

- **Auth System**: Better Auth for modern authentication flows
- **HTTP Client**: Axios with interceptors and error handling
- **Validation**: AJV for JSON schema validation

## Common Commands

```bash
# Development
bun dev              # Start dev server with HMR
bun dev:debug        # Start with debug logging

# Building
bun build-prod       # Production build
bun build:dev        # Development build with source maps

# Quality Assurance
bun lint             # Run ESLint
bun type-check       # TypeScript type checking

# Preview
bun serve            # Serve built application
bun preview:prod     # Preview in production mode
```

## Path Aliases

The project uses extensive path aliases for clean imports:

- `@/` → `./src/`
- `@components/` → `./src/components/`
- `@hooks/` → `./src/hooks/`
- `@store/` → `./src/store/`
- `@utils/` → `./src/utils/`
- `@assets/` → `./src/assets/`
- `@styles/` → `./src/assets/css/`
- `@api/` → `./src/api/`
- `@auth/` → `./src/auth/`

## Build Configuration

- **Output Directory**: `dist/`
- **Dev Server**: Configurable port via `VITE_PORT`
- **Proxy Setup**: `/v1/app/*` proxied to backend API
- **Code Splitting**: Automatic per-route splitting enabled
- **Tree Shaking**: Enabled for optimal bundle size
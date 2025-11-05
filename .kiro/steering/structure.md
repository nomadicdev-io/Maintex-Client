# Project Structure & Organization

## Root Directory Structure

```
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output
├── .kiro/                  # Kiro configuration and steering
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
└── components.json         # Shadcn/ui component configuration
```

## Source Directory (`src/`)

### Core Application Files
- `main.jsx` - Application entry point with React root
- `App.jsx` - Main app component with providers and router
- `routeTree.gen.ts` - Auto-generated route tree (do not edit manually)

### Directory Organization

#### `/api/` - API Layer
- `index.js` - API client configuration and base setup
- `endpoints.json` - API endpoint definitions

#### `/assets/` - Static Resources
- `/css/` - Global styles (Tailwind, SCSS)
- `/animations/` - Lottie and animation files

#### `/auth/` - Authentication
- `index.js` - Authentication utilities and configuration

#### `/components/` - React Components
- `/ui/` - Base UI components (Radix UI + custom styling)
- `/layouts/` - Page and section layout components
- `/forms/` - Form components and form-specific logic
- `/loaders/` - Loading states and skeleton components
- `/sections/` - Page section components
- `/providers/` - Context providers and wrappers
- `/theme/` - Theme-related components
- `/assistant-ui/` - AI assistant interface components
- `/fetch/` - Data fetching components

#### `/context/` - React Context
- Context providers for global state management

#### `/hooks/` - Custom React Hooks
- `useAuthStore.jsx` - Authentication state management
- `useAppControls.jsx` - Application control utilities
- `useAI.jsx` - AI assistant functionality
- `useSidebar.jsx` - Sidebar state management
- `useNetInfo.jsx` - Network information utilities

#### `/lang/` - Internationalization
- `index.js` - i18next configuration
- `/resources/` - Translation files

#### `/lib/` - Utility Libraries
- `utils.ts` - General utility functions
- `getCroppedImage.js` - Image processing utilities
- `getMetadata.js` - Metadata extraction
- `getUserAgent.js` - User agent detection

#### `/routes/` - File-based Routing
- `__root.jsx` - Root route layout
- `_auth.jsx` - Authentication layout
- `/_auth/` - Authentication-related routes
- `/app/` - Protected application routes

#### `/store/` - Static Data & Navigation
- `nav.jsx` - Navigation configuration
- `*.json` - Static data files (countries, job titles, skills)
- `imageFormats.js` - Supported image format definitions

## Naming Conventions

### Files & Directories
- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useAuthStore.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE or camelCase
- **Directories**: kebab-case or camelCase

### Component Organization
- One component per file
- Index files for barrel exports when needed
- Co-locate related components in subdirectories
- Separate UI components from business logic components

## Import Patterns

Use path aliases for clean imports:
```javascript
// Preferred
import { Button } from '@components/ui/Button'
import { useAuthStore } from '@hooks/useAuthStore'
import { formatDate } from '@utils/dateUtils'

// Avoid relative imports for distant files
import { Button } from '../../../components/ui/Button'
```

## Route Organization

- File-based routing with TanStack Router
- Protected routes under `/app/`
- Authentication routes under `/_auth/`
- Layout routes use underscore prefix (`_auth.jsx`)
- Route files generate TypeScript definitions automatically
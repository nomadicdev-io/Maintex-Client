# Maintex Pro Client Application | 1.0.0
![Maintex Pro Banner](https://storage.devpgs.app/u/S9l8fV.png)

## 🚀 Overview

**Maintex Pro** is a next-generation business management platform built for modern teams, facilities, and maintenance operations. With a user-friendly React frontend, Maintex Pro makes it effortless to handle your workflow, communication, and essential business tasks in one unified interface.

## ✨ Why Maintex Pro Stands Out

Maintex Pro goes beyond traditional management apps by combining a thoughtful, scalable architecture with a refined and accessible user experience. Designed to support facilities managers, field teams, and administrators alike, Maintex Pro offers comprehensive tools without sacrificing ease of use. Whether you're dispatching work orders, scheduling staff, or tracking progress, Maintex Pro adapts to your needs and grows with your organization.

## 🎯 Key Features

### 💼 **Business Management Dashboard**
- **Work Order Management**: Easily generate, assign, and track work orders in real time
- **Team Scheduling**: Powerful, calendar-driven tools for scheduling staff and tasks
- **Client and Asset Records**: Organize client details, asset history, and service documentation
- **Role-based Collaboration**: Permissions and controls tailored for teams large and small

### 🎨 **Cutting-edge User Experience**
- **Fully Responsive**: Seamlessly adapts to desktop, tablet, and mobile devices
- **Dark & Light Themes**: Instantly switch between color schemes, with automatic system preference detection
- **Motion & Visual Feedback**: Framer Motion-powered interactions for clarity and delight
- **Accessibility First**: WCAG-compliant interfaces with robust keyboard and screen reader support

### 🔐 **Enterprise-grade Security**
- **Modern Authentication**: Secure logins, session handling, and role separation
- **Flexible Access Controls**: Configure permissions across roles and departments
- **Email Verification & Recovery**: Reliable workflows for login and user support
- **Persistent Sessions**: Users stay logged in securely across visits

### 📱 **Real-Time & Connected**
- **Live Synchronization**: Changes update instantly across devices and sessions
- **Tracking & Maps**: Visualize field teams and assets with integrated location tools
- **Instant Notifications**: Stay informed on the go with alerts and reminders
- **Progressive Web App Support**: Works offline and installs like a native app

### 🛠 **Developer & Extensibility Focused**
- **TypeScript by Default**: Typing and IDE support throughout the codebase
- **Component System**: Radix UI primitives with custom design for scalability
- **Fast Feedback**: Vite HMR for efficient local development
- **Code Splitting**: Automatic, per-route loading for optimal app performance
- **Full API Integration**: Axio-powered network layer aligned with backend services

### ⚡ **Optimized for Performance**
- **Latest React Features**: Concurrent rendering and advanced optimizations
- **Lazy Loading & Bundling**: On-demand loading for snappy UX
- **Smart Image Handling**: Responsive images with lazy loading
- **Bundle-size Minimization**: Leverages tree-shaking and code splitting

## 🏗 Architecture Highlights

- **Component-Driven Design**: Modular, reusable, and themeable
- **Type-Safe File-based Routing**: Powered by TanStack Router
- **Flexible State Management**: Hybrid of Zustand (global) and Jotai (local/atomic)
- **Reliable API Layer**: Axios with request/response interceptors and error boundaries
- **Responsive UI**: Tailwind CSS for effortless, mobile-first styling

## 📋 Available Commands

### Development Commands
```bash
# Start the dev server with hot reloading
bun dev
# Launches the Vite server (default: http://localhost:8281)

# Start with debug-level logging
bun dev:debug
# Shows internal logs for troubleshooting

# Build for development
bun build:dev
# Output development build with source maps

# Build for production
bun build
# Produce optimized, production-ready output
```

### Preview & Deployment
```bash
# Serve the built app locally
bun serve
# Test your real build locally

# Preview using production environment
bun preview:prod
# Run preview server in production mode
```

### Code Quality & Testing
```bash
# Lint your codebase
bun lint
# Check for formatting and code quality issues

# Run TypeScript type checks
bun type-check
# Ensure code correctness without emitting output
```

## 🌐 Application URLs

### Development Environment

| URL | Purpose | Description |
|-----|---------|-------------|
| **http://localhost:8281** | Maintex Pro Frontend | Your business's main application |
| **http://localhost:8281/auth/login** | User Login | Secure access for your team |
| **http://localhost:8281/app** | Dashboard | The central control hub (requires authentication) |
| **http://localhost:8281/app/work-orders** | Work Orders | Assignments and job status management |
| **http://localhost:8281/app/schedules** | Scheduling | Team and resource calendars |
| **http://localhost:8281/app/clients** | Clients | Manage client and company records |
| **http://localhost:8281/app/teams** | Team Management | Add, remove, and organize staff |
| **http://localhost:8281/app/tracking** | Tracking | Visual location and progress tracking |

### API Integration (Proxied)

Maintex Pro connects to your backend securely using Vite's proxy (in dev):

**Proxied Endpoints (Development)**
- `/en/api/*` &rarr; Maintex Pro API (data and business logic)
- `/en/auth/*` &rarr; Authentication (login, registration, sessions)
- `/health` &rarr; Health check endpoint

**API Highlights**
- **Authentication**: Full lifecycle: signup, login, password recovery
- **Live Data**: Instant updates with TanStack Query
- **Robust Error Handling**: Friendly user feedback, global error boundaries
- **Offline Mode**: Service worker for no-connection support

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd Maintex-Pro/client
   bun install
   ```

2. **Configure Environment**
   ```bash
   # Copy and edit your environment files
   cp .env.example .env.development
   cp .env.example .env.production

   # Fill in API URLs in .env.development
   VITE_API_URL=http://localhost:8281/en/api/v1
   VITE_AUTH_URL=http://localhost:8281/en/auth
   ```

3. **Run the Development Server**
   ```bash
   bun dev
   # Open http://localhost:8281 in your browser
   ```

4. **Explore Maintex Pro**
   - Visit the root URL for the main dashboard
   - Access authentication at `/auth/login`
   - Use `/app` for post-login dashboard features
   - Enable devtools for enhanced developer experience

5. **(Optional) Connect to Backend API**
   - Run the Maintex API/backend on port 8280 (default)
   - The Vite proxy setup will automatically forward API calls
   - Authentication and real-time updates work out-of-the-box

## 🎨 Maintex Pro Is Perfect For

- **Facilities Management**: Streamline jobs, scheduling, and staff workflows
- **Agile Teams**: Fast UI prototyping and scalable production deployments
- **Modern Web Development**: Reference architecture for React, API, and real-time apps
- **Responsive Experience**: Deliver a polished UI for every device
- **Multi-user Collaboration**: Role-based access, from field teams to management
- **Progressive Web Applications**: Native-like features, even offline

## 🛠 Technology Stack

- **Frontend Framework**: React 19 (Concurrent, future-ready UI)
- **Build Tool**: Vite (Fast startup, hot reloads)
- **Language**: TypeScript (Safety and DX by default)
- **Router**: TanStack Router (Type-safe, file-based)
- **State Management**: Zustand & Jotai (Best of both global and granular state)
- **UI Library**: Radix UI (Accessible, unstyled components)
- **Styling**: Tailwind CSS v4 (Rapid, mobile-first styles)
- **Animation**: Framer Motion (Declarative, rich UI animations)
- **Networking**: Axios (Robust, promise-based HTTP)
- **Authentication**: Better Auth (Secure, modern auth flows)
- **Forms**: TanStack Form (Typed and flexible form management)
- **Data Fetching**: TanStack Query (Smart, cache-friendly state)
- **Theme System**: Next Themes (User-controlled color schemes)
- **Runtime**: Bun (Ultra-fast JS runtime and package manager)

---

**Maintex Pro helps you manage your business, your way.**  
Start developing today with `bun dev` and discover a truly modern web platform! 🚀

*Built with ❤️ by Planet Green Solutions*

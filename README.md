# PGS iO Client | 1.0.0
![Maintex Pro Banner](https://storage.quadbits.app/7u1eamzlY6sM.png)

## 🚀 Overview

**PGS iO** is a next-generation business management platform built for modern teams, facilities, and maintenance operations. With a user-friendly React frontend, PGS iO makes it effortless to handle your workflow, communication, and essential business tasks in one unified interface.

## ✨ Why PGS iO Stands Out

PGS iO goes beyond traditional management apps by combining a thoughtful, scalable architecture with a refined and accessible user experience. Designed to support facilities managers, field teams, and administrators alike, PGS iO offers comprehensive tools without sacrificing ease of use. Whether you're dispatching work orders, scheduling staff, or tracking progress, PGS iO adapts to your needs and grows with your organization.

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
# Launches the Vite server with HMR

# Start with debug-level logging
bun dev:debug
# Shows internal logs for troubleshooting

# Build for development
bun build:dev
# Output development build with source maps

# Build for production
bun build-prod
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

## 🌐 Development Environment

The application runs on a configurable port (check your environment variables) with the following structure:

### API Integration

PGS iO connects to your backend securely using Vite's proxy configuration:

**Proxied Endpoints (Development)**
- `/v1/app/*` → Backend API (proxied and rewritten)

**API Features**
- **Authentication**: Full lifecycle with Better Auth
- **Live Data**: Real-time updates with TanStack Query
- **Error Handling**: Global error boundaries and user feedback
- **Type Safety**: Full TypeScript integration

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd pgs-io-client
   bun install
   ```

2. **Configure Environment**
   ```bash
   # Set up your environment variables
   # Configure VITE_PORT and VITE_API_BASE_URL as needed
   ```

3. **Run the Development Server**
   ```bash
   bun dev
   # Opens automatically in your browser
   ```

4. **Explore PGS iO**
   - File-based routing with TanStack Router
   - Hot module replacement for fast development
   - TypeScript support throughout
   - Integrated devtools for debugging

## 🎨 PGS iO Is Perfect For

- **Facilities Management**: Streamline jobs, scheduling, and staff workflows
- **Modern Development**: Reference architecture for React applications
- **Responsive Experience**: Deliver a polished UI for every device
- **Team Collaboration**: Role-based access and permissions
- **Progressive Web Applications**: Native-like features with offline support

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

**PGS iO helps you manage your business, your way.**  
Start developing today with `bun dev` and discover a truly modern web platform! 🚀

*Built with ❤️ by Planet Green Solutions*

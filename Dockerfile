# Use Bun official image as base
FROM oven/bun:1.3.1 AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1.3.1-slim AS production
WORKDIR /app

# Install serve to serve the static files
RUN bun add -g serve

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 8881

# Serve the application
CMD ["serve", "-s", "dist", "-l", "8881"]
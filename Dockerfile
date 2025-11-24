# Build stage
FROM oven/bun:latest as build

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install all dependencies (including devDependencies needed for build)
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Copy build artifacts from build stage
COPY --from=build /app/dist /app/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8808
ENV VITE_PORT=8808

# Expose the port
EXPOSE 8808

# Use vite preview to serve the built static files
CMD ["bunx", "--bun", "vite", "preview", "--host", "0.0.0.0", "--port", "8808"]
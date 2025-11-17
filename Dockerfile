# Build stage
# Using Bun 1.0.30 which has Node.js 20.x (compatible with tree-sitter)
FROM oven/bun:latest AS build

WORKDIR /app

# Install Python and build tools for native module compilation
RUN apt-get update && \
    apt-get install -y python3 python3-pip build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:latest

WORKDIR /app

# Install a simple http server to serve static content
RUN bun install --global serve

# Copy build artifacts from build stage
COPY --from=build /app/dist /app/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8808

# Expose the port
EXPOSE 8808

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "8808"]
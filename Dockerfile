# Stage 1: Build the Vite + React application with Bun
FROM oven/bun:latest as builder

WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Serve the build with Bun
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/dist ./dist
# Install serve package for serving static files
RUN bun add -g serve
EXPOSE 8881
CMD ["bun", "x", "serve", "-s", "dist", "-p", "8881"]
# Stage 1: Build the Vite + React application with Bun
FROM oven/bun:latest as builder

WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Serve the build with nginx
FROM nginx:alpine
WORKDIR /app
# Install wget for healthcheck
RUN apk add --no-cache wget
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8881
CMD ["nginx", "-g", "daemon off;"]
# Build stage
FROM node:24 as build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:24

WORKDIR /app

# Install a simple http server to serve static content
RUN npm install --global serve

# Copy build artifacts from build stage
COPY --from=build /app/dist /app/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8808

# Expose the port
EXPOSE 8808

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "8808"]
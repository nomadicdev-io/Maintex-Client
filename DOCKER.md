# Docker Setup for Maintex Pro

## Quick Start

### Production Mode
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode
```bash
# Start with development profile
docker-compose --profile dev up -d

# Or start only development frontend with hot reloading
docker-compose up maintex-dev postgres redis -d
```

## Available Services

- **maintex-frontend** (port 8808) - Production React app
- **maintex-dev** (port 8808) - Development React app with hot reloading
- **maintex-backend** (port 8880) - Backend API (placeholder)
- **postgres** (port 5432) - PostgreSQL database
- **redis** (port 6379) - Redis cache
- **nginx** (ports 80/443) - Reverse proxy (production profile)

## Environment Variables

The application uses environment variables from `.env` file. Key variables:

- `VITE_API_URL` - Backend API endpoint
- `VITE_PORT` - Frontend port (default: 8808)
- `POSTGRES_DB` - Database name
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password

## Profiles

### Default Profile
- Frontend (production build)
- Backend (placeholder)
- PostgreSQL
- Redis

### Development Profile (`--profile dev`)
- Development frontend with hot reloading
- Backend (placeholder)
- PostgreSQL
- Redis

### Production Profile (`--profile production`)
- All default services
- Nginx reverse proxy

## Database Initialization

Place SQL initialization scripts in `./init-db/` directory. They will be executed when PostgreSQL starts for the first time.

## Volumes

- `postgres_data` - PostgreSQL data persistence
- `redis_data` - Redis data persistence

## Health Checks

Both PostgreSQL and Redis include health checks to ensure services are ready before dependent services start.

## Customization

1. **Backend Service**: Replace the placeholder backend service with your actual backend configuration
2. **Environment**: Modify `docker-compose.override.yml` for local development settings
3. **Nginx**: Customize `nginx.conf` for production routing needs
4. **SSL**: Add SSL certificates to `./ssl/` directory for HTTPS support
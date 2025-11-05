# Development Guide - Vite Proxy Setup

## 🚀 Quick Start

The Vite development server now includes API proxy configuration that automatically forwards API requests to your backend server.

### Development Environment Variables

Create a `.env.development` file in the `client/` directory:

```bash
# Development Environment Configuration
VITE_NODE_ENV=development
VITE_PORT=8281
VITE_DEBUG=true

# Development API URLs (using proxy paths - pointing to dev server)
VITE_API_URL=http://localhost:8281/en/api/v1
VITE_AUTH_URL=http://localhost:8281/en/auth
VITE_DEVELOPER_URL=http://localhost:8281

# App Configuration
VITE_APP_VERSION=1.0.0-dev
VITE_APP_SECRET_KEY=dev-secret-key
```

### Production Environment Variables

Create a `.env.production` file in the `client/` directory:

```bash
# Production Environment Configuration
VITE_NODE_ENV=production
VITE_PORT=80
VITE_DEBUG=false

# Production API URLs (adjust for your domain)
VITE_API_URL=https://yourdomain.com/en/api/v1
VITE_AUTH_URL=https://yourdomain.com/en/auth
VITE_DEVELOPER_URL=https://yourdomain.com

# App Configuration  
VITE_APP_VERSION=1.0.0
VITE_APP_SECRET_KEY=your-production-secret
```

## 🔧 How the Proxy Works

### Development Mode (`bun dev`)
1. **Frontend runs on**: `http://localhost:8281`
2. **Backend runs on**: `http://localhost:8280`
3. **Proxy configuration**:
   - `/en/api/*` → `http://localhost:8280/en/api/*`
   - `/en/auth/*` → `http://localhost:8280/en/auth/*`
   - `/health` → `http://localhost:8280/en/api/v1/health`

### How to Use
1. **Start your backend server** (on port 8280):
   ```bash
   cd server
   bun run server.ts
   ```

2. **Start the frontend dev server** (with proxy):
   ```bash
   cd client
   bun dev
   ```

3. **Make API calls** using the proxy URLs:
   ```javascript
   // Your API calls will automatically be proxied
   const response = await fetch('/en/api/v1/some-endpoint')
   ```

## 🌐 URL Configuration

### Development URLs
- **Frontend**: `http://localhost:8281`
- **API Calls**: `http://localhost:8281/en/api/v1/*` (proxied to backend)
- **Auth Calls**: `http://localhost:8281/en/auth/*` (proxied to backend)

### Production URLs (with nginx)
- **Frontend**: `http://yourdomain.com` (served by nginx)
- **API Calls**: `http://yourdomain.com/en/api/v1/*` (proxied by nginx)
- **Auth Calls**: `http://yourdomain.com/en/auth/*` (proxied by nginx)

## 🔍 Proxy Features

### Logging
The proxy includes detailed logging:
- **Request logging**: Shows outgoing requests to backend
- **Response logging**: Shows responses from backend  
- **Error logging**: Shows any proxy errors

### WebSocket Support
- WebSocket connections are supported through the proxy
- Real-time features will work in development

### CORS Handling
- No CORS issues in development
- Proxy handles all cross-origin requests

## 🛠️ Troubleshooting

### Common Issues

1. **Backend not running**
   ```
   Error: Proxy error: ECONNREFUSED
   ```
   **Solution**: Make sure your backend server is running on port 8280

2. **Wrong API URL in environment**
   ```
   Network Error: 404 Not Found
   ```
   **Solution**: Check that `VITE_API_URL` points to `http://localhost:8281/en/api/v1`

3. **Proxy not working**
   ```
   CORS errors in development
   ```
   **Solution**: Restart the dev server and ensure proxy config is correct

### Debug Steps

1. **Check backend server**:
   ```bash
   curl http://localhost:8280/en/api/v1/health
   ```

2. **Check proxy requests**:
   - Open browser dev tools
   - Check Network tab for `/en/api/*` requests
   - Look for proxy logs in terminal

3. **Verify environment variables**:
   ```javascript
   console.log('API URL:', import.meta.env.VITE_API_URL)
   ```

## 📦 Scripts

Add these to your `package.json` for easier development:

```json
{
  "scripts": {
    "dev": "bunx --bun vite",
    "dev:debug": "DEBUG=vite:* bunx --bun vite",
    "build": "bunx --bun vite build",
    "build:dev": "bunx --bun vite build --mode development",
    "preview": "bunx --bun vite preview",
    "preview:prod": "bunx --bun vite preview --mode production"
  }
}
```

## 🚀 Best Practices

1. **Environment-specific configs**: Use different `.env` files for different environments
2. **Proxy logging**: Monitor proxy logs during development
3. **Backend first**: Always start backend before frontend in development
4. **Environment validation**: Validate required environment variables on startup

## 🔄 Workflow

### Daily Development
1. Start backend: `cd server && bun run server.ts`
2. Start frontend: `cd client && bun dev`
3. Access app: `http://localhost:8281`

### Testing Production Build
1. Build with production config: `bun run build`
2. Test with preview: `bun run preview`
3. Deploy with Docker: `docker-compose up --build`
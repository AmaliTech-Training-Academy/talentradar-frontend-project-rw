# Docker Setup for TalentRadar Frontend

This directory contains Docker configurations for the TalentRadar frontend application built with Next.js 15.

## Files Overview

- `Dockerfile` - Production-optimized multi-stage Docker image
- `Dockerfile.dev` - Development Docker image with hot reloading
- `docker-compose.yml` - Production container orchestration
- `docker-compose.dev.yml` - Development container orchestration
- `.dockerignore` - Files and directories to exclude from Docker context

## Quick Start

### Production Build

```bash
# Build and run the production container
docker-compose up --build

# Or build and run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f talentradar-frontend

# Stop the container
docker-compose down
```

### Development Build

```bash
# Build and run the development container with hot reloading
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build

# Stop the development container
docker-compose -f docker-compose.dev.yml down
```

### Manual Docker Commands

#### Production

```bash
# Build the production image
docker build -t talentradar-frontend:latest .

# Run the production container
docker run -p 3000:3000 --name talentradar-frontend talentradar-frontend:latest
```

#### Development

```bash
# Build the development image
docker build -f Dockerfile.dev -t talentradar-frontend:dev .

# Run the development container with volume mounting
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules --name talentradar-frontend-dev talentradar-frontend:dev
```

## Environment Variables

The following environment variables are available:

- `NODE_ENV` - Set to 'production' or 'development'
- `NEXT_TELEMETRY_DISABLED` - Disable Next.js telemetry (set to 1)
- `PORT` - Port number (default: 3000)
- `HOSTNAME` - Hostname (default: "0.0.0.0")

## Docker Image Details

### Production Image (`Dockerfile`)

- **Base Image**: node:18-alpine
- **Multi-stage build** for optimized image size
- **Standalone output** enabled for minimal runtime dependencies
- **Non-root user** for security
- **Layer caching** optimized for faster builds
- **Final image size**: ~150MB (approximately)

### Development Image (`Dockerfile.dev`)

- **Base Image**: node:18-alpine
- **Hot reloading** enabled
- **Volume mounting** for real-time code changes
- **Turbopack** enabled for faster development builds

## Health Checks

The production docker-compose includes health checks that verify the application is running correctly:

- **Endpoint**: http://localhost:3000/api/health
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3
- **Start Period**: 40 seconds

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Use a different port
   docker run -p 3001:3000 talentradar-frontend:latest
   ```

2. **Build failures**
   ```bash
   # Clear Docker cache and rebuild
   docker system prune -a
   docker-compose build --no-cache
   ```

3. **Permission issues**
   ```bash
   # Ensure proper file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

```bash
# View container logs
docker logs talentradar-frontend

# View logs with docker-compose
docker-compose logs -f

# Execute commands inside running container
docker exec -it talentradar-frontend sh

# Inspect container
docker inspect talentradar-frontend
```

## Performance Optimization

The production Dockerfile includes several optimizations:

1. **Multi-stage builds** to reduce final image size
2. **Dependency caching** with separate layers for package.json
3. **Standalone output** for minimal runtime dependencies
4. **Non-root user** for security
5. **Alpine Linux** for smaller base image
6. **Layer optimization** for better Docker cache utilization

## Security Considerations

- Uses non-root user (`nextjs`) in production
- Minimal attack surface with Alpine Linux
- No sensitive information in Docker images
- Health checks for container monitoring

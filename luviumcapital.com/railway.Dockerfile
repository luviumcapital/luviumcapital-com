FROM node:20-slim AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install nginx, tini, and other runtime dependencies
RUN apt-get update && \
    apt-get install -y nginx tini && \
    rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Copy built application from builder
COPY --from=builder /app ./

# Copy nginx configuration
COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Start nginx in background\n\
nginx -g "daemon off;" &\n\
NGINX_PID=$!\n\
\n\
# Start the application\n\
cd /app\n\
if [ "$NODE_ENV" = "production" ]; then\n\
  echo "Starting application in production mode..."\n\
  PORT=3000 pnpm start &\n\
else\n\
  echo "Starting application in development mode..."\n\
  PORT=3000 pnpm dev &\n\
fi\n\
APP_PID=$!\n\
\n\
# Wait for either process to exit\n\
wait -n $NGINX_PID $APP_PID\n\
\n\
# Exit with status of process that exited first\n\
EXIT_STATUS=$?\n\
\n\
# Kill the other process\n\
kill $NGINX_PID $APP_PID 2>/dev/null || true\n\
\n\
exit $EXIT_STATUS\n\
' > /start.sh && chmod +x /start.sh

# Expose port (Railway will map this to 443 externally)
EXPOSE 8000

# Use tini as init system
ENTRYPOINT ["/usr/bin/tini", "--"]

# Start both nginx and app
CMD ["/start.sh"]

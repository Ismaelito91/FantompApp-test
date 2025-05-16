FROM bitnami/nginx:1.27.4

# Set working directory inside container
WORKDIR /app

# Copy built Angular app from local dist/ directory
COPY dist/fantome-app-frontend/browser/ /app

# Replace default nginx configuration with your own
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/default.conf

# Dockerfile

# --- Stage 1: Build the Vite Application ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json .
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build


# --- Stage 2: Serve the Static Files with Nginx ---
FROM nginx:alpine AS final

# Remove default Nginx config and replace with our custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the 'build' stage
# Default Vite output directory is 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# The frontend container will expose this port internally
EXPOSE 80

# Default Nginx command starts the server
CMD ["nginx", "-g", "daemon off;"]
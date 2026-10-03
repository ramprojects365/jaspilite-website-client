# Stage 1: Build Angular application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine
# Copy compiled Angular assets (dist/browser)
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copy nginx template for dynamic PORT and BACKEND_URL
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=80
ENV BACKEND_URL=https://jaspilite-website-server-production.up.railway.app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

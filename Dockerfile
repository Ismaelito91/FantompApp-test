FROM node:20.11 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

FROM bitnami/nginx:1.27.4

COPY --from=build /app/dist/fantome-app-frontend/browser /app

# Default conf, kubernetes will override 
COPY nginx.conf /opt/bitnami/nginx/conf/server_blocks/my_app.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

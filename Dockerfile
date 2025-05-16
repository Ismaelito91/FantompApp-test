FROM bitnami/nginx:1.27.4
COPY ./dist/fantome-app-frontend /app
COPY ./default.conf /opt/bitnami/nginx/conf/server_blocks/frontend.conf
EXPOSE 8080

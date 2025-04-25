FROM bitnami/nginx:1.27.4
COPY ./dist /app
COPY ./default.conf /opt/bitnami/nginx/conf/server_blocks/front.conf
EXPOSE 8080

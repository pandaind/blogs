FROM alpine:latest as builder
WORKDIR /app
COPY . .
COPY config-docker.yml config.yml
RUN apk add --no-cache hugo
RUN hugo --minify

FROM nginx:stable-alpine
# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built Hugo website from the previous stage
COPY --from=builder /app/public /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

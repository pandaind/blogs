FROM alpine:latest as builder
WORKDIR /app
COPY . .
RUN apk add --no-cache hugo
RUN hugo

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -f /usr/share/nginx/html/*.html
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

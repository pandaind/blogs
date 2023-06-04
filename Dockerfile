FROM alpine:latest as builder
WORKDIR /app
COPY . .
RUN apk add --no-cache hugo
RUN hugo

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/public /usr/share/nginx/html

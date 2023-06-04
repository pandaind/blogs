FROM alpine:latest as builder
WORKDIR /app
COPY . .
RUN apk add --no-cache hugo
RUN hugo

FROM nginx:alpine
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
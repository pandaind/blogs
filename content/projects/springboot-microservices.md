---
title: "E-Commerce Microservices"
date: 2025-01-20
description: "An e-commerce backend split into Spring Boot services."
tags: ["Spring Boot", "Microservices", "Spring Cloud", "Kubernetes", "Docker", "Kafka"]
cover: "img/springboot-microservices.png"
repo: "https://github.com/pandaind/springboot-microservices"
stack: ["Spring Boot", "Spring Cloud", "Java 21", "PostgreSQL", "MongoDB", "Kafka", "Kubernetes", "Docker"]
weight: 9
year: 2025
---
An e-commerce backend broken into services, to see how the pieces fit together. Customer, product, order, payment and notification services sit behind an API gateway, with a config server and Eureka for configuration and discovery.

Orders and payments publish events on Kafka, requests are traced with Zipkin, and data lives in PostgreSQL and MongoDB. It runs on Docker Compose or Kubernetes.

```bash
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml up -d
```

The gateway is at `http://localhost:8080` and Eureka at `http://localhost:8761`.

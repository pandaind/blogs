---
title: "Pandac Store - Plant E-Commerce Platform"
date: 2025-06-15
description: "A plant shop with React, Spring Boot and Stripe."
tags: ["Spring Boot", "React", "E-Commerce", "Docker", "Full-Stack"]
cover: "img/pandac-store.png"
repo: "https://github.com/pandaind/pandac-store"
stack: ["React", "Spring Boot", "Java 21", "MySQL", "Nginx", "Docker", "Stripe"]
weight: 6
year: 2025
---
A small plant shop built end to end. React 19 on the front, a Spring Boot API behind it, MySQL for data and Nginx in front of both, all started with Docker Compose.

Customers can browse, add to a cart with discount codes, pay through Stripe and see their orders. An admin side manages products, orders and users. Login is JWT and schema changes go through Flyway.

Put your Stripe keys in `.env`, then:

```bash
docker-compose up -d
```

The shop is at `http://localhost`.

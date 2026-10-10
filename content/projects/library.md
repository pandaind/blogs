---
title: "Library Management System"
date: 2025-08-10
description: "A library system with GraphQL and gRPC."
tags: ["Spring Boot", "GraphQL", "gRPC", "Java", "Microservices", "Docker", "PostgreSQL"]
cover: "img/library-system.png"
repo: "https://github.com/pandaind/library"
stack: ["Spring Boot", "GraphQL", "gRPC", "Java 17", "PostgreSQL", "Docker", "Protocol Buffers"]
weight: 9
year: 2025
---
A library management system for trying GraphQL and gRPC together. A gateway exposes a GraphQL API, the user and book services talk to each other over gRPC, and PostgreSQL stores the data. Users can register, browse the catalogue and borrow books.

Docker Compose starts every service, and a Postman collection covers the API.

```bash
git clone https://github.com/pandaind/library.git
cd library
docker-compose up -d
```

GraphQL is served at `http://localhost:8080/graphql`.

---
title: "E-Commerce Microservices"
date: 2025-01-20
description: "Learning project: Microservices architecture with Spring Boot, Spring Cloud, and Kubernetes."
abstract: "Educational e-commerce platform demonstrating microservices architecture with Spring Boot 3.x, Spring Cloud, service discovery, API gateway, event-driven communication, and Kubernetes deployment."
tags: ["Spring Boot", "Microservices", "Spring Cloud", "Kubernetes", "Docker", "Kafka"]
cover: "img/springboot-microservices.png"
repo: "https://github.com/pandaind/springboot-microservices"
stack: ["Spring Boot", "Spring Cloud", "Java 21", "PostgreSQL", "MongoDB", "Kafka", "Kubernetes", "Docker"]
status: "Learning"
featured: false
weight: 4
year: 2025
---

## 🧭 Overview

An e-commerce platform demonstrating microservices architecture with Spring Boot. The system includes multiple independent services communicating through REST APIs and event streaming, with centralized configuration, service discovery, and API gateway patterns.

**E-Commerce Microservices** is an educational project built with **Spring Boot 3.x** and **Spring Cloud**. The architecture includes 5 business services (Customer, Product, Order, Payment, Notification), 3 infrastructure services (Config Server, Discovery, Gateway), and supporting components like PostgreSQL, MongoDB, Kafka, and Zipkin.

Topics covered:

- 🏗️ **Microservices Architecture** → Independent services with defined boundaries
- 🔍 **Service Discovery** → Eureka server for dynamic service registration
- 🌐 **API Gateway** → Centralized routing and load balancing
- ⚙️ **Centralized Config** → Spring Cloud Config Server
- 📡 **Event-Driven** → Kafka for asynchronous communication
- 🐳 **Deployment** → Docker Compose and Kubernetes options

------

## 🔑 Key Features

- **Service Discovery** → Eureka for automatic service registration and discovery
- **API Gateway** → Single entry point with routing and load balancing
- **Config Server** → Centralized configuration management
- **Event Streaming** → Kafka for order and payment events
- **Distributed Tracing** → Zipkin for request tracking across services
- **Multiple Databases** → PostgreSQL for transactional data, MongoDB for notifications
- **Container Orchestration** → Docker Compose and Kubernetes deployment
- **Monitoring Tools** → PgAdmin, Mongo Express, MailDev for development

------

## ⚙️ How It Works

```bash
# Start everything
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml up -d
```

Access API Gateway at `http://localhost:8080`, Eureka at `http://localhost:8761`

------

## 📦 Services Breakdown

### Infrastructure Services
- **Config Server (8888)** → Centralized configuration management with Spring Cloud Config
- **Discovery Service (8761)** → Eureka server for service registry
- **Gateway Service (8080)** → API Gateway for routing and load balancing

### Business Services
- **Customer Service (8090)** → Customer management and profiles
- **Product Service (8050)** → Product catalog and inventory, includes Flyway migrations
- **Order Service (8070)** → Order processing and management
- **Payment Service (8060)** → Payment processing and transactions
- **Notification Service (8040)** → Email notifications for orders and payments

### Supporting Infrastructure
- **PostgreSQL** → Transactional data storage
- **MongoDB** → Notifications and customer data
- **Apache Kafka** → Event streaming between services
- **Zipkin** → Distributed tracing and monitoring
- **MailDev** → Email testing in development

------

## 🎬 Quick Start

```bash
git clone https://github.com/pandaind/springboot-microservices.git
cd springboot-microservices/deployment
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml up -d
```

Access API Gateway at `http://localhost:8080` and Eureka Dashboard at `http://localhost:8761`





------

##  Topics Covered

- 🛠️ **Microservices Patterns** → Service decomposition, API Gateway, Service Discovery
- 🚀 **Spring Cloud** → Config Server, Eureka, Gateway routing
- 🌐 **Inter-Service Communication** → REST APIs and Kafka messaging
- 📊 **Data Management** → PostgreSQL with JPA, MongoDB integration
- 💡 **DevOps** → Docker multi-container setup, Kubernetes deployment
- 🔍 **Observability** → Distributed tracing with Zipkin, service monitoring

------

## 🔧 Potential Extensions

Areas for experimentation:

1. Add authentication and authorization (OAuth2/JWT)
2. Implement circuit breakers with Resilience4j
3. Add API versioning strategies
4. Create integration tests for service communication
5. Implement caching with Redis
6. Add monitoring with Prometheus and Grafana
7. Implement saga pattern for distributed transactions

------

## 📖 Documentation

Available guides:

- [Kubernetes Deployment Guide](https://github.com/pandaind/springboot-microservices/blob/master/KUBERNETES.md) → Local K8s setup
- [API Testing Guide](https://github.com/pandaind/springboot-microservices/blob/master/postman/QUICK_START_FLOWS.md) → Postman usage
- [Enhancement Roadmap](https://github.com/pandaind/springboot-microservices/blob/master/TODO.md) → Future improvements

------

## 🤝 Contributing

This is a learning project. You can:

- Study the microservices communication patterns
- Fork and experiment with new services
- Add documentation or architecture diagrams
- Submit improvements via pull requests

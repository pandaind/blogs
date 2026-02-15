---
title: "E-Commerce Microservices"
date: 2024-01-20
summary: "Learning project: Microservices architecture with Spring Boot, Spring Cloud, and Kubernetes."
description: "Educational e-commerce platform demonstrating microservices architecture with Spring Boot 3.x, Spring Cloud, service discovery, API gateway, event-driven communication, and Kubernetes deployment."
tags: ["Spring Boot", "Microservices", "Spring Cloud", "Kubernetes", "Docker", "Kafka"]
thumbnail: "/img/springboot-microservices.png"
github: "https://github.com/pandaind/springboot-microservices"
tech_stack: ["Spring Boot", "Spring Cloud", "Java 21", "PostgreSQL", "MongoDB", "Kafka", "Kubernetes", "Docker"]
status: "Learning"
featured: false
weight: 4
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

**Three deployment options:**

**Option 1: Docker Compose (Recommended)**
```bash
# Infrastructure only
docker-compose -f docker-compose.infra.yml up -d

# Services only
docker-compose -f docker-compose.services.yml up -d

# Everything together
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml up -d
```

**Option 2: Mixed (Infrastructure in Docker, Services locally)**
```bash
# Start infrastructure
docker-compose -f docker-compose.infra.yml up -d

# Start services in order
cd config-server && mvn spring-boot:run
cd discovery && mvn spring-boot:run
cd gateway && mvn spring-boot:run
cd customer && mvn spring-boot:run
# ... other services
```

**Option 3: Kubernetes (Local cluster)**
```bash
# Setup cluster
cd deployment
./k8s-setup.sh install    # Install kubectl, minikube, helm
./k8s-setup.sh start      # Start cluster

# Build and deploy
./build-images.sh
./deploy-k8s.sh

# Access services
kubectl port-forward -n microservices svc/gateway 8080:8080
kubectl port-forward -n microservices svc/discovery 8761:8761
```

------

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway (8080)                       │
│                   Routing & Load Balancing                       │
└────────────┬───────────────────────────────────────────┬────────┘
             │                                            │
    ┌────────▼─────────┐                        ┌────────▼─────────┐
    │  Discovery (8761)│                        │  Config Server   │
    │   (Eureka)       │                        │     (8888)       │
    └──────────────────┘                        └──────────────────┘
             │
    ┌────────┴──────────────────────────────────────┐
    │          Business Services                     │
    ├────────────┬────────────┬──────────┬──────────┤
    │  Customer  │  Product   │  Order   │ Payment  │
    │   (8090)   │   (8050)   │  (8070)  │  (8060)  │
    └──────┬─────┴──────┬─────┴─────┬────┴────┬─────┘
           │            │           │         │
           │     ┌──────▼───────────▼─────────▼──────┐
           │     │     Apache Kafka (9092)            │
           │     │   Event Streaming Platform         │
           │     └──────┬─────────────────────────────┘
           │            │
    ┌──────▼────────────▼──────┐
    │  Notification (8040)     │
    │   Email Notifications    │
    └──────────────────────────┘

Supporting Infrastructure:
- PostgreSQL (5432): Customer, Product, Order, Payment data
- MongoDB (27017): Notification data
- Zipkin (9411): Distributed tracing
- MailDev (1080): Email testing
```

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

## 🎬 Example Workflow

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/springboot-microservices.git
cd springboot-microservices

# 2. Start with Docker Compose
cd deployment
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml up -d

# 3. Verify services are running
docker-compose ps

# 4. Access the applications
# API Gateway: http://localhost:8080
# Eureka Dashboard: http://localhost:8761
# Zipkin Tracing: http://localhost:9411
# PgAdmin: http://localhost:5050
# Mongo Express: http://localhost:8081
# MailDev: http://localhost:1080

# 5. Test APIs using Postman collection
# Import postman/E-commerce-Microservices.postman_collection.json
# Use postman/E-commerce-Environment.postman_environment.json

# 6. Stop services
docker-compose -f docker-compose.infra.yml -f docker-compose.services.yml down
```

You can now:
- Explore microservices communication patterns
- Study Eureka service discovery
- Review Spring Cloud Config implementation
- Examine Kafka event-driven architecture
- Inspect Zipkin distributed tracing
- Experiment with Kubernetes deployment

------

## 📊 API Endpoints

Access all APIs through the Gateway at `http://localhost:8080`:

- **Customers** → `GET/POST/PUT/DELETE /api/v1/customers`
- **Products** → `GET/POST/PUT/DELETE /api/v1/products`
- **Orders** → `GET/POST /api/v1/orders`
- **Payments** → `POST /api/v1/payments`

------

## 📡 Event-Driven Communication

The system uses Apache Kafka for asynchronous messaging:

- **Order Events** → Published by Order Service → Consumed by Notification Service
- **Payment Events** → Published by Payment Service → Consumed by Notification Service

This demonstrates:
- Decoupling between services
- Asynchronous processing
- Event sourcing patterns
- Kafka integration with Spring Boot

------

## 🐳 Kubernetes Deployment

The `k8s-setup.sh` script provides cluster management:

```bash
# Cluster operations
./k8s-setup.sh start          # Start cluster
./k8s-setup.sh stop           # Stop cluster
./k8s-setup.sh restart        # Restart cluster
./k8s-setup.sh status         # Show status

# Application deployment
./k8s-setup.sh deploy k8s/    # Deploy from YAML files
./k8s-setup.sh get-all        # Show all resources

# Debugging
./k8s-setup.sh logs <pod-name>           # Get pod logs
./k8s-setup.sh exec <pod-name>           # Execute in pod
./k8s-setup.sh port-forward <svc> <port> # Port forward service
```

------

## 📁 Project Structure

```
springboot-microservices/
├── config-server/           # Spring Cloud Config Server
├── customer/                # Customer management service
├── discovery/               # Eureka service registry
├── gateway/                 # API Gateway
├── notification/            # Email notification service
├── order/                   # Order processing service
├── payment/                 # Payment processing service
├── product/                 # Product catalog service (with Flyway)
├── deployment/              # Deployment configurations
│   ├── docker-compose.infra.yml
│   ├── docker-compose.services.yml
│   ├── k8s-setup.sh
│   ├── build-images.sh
│   ├── deploy-k8s.sh
│   └── k8s/                # Kubernetes manifests
│       ├── namespace.yaml
│       ├── configmaps/
│       ├── deployments/
│       └── services/
├── diagrams/                # Architecture diagrams
├── postman/                 # API testing collection
│   ├── E-commerce-Microservices.postman_collection.json
│   ├── E-commerce-Environment.postman_environment.json
│   └── QUICK_START_FLOWS.md
├── KUBERNETES.md            # Kubernetes guide
└── TODO.md                  # Future enhancements
```

------

## 🔧 Monitoring & Observability

- **Service Discovery** → Eureka Dashboard at `http://localhost:8761`
- **Distributed Tracing** → Zipkin at `http://localhost:9411`
- **Database Management** → PgAdmin at `http://localhost:5050`, Mongo Express at `http://localhost:8081`
- **Email Testing** → MailDev at `http://localhost:1080`

------

## 📚 Topics Covered

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

---
title: "Library Management System"
date: 2024-08-10
summary: "Learning project: GraphQL and gRPC microservices with Spring Boot and PostgreSQL."
description: "Educational Library Management System demonstrating GraphQL API development, gRPC inter-service communication, Spring Boot microservices architecture, JPA/Hibernate, Docker deployment, and automated testing."
tags: ["Spring Boot", "GraphQL", "gRPC", "Java", "Microservices", "Docker", "PostgreSQL"]
thumbnail: "/img/library-system.png"
github: "https://github.com/pandaind/library"
tech_stack: ["Spring Boot", "GraphQL", "gRPC", "Java 17", "PostgreSQL", "Docker", "Protocol Buffers"]
status: "Learning"
featured: false
weight: 6
---

## 🧭 Overview

A Library Management System demonstrating GraphQL API development and gRPC inter-service communication with Spring Boot. The system includes microservices for user management, book catalog, and borrowing operations with automated testing.

**Library Management System** is an educational project built with **Spring Boot 3.2**, **GraphQL**, and **gRPC**. The architecture includes an API Gateway exposing GraphQL endpoints, User Service and Book Service communicating via gRPC, and PostgreSQL for data persistence.

Topics covered:

- 📊 **GraphQL API** → Type-safe query language with Spring Boot GraphQL
- 🔌 **gRPC Communication** → High-performance RPC between services
- 🏗️ **Microservices** → Service decomposition and communication patterns
- 💾 **JPA/Hibernate** → Object-relational mapping with PostgreSQL
- 🐳 **Docker Compose** → Multi-container orchestration
- ✅ **API Testing** → Postman collections and Newman automation

------

## 🔑 Key Features

- **GraphQL API Gateway** → Single endpoint for all queries and mutations
- **gRPC Inter-Service Communication** → Protocol Buffers for efficient RPC
- **User Management** → Registration, profiles, membership tracking
- **Book Catalog** → Browse, search, filter books with inventory
- **Borrowing System** → Book checkout, return tracking, due dates
- **Health Monitoring** → Actuator endpoints for service health
- **Automated Testing** → Complete Postman collection (14/14 tests passing)
- **Docker Deployment** → One-command startup for all services

------

## ⚙️ How It Works

```bash
# Start all services
docker-compose up -d

# Wait for initialization
sleep 30

# Run validation tests
./quick-test.sh test

# Access points
# GraphQL API: http://localhost:8080/graphql
# Health Check: http://localhost:8080/actuator/health
# Book Service: http://localhost:8081
# User Service: http://localhost:8082
# Database: localhost:5433
```

**Alternative - Local Development:**
```bash
# Start PostgreSQL
docker run --name postgres -e POSTGRES_DB=library_db \
  -e POSTGRES_USER=library_user -e POSTGRES_PASSWORD=library_password \
  -p 5432:5432 -d postgres:15-alpine

# Build all services
mvn clean install

# Run services individually
cd user-service && mvn spring-boot:run
cd book-service && mvn spring-boot:run
cd api-gateway && mvn spring-boot:run
```

------

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Application                    │
│                   (GraphQL Queries)                      │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/GraphQL
                         ▼
┌─────────────────────────────────────────────────────────┐
│              API Gateway (Port 8080)                     │
│     GraphQL Interface & Service Orchestration           │
└────────────┬───────────────────────────────┬────────────┘
             │ gRPC                           │ gRPC
             │ (9093)                         │ (9091)
             ▼                                ▼
    ┌────────────────┐            ┌────────────────────┐
    │  User Service  │            │   Book Service     │
    │   (Port 8082)  │            │    (Port 8081)     │
    │                │            │                    │
    │ - Registration │            │ - Catalog          │
    │ - Profiles     │            │ - Inventory        │
    │ - Auth         │            │ - Borrowing        │
    └────────┬───────┘            └────────┬───────────┘
             │                              │
             │         PostgreSQL           │
             │        (Port 5433)           │
             └──────────────┬───────────────┘
                            ▼
                   ┌────────────────┐
                   │   library_db   │
                   │  - users       │
                   │  - books       │
                   │  - borrows     │
                   └────────────────┘
```

**Communication Layers:**
- **External** → HTTP/GraphQL (Client to API Gateway)
- **Internal** → gRPC/Protocol Buffers (Service to Service)
- **Data** → JDBC (Services to PostgreSQL)

------

## 📁 Project Structure

```
library/
├── Documentation
│   ├── README.md                   # Project overview
│   ├── PROJECT_STRUCTURE_GUIDE.md  # Architecture guide
│   └── POSTMAN_TESTING_GUIDE.md   # Testing instructions
├── Testing & Automation
│   ├── Library-Management-System.postman_collection.json
│   ├── Library-Management-System.postman_environment.json
│   └── quick-test.sh              # Automated validation
├── Deployment
│   ├── docker-compose.yml         # Service orchestration
│   ├── .dockerignore
│   └── .gitignore
├── api-gateway/                    # GraphQL API Gateway
│   ├── src/main/java/com/library/apigateway/
│   │   ├── config/                # GraphQL & gRPC config
│   │   ├── resolver/              # Query/mutation resolvers
│   │   ├── dto/                   # Data transfer objects
│   │   ├── mapper/                # Entity-DTO mapping
│   │   ├── exception/             # Exception handling
│   │   └── validation/            # Input validation
│   ├── src/main/proto/            # Protocol buffer definitions
│   ├── src/main/resources/graphql/ # GraphQL schemas
│   └── Dockerfile
├── book-service/                   # Book Management Service
│   ├── src/main/java/com/library/bookservice/
│   │   ├── entity/                # JPA entities
│   │   ├── repository/            # Data repositories
│   │   ├── service/               # Business logic
│   │   ├── config/                # DB & gRPC config
│   │   ├── exception/             # Domain exceptions
│   │   └── interceptor/           # gRPC interceptors
│   ├── src/main/proto/            # gRPC definitions
│   └── src/main/resources/        # Configuration
├── user-service/                   # User Management Service
│   ├── src/main/java/com/library/userservice/
│   │   ├── entity/                # User entities
│   │   ├── repository/            # Repositories
│   │   ├── service/               # Services
│   │   ├── config/                # Configuration
│   │   ├── exception/             # Exceptions
│   │   ├── validation/            # Validation
│   │   └── interceptor/           # Interceptors
│   └── src/main/proto/            # Service contracts
├── init-db/                       # Database Setup
│   └── init.sql                   # Schema & sample data
└── pom.xml                        # Parent POM
```

------

## 🎬 Example Workflow

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/library.git
cd library

# 2. Start all services with Docker Compose
docker-compose up -d

# 3. Wait for services to initialize
sleep 30

# 4. Verify services are running
docker-compose ps

# 5. Access GraphQL Playground
# Open http://localhost:8080/graphql

# 6. Run automated tests
newman run Library-Management-System.postman_collection.json \
  -e Library-Management-System.postman_environment.json

# Or use the quick test script
./quick-test.sh test

# 7. Stop services
docker-compose down
```

You can now:
- Explore GraphQL schema and queries
- Study gRPC service definitions and Protocol Buffers
- Review Spring Boot microservices architecture
- Examine JPA entity relationships
- Inspect Docker multi-service setup
- Run API tests with Postman/Newman

------

## 📊 Sample API Operations

**User Registration (GraphQL Mutation):**
```graphql
mutation RegisterUser {
  registerUser(userInput: {
    username: "johndoe"
    email: "john@example.com"
    firstName: "John"
    lastName: "Doe"
    phone: "+1234567890"
    address: "123 Main St, City, State"
  }) {
    id
    username
    email
    firstName
    lastName
    membershipType
    status
    registrationDate
  }
}
```

**Browse Books (GraphQL Query):**
```graphql
query GetAllBooks {
  getAllBooks {
    id
    title
    author
    isbn
    genre
    publishedYear
    totalCopies
    availableCopies
    description
  }
}
```

**Borrow Book (GraphQL Mutation):**
```graphql
mutation BorrowBook {
  borrowBook(borrowInput: {
    userId: 1
    bookId: 1
    dueDays: 14
  }) {
    id
    borrowDate
    dueDate
    status
    user { username }
    book { title author }
  }
}
```

------

## ✅ Testing

**Automated Testing with Newman:**
```bash
# Run complete test suite
newman run Library-Management-System.postman_collection.json \
  -e Library-Management-System.postman_environment.json
```

**Manual Testing with Postman:**
1. Import `Library-Management-System.postman_collection.json`
2. Import `Library-Management-System.postman_environment.json`
3. Set environment to "Docker Environment"
4. Run individual requests or entire collection

**Test Results:**
- 14/14 tests passing (100% success rate)
- Average response time: < 250ms
- Comprehensive validation and error handling
- ACID transactions with PostgreSQL

------

## 🔧 System Status

**Working Operations:**
- User registration and profile management
- Book catalog browsing, search, and filtering
- Book borrowing with due date tracking
- Return processing and inventory updates
- Real-time availability checking
- Service health monitoring
- Automated API testing

**Performance Metrics:**
- Response time: < 250ms average
- Test success rate: 100%
- Data consistency: ACID compliant
- Error handling: Comprehensive validation

------

## 📚 Topics Covered

- 🛠️ **GraphQL Development** → Schema design, resolvers, mutations, queries
- 🚀 **gRPC Implementation** → Protocol Buffers, service definitions, interceptors
- 🌐 **Microservices Patterns** → Service decomposition, inter-service communication
- 📊 **Spring Boot** → Configuration, dependency injection, actuator
- 💡 **JPA/Hibernate** → Entity mapping, relationships, repositories
- 🐳 **Docker** → Multi-container applications, service orchestration
- ✅ **API Testing** → Postman collections, Newman automation

------

## 🔧 Potential Extensions

Areas for experimentation:

1. Add authentication and authorization (JWT/OAuth2)
2. Implement GraphQL subscriptions for real-time updates
3. Add Redis caching for frequently accessed data
4. Create fine management for overdue books
5. Implement book reservation system
6. Add recommendation engine based on borrowing history
7. Create analytics dashboard with Spring Boot Admin
8. Implement circuit breakers with Resilience4j

------

## 📖 Documentation

Available guides:

- [Project Structure Guide](https://github.com/pandaind/library/blob/master/PROJECT_STRUCTURE_GUIDE.md) → Detailed architecture walkthrough
- [Postman Testing Guide](https://github.com/pandaind/library/blob/master/POSTMAN_TESTING_GUIDE.md) → Complete API testing tutorials

------

## 🤝 Contributing

This is a learning project. You can:

- Study GraphQL and gRPC implementation patterns
- Fork and experiment with new features
- Add documentation or architecture diagrams
- Submit improvements via pull requests

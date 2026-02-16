---
title: "POS API"
date: 2025-10-15
summary: "Learning project: Point of Sale API with FastAPI, PostgreSQL, and Docker."
description: "Educational POS system API demonstrating authentication, inventory management, sales tracking, and testing. FastAPI, PostgreSQL, SQLAlchemy, and Alembic."
tags: ["FastAPI", "Python", "PostgreSQL", "REST API", "Docker"]
thumbnail: "/img/pandac-pos.png"
github: "https://github.com/pandaind/pandac-pos"
tech_stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "SQLAlchemy", "Alembic"]
status: "Learning"
featured: false
weight: 2
---

## 🧭 Overview

A Point of Sale system API demonstrating authentication, inventory tracking, sales management, customer relationships, and reporting analytics.

**Pandac POS API** is an educational project built with **FastAPI** and **PostgreSQL**. The codebase includes **JWT authentication**, **comprehensive test coverage** (223 assertions), and **automated database migrations** using Alembic.

Topics covered:

- 🔐 **Authentication** → JWT implementation with role-based access control
- 📦 **Domain Models** → Products, sales, inventory, customers, and reports
- ✅ **Testing** → Newman/Postman test suite with 223 assertions
- 🚀 **Deployment** → Docker containerization with docker-compose

------

## 🔑 Key Features

- **JWT Authentication** → Secure login with role-based permissions
- **Product Management** → Full CRUD with inventory tracking and SKU support
- **Sales Workflow** → Complete transaction handling with items and payments
- **Customer Management** → Customer profiles with loyalty program support
- **Inventory System** → Stock tracking, suppliers, and purchase orders
- **Business Reports** → Sales analytics, financial insights, and metrics
- **Multi-User System** → Employee management with transaction tracking
- **Auto Migrations** → Alembic handles database schema changes seamlessly

------

## ⚙️ How It Works

1. **Clone and start** → `docker-compose up -d` spins up the entire system

2. **Auto-configured database** → PostgreSQL with automatic migrations
3. **Access the API**:
   - API: `http://localhost:8000`
   - Interactive docs: `http://localhost:8000/docs`
4. **Run tests** → `./test.sh` executes 223 comprehensive API tests
5. **Explore and learn** → Study the code, API endpoints, and testing patterns

------

## � Topics Covered

- 🛠️ **FastAPI** → Async APIs with automatic OpenAPI documentation
- 🚀 **Testing** → Newman/Postman test suite with 223 assertions across 118 requests
- 🌐 **REST API Design** → CRUD operations, pagination, filtering
- 📊 **Database** → SQLAlchemy ORM, relationships, Alembic migrations
- 💡 **Docker** → Multi-container setup with PostgreSQL

------

## 🛠️ What's Inside

- **Authentication** → Login, register, token refresh, role management
- **Products** → CRUD operations, inventory tracking, categories
- **Customers** → Profile management, loyalty programs, purchase history
- **Sales** → Transaction processing, payment handling, receipts
- **Inventory** → Stock levels, suppliers, purchase orders, adjustments
- **Reports** → Sales analytics, financial summaries, business metrics
- **Users & Roles** → Multi-user support with fine-grained permissions
- **Employees** → Staff management and activity tracking

You can study these endpoints to understand RESTful API design, **validation patterns**, and **error handling** strategies.

------

## 🎬 Example Workflow

Here's how a typical setup looks:

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/pandac-pos.git
cd pandac-pos

# 2. Configure environment (optional)
cp .env.example .env
# Edit .env with your settings

# 3. Start the system
docker-compose up -d

# 4. Access the API documentation
# Open http://localhost:8000/docs in your browser

# 5. Run comprehensive tests
cd newman-tests
newman run postman/pandac-pos-api-collection.json \
  --environment postman/environment.json

# Or use the test script
./test.sh

# 6. Stop when done
docker-compose down
```

You can now:
- Explore the POS API functionality
- Study PostgreSQL database design and seeded data
- Review interactive API documentation
- Examine the test suite (223+ assertions)
- Modify and experiment with the codebase

------

## 📊 API Endpoints at a Glance

- **Authentication** → `/v1/auth/*` - Login, register, refresh tokens
- **Products** → `/v1/products/*` - Product CRUD, search, categories
- **Customers** → `/v1/customers/*` - Customer profiles, loyalty
- **Sales** → `/v1/sales/*` - Transactions, payments, analytics
- **Inventory** → `/v1/inventory/*` - Stock, suppliers, purchase orders
- **Reports** → `/v1/reports/*` - Sales reports, financial analytics
- **Users** → `/v1/users/*` - User management, permissions
- **Roles** → `/v1/roles/*` - Role-based access control

------

## ✅ Testing & Quality

**Test Coverage:**
- 223 passing assertions (100% success rate)
- 118 API requests across 20 test categories
- Automatic token management for protected endpoints
- HTML reports with timing and response data

The test suite covers:
- Authentication flows and token refresh
- CRUD operations for all entities
- Business rule validation
- Error handling and edge cases
- Analytics and reporting accuracy

------

## 🗄️ Database Management

The project uses **Alembic** for robust database migrations:

- **Auto-migration** on startup
- **Version control** for schema changes
- **Rollback support** for safe deployments
- **Model-driven** migration generation
- **Production-safe** upgrade/downgrade paths

See [ALEMBIC_GUIDE.md](https://github.com/pandaind/pandac-pos/blob/main/ALEMBIC_GUIDE.md) for detailed instructions.

------

## 🏗️ Architecture

- **Backend Framework** → FastAPI with async support
- **ORM** → SQLAlchemy with declarative models
- **Database** → PostgreSQL with automatic migrations
- **Authentication** → JWT tokens with role-based access control
- **Testing** → Newman/Postman comprehensive test suite
- **Deployment** → Docker containerized application
- **API Docs** → Auto-generated OpenAPI/Swagger documentation

------

## 🤝 Contributing

This is a learning project. You can:

- Explore the code to understand FastAPI patterns
- Fork and experiment with modifications
- Add documentation or examples
- Submit improvements via pull requests

---
title: "POS API"
date: 2025-10-15
description: "Learning project: Point of Sale API with FastAPI, PostgreSQL, and Docker."
abstract: "Educational POS system API demonstrating authentication, inventory management, sales tracking, and testing. FastAPI, PostgreSQL, SQLAlchemy, and Alembic."
tags: ["FastAPI", "Python", "PostgreSQL", "REST API", "Docker"]
cover: "img/pandac-pos.png"
repo: "https://github.com/pandaind/pandac-pos"
stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "SQLAlchemy", "Alembic"]
status: "Learning"
featured: false
weight: 2
year: 2025
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

1. **Start** → `docker-compose up -d`
2. **Access** → API at `http://localhost:8000`, docs at `http://localhost:8000/docs`
3. **Test** → `./test.sh` runs 223 API tests

------

## 📚 Topics Covered

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

## 🎬 Quick Start

```bash
git clone https://github.com/pandaind/pandac-pos.git
cd pandac-pos
docker-compose up -d
```

Access API docs at `http://localhost:8000/docs`





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

---
title: "POS API"
date: 2024-10-15
summary: "A complete Point of Sale system API built with FastAPI and PostgreSQL—ready to deploy in minutes."
description: "A production-ready POS system API featuring authentication, inventory management, sales tracking, customer management, and comprehensive reporting. Built with FastAPI, PostgreSQL, and Docker for easy deployment."
tags: ["FastAPI", "Python", "PostgreSQL", "REST API", "Docker"]
thumbnail: "/img/pandac-pos.png"
github: "https://github.com/pandaind/pandac-pos"
tech_stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "SQLAlchemy", "Alembic"]
status: "Stable"
featured: true
weight: 2
---

## 🧭 Overview

Building a complete Point of Sale system from scratch is complex—you need authentication, inventory tracking, sales management, customer relationships, reporting analytics, and more. All while ensuring data consistency and security.

**Pandac POS API** delivers all of this out of the box. With just **Docker Compose**, you get a **production-ready POS system** complete with **JWT authentication**, **comprehensive test coverage**, and **automatic database migrations**.

It comes with:

- 🔐 **Secure Authentication** → JWT-based with role-based access control
- 📦 **Complete Business Logic** → Products, sales, inventory, customers, and reports
- ✅ **100% Test Coverage** → 223 passing assertions across all endpoints
- 🚀 **One-Command Deployment** → Docker Compose handles everything

Think of it as your **ready-to-use POS backend**—just customize and deploy.

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
5. **Build your POS app** → Use the API endpoints to power your frontend

------

## 📈 Why It's Awesome

- 🛠️ **Developer-Friendly** → Clear API structure with auto-generated docs
- 🚀 **Production-Ready** → 100% test coverage and validated business logic
- 🌐 **RESTful Design** → Clean endpoints following best practices
- 📊 **Complete Analytics** → Built-in reporting and business insights
- 💡 **Easy Integration** → Docker-based deployment, works anywhere

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

All endpoints come with **comprehensive validation** and **error handling**.

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

Now you've got:
✅ A fully functional POS API
✅ PostgreSQL database with seeded data
✅ Interactive API documentation
✅ Validated with 223+ test assertions
✅ Ready for frontend integration

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

**Comprehensive Test Coverage:**
- ✅ **223 passing assertions** (100% success rate)
- ✅ **118 API requests** across 20 test categories
- ✅ **Automatic token management** for protected endpoints
- ✅ **HTML reports** with detailed timing and response data
- ✅ **Zero failures** - all business logic validated

The test suite covers:
- Authentication flows and token refresh
- All CRUD operations for every entity
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

Want to add features or improve the system?

1. Fork the repo
2. Create a feature branch
3. Write tests for your changes
4. Ensure all tests pass
5. Open a PR

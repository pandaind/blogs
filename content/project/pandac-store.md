---
title: "Pandac Store - Plant E-Commerce Platform"
date: 2025-06-15
summary: "Learning project: Full-stack e-commerce with React, Spring Boot, and Docker."
description: "Educational full-stack e-commerce application demonstrating React 19, Spring Boot 3.5, MySQL, Nginx reverse proxy, JWT authentication, and payment integration."
tags: ["Spring Boot", "React", "E-Commerce", "Docker", "Full-Stack"]
thumbnail: "/img/pandac-store.png"
github: "https://github.com/pandaind/pandac-store"
tech_stack: ["React", "Spring Boot", "Java 21", "MySQL", "Nginx", "Docker", "Stripe"]
status: "Learning"
featured: false
weight: 3
---

## 🧭 Overview

A full-stack e-commerce platform demonstrating modern web development: React frontend, Spring Boot backend API, database migrations, Stripe payment processing, JWT authentication, and Nginx reverse proxy.

**Pandac Store** is an educational project built with **React 19**, **Spring Boot 3.5**, **MySQL**, and **Docker**. The application includes product browsing, shopping cart, checkout flow, user authentication, and admin dashboard.

Topics covered:

- 🛍️ **Frontend** → React 19 with Vite, Tailwind CSS, Redux Toolkit
- 🔐 **Authentication** → JWT tokens with role-based access control
- 💳 **Payment Integration** → Stripe Elements and API
- 🎯 **Architecture** → Nginx reverse proxy, centralized API configuration
- 🚀 **Deployment** → Docker Compose with multiple services

------

## 🔑 Key Features

- **Modern React Frontend** → React 19 with Vite, Tailwind CSS, and Redux Toolkit
- **Robust Spring Boot Backend** → Java 21, Spring Security, JPA/Hibernate
- **Stripe Payment Processing** → Secure checkout with Stripe Elements
- **JWT Authentication** → Token-based auth with role-based permissions
- **Nginx Reverse Proxy** → Single entry point, CORS handling, static serving
- **Database Migrations** → Flyway for version-controlled schema changes
- **Admin Dashboard** → Product, order, user, and discount management
- **Responsive Design** → Mobile-first approach with Tailwind CSS

------

## ⚙️ How It Works

1. **Validate environment** → `./scripts/validate-setup.sh` checks prerequisites

2. **Configure variables** → Update `.env` with Stripe keys and tokens
3. **Start everything** → `docker-compose up -d` launches the entire stack
4. **Access the app**:
   - Application: `http://localhost` (via Nginx)
   - API: `http://localhost/api/v1/*`
   - Database: `localhost:3306` (admin access)
5. **Explore and learn** → Study the architecture, code structure, and feature implementations

------

## � Topics Covered

- 🛠️ **Full-Stack Architecture** → Frontend-backend communication, reverse proxy setup
- 🚀 **Spring Boot** → REST APIs, JPA/Hibernate, Spring Security, Flyway migrations
- 🌐 **React** → Hooks, Redux Toolkit, React Router, API integration
- 📊 **Features** → Shopping cart, checkout flow, admin dashboard, order management
- 💡 **Docker** → Multi-service setup with Nginx, MySQL, and application containers

------

## 🛠️ What's Inside

### Customer Features
- **Product Catalog** → Browse, search, filter plants and gardening products
- **Shopping Cart** → Smart cart with discount code support
- **Secure Checkout** → Stripe integration for safe payments
- **User Profiles** → Authentication, order history, profile management
- **Order Tracking** → Real-time order status and history

### Admin Features
- **Product Management** → Full CRUD operations for inventory
- **Order Administration** → Process and track customer orders
- **User Management** → Manage customers and permissions
- **Discount Codes** → Create and manage promotional codes
- **Sales Analytics** → Business insights and reporting

### Technical Features
- **Nginx Reverse Proxy** → Single entry point, CORS-free architecture
- **Centralized API Config** → `/src/config/api.js` as single source of truth
- **Responsive Design** → Mobile-first with Tailwind CSS
- **JWT Authentication** → Secure session management
- **Database Migrations** → Flyway version control
- **File Upload** → CDN integration for optimized images
- **Health Monitoring** → Container health checks
- **Comprehensive Error Handling** → User-friendly error management

------

## 🎬 Example Workflow

Here's how a typical setup looks:

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/pandac-store.git
cd pandac-store

# 2. Validate your environment
./scripts/validate-setup.sh

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your Stripe API keys and GitHub token

# 4. Verify configuration
./scripts/check-tokens.sh

# 5. Start the entire stack
docker-compose up -d

# 6. Access the application
# Open http://localhost in your browser

# 7. View logs (optional)
docker-compose logs -f

# 8. View specific service logs
docker-compose logs -f nginx
docker-compose logs -f frontend
docker-compose logs -f backend

# 9. Restart a service if needed
docker-compose restart nginx

# 10. Stop everything when done
docker-compose down

# 11. Clean rebuild (if you change configuration)
docker-compose down -v --rmi all
docker-compose up --build
```

You can now:
- Explore the full-stack e-commerce application
- Study React frontend and Stripe checkout integration
- Review Spring Boot API patterns with JWT auth
- Examine MySQL database design with migrations
- Inspect Nginx reverse proxy configuration
- Modify and extend functionality

------

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Client      │    │  Nginx Proxy    │    │    Backend      │    │    Database     │
│   (Browser)     │────│  (Port: 80)     │────│  (Spring Boot)  │────│     (MySQL)     │
│                 │    │                 │    │   Port: 8080    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              │
                    ┌─────────────────┐
                    │   Frontend      │
                    │   (React/Nginx) │
                    │   Port: 80      │
                    └─────────────────┘
```

**Technology Breakdown:**

- **Frontend** → React 19 with Vite, Tailwind CSS, Redux Toolkit, Stripe Elements
- **Backend** → Spring Boot 3.5 with Java 21, Spring Security, Spring Data JPA, Hibernate
- **Database** → MySQL 8.0 with Flyway migrations
- **Reverse Proxy** → Nginx for routing, CORS handling, static files
- **DevOps** → Docker & Docker Compose, multi-stage builds, health checks
- **Payment** → Stripe API integration
- **Auth** → JWT tokens with role-based access control

------

## 📁 Project Structure

```
pandac-store/
├── docs/                    # 📚 Documentation
│   └── screenshots/         # 📸 Application screenshots
├── scripts/                 # 🛠️ Setup & validation scripts
│   ├── validate-setup.sh   # Environment validation
│   └── check-tokens.sh     # Token verification
├── nginx/                   # 🔄 Reverse proxy configuration
│   ├── Dockerfile          # Nginx container config
│   └── nginx.conf          # Reverse proxy rules
├── pandac-store-backend/    # 🌐 Spring Boot API
│   ├── src/                # Java source code
│   └── pom.xml             # Maven dependencies
├── pandac-store-ui/         # 🖥️ React frontend
│   ├── src/
│   │   └── config/         # ⚙️ Centralized configuration
│   │       └── api.js      # 🎯 Single source of truth for API
│   └── package.json        # npm dependencies
├── docker-compose.yml       # 🐳 Container orchestration
├── .env.example            # ⚙️ Environment template
└── README.md               # 📖 Documentation
```

------

## 🔧 Configuration Management

The application uses a **centralized configuration** system:

```javascript
// pandac-store-ui/src/config/api.js
export const API_BASE_URL = '/api/v1';  // ← Change here only!
export const API_TIMEOUT = 10000;
```

**Benefits:**
- Single source of truth for API endpoints
- Easy environment switching
- No CORS issues with Nginx proxy
- Consistent configuration across the app

------

## 📊 Common Commands

- **Start Stack** → `docker-compose up -d`
- **Stop Stack** → `docker-compose down`
- **View Logs** → `docker-compose logs -f`
- **Service Logs** → `docker-compose logs -f [service]`
- **Restart Service** → `docker-compose restart [service]`
- **Check Status** → `docker-compose ps`
- **Clean Rebuild** → `docker-compose down -v --rmi all && docker-compose up --build`

------

## 🔐 Environment Setup

### Prerequisites
- Docker & Docker Compose
- Git
- Stripe account (for payment processing)
- GitHub token (for package dependencies)

### Required API Keys
1. **Stripe API Keys** → Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **GitHub Token** → Create at [GitHub Settings](https://github.com/settings/tokens)
3. **Update `.env`** → Replace placeholder values with actual keys

------

## 📖 Documentation

For detailed guides, see:

- **[Docker Setup](https://github.com/pandaind/pandac-store/blob/main/docs/DOCKER.md)** → Complete deployment guide
- **[Nginx Proxy Configuration](https://github.com/pandaind/pandac-store/blob/main/docs/NGINX_PROXY.md)** → Reverse proxy setup
- **[API Configuration](https://github.com/pandaind/pandac-store/blob/main/docs/API_CONFIG.md)** → Centralized config system
- **[Security](https://github.com/pandaind/pandac-store/blob/main/docs/SECURITY.md)** → Security best practices

------

## � Potential Extensions

Areas for experimentation:

1. Add new product categories or UI components
2. Implement additional API endpoints
3. Add OAuth providers or modify authentication
4. Create new database entities with Flyway migrations
5. Write unit tests for React components or Spring services
6. Set up CI/CD pipelines

------

## 🤝 Contributing

This is a learning project. You can:

- Study how React components interact with Spring Boot APIs
- Fork and experiment with new features
- Add documentation or educational comments
- Submit improvements via pull requests

---
title: "Pandac Store - Plant E-Commerce Platform"
date: 2025-06-15
description: "Learning project: Full-stack e-commerce with React, Spring Boot, and Docker."
abstract: "Educational full-stack e-commerce application demonstrating React 19, Spring Boot 3.5, MySQL, Nginx reverse proxy, JWT authentication, and payment integration."
tags: ["Spring Boot", "React", "E-Commerce", "Docker", "Full-Stack"]
cover: "img/pandac-store.png"
repo: "https://github.com/pandaind/pandac-store"
stack: ["React", "Spring Boot", "Java 21", "MySQL", "Nginx", "Docker", "Stripe"]
status: "Learning"
featured: false
weight: 3
year: 2025
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

1. **Configure** → Update `.env` with your Stripe API keys
2. **Start** → `docker-compose up -d`
3. **Access** → `http://localhost`

------

## 📚 Topics Covered

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

## 🎬 Quick Start

```bash
git clone https://github.com/pandaind/pandac-store.git
cd pandac-store
cp .env.example .env  # Add your Stripe keys
docker-compose up -d
```

Access at `http://localhost`

------

## 📖 Documentation

See the [GitHub repository](https://github.com/pandaind/pandac-store) for detailed guides on Docker setup, Nginx configuration, and API setup

------

## 🔧 Potential Extensions

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

---
title: "Todo App - Full-Stack with AWS Deployment"
date: 2025-07-15
description: "Learning project: Full-stack Todo app with React, FastAPI, and AWS ECS deployment using Terraform."
abstract: "Educational full-stack application demonstrating React TypeScript frontend, FastAPI backend, JWT authentication, PostgreSQL database, Docker containerization, and AWS ECS deployment with Terraform IaC."
tags: ["React", "FastAPI", "TypeScript", "Python", "AWS", "Terraform", "Docker"]
cover: "img/todo-app.png"
repo: "https://github.com/pandaind/todo-app"
stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Terraform", "AWS ECS", "Docker"]
status: "Learning"
featured: false
weight: 7
year: 2025
---

## 🧭 Overview

A full-stack Todo application demonstrating modern web development and cloud deployment. The project includes React TypeScript frontend, Python FastAPI backend, JWT authentication, PostgreSQL database, and complete AWS ECS deployment using Terraform.

**Todo App** is an educational project built with **React + TypeScript + Vite**, **FastAPI**, and **PostgreSQL**. The codebase includes local development with Docker Compose, Kubernetes manifests, custom Kubernetes operator (Go), and Infrastructure as Code with Terraform for AWS deployment.

Topics covered:

- 🖥️ **Frontend** → React 18 with TypeScript, Vite, Tailwind CSS
- 🔧 **Backend** → FastAPI with SQLAlchemy ORM
- 🔐 **Authentication** → JWT-based user authentication
- 🐳 **Containerization** → Docker and Docker Compose
- ☸️ **Kubernetes** → Manifests and custom operator in Go
- 🌩️ **Cloud Deployment** → AWS ECS with Terraform IaC

------

## 🔑 Key Features

- **Modern Frontend Stack** → React 18, TypeScript, Vite, Tailwind CSS
- **FastAPI Backend** → Python async framework with SQLAlchemy
- **JWT Authentication** → Secure user signup, login, and session management
- **Database Flexibility** → PostgreSQL for production, SQLite for development
- **Docker Compose** → Complete local development environment
- **Kubernetes Support** → Deployment manifests and custom operator (Go)
- **Terraform IaC** → AWS infrastructure automation
- **AWS ECS Deployment** → Production-ready container orchestration

------

## ⚙️ How It Works

```bash
docker-compose up --build
```

Access frontend at `http://localhost:3000`, API docs at `http://localhost:5000/docs`

------

## 🎬 Quick Start

```bash
git clone https://github.com/pandaind/todo-app.git
cd todo-app
cp .env.example .env
docker-compose up --build
```

Access app at `http://localhost:3000`

------

## 📚 Topics Covered

- 🛠️ **Full-Stack Development** → React frontend communicating with FastAPI backend
- 🚀 **Modern Frontend** → TypeScript, Vite build tool, Tailwind CSS styling
- 🌐 **REST API Design** → FastAPI with automatic OpenAPI documentation
- 📊 **Database ORM** → SQLAlchemy with PostgreSQL and SQLite support
- 💡 **Authentication** → JWT token-based authentication flow
- 🐳 **Containerization** → Multi-container Docker setup
- ☸️ **Kubernetes** → Deployment manifests and custom operator in Go
- 🌩️ **Cloud Infrastructure** → Terraform for AWS ECS deployment

------

## 🔧 Potential Extensions

Areas for experimentation:

1. Add todo categories and tags
2. Implement real-time updates with WebSockets
3. Add user profile management
4. Create todo sharing between users
5. Implement CI/CD pipeline with GitHub Actions
6. Add monitoring with Prometheus/Grafana
7. Implement caching with Redis
8. Add end-to-end tests with Playwright

------

## 🤝 Contributing

This is a learning project. You can:

- Study the full-stack architecture patterns
- Fork and experiment with new features
- Try different deployment strategies
- Add documentation or examples
- Submit improvements via pull requests

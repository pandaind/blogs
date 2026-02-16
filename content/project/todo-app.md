---
title: "Todo App - Full-Stack with AWS Deployment"
date: 2025-07-15
summary: "Learning project: Full-stack Todo app with React, FastAPI, and AWS ECS deployment using Terraform."
description: "Educational full-stack application demonstrating React TypeScript frontend, FastAPI backend, JWT authentication, PostgreSQL database, Docker containerization, and AWS ECS deployment with Terraform IaC."
tags: ["React", "FastAPI", "TypeScript", "Python", "AWS", "Terraform", "Docker"]
thumbnail: "/img/todo-app.png"
github: "https://github.com/pandaind/todo-app"
tech_stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Terraform", "AWS ECS", "Docker"]
status: "Learning"
featured: false
weight: 7
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

**Local Development (Docker):**
```bash
# Clone and start
git clone https://github.com/pandaind/todo-app.git
cd todo-app

# Start all services
docker-compose up --build

# Access applications
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/docs
```

**Local Development (Native):**
```bash
# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app:app --reload --host 0.0.0.0 --port 5000

# Frontend setup (separate terminal)
cd frontend
npm install
npm run dev
```

**AWS Deployment:**
```bash
# Configure AWS credentials
aws configure

# Deploy to AWS ECS
cd terraform
./deploy.sh dev apply

# Destroy infrastructure
./deploy.sh dev destroy
```

------

## 🏗️ Architecture

**Local Development:**
```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │────────▶│  React App   │────────▶│  FastAPI     │
│              │         │  (Port 3000) │   API   │  (Port 5000) │
└──────────────┘         └──────────────┘         └───────┬──────┘
                                                           │
                                                           ▼
                                                   ┌──────────────┐
                                                   │ PostgreSQL/  │
                                                   │   SQLite     │
                                                   └──────────────┘
```

**AWS ECS Deployment:**
```
┌─────────────────────────────────────────────────────────────┐
│                      AWS Cloud                              │
│                                                             │
│  ┌──────────────┐       ┌──────────────┐                  │
│  │     ALB      │──────▶│  ECS Service │                  │
│  │ Load Balancer│       │  (Frontend)  │                  │
│  └──────────────┘       └──────────────┘                  │
│         │                                                   │
│         │               ┌──────────────┐                  │
│         └──────────────▶│  ECS Service │                  │
│                         │   (Backend)  │                  │
│                         └───────┬──────┘                  │
│                                 │                          │
│                         ┌───────▼──────┐                  │
│                         │  RDS (PostgreSQL)              │
│                         │               │                  │
│                         └───────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

------

## 📁 Project Structure

```
todo-app/
├── backend/                 # Python FastAPI backend
│   ├── api/                # API routes and logic
│   ├── database/           # SQLAlchemy models
│   ├── app.py             # Main application
│   └── requirements.txt   # Python dependencies
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── api/           # API client
│   ├── package.json       # npm dependencies
│   └── vite.config.ts     # Vite configuration
├── terraform/              # AWS Infrastructure as Code
│   ├── main.tf            # Main configuration
│   ├── variables.tf       # Variables
│   ├── outputs.tf         # Outputs
│   └── deploy.sh          # Deployment script
├── k8s-operator/           # Custom Kubernetes operator (Go)
├── k8s-backend.yaml       # Kubernetes backend manifest
├── k8s-frontend.yaml      # Kubernetes frontend manifest
├── k8s-ingress.yaml       # Kubernetes ingress manifest
├── docker-compose.yml     # Local development
├── docker-compose.prod.yml # Production configuration
├── docker-compose.test.yml # Testing configuration
├── start.sh               # Quick start script
├── deploy-app.sh          # Deployment helper
├── .env.example           # Environment template
└── TESTING.md             # Testing documentation
```

------

## 🎬 Example Workflow

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/todo-app.git
cd todo-app

# 2. Copy environment file
cp .env.example .env
# Edit .env with your configuration

# 3. Start with Docker Compose
docker-compose up --build

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Documentation: http://localhost:5000/docs

# 5. Create an account and add todos
# - Sign up with email/password
# - Login to get JWT token
# - Create, update, delete todos

# 6. Stop services
docker-compose down
```

You can now:
- Explore React TypeScript frontend architecture
- Study FastAPI backend patterns and SQLAlchemy models
- Review JWT authentication implementation
- Examine Docker multi-container setup
- Inspect Terraform AWS infrastructure code
- Experiment with Kubernetes deployments

------

## 📊 API Endpoints

- **Auth** → `POST /api/auth/signup` - Create user account
- **Auth** → `POST /api/auth/login` - User login
- **Auth** → `GET /api/auth/me` - Get current user
- **Todos** → `GET /api/todos` - Get user's todos
- **Todos** → `POST /api/todos` - Create new todo
- **Todos** → `PUT /api/todos/{id}` - Update todo
- **Todos** → `DELETE /api/todos/{id}` - Delete todo

Interactive API documentation available at `http://localhost:5000/docs`

------

## 🐳 Deployment Options

### Docker Compose
```bash
# Local development
docker-compose up --build

# Production mode
docker-compose -f docker-compose.prod.yml up -d

# Testing mode
docker-compose -f docker-compose.test.yml up -d
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s-backend.yaml
kubectl apply -f k8s-frontend.yaml
kubectl apply -f k8s-ingress.yaml

# Check status
kubectl get pods
kubectl get services
```

### AWS ECS (Terraform)
```bash
# Initialize Terraform
cd terraform
terraform init

# Plan deployment
./deploy.sh dev plan

# Apply changes
./deploy.sh dev apply

# Clean up
./deploy.sh dev destroy
```

------

## ⚙️ Environment Variables

**Backend:**
- `DATABASE_URL` → Database connection string
- `SECRET_KEY` → JWT secret key for token generation

**Frontend:**
- `VITE_API_URL` → Backend API URL

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

---
title: "Todo App - Full-Stack with AWS Deployment"
date: 2025-07-15
description: "A to-do app deployed to AWS with Terraform."
tags: ["React", "FastAPI", "TypeScript", "Python", "AWS", "Terraform", "Docker"]
cover: "img/todo-app.png"
repo: "https://github.com/pandaind/todo-app"
stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Terraform", "AWS ECS", "Docker"]
weight: 10
year: 2025
---
A to-do app taken all the way to a real deployment. The front end is React with TypeScript, the back end is FastAPI with JWT login, and the data is in PostgreSQL. Locally it runs with Docker Compose; in the cloud it runs on AWS ECS, created with Terraform.

The repo also has Kubernetes manifests and a small operator written in Go.

```bash
git clone https://github.com/pandaind/todo-app.git
cd todo-app
cp .env.example .env
docker-compose up --build
```

The app is at `http://localhost:3000` and the API docs at `http://localhost:5000/docs`.

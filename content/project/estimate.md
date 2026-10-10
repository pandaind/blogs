---
title: "EstiMate - Planning Poker"
date: 2026-02-01
description: "Learning project: Real-time collaborative story estimation with Spring Boot and React."
abstract: "Educational Planning Poker application demonstrating WebSocket real-time communication, Spring Boot backend, React frontend, story estimation, and comprehensive testing with Newman and Playwright."
tags: ["Spring Boot", "React", "WebSocket", "Java", "Agile", "Real-time"]
cover: "img/estimate.png"
repo: "https://github.com/pandaind/estimate"
stack: ["Spring Boot", "React", "Java 21", "WebSocket", "H2 Database", "Vite", "Tailwind CSS"]
status: "Learning"
featured: false
weight: 5
year: 2026
---

## 🧭 Overview

A real-time collaborative story estimation tool (Planning Poker) for agile teams. The application demonstrates WebSocket communication, session management, voting systems, and analytics with Spring Boot and React.

**EstiMate** is an educational project built with **Spring Boot 3.2**, **React 18**, and **WebSocket**. The system includes real-time participant updates, multiple estimation methods (Fibonacci, T-Shirt sizes, Powers of 2), story management, voting analytics, and comprehensive testing with Newman (38 API tests) and Playwright (24 E2E tests).

Topics covered:

- 🔌 **WebSocket** → Real-time bidirectional communication
- 🎯 **Session Management** → Code-based session sharing
- 📊 **Data Visualization** → Voting charts and analytics
- ⚡ **React** → Modern UI with Vite, TailwindCSS, Framer Motion
- ✅ **Testing** → API tests (Newman) and E2E tests (Playwright)

------

## 🔑 Key Features

- **Flexible Estimation Methods** → Fibonacci, T-Shirt sizes, Powers of 2, Linear, Custom
- **Real-Time Collaboration** → WebSocket for live participant updates and vote synchronization
- **Story Management** → Create, manage, activate, and finalize user stories
- **Voting System** → Vote anonymously, reveal results, track consensus
- **Analytics Dashboard** → Voting distribution charts, consensus indicators, statistics
- **Session Sharing** → 6-character session codes for team collaboration
- **Data Export** → Export session data in JSON/CSV formats
- **Comprehensive Testing** → 38 API tests + 24 E2E tests

------

## ⚙️ How It Works

```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend (separate terminal)
cd frontend && npm install && npm run dev
```

Access app at `http://localhost:5173`, API at `http://localhost:8080`

------

## 🎬 Quick Start

```bash
git clone https://github.com/pandaind/estimate.git
cd estimate

# Terminal 1
cd backend && mvn spring-boot:run

# Terminal 2
cd frontend && npm install && npm run dev
```

Access app at `http://localhost:5173`

------

## 📚 Topics Covered

- 🛠️ **WebSocket Communication** → Real-time bidirectional messaging
- 🚀 **Spring Boot** → REST API, WebSocket configuration, H2 database
- 🌐 **React Development** → Hooks, context, state management
- 📊 **Data Visualization** → Charts with libraries, analytics
- 💡 **Modern Frontend** → Vite build tool, TailwindCSS, Framer Motion
- ✅ **API Testing** → Newman/Postman automation
- 🎭 **E2E Testing** → Playwright cross-browser testing
- 🔄 **CI/CD** → GitHub Actions pipeline

------

## 🔧 Potential Extensions

Areas for experimentation:

1. Add user authentication and authorization
2. Implement story points velocity tracking
3. Create team retrospective features
4. Add story templates and categories
5. Implement voting timer functionality
6. Create historical session analytics
7. Add integration with Jira/Azure DevOps
8. Implement multi-room support for organizations

------

## 📖 Documentation

Available guides:

- [Future Features & Roadmap](https://github.com/pandaind/estimate/blob/main/FUTURE_FEATURES.md) → Planned enhancements
- [Backend Documentation](https://github.com/pandaind/estimate/blob/main/backend/README.md) → Spring Boot setup
- [Frontend Documentation](https://github.com/pandaind/estimate/blob/main/frontend/README.md) → React development
- [API Testing Guide](https://github.com/pandaind/estimate/blob/main/api-testing/README.md) → Newman tests
- [E2E Testing Guide](https://github.com/pandaind/estimate/blob/main/e2e-tests/README.md) → Playwright tests

------

## 🤝 Contributing

This is a learning project. You can:

- Study WebSocket implementation patterns
- Fork and experiment with new features
- Try different estimation methods
- Add documentation or examples
- Submit improvements via pull requests

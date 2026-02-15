---
title: "EstiMate - Planning Poker"
date: 2024-09-20
summary: "Learning project: Real-time collaborative story estimation with Spring Boot and React."
description: "Educational Planning Poker application demonstrating WebSocket real-time communication, Spring Boot backend, React frontend, story estimation, and comprehensive testing with Newman and Playwright."
tags: ["Spring Boot", "React", "WebSocket", "Java", "Agile", "Real-time"]
thumbnail: "/img/estimate.png"
github: "https://github.com/pandaind/estimate"
tech_stack: ["Spring Boot", "React", "Java 21", "WebSocket", "H2 Database", "Vite", "Tailwind CSS"]
status: "Learning"
featured: false
weight: 5
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

**Start the Application:**
```bash
# Backend (Spring Boot)
cd backend
mvn spring-boot:run
# API: http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html

# Frontend (React + Vite)
cd frontend
npm install && npm run dev
# App: http://localhost:5173
```

**Using EstiMate:**
1. Create a session with your preferred estimation method
2. Share the 6-character session code with your team
3. Add user stories to the backlog
4. Team members join and vote on estimates
5. Reveal results and view analytics
6. Finalize estimates and move to next story

------

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                  Browser Clients                       │
│          (React + WebSocket Connection)                │
└───────────────┬────────────────────────────────────────┘
                │
                │ HTTP REST + WebSocket
                ▼
┌────────────────────────────────────────────────────────┐
│              Spring Boot Backend                       │
│                  (Port 8080)                           │
│                                                        │
│  ┌──────────────┐      ┌──────────────┐              │
│  │   REST API   │      │  WebSocket   │              │
│  │  Controllers │      │   Handler    │              │
│  └──────┬───────┘      └──────┬───────┘              │
│         │                     │                       │
│         ▼                     ▼                       │
│  ┌─────────────────────────────────┐                 │
│  │      Service Layer               │                 │
│  │  - Session Management            │                 │
│  │  - Story Management              │                 │
│  │  - Voting Logic                  │                 │
│  │  - Analytics Calculation         │                 │
│  └──────────────┬──────────────────┘                 │
│                 │                                     │
│                 ▼                                     │
│  ┌─────────────────────────────────┐                 │
│  │      H2 Database                │                 │
│  │  - Sessions                      │                 │
│  │  - Stories                       │                 │
│  │  - Votes                         │                 │
│  │  - Participants                  │                 │
│  └─────────────────────────────────┘                 │
└────────────────────────────────────────────────────────┘
```

**Communication Flow:**
- **REST API** → Session creation, story management, data retrieval
- **WebSocket** → Real-time participant updates, vote synchronization, status changes
- **H2 Database** → In-memory persistence for sessions, stories, votes

------

## 📁 Project Structure

```
estimate/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/estimate/
│   │   ├── controller/        # REST controllers
│   │   ├── websocket/         # WebSocket handlers
│   │   ├── service/           # Business logic
│   │   ├── model/             # Domain models
│   │   ├── repository/        # Data repositories
│   │   └── config/            # Configuration
│   ├── src/main/resources/
│   │   └── application.yml    # Spring Boot config
│   └── pom.xml
├── frontend/                   # React UI
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client & WebSocket
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── vite.config.js
├── api-testing/               # Newman API tests
│   ├── EstiMate.postman_collection.json
│   ├── environment.json
│   └── run-tests.sh          # Test runner (38 tests)
├── e2e-tests/                 # Playwright E2E tests
│   ├── tests/                # Test scenarios
│   ├── playwright.config.js
│   └── run-tests.sh          # Test runner (24 tests)
├── screenshots/               # Feature screenshots
├── .github/workflows/         # CI/CD pipeline
├── start.sh                   # Quick start script
└── FUTURE_FEATURES.md        # Roadmap
```

------

## 🎬 Example Workflow

```bash
# 1. Clone the repository
git clone https://github.com/pandaind/estimate.git
cd estimate

# 2. Start the backend
cd backend
mvn spring-boot:run
# Wait for Spring Boot to start

# 3. Start the frontend (new terminal)
cd frontend
npm install
npm run dev

# 4. Access the application
# Open http://localhost:5173

# 5. Create a session
# - Choose estimation method (Fibonacci, T-Shirt, etc.)
# - Get your 6-character session code
# - Share with team members

# 6. Run API tests
cd api-testing
./run-tests.sh
# 38 tests covering all API endpoints

# 7. Run E2E tests
cd e2e-tests
./run-tests.sh
# 24 tests covering user workflows
```

You can now:
- Explore WebSocket real-time communication
- Study session management patterns
- Review voting system implementation
- Examine React hooks and state management
- Inspect Spring Boot WebSocket configuration
- Run comprehensive test suites

------

## ✨ Features Breakdown

### Estimation Methods
- **Fibonacci Sequence** → 1, 2, 3, 5, 8, 13, 21, ...
- **T-Shirt Sizes** → XS, S, M, L, XL, XXL
- **Powers of 2** → 1, 2, 4, 8, 16, 32, ...
- **Linear Scale** → 1, 2, 3, 4, 5, 6, ...
- **Custom Values** → Define your own scale

### Real-Time Features
- Live participant tracking
- Instant vote synchronization
- Real-time voting status indicators
- Session activity updates
- WebSocket connection management

### Story Management
- Create and organize user stories
- Story backlog management
- Activate stories for voting
- Finalize estimates
- Track voting history per story

### Analytics
- Voting distribution charts
- Consensus indicators
- Story-specific metrics
- Average, minimum, maximum calculations
- Export session data (JSON/CSV)

------

## 📊 Testing

**API Tests (Newman/Postman):**
```bash
cd api-testing
./run-tests.sh
```
- 38 comprehensive API tests
- Session management validation
- Story CRUD operations
- Voting workflow verification
- WebSocket endpoint testing

**E2E Tests (Playwright):**
```bash
cd e2e-tests
./run-tests.sh
```
- 24 end-to-end scenarios
- Full user journey testing
- Real-time collaboration flows
- Cross-browser testing
- Visual regression checks

------

## 📸 Application Screenshots

The application includes:
- **Session Dashboard** → Real-time participant tracking and story management
- **Voting Interface** → Interactive estimation cards with multiple methods
- **Results View** → Reveal votes with detailed statistics
- **Analytics Dashboard** → Consensus tracking and voting patterns
- **Distribution Charts** → Visual breakdown of team estimates

------

## 🔌 API Endpoints

**Session Management:**
- `POST /api/sessions` → Create new session
- `GET /api/sessions/{code}` → Get session details
- `DELETE /api/sessions/{code}` → Delete session

**Story Management:**
- `POST /api/sessions/{code}/stories` → Add story
- `GET /api/sessions/{code}/stories` → List stories
- `PUT /api/stories/{id}/activate` → Activate story
- `PUT /api/stories/{id}/finalize` → Finalize estimate

**Voting:**
- `POST /api/stories/{id}/vote` → Submit vote
- `POST /api/stories/{id}/reveal` → Reveal votes
- `GET /api/stories/{id}/results` → Get voting results

**WebSocket:**
- `/ws/estimate` → WebSocket endpoint for real-time updates

Interactive API documentation: `http://localhost:8080/swagger-ui.html`

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

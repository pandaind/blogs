---
title: "EstiMate - Planning Poker"
date: 2026-02-01
description: "Planning poker for agile teams, in real time."
tags: ["Spring Boot", "React", "WebSocket", "Java", "Agile", "Real-time"]
cover: "img/estimate.png"
repo: "https://github.com/pandaind/estimate"
stack: ["Spring Boot", "React", "Java 21", "WebSocket", "H2 Database", "Vite", "Tailwind CSS"]
weight: 8
year: 2026
---
A planning poker tool. Everyone joins a session with a short code, votes on a story, and the votes are revealed together. Updates go over WebSockets, so the room stays in sync without refreshing.

The back end is Spring Boot and the front end is React with Vite and Tailwind. It supports Fibonacci, T-shirt sizes and powers of 2, shows how the votes were spread, and can export a session as JSON or CSV. The API is tested with Newman and the UI with Playwright.

```bash
cd backend && mvn spring-boot:run
cd frontend && npm install && npm run dev
```

The app runs at `http://localhost:5173`.

---
title: "PopTalk - Chat for Your Site"
date: 2026-08-15
description: "A chat widget and backend you host yourself. AI answers or your own replies."
tags: ["Spring Boot", "Apache Camel", "Spring AI", "JavaScript", "Chat"]
repo: "https://github.com/pandaind/poptalk"
stack: ["Java 21", "Spring Boot", "Apache Camel", "Spring AI", "JavaScript", "Docker"]
weight: 2
year: 2026
---
A small chat widget you put on a website, and a backend you run yourself. A visitor leaves a name and an email, then chats. The reply can come from an AI model, or the message can be sent to you on Telegram so you answer by hand.

The backend is Spring Boot with Apache Camel and Spring AI, so a persona can use Ollama, OpenAI, Anthropic, Mistral or DeepSeek, and each persona has its own model and prompt. The widget is plain JavaScript in a shadow root, with light and dark themes and a few translations. Sessions use short-lived JWTs and requests are rate limited.

```bash
git clone https://github.com/pandaind/poptalk.git
cd poptalk/backend
cp .env.example .env     # fill in your values
docker-compose up -d
```

It works with any site, and [Meteorite](/projects/meteorite/) has built-in support for it.

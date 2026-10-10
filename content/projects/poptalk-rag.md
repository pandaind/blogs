---
title: "PopTalk RAG - Knowledge for Chat"
date: 2026-09-19
description: "An MCP server that lets PopTalk personas answer from their own documents."
tags: ["Spring Boot", "RAG", "MCP", "pgvector", "Java"]
repo: "https://github.com/pandaind/poptalk-rag"
stack: ["Java 21", "Spring Boot", "Spring AI", "Apache Camel", "PostgreSQL", "pgvector", "MCP"]
weight: 3
year: 2026
---
A separate service that gives [PopTalk](/projects/poptalk/) personas a knowledge base made from their own documents. Put files in a persona's folder and it keeps itself in sync, picking up new, changed and deleted files.

When the chat model needs more than it knows, it calls one tool, `search_knowledge_base`. That searches by meaning and by exact keywords, then reranks the results. Every persona has its own API key, and the key alone decides which documents a request can see, so one persona can't be talked into reading another's files.

Content can also come from a static site: [Meteorite](/projects/meteorite/) publishes a `knowledge.json` and this service pulls it on a schedule.

```bash
git clone https://github.com/pandaind/poptalk-rag.git
cd poptalk-rag
docker-compose up -d
```

It runs on Postgres with pgvector, and embeds with Ollama or OpenAI.

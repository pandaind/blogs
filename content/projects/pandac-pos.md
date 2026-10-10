---
title: "POS API"
date: 2025-10-15
description: "A point-of-sale API built with FastAPI."
tags: ["FastAPI", "Python", "PostgreSQL", "REST API", "Docker"]
cover: "img/pandac-pos.png"
repo: "https://github.com/pandaind/pandac-pos"
stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "SQLAlchemy", "Alembic"]
weight: 2
year: 2025
---
A point-of-sale API I wrote to get comfortable with FastAPI. It has login with JWT and roles, products and inventory, customers, sales and reports. PostgreSQL sits behind SQLAlchemy, Alembic handles migrations, and Docker Compose runs it all.

There is a Postman collection with 223 assertions; `./test.sh` runs it through Newman.

```bash
docker-compose up -d
```

The API is at `http://localhost:8000` and the generated docs at `/docs`.

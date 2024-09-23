---
title: "Fast API Project Structure"
date: 2024-09-23T10:04:33+05:30
draft: false
tags: [ "FastAPI", "Python" ]
---

When working with a large FastAPI project, organizing your code into packages and using a modular file structure helps in maintaining scalability, readability, and ease of collaboration.

**package structure** for a large FastAPI project:

### 1. Directory Structure

```
my_fastapi_project/
│
├── app/
│   ├── __init__.py
│   ├── main.py                # Main FastAPI application
│   ├── models/                # Pydantic and ORM models
│   │   ├── __init__.py
│   │   └── movie.py           # Movie model definition
│   ├── api/                   # API endpoints
│   │   ├── __init__.py
│   │   ├── v1/                # Versioned API (v1)
│   │   │   ├── __init__.py
│   │   │   └── movies.py      # Endpoints for movies
│   ├── core/                  # Core settings, config, database connection, etc.
│   │   ├── __init__.py
│   │   └── config.py          # Settings configuration
│   ├── services/              # Business logic and services
│   │   ├── __init__.py
│   │   └── movie_service.py   # Logic for movie-related actions
│   └── db/                    # Database-related files
│       ├── __init__.py
│       └── database.py        # DB connection setup
├── tests/                     # Test files
│   ├── __init__.py
│   └── test_movies.py         # Test cases for movies API
├── .env                       # Environment variables
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation
```

### 2. Explanation of Directories and Files

- **app/main.py**:
  - The entry point for your FastAPI application. This file initializes the app and includes middleware, routers, and other configurations.
- **app/models/**:
  - Contains Pydantic models and ORM models (if you're using a database like SQLAlchemy or Tortoise ORM).
  - **movie.py** defines the Movie model, which might be a Pydantic schema or an ORM model.
- **app/api/**:
  - Contains all the API routes organized by version (e.g., `v1`, `v2`). Inside each version, the routes are further organized by feature or resource.
  - **movies.py** handles all the endpoints related to movies in version 1 of the API (e.g., `/v1/movies/`).
- **app/core/**:
  - Contains application-wide settings, configurations, constants, and utilities.
  - **config.py** manages application configurations like environment variables, API settings, etc.
- **app/services/**:
  - Contains business logic and services related to different features of the application.
  - **movie_service.py** might contain functions that handle complex business logic, such as interacting with the database, performing calculations, or managing caching, related to movies.
- **app/db/**:
  - Handles database-related configurations and connection management.
  - **database.py** manages the database connection setup, ORM initialization, and session handling.
- **tests/**:
  - Contains unit and integration tests for your API, models, and services.
  - **test_movies.py** contains test cases to ensure the correct functioning of movie-related API endpoints.

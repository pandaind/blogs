---
title: "Existing OpenAPI to an MCP Server Using FastMCP"
date: 2025-08-03T22:38:01+05:30
draft: false
tags: [ "AI", "MCP", "Gen Ai", "Model Context Protocol" ]
---

In this brief tutorial, we'll use **FastMCP** to transform an existing TODO application (which exposes an OpenAPI spec) into a **MCP server** and link it to **CoPilot** for organic task interactions.

### Step 1: The TODO App

Your TODO app should already be running at:

```
http://localhost:8000
```

And exposing its OpenAPI spec at:

```
http://localhost:8000/openapi.json
```

------

###  Step 2: Create the MCP Server

Create a file `todo_mcp_server.py`:

```python
import httpx
from fastmcp import FastMCP

client = httpx.AsyncClient(base_url="http://localhost:8000")
spec = httpx.get("http://localhost:8000/openapi.json").json()
mcp = FastMCP.from_openapi(openapi_spec=spec, client=client)

if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="localhost",
        port=4200,
        path="/todo-mcp/http",
        log_level="debug",
    )
```

Run it:

```bash
python todo_mcp_server.py
```

Your MCP server will be available at:

```
http://localhost:4200/todo-mcp/http
```

------

###  Step 3: Add to CoPilot

In your `mcp.json`:

```json
{
  "servers": {
    "todo": {
      "url": "http://localhost:4200/todo-mcp/http"
    }
  }
}
```

------

###  Step 4: Sample Conversations

**You:** `list all the tasks`

**CoPilot:**

```
Here is the list of all tasks:

1. Review project proposal - Review and provide feedback on the Q1 project proposal  
   (Priority: High, Category: Work)

2. Buy groceries - Milk, eggs, bread, and vegetables  
   (Priority: Medium, Category: Personal)

3. Call dentist - Schedule annual checkup  
   (Priority: Low, Category: Health)
```

**You:** `add a new task to buy laptop next monday`

**CoPilot:**

```
Task "Buy laptop" added with due date August 11, 2025.
```

**You:** `list again`

**CoPilot:**

```
Here is the list of all tasks:

1. Review project proposal - Review and provide feedback on the Q1 project proposal  
   (Priority: High, Category: Work)

2. Buy groceries - Milk, eggs, bread, and vegetables  
   (Priority: Medium, Category: Personal)

3. Call dentist - Schedule annual checkup  
   (Priority: Low, Category: Health)

4. Buy laptop - Purchase a new laptop  
   (Priority: Medium, Category: Personal, Due Date: August 11, 2025)

Let me know if you'd like to update, delete, or add any tasks!
```

------

That’s it! Your OpenAPI-based TODO app is now AI-ready with MCP + CoPilot.

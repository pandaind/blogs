---
title: "Understanding the Chain of Responsibility Design Pattern"
date: 2024-08-09T16:00:27+05:30
draft: false
tags: [ "Design Patterns", "GOF", "software design" ]
---

Imagine you're sending a package. It goes through various checkpoints: sorting, security, customs, etc. Each checkpoint decides whether to handle the package or pass it on to the next. This is similar to the Chain of Responsibility pattern.

Key Idea:

- A request is passed along a chain of objects.
- Each object decides whether to handle or pass the request to the next.
- This creates a loose coupling between the sender and receiver.

## Code Example

~~~java
// Handler.java
public abstract class Handler {
    protected Handler nextHandler;

    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }

    public abstract void handleRequest(String request);
}
// ConcreteHandlerA.java
public class ConcreteHandlerA extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("A")) {
            System.out.println("ConcreteHandlerA handled the request.");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}
// ConcreteHandlerB.java
public class ConcreteHandlerB extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("B")) {
            System.out.println("ConcreteHandlerB handled the request.");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}
// ConcreteHandlerC.java
public class ConcreteHandlerC extends Handler {
    @Override
    public void handleRequest(String request) {
        if (request.equals("C")) {
            System.out.println("ConcreteHandlerC handled the request.");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}

// Main.java
public class Main {
    public static void main(String[] args) {
        Handler handlerA = new ConcreteHandlerA();
        Handler handlerB = new ConcreteHandlerB();
        Handler handlerC = new ConcreteHandlerC();

        handlerA.setNextHandler(handlerB);
        handlerB.setNextHandler(handlerC);

        handlerA.handleRequest("B");
        handlerA.handleRequest("C");
        handlerA.handleRequest("A");
    }
}
~~~

## Explanation
- Interface Handler: Defines the common interface for all handlers.
- Concrete Handlers: Implement the Handler interface and provide specific logic for handling requests.
- setNextHandler: Links handlers in the chain.
- handleRequest: Checks if the handler can process the request. If yes, it handles it. Otherwise, it passes the request to the next handler in the chain.
- Request: Represents the data associated with the request.

## Key Points
- The Handler interface provides a common contract for all handlers.
- Each concrete handler decides whether to handle or pass the request.
- The chain of handlers is created by linking them together.
- The client sends the request to the first handler in the chain.


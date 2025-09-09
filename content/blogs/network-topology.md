---
title: "Networking Essentials for System Design Interviews"
date: 2025-09-09T20:29:09+05:30
draft: false
tags: [ "system design", "network" ]
---

When preparing for software engineering or system design interviews, networking concepts often come up in subtle but important ways. Whether it’s choosing between REST, gRPC, or GraphQL, explaining how HTTP/3 improves performance, or troubleshooting latency issues in a distributed system, understanding the fundamentals can help you stand out. Let’s break down the key topics we discussed into an easy-to-digest guide.

------

## 1. OSI Model: The Foundation of Networking

The OSI (Open Systems Interconnection) model is a **conceptual framework** that divides networking into seven layers, each with distinct responsibilities:

1. **Physical Layer** – Hardware transmission (cables, signals, radio waves).
2. **Data Link Layer** – MAC addressing, switching, error detection.
3. **Network Layer** – IP addressing, routing (e.g., IPv4/IPv6).
4. **Transport Layer** – End-to-end communication, TCP/UDP.
5. **Session Layer** – Manages sessions between systems.
6. **Presentation Layer** – Data translation, encryption, compression.
7. **Application Layer** – User-facing protocols (HTTP, FTP, SMTP).

📌 **Why it matters in interviews:** The OSI model provides a structured way to troubleshoot or explain communication problems. For example, if your distributed system experiences latency, you can systematically consider whether the issue lies in the network layer (routing), the transport layer (TCP connections), or the application layer (API logic).

💡 **Mnemonic:** *Please Do Not Throw Sausage Pizza Away* (Physical → Application).

------

## 2. TCP vs UDP: Reliability vs Speed

Both TCP and UDP sit at the **Transport Layer** but serve very different purposes.

- **TCP (Transmission Control Protocol)**
  - Connection-oriented, reliable.
  - Guarantees packet delivery and order.
  - Suitable for applications like file transfers, emails, or APIs.
- **UDP (User Datagram Protocol)**
  - Connectionless, faster but unreliable.
  - No guarantee of delivery or order.
  - Ideal for real-time applications (gaming, VoIP, streaming).

📌 **Enhanced protocols:**

- **QUIC (Quick UDP Internet Connections)**: Built on UDP, offers reliability like TCP but with lower latency.
- **RTP (Real-time Transport Protocol):** Used in streaming media.

------

## 3. HTTP Evolution: From 1.1 to 3

HTTP, the backbone of the web, has evolved significantly:

- **HTTP/1.1**
  - Opens a new connection for each request unless keep-alive is enabled.
  - Suffering from *head-of-line blocking*.
- **HTTP/2**
  - Introduced multiplexing (multiple requests on a single connection).
  - Header compression, request prioritization.
- **HTTP/3**
  - Runs on **QUIC (UDP)** instead of TCP.
  - Faster connection setup, built-in encryption, better packet loss handling.
  - Becoming the standard for modern web applications.

📌 **Why it matters in system design:** Choosing the right HTTP version can drastically impact latency, throughput, and user experience.

------

## 4. TLS & Security

- **SSL (Secure Sockets Layer):** Now deprecated due to vulnerabilities.
- **TLS (Transport Layer Security):** The modern standard.

### TLS Versions:

- **1.0 & 1.1** – Legacy, insecure.
- **1.2** – Still widely used, supports strong encryption.
- **1.3** – Latest version; faster handshake, forward secrecy, stronger cryptography.

📌 **Interview tip:** Mention TLS 1.3’s reduced handshake overhead and improved security when discussing modern secure architectures.

------

## 5. Real-Time Communication: Polling, SSE, and WebSockets

When designing real-time systems, you have several communication strategies:

- **Short Polling**: Client repeatedly asks server for updates (inefficient).
- **Long Polling**: Client requests held open until server has new data (better but still HTTP-based).
- **Server-Sent Events (SSE)**: One-way server → client updates over HTTP. Great for live feeds.
- **WebSockets**: Full-duplex, persistent connections. Ideal for chat apps, games, and collaborative tools.

📌 **Rule of thumb:**

- Use **short polling** for simple, infrequent updates.
- Use **long polling or SSE** for near real-time one-way updates.
- Use **WebSockets** when you need two-way, low-latency communication.

------

## 6. APIs: REST vs GraphQL vs gRPC

Choosing the right API technology depends on your system’s needs:

- **REST**
  - Resource-based, simple, widely supported.
  - Easy to cache and scale.
  - Downsides: over-fetching, under-fetching, versioning.
- **GraphQL**
  - Query language, fetch only required fields.
  - Flexible for multiple clients with varied needs.
  - Downsides: complex setup, harder caching.
- **gRPC**
  - High-performance RPC framework.
  - Uses HTTP/2 + Protocol Buffers.
  - Great for microservices.
  - Downsides: limited browser support, steeper learning curve.

📌 **Use case guidance:**

- **REST**: Public APIs, simple CRUD.
- **GraphQL**: Complex client queries, mobile/web apps with diverse needs.
- **gRPC**: Internal microservices, high-performance systems.

------

## Final Thoughts

When asked about communication or performance trade-offs, walk through the OSI model and explain your reasoning layer by layer. It shows structured thinking and a solid foundation in system design.

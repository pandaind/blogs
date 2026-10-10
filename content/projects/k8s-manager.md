---
title: "Kubernetes Local Manager 2.0 Ubuntu"
date: 2025-08-17
description: "A local Kubernetes playground in one script."
tags: ["Kubernetes", "DevTools", "Minikube", "Helm", "Docker"]
cover: "img/k8s-manager.png"
repo: "https://github.com/pandaind/k8s-setup-manager"
stack: ["Bash", "Kubernetes", "Helm", "Docker", "Minikube"]
weight: 1
year: 2025
---
Setting up Kubernetes on a laptop usually eats a day before you write any code. This is a Bash script that does it for you on Ubuntu, and then deploys the things I keep needing: databases, caches, message queues, search and monitoring.

It installs Docker, kubectl, Minikube, Helm and k9s, then you either pick components from a menu or run a wizard that brings up a whole stack in one go (AI/ML, data engineering, microservices).

```bash
./k8s_manager.sh install
./k8s_manager.sh start
./k8s_manager.sh wizard-complete-dev
```

There are 21+ components, including Redis, PostgreSQL, Kafka, MinIO, Elasticsearch and Prometheus. Ingress with TLS, Istio, chaos tests and load tests are in there too.

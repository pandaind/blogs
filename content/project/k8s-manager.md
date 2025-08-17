---
title: "Kubernetes Local Manager 2.0 Ubuntu"
date: 2025-08-17
summary: "Spin up a full Kubernetes playground on your laptop with one script—databases, messaging, monitoring, and more."
description: "A modular local Kubernetes manager that makes it easy to deploy 21+ components like Redis, Kafka, PostgreSQL, Elasticsearch, Istio, and Prometheus. With interactive menus and quick wizards, you get a production-like dev environment in minutes"
tags: ["Kubernetes", "DevTools", "Minikube", "Helm", "Docker"]
thumbnail: "/img/k8s-manager.png"
github: "https://github.com/pandaind/k8s-setup-manager"
tech_stack: ["Bash", "Kubernetes", "Helm", "Docker", "Minikube"]
status: "Stable"
featured: false
weight: 1
---

## 🧭 Overview

Setting up Kubernetes locally usually means hours of fiddling with Docker, Minikube, Helm, databases, message queues, and dashboards—before you even start writing code.

**Kubernetes Local Manager 2.0** changes that. With just **one script**, you can spin up a **full local Kubernetes environment** on **Ubuntu**—complete with **21+ pre-built components** (Redis, PostgreSQL, Kafka, MinIO, Elasticsearch, Prometheus, and more).

It comes with two modes:

- 🎛️ **Interactive menus** → great if you like guided steps
- ⚡ **Quick wizards** → spin up an entire stack (like AI/ML or microservices) in a single command

Think of it as your **production-grade dev lab**—right on your laptop.

------

## 🔑 Key Features

- **21+ Ready-to-Use Components** → Databases, caches, queues, vector DBs, monitoring
- **Quick Setup Wizards** → AI/ML, data engineering, microservices, web apps
- **Menu-Driven Interface** → Easy navigation for cluster ops, apps, and monitoring
- **Advanced Goodies** → Ingress, TLS, Istio service mesh, chaos testing, load tests
- **Secure by Default** → Network policies, RBAC, backups, namespace isolation

------

## ⚙️ How It Works

1. **Install once** → `./k8s_manager.sh install` handles Docker, kubectl, Minikube, Helm, k9s

2. **Start your cluster** → `./k8s_manager.sh start`
3. **Pick your mode**:
   - **Wizard mode** (`wizard-complete-dev`, `wizard-aiml`, etc.)
   - **Menu mode** (`./k8s_manager.sh`) for interactive navigation
4. **Deploy components** like PostgreSQL, Kafka, or Redis in seconds
5. **Monitor & test** with Prometheus, Grafana, chaos engineering, and load testing

------

## 📈 Why It’s Awesome

- 🛠️ **Developer-Friendly** → Spend time coding, not configuring
- 🚀 **One-Command Environments** → From scratch to full dev lab in minutes
- 🌐 **Ingress Made Easy** → TLS and custom hostnames with a single script
- 📊 **Production-Like Setup** → Service mesh, monitoring, and debugging included
- 💡 **Perfect for Experiments** → Try new stacks locally without cloud bills

------

- ## 🛠️ What’s Inside

  - **Storage & Caching** → Redis, Memcached, Hazelcast, MinIO
  - **Databases** → PostgreSQL, MongoDB, MySQL, Cassandra, InfluxDB
  - **Messaging Systems** → Kafka, RabbitMQ, ActiveMQ Artemis, Pulsar, Zookeeper
  - **Vector & Search** → Weaviate, Qdrant, Elasticsearch, OpenSearch
  - **Monitoring & Infra** → Prometheus, Grafana, Istio

  You can deploy them **individually** or as **pre-configured environments**—like Lego blocks for Kubernetes.

  ------

  ## 🎬 Example Workflow

  Here’s how a typical dev session looks:

  ```bash
  # 1. Install and start
  ./k8s_manager.sh install
  ./k8s_manager.sh start
  
  # 2. Spin up a complete dev environment
  ./k8s_manager.sh wizard-complete-dev
  
  # 3. Deploy your app
  ./k8s_manager.sh generate-manifests myapp dev
  ./k8s_manager.sh deploy ./manifests-myapp/
  
  # 4. Expose it
  ./k8s_manager.sh create-ingress myapp-ingress \ 
  myapp.local myapp-service:80
  
  # 5. Test & monitor
  ./k8s_manager.sh load-test http://myapp.local 1000 50
  ./k8s_manager.sh enable-monitoring
  ```

  Now you’ve got:
   ✅ Databases + caches running
   ✅ Your app deployed with ingress routing
   ✅ Dashboards to watch everything
   ✅ Load testing + chaos tools to push limits

  ------

  ## 📊 Commands at a Glance

  - **Cluster** → `start`, `stop`, `status`, `restart`
  - **Components** → `deploy-redis`, `deploy-postgresql`, `deploy-kafka`, `deploy-weaviate`
  - **Environments** → `create-dev-env`, `create-database-env`, `create-messaging-env`
  - **Wizards** → `wizard-aiml`, `wizard-data-eng`, `wizard-complete-dev`
  - **Advanced** → `enable-istio`, `enable-chaos`, `enable-ingress`, `load-test`

  ------

  ## 🤝 Contributing

  Want to improve it?

  1. Fork the repo
  2. Create a feature branch
  3. Test your changes
  4. Open a PR


------

**Bottom line:**
 With **Kubernetes Local Manager 2.0**, you can turn your laptop into a **mini-production environment**—databases, queues, monitoring, and more—without the usual setup pain. 🎉

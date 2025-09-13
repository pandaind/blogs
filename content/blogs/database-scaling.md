---
title: "Scaling Databases"
date: 2025-06-16T23:53:30+05:30
draft: false
tags: [ "System Design", "Database" ]
---

As your app starts growing, one of the first things to feel the heat is your **database**. Queries slow down, reports get delayed, and your users start noticing. That’s when you start hearing scary words like *replication*, *sharding*, *horizontal scaling*… 😵‍💫

Don’t worry — scaling a database isn’t black magic. In fact, it’s a lot more manageable when you understand the core concepts.

So, let’s break it down — one question at a time.

------

### **Q: What exactly is vertical scaling?**

**A:** Think of vertical scaling as beefing up your existing server. You add more CPU, RAM, or disk — and boom, your database runs faster.
 Great for quick wins, but it has limits. You can’t keep upgrading forever, and one big server still means a single point of failure.

------

### **Q: And what’s horizontal scaling then?**

**A:** This is about **adding more machines** instead of making one bigger. You spread the load across multiple servers. It's trickier to set up, but it’s the long-term solution for handling serious scale.

------

### **Q: How does MySQL handle scaling?**

**A:** MySQL can scale using:

- **Replication**: Copying your data to other servers so they can help with reads.
- **Sharding**: Splitting your data across multiple servers so they can all share the write load.

You can even combine both for more flexibility.

------

### **Q: Wait — what is sharding?**

**A:** Sharding is like cutting a pizza. You divide your data into “slices” and store them on different servers based on a key (say, user ID).
 It helps spread the load, but also means your app needs to know where the data lives.

------

### **Q: And replication?**

**A:** Replication is making **copies** of your data across servers. One server (the primary) handles all writes, and the rest (replicas) help with reads. If the main server goes down, one of the replicas can take over.

------

### **Q: What’s a master-slave setup in MySQL?**

**A:** It’s the classic replication setup:

- **Master**: Does all the writing.
- **Slaves**: Only read data, but stay in sync with the master.

It’s simple and works well for read-heavy apps.

------

### **Q: What about active-active MySQL setups?**

**A:** That’s when **multiple MySQL servers** handle reads *and* writes. More power, but also more problems — like keeping the data consistent and avoiding conflicts.
 Tools like **Galera Cluster** or **Vitess** help make this more manageable.

------

### **Q: Speaking of Vitess — what’s that?**

**A:** Vitess is like a superpower for scaling MySQL. It adds smart sharding, query routing, and management features. Originally built at YouTube, it’s now open source and Kubernetes-friendly.

------

### **Q: How do you manage sharding in Spring Boot apps?**

**A:** You can:

- Write custom logic to route queries to the right shard
- Use libraries like **ShardingSphere**
- Manage separate DataSources for each shard manually or via configuration

It takes some effort, but gives you full control.

------

### **Q: How do I deal with master-slave setups in Spring Boot?**

**A:** The key is using `@Transactional`. If you set `readOnly=true`, Spring can route those reads to a replica.
 You might also need a routing datasource or a proxy like **ProxySQL** in between.

------

### **Q: What about NoSQL — how does that scale?**

**A:** NoSQL databases (like MongoDB, Cassandra, DynamoDB) are **built for scale** from the start.
 They usually do automatic sharding, replicate data out of the box, and don’t rely on rigid schemas — which makes scaling simpler (but consistency more complex).

------

### **Q: How does MongoDB do it?**

**A:** MongoDB supports:

- **Sharding**: You pick a “shard key,” and it takes care of splitting the data.
- **Replica sets**: Multiple copies of the same data for availability and failover.

You also get automatic elections if a primary server crashes — neat!

------

### **Q: What’s a primary-secondary setup in MongoDB?**

**A:** The **primary** handles all writes. The **secondaries** just sync up and help with reads.
 If the primary dies, MongoDB promotes a secondary — no human needed.

------

### **Q: And what’s a replica set exactly?**

**A:** It’s a **group of MongoDB servers** that all hold the same data. Great for staying online during failures and distributing traffic across servers.

------

### **Q: How does Cassandra handle scaling?**

**A:** Cassandra goes full **peer-to-peer**. No masters, no primaries — just a bunch of equal nodes. Each handles its share of reads/writes, and data is auto-replicated.
 Add more nodes? Cassandra scales linearly. It’s built for high-write, high-volume systems.

------

### **Q: What’s this peer-to-peer thing really mean?**

**A:** Every node is equal. They all talk to each other and share the load. No single point of failure, no bottlenecks. Great for massive, distributed systems.

------

### **Q: How do hash functions help with sharding?**

**A:** Hashing turns a key (like a user ID) into a number. That number helps decide which shard stores the data.
 It’s fast and evenly distributes load — but tricky if you want to change the number of shards later.

------

### **Q: Are there different types of sharding?**

**A:** Yep — here are the big three:

1. **Range-based sharding**
    Split by value ranges (e.g., user IDs 1–1000 on one shard, 1001–2000 on another).
    Easy for range queries, but may create unbalanced shards.
2. **Hash-based sharding**
    Use a hash function to decide the shard.
    Very balanced, but hard to query across ranges.
3. **Directory-based sharding**
    Maintain a central map that knows where each piece of data is.
    Very flexible, but adds some overhead.

------

### 🔚 **Wrapping Up**

Database scaling might sound intimidating, but it’s really about making smart choices based on your app’s needs.

- Start with **replication** for read-heavy apps
- Add **sharding** if your dataset or write load grows
- And always think ahead — it’s easier to design for scale early than fix things later

---
title: "`cargo new` — Your First Rust Project - Day 03"
date: 2026-08-19T12:22:56+05:30
draft: false
tags: [ "rust", "rust for java dev" ]
---

In Java, starting a project means choosing Maven or Gradle, creating a directory structure, writing a `pom.xml` or `build.gradle`, and eventually getting to actual code. In Rust, you run one command.

## Creating a project

```bash
cargo new hello-rust
cd hello-rust
```

That's your entire project setup. Here's what Cargo creates:

```
hello-rust/
├── Cargo.toml     ← your pom.xml / build.gradle
└── src/
    └── main.rs    ← your entry point
```

Clean. No boilerplate.

## `Cargo.toml` — the project descriptor

```toml
[package]
name = "hello-rust"
version = "0.1.0"
edition = "2021"

[dependencies]
```

The `[dependencies]` section is where you add libraries — Rust calls them **crates**. It's the equivalent of your `<dependencies>` block in Maven.

## Running the project

```bash
cargo run
```

Cargo compiles and runs your program in one step. You'll see:

```
Hello, world!
```

No `javac`, no `java -cp`, no classpath headaches.

## Other commands you'll use daily

| Command | What it does |
|---------|-------------|
| `cargo build` | Compile only |
| `cargo run` | Compile and run |
| `cargo test` | Run tests |
| `cargo check` | Type-check without compiling (fast!) |
| `cargo add <crate>` | Add a dependency |

`cargo check` is your friend. It's like a lightning-fast compile that only checks for errors — no binary produced. Use it constantly while coding.

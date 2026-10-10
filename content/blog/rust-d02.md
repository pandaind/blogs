---
title: "Installing Rust: `rustup` is Your New Best Friend - Day 02"
date: 2026-08-18T12:22:51+05:30
draft: false
tags: [ "rust", "rust for java dev" ]
---

Setting up a Java project used to mean downloading a JDK, setting `JAVA_HOME`, maybe fighting with your IDE, and picking a build tool. Rust makes this refreshingly simple.

## One command to rule them all

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

That's it. This installs `rustup` — Rust's toolchain manager. Think of it as the equivalent of SDKMAN for Java, except it's the *official* way to install Rust and everyone uses it.

## What gets installed

After running the above, you get three tools:

- **`rustc`** — the Rust compiler (you'll rarely use this directly)
- **`cargo`** — the build tool, package manager, test runner (you'll use this constantly)
- **`rustup`** — manages Rust versions and components

## Verify it worked

```bash
rustc --version
cargo --version
```

You should see something like `rustc 1.78.0` and `cargo 1.78.0`.

## Updating Rust

This is where `rustup` shines. Upgrading is one command:

```bash
rustup update
```

No downloading a new JDK zip. No updating `JAVA_HOME`. No drama.

## IDE support

Install the **rust-analyzer** extension in VS Code or IntelliJ IDEA (via the Rust plugin). It gives you autocomplete, inline errors, and type hints — everything you're used to in Java.

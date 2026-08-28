---
title: "`fn main()` — What a Rust Program Looks Like - Day 04"
date: 2026-08-25T12:23:00+05:30
draft: false
tags: [ "rust", "rust for java dev" ]
---

Open `src/main.rs` and you'll see this:

```rust
fn main() {
    println!("Hello, world!");
}
```

Familiar? It should be. But there are a few things worth noticing if you're coming from Java.

## No class wrapper

In Java, everything lives inside a class — even `main`:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

In Rust, `fn main()` is a free function. No class, no `public static`, no `String[] args` unless you need it. Less ceremony, more signal.

## Semicolons matter — but not like in Java

Rust uses semicolons to turn an **expression** into a **statement**. This might sound trivial, but it's actually meaningful:

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b   // no semicolon = this is the return value
}
```

If you add a semicolon to the last line, the function returns `()` (nothing) instead of the value. The compiler will tell you immediately.

## `fn` — declaring functions

```rust
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    greet("Java Developer");
}
```

Parameter types go *after* the name (`name: &str`), not before like in Java. Return type comes after `->`. You'll get used to it quickly.

## Everything is an expression

This is a core Rust idea. `if`, `match`, and blocks all *return values*. You can write:

```rust
let message = if true { "yes" } else { "no" };
```

No ternary operator needed. The block itself is the value.

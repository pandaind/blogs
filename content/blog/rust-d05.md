---
title: "`println!` — Why That `!` Matters - Day 05"
date: 2026-08-26T12:23:04+05:30
draft: false
tags: [ "rust", "rust for java dev" ]
---

You've seen `println!("Hello, world!")` already. But why the exclamation mark? In Rust, `!` means you're calling a **macro**, not a regular function.

## Macros vs functions

A regular function in Rust has a fixed number of typed parameters. A macro can accept a variable number of arguments of different types — which is exactly what you need for printing.

```rust
println!("Hello");                        // zero args
println!("Hello, {}!", "Rust");           // one arg
println!("{} + {} = {}", 1, 2, 1 + 2);   // three args
```

If `println` were a regular function, you'd need a different overload for each case. Instead, macros handle this at compile time.

## String formatting: `{}` and friends

Rust's formatting is similar to Java's but without `String.format()`'s ceremony:

```rust
let name = "Priya";
let score = 42;

println!("Player: {}, Score: {}", name, score);
// Output: Player: Priya, Score: 42
```

A few useful format specifiers:

```rust
println!("{:?}", vec![1, 2, 3]);   // debug format → [1, 2, 3]
println!("{:.2}", 3.14159);        // decimal places → 3.14
println!("{:>10}", "right");       // right-align in 10 chars
```

## Other print macros

| Macro | Use |
|-------|-----|
| `println!` | Print with a newline |
| `print!` | Print without a newline |
| `eprintln!` | Print to stderr |
| `format!` | Build a `String` (like `String.format()`) |
| `dbg!` | Print variable name + value, return the value |

`dbg!` is especially handy during development:

```rust
let x = 5;
let y = dbg!(x * 2) + 1;  // prints: [src/main.rs:3] x * 2 = 10
```

It's like adding a `System.out.println` debug line, but it also tells you the file and line number.

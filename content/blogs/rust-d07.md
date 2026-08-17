---
title: "`let mut` — Opting Into Mutability - Day 07"
date: 2026-08-17T12:23:10+05:30
draft: true
tags: [ "default" ]
---

Yesterday we saw that `let` gives you an immutable binding. But sometimes you genuinely need a variable to change — a counter, a running total, a buffer being filled. For that, you use `let mut`.

## The syntax

```rust
let mut count = 0;
count += 1;
count += 1;
println!("{}", count);  // 2
```

Adding `mut` tells both the compiler and the reader: *this value is intentionally going to change.*

## Why does the distinction matter?

It's a communication tool. When you see `let` in Rust code, you immediately know: this value won't change. When you see `let mut`, you know to pay closer attention — something is being mutated here.

In a large Java codebase, you often have to trace through code to figure out whether a variable is ever reassigned. In Rust, it's always explicit and right in the declaration.

## A practical example: building a string

```rust
let mut result = String::new();
result.push_str("Hello");
result.push_str(", Rust!");
println!("{}", result);  // Hello, Rust!
```

`String::new()` creates an empty, growable string. Because we're modifying it with `push_str`, we need `mut`.

## Mutability is not the same as reassignment

`mut` allows you to *modify* a value in place. Shadowing (from yesterday) lets you *replace* a binding entirely. They're different:

```rust
let mut x = 5;
x = 10;          // ✅ mutation — same variable, new value

let y = 5;
let y = 10;      // ✅ shadowing — new variable, same name
```

In practice: use `let` by default. Reach for `let mut` only when you need it. The compiler will remind you if you forgot — it warns you about `mut` bindings that are never actually mutated.

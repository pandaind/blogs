---
title: "`let` vs Java's `var`: Immutable by Default - Day 06"
date: 2026-08-17T12:23:07+05:30
draft: true
tags: [ "default" ]
---

In Java, variables are mutable unless you slap `final` on them. Most developers don't bother, so everything ends up mutable by default — even when it doesn't need to be.

Rust flips this. Variables are **immutable by default**. You have to explicitly opt into mutability.

## Declaring a variable

```rust
let name = "Alice";
```

That's it. No type annotation needed here — Rust infers `&str` from the value.

## What happens if you try to reassign?

```rust
let x = 5;
x = 10;  // ❌ compiler error: cannot assign twice to immutable variable
```

The compiler stops you immediately. This isn't a runtime crash or a warning — it's a hard error.

## How is this different from Java's `final`?

In Java, you write `final` when you *remember* to. It's opt-in, and most codebases are inconsistent about it. In Rust, immutability is the *default*, and mutability is the exception you explicitly declare.

```java
// Java — mutable by accident
String name = "Alice";
name = "Bob";  // compiles fine, no warning
// Rust — immutable unless you say otherwise
let name = "Alice";
name = "Bob";  // ❌ won't compile
```

## Shadowing: redeclaring with `let`

Rust lets you redeclare the same variable name with a new `let`. This is called **shadowing**:

```rust
let x = 5;
let x = x + 1;   // shadows the previous x
let x = x * 2;   // shadows again

println!("{}", x);  // 12
```

This is different from mutation — each `let` creates a new binding. You can even change the type this way, which you can't do with mutation.

---
title: "Meteorite - Static Site Generator"
date: 2026-10-10
description: "A static site generator in Rust. Markdown, YAML, themes you can swap."
tags: ["Rust", "Static Site Generator", "Open Source"]
repo: "https://github.com/pandaind/meteorite"
demo: "https://pandaind.github.io/meteorite/"
stack: ["Rust", "Tera", "Markdown", "YAML"]
weight: 1
year: 2026
---
A static site generator written in Rust. Content is Markdown, configuration is YAML, and a theme is a folder you can swap with one line. There is no database and no build chain.

This site is built with it. It comes with four themes (a landing page theme, a terminal one, and two for personal sites), light and dark modes, search, feeds, a link checker and a dev server with live reload. It can also add an optional [PopTalk](/projects/poptalk/) chat widget and publish your pages as a knowledge base for [PopTalk RAG](/projects/poptalk-rag/).

```bash
cargo install meteorite
meteorite new site my-site
cd my-site && meteorite serve
```

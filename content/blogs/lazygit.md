---
title: "LazyGit: The Easy Way to Use Git in Your Terminal"
date: 2025-08-22T11:52:23+05:30
draft: false
tags: [ "git","system" ]
cover:
  image: /content-img/lazygit.png
  relative: true
---

Managing Git via the command line is powerful, but let’s admit it—sometimes it feels overwhelming. That’s where **LazyGit** comes in! It’s a fast, lightweight, and interactive terminal UI for Git, helping you manage repositories without memorizing complex commands.

## **What is LazyGit?**

LazyGit is a simple terminal-based UI for Git commands. Instead of typing multiple Git commands, you get a visual interface inside your terminal to handle:

- Staging files
- Committing changes
- Managing branches
- Viewing logs and diffs
- Handling stashes

It’s perfect for developers who love terminal productivity but want to avoid command fatigue.

## **1. Install LazyGit**

### **macOS**

```bash
brew install lazygit
```

### **Linux**

```bash
go install github.com/jesseduffield/lazygit@latest
```

### **Windows**

Use Scoop:

```bash
scoop install lazygit
```

Or download from [GitHub Releases](https://github.com/jesseduffield/lazygit/releases).

------

## **2. Start LazyGit**

Navigate to your Git repository and run:

```bash
lazygit
```

------

## **3. Basic Usage**

- **Stage a file:** Select file → Press `Space`
- **Commit:** Press `c`, type message, hit `Enter`
- **Push:** Press `p` then `p`
- **Pull:** Press `p` then `o`
- **Switch branch:** Press `Tab` to Branch panel → `Enter`
- **View logs:** Press `Enter` on a commit

------

That’s it. Install, run `lazygit`, and manage Git easily inside your terminal.

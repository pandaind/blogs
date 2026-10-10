---
title: "Omarchy Panda Downloader"
date: 2026-09-13
description: "A download manager in the Omarchy status bar, with BitTorrent."
tags: ["Omarchy", "Hyprland", "QML", "Downloads", "BitTorrent"]
cover: "img/omarchy-panda-dl.png"
repo: "https://github.com/pandaind/omarchy-panda-dl"
stack: ["QML", "Quickshell", "Hyprland", "Rust"]
weight: 5
year: 2026
---
A status bar widget for [Omarchy](https://omarchy.org) that puts downloads one click away. It is the graphical front end for [panda-dl](https://github.com/pandaind/panda-dl), my download manager written in Rust, so the work happens there: multi-connection downloads, BitTorrent and magnet links, and media extraction with yt-dlp.

It watches the clipboard and picks up links it can download, and the panel shows each transfer as it goes.

It is published as an Omarchy plugin:

```bash
omarchy plugin add https://github.com/pandaind/omarchy-panda-dl.git --enable
```

It needs Omarchy with Hyprland and Quickshell.

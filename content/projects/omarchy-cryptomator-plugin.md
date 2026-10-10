---
title: "Omarchy Cryptomator Plugin"
date: 2026-09-10
description: "Lock and unlock Cryptomator vaults from the Omarchy status bar."
tags: ["Omarchy", "Hyprland", "QML", "Python", "Cryptomator"]
cover: "img/omarchy-cryptomator-plugin.png"
repo: "https://github.com/pandaind/omarchy-cryptomator-plugin"
stack: ["QML", "Python", "Quickshell", "Hyprland"]
weight: 4
year: 2026
---
A status bar plugin for [Omarchy](https://omarchy.org) that manages [Cryptomator](https://cryptomator.org) vaults without opening a desktop window. The icon shows whether anything is unlocked and takes your theme's accent colour when it is.

Click it for a panel where you can unlock a vault with a passphrase, open it in the file manager, lock one vault or all of them, create a new vault, or add an existing one. Right click locks everything. There are keyboard shortcuts and a Hyprland keybinding for the panel.

It is published as an Omarchy plugin, so installing it is one command:

```bash
omarchy plugin add https://github.com/pandaind/omarchy-cryptomator-plugin.git --enable
```

It needs Omarchy with Hyprland and Quickshell, plus `fuse3` and `python3`, which Omarchy already ships.

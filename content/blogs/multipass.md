---
title: "Getting Started with Multipass: Easy VM Management for Developers"
date: 2023-08-13T23:21:52+05:30
draft: false
tags: [ "Multipass", "setup guide" ]
---
Introduction:
Virtualization has become an essential tool for developers, enabling them to create isolated environments to test software and configurations. One such tool that simplifies virtual machine (VM) management is Multipass. Multipass provides a straightforward way to create, manage, and launch lightweight virtual machines on your local system. In this guide, we'll walk you through the process of installing Multipass and demonstrate some example commands to help you get started.

## Installing Multipass:

### Step 1: Update Your System
Before installing any new software, it's a good practice to ensure your system is up-to-date. Open a terminal and run the following commands:

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install Multipass
To install Multipass on your system, execute the following command:

```bash
sudo snap install multipass
```

The "snap" package manager will fetch and install Multipass from the Snap Store.

### Step 3: Verify Installation
Once the installation is complete, verify that Multipass is installed correctly by running:

```bash
multipass version
```

This command should display the version of Multipass installed on your system.

## Creating and Managing VMs with Multipass:

### Step 4: Create a Virtual Machine
Now that Multipass is installed, let's create a new virtual machine. In this example, we'll create an Ubuntu VM:

```bash
multipass launch --name my-vm
```

Replace "my-vm" with your preferred VM name. Multipass will automatically download and launch the latest LTS version of Ubuntu.

### Step 5: Interact with the VM
To start a shell session within the newly created VM, use the following command:

```bash
multipass shell my-vm
```

You'll be connected to the VM's shell, where you can run commands as if you were inside a separate system.

### Step 6: Stop and Delete VM
When you're done with the VM, you can stop and delete it:

```bash
multipass stop my-vm
multipass delete my-vm
```

### Step 7: View List of VMs
To view a list of all VMs managed by Multipass, use:

```bash
multipass list
```

This command will display the names and statuses of all your created VMs.

## Advanced Multipass Commands:

### Launch a VM with Specific Resources:
You can specify the amount of CPU cores and memory for a new VM. For instance, to create a VM named "dev-vm" with 2 CPU cores and 2GB of memory, use:

```bash
multipass launch --name dev-vm --cpus 2 --mem 2G
```

### Execute Commands Inside VM:
You can execute commands directly inside a VM without entering its shell. For example, to list the contents of the "/var/www" directory within the "my-vm" VM:

```bash
multipass exec my-vm -- ls /var/www
```

### Copy Files Between Host and VM:
You can easily copy files between your host system and VM using the `transfer` command. For example, to copy a local file named "myfile.txt" to the home directory of the "my-vm" VM:

```bash
multipass transfer myfile.txt my-vm:
```

To copy a file from the VM to your host system:

```bash
multipass transfer my-vm:/path/to/file.txt .
```

### Start and Stop VMs:
You can start, stop, and restart VMs using the following commands:

```bash
multipass start my-vm
multipass stop my-vm
multipass restart my-vm
```

### Suspend and Resume VMs:
To suspend (pause) a VM:

```bash
multipass suspend my-vm
```

To resume a suspended VM:

```bash
multipass resume my-vm
```

### View VM Information:
To get detailed information about a specific VM:

```bash
multipass info my-vm
```

This command provides information about the VM's state, IP address, resources, and more.

### List Available Images:
You can list the available operating system images that Multipass can use to create VMs:

```bash
multipass find
```

This command will display a list of available images along with their names.

### Mount Host Directory Inside VM:
You can mount a directory from your host system into the VM using the following command:

```bash
multipass mount /path/on/host my-vm:/path/in/vm
```

This makes it easy to share files between your host system and the VM.

## Using cloud-init for Configuration (Optional):

### Step 8: Using cloud-init for Configuration
Multipass supports cloud-init, a tool for providing VM initialization and configuration. You can use cloud-init to automate tasks like installing packages and setting up users.

For example, create a cloud-init YAML file (e.g., `config.yaml`) with the following content:

```yaml
# config.yaml
# Cloud-init configuration file

# Update and upgrade packages
packages:
  - update
  - upgrade

# Add a new user
users:
  - name: developer
    passwd: $6$rounds=656000$cJxSb0tGgUPEebw8$JgZ6f5Bih3r/IV8U44mC8I/bBpMNRb/PrTtugmCL7C68M7i9x6VDSBhtZGzOQQLkcvLAnGPfRlSdHu.qrdn7J/
    lock-passwd: false
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh-authorized-keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAB...

# Install packages
package_update: true
package_upgrade: true
packages:
  - vim
  - git
```

Then, launch a VM with the cloud-init configuration:

```bash
multipass launch --name config-vm --cloud-init config.yaml
```

This will create a VM named "config-vm" and apply the configuration defined in `config.yaml`.

## Conclusion:

Multipass provides developers with an easy and convenient way to create, manage, and interact with virtual machines. Whether you're testing software configurations, experimenting with new technologies, or simply need isolated environments for development, Multipass simplifies the process without the complexity of more advanced virtualization solutions.

In this guide, we covered the installation of Multipass on your system and demonstrated how to create, manage, and interact with virtual machines using example commands. We also explored advanced commands and introduced the use of cloud-init for automated VM configuration.

As you explore further, you'll find that Multipass offers additional features such as customizing VM resources and launching instances with specific operating systems.

Now that you have Multipass installed, you're equipped to efficiently manage virtual machines and enhance your development workflow.

---
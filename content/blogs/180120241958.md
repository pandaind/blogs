---
title: "Linux User and Group Management: A Comprehensive Guide"
date: 2024-01-18T19:59:05+05:30
draft: false
tags: [ "Linux","system administration" ]
---
The essential commands for creating, modifying, and deleting user accounts, as well as managing user privileges and groups.

### User Management:

1. **Creating a new user:**
   ```bash
   sudo useradd username
   ```

   Set the user's home directory and shell:
   ```bash
   sudo useradd -d /home/username -s /bin/bash username
   ```

2. **Setting a password for the user:**
   ```bash
   sudo passwd username
   ```

3. **Deleting a user:**
   ```bash
   sudo userdel -r username
   ```

4. **Modifying user properties:**
   ```bash
   sudo usermod -g newgroup -aG group1,group2 -d /new/home/directory -s /bin/newshell username
   ```

5. **Listing all users:**
   ```bash
   getent passwd
   ```

6. **Changing to another user:**
   ```bash
   su - username
   ```

7. **Granting sudo privileges:**
   ```bash
   sudo visudo
   ```

   Add the following line:
   ```plaintext
   username  ALL=(ALL:ALL) ALL
   ```

8. **Locking and unlocking user accounts:**
   ```bash
   sudo passwd -l username  # lock
   sudo passwd -u username  # unlock
   ```

### Group Management:

1. **Creating a new group:**
   ```bash
   sudo groupadd groupname
   ```

2. **Adding a user to a group:**
   ```bash
   sudo usermod -aG groupname username
   ```

3. **Removing a user from a group:**
   ```bash
   sudo deluser username groupname
   ```

4. **Listing all groups:**
   ```bash
   getent group
   ```

5. **Modifying group properties:**
   ```bash
   sudo groupmod -n newgroupname oldgroupname
   ```

   Add or remove a user from a group:
   ```bash
   sudo gpasswd -a username groupname  # Add user to group
   sudo gpasswd -d username groupname  # Remove user from group
   ```

6. **Deleting a group:**
   ```bash
   sudo groupdel groupname
   ```

7. **Checking a user's groups:**
   ```bash
   groups username
   ```

8. **Changing the primary group of a user:**
   ```bash
   sudo usermod -g newprimarygroup username
   ```

These commands provide a comprehensive overview of user and group management on a Linux system. Whether you're creating new users, modifying user properties, managing groups, or adjusting user privileges, these commands will help you effectively administer your Linux environment.
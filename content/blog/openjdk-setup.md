---
title: "A Comprehensive guide to set up OpenJDK and the latest Apache Maven on ubuntu"
date: 2023-07-29T10:45:37+05:30
draft: false
tags: [ "Programming & Development", "setup guide" ]
---
**Step 1: Update Your System:**
Begin by ensuring your Ubuntu system is up to date. In the terminal, execute the following commands:

```bash
sudo apt update
sudo apt upgrade
```

**Step 2: Installing OpenJDK:**
Ubuntu's default repositories offer convenient access to OpenJDK packages. For this guide, we'll focus on OpenJDK 11, an LTS version. Install it using the package manager:

```bash
sudo apt install openjdk-11-jdk
```

**Step 3: Verify the Installation:**
Once installation is complete, verify that Java is successfully installed by checking the version:

```bash
java -version
```

The output should display the installed Java version and related details.

**Step 4: Set JAVA_HOME (Optional):**
Setting the `JAVA_HOME` environment variable is useful for Java development and specific applications. To set it up, find the path to the installed Java version:

```bash
sudo update-java-alternatives -l
```

Next, open the `.bashrc` file:

```bash
nano ~/.bashrc
```

Add the following line at the end of the file (replace `/path/to/java` with the path you obtained earlier):

```bash
export JAVA_HOME=/path/to/java
```

Save and exit the editor (Ctrl+X, then Y, then Enter) and apply the changes to the current session:

```bash
source ~/.bashrc
```

**Step 5: Installing Latest Apache Maven:**
Although Ubuntu's repositories include Maven, it might not be the latest version. To install the latest Maven, download the binary distribution from the Apache Maven website.

1. Go to the Apache Maven website (https://maven.apache.org/download.cgi) and note the latest version (e.g., 3.8.3).

2. Use `wget` to download the binary distribution (replace "3.8.3" with the latest version):

```bash
wget https://apache.mirrors.nublue.co.uk/maven/maven-3/3.8.3/binaries/apache-maven-3.8.3-bin.tar.gz
```

3. Extract the downloaded archive:

```bash
tar -zxvf apache-maven-3.8.3-bin.tar.gz
```

4. Move the extracted files to the `/opt` directory:

```bash
sudo mv apache-maven-3.8.3 /opt
```

**Step 6: Set up Environment Variables:**
To use Maven globally, set up environment variables:

1. Open the `.bashrc` file:

```bash
nano ~/.bashrc
```

2. Add the following lines at the end of the file:

```bash
export MAVEN_HOME=/opt/apache-maven-3.8.3
export PATH=$MAVEN_HOME/bin:$PATH
```

3. Save and exit the editor (Ctrl+X, then Y, then Enter).

4. Apply the changes to the current session:

```bash
source ~/.bashrc
```

**Step 7: Verify Maven Installation:**
Check that Maven is installed correctly and is the latest version:

```bash
mvn --version
```

**Conclusion:**
You've accomplished the art of setting up OpenJDK and the latest Apache Maven on your Ubuntu machine. With Java and Maven at your disposal, you are now ready to dive into the world of Java development and unleash your creativity in building sophisticated applications and mastering the art of build automation.

Happy coding!

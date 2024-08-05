---
title: "Getting Started with Expo CLI"
date: 2024-01-06T21:07:40+05:30
draft: false
tags: [ "React Native" ]
---
Expo is a powerful toolset for quickly building and deploying mobile applications using React Native. Expo CLI, the command-line interface for Expo, provides developers with a wide array of commands to manage and streamline their mobile development workflow. In this article, we'll explore the fundamental Expo CLI commands and their functionalities.

### Installation

Before diving into Expo CLI, it's essential to have Node.js installed on your machine. You can download and install Node.js from its official website or through a package manager like `npm` or `yarn`.

Once Node.js is set up, installing Expo CLI is a breeze. Open your terminal and use the following command:

```bash
npm install -g expo-cli
```

This command installs Expo CLI globally on your system, allowing you to access Expo commands from any directory.

### Creating a New Project

To create a new project using Expo, utilize the `expo init` command followed by the desired project name. For instance:

```bash
expo init my-new-project
```

This command initializes a new Expo project with the name "my-new-project".

### Managing Projects

#### Starting a Project

Once the project is created, navigate into the project directory and start the development server using:

```bash
expo start
```

This command launches the Expo development server, providing options to run the project on various platforms like Android, iOS, and web.

#### Building Standalone Apps

To build standalone apps for Android and iOS, Expo offers specific commands:

- For Android:
  ```bash
  expo build:android
  ```

- For iOS:
  ```bash
  expo build:ios
  ```

### Publishing & Deployment

#### Publishing for OTA Updates

To publish your project for Over-the-Air (OTA) updates, use the following command:

```bash
expo publish
```

This command makes your latest changes available to users who have previously installed your app via Expo.

#### Building a Web Version

Expo also supports building web versions of your projects. Use the following command to create a web build:

```bash
expo build:web
```

### Other Useful Commands

- **Checking Expo CLI Version:**
  ```bash
  expo --version
  ```

- **Generating Components or Screens:**
  ```bash
  expo generate component ComponentName
  ```

- **Ejecting the Project:**
  ```bash
  expo eject
  ```

### Conclusion

Expo CLI offers an array of commands that streamline the development, deployment, and management of React Native applications. Whether you're starting a new project, deploying updates, or building standalone apps, Expo CLI provides a seamless experience for mobile app development.Explore the Expo documentation for more advanced commands and features, and leverage Expo CLI to accelerate your mobile development journey.

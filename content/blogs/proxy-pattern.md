---
title: "Understanding the Proxy Design Pattern"
date: 2024-08-10T15:56:37+05:30
draft: false
tags: [ "Design Patterns", "Structural GOF", "software design" ]
---
The Proxy Design Pattern is a structural pattern that provides a surrogate or placeholder for another object. It allows you to control access to the real object, providing additional functionality such as access control, lazy initialization, or logging. The proxy pattern involves creating a proxy class that implements the same interface as the real object and delegates requests to the real object.

### Components of the Proxy Design Pattern:

1. **Subject**: An interface or abstract class that defines the common interface for both the RealSubject and the Proxy.
2. **RealSubject**: The actual class that performs the real operations.
3. **Proxy**: A class that implements the Subject interface and maintains a reference to the RealSubject. It controls access to the RealSubject and can add additional behavior.

### Simple Example:

Let’s create a simple example where we use a `Proxy` to control access to a `RealImage` object. The `RealImage` class represents a large image that we want to load and display, but we’ll use a `Proxy` to manage access and load the image only when necessary.

#### 1. Subject Interface:

```java
// Subject interface
interface Image {
    void display();
}
```

#### 2. RealSubject:

```java
// RealSubject class
class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadImage();
    }

    private void loadImage() {
        System.out.println("Loading image: " + filename);
    }

    @Override
    public void display() {
        System.out.println("Displaying image: " + filename);
    }
}
```

#### 3. Proxy:

```java
// Proxy class
class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}
```

#### 4. Client Code:

```java
public class ProxyPatternDemo {
    public static void main(String[] args) {
        Image image1 = new ProxyImage("image1.jpg");
        Image image2 = new ProxyImage("image2.jpg");

        // Image is loaded and displayed only when required
        image1.display(); // Loads and displays image1.jpg
        image1.display(); // Directly displays image1.jpg without loading

        image2.display(); // Loads and displays image2.jpg
    }
}
```

### Explanation:

1. **Subject Interface**: `Image` defines the common interface for both `RealImage` and `ProxyImage`.
2. **RealSubject**: `RealImage` represents the actual image object that performs the heavy lifting (loading and displaying the image).
3. **Proxy**: `ProxyImage` acts as a proxy for `RealImage`. It controls access to the `RealImage` object and delays its creation until it is actually needed.
4. **Client Code**: Demonstrates how to use the `ProxyImage` to access images. The image is only loaded when `display` is called for the first time, and subsequent calls directly display the image without reloading.

### Benefits of the Proxy Design Pattern:

- **Control Access**: Provides a way to control access to the real object, including managing access rights or implementing lazy initialization.
- **Resource Management**: Delays the creation and initialization of expensive objects until they are actually needed.
- **Additional Functionality**: Allows you to add additional functionality (e.g., logging, caching) without modifying the real object.

### Use Cases of the Proxy Design Pattern:

- **Lazy Initialization**: Loading a resource (e.g., large image, database connection) only when it is actually needed.
- **Access Control**: Restricting or controlling access to sensitive objects (e.g., security proxies).
- **Remote Proxies**: Handling communication with objects in remote locations (e.g., network proxies).

The Proxy Pattern is particularly useful when you need to manage access to a resource efficiently and control how and when the resource is used or initialized.
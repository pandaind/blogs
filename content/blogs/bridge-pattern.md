---
title: "Understanding the Bridge Design Pattern"
date: 2024-08-10T15:31:04+05:30
draft: false
tags: [ "Design Patterns", "Structural GOF", "software design" ]
---
The Bridge Design Pattern is a structural pattern that separates an abstraction from its implementation, allowing the two to vary independently. This pattern is used to decouple an abstraction from its implementation so that the two can evolve separately without affecting each other.

### Components of the Bridge Design Pattern:

1. **Abstraction**: Defines the abstract part of the interface that uses the implementation.
2. **RefinedAbstraction**: Extends the `Abstraction` class and provides a specific implementation.
3. **Implementor**: Defines the interface for implementation classes.
4. **ConcreteImplementor**: Implements the `Implementor` interface and provides specific functionality.

### Example:

Imagine you have a basic system where you need to handle different types of notifications, such as email and SMS. The goal is to separate the notification type (email or SMS) from the content of the notification.

### Components:

1. **Abstraction**: The `Notification` class which defines the general notification behavior.
2. **RefinedAbstraction**: A specific type of notification, like `AlertNotification`.
3. **Implementor**: The `NotificationSender` interface which defines the method for sending notifications.
4. **ConcreteImplementor**: Concrete implementations for sending notifications via email or SMS.

### Example:

#### 1. Implementor Interface:

```java
// Implementor interface
interface NotificationSender {
    void send(String message);
}
```

#### 2. ConcreteImplementors:

```java
// ConcreteImplementor for Email
class EmailSender implements NotificationSender {
    @Override
    public void send(String message) {
        System.out.println("Sending Email: " + message);
    }
}

// ConcreteImplementor for SMS
class SmsSender implements NotificationSender {
    @Override
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}
```

#### 3. Abstraction:

```java
// Abstraction class
abstract class Notification {
    protected NotificationSender sender;

    protected Notification(NotificationSender sender) {
        this.sender = sender;
    }

    public abstract void notify(String message);
}
```

#### 4. RefinedAbstraction:

```java
// RefinedAbstraction class
class AlertNotification extends Notification {

    public AlertNotification(NotificationSender sender) {
        super(sender);
    }

    @Override
    public void notify(String message) {
        sender.send("Alert: " + message);
    }
}
```

#### 5. Client Code:

```java
public class BridgePatternDemo {
    public static void main(String[] args) {
        // Create notification types with different senders
        Notification emailNotification = new AlertNotification(new EmailSender());
        Notification smsNotification = new AlertNotification(new SmsSender());

        // Send notifications
        emailNotification.notify("Your order has been shipped.");
        smsNotification.notify("Your order has been shipped.");
    }
}
```

### Explanation:

1. **Implementor Interface**: `NotificationSender` defines a method `send` for sending notifications.
2. **ConcreteImplementors**: `EmailSender` and `SmsSender` provide specific implementations for sending notifications via email and SMS, respectively.
3. **Abstraction**: `Notification` is an abstract class that uses a `NotificationSender` to send notifications.
4. **RefinedAbstraction**: `AlertNotification` extends `Notification` and formats the message with an alert prefix before sending.
5. **Client Code**: Demonstrates how to use the `AlertNotification` with different `NotificationSender` implementations.

### Benefits of the Bridge Design Pattern:

- **Separation of Concerns**: Separates abstraction from implementation, allowing both to evolve independently.
- **Flexibility**: Enables you to change the abstraction or implementation without affecting the other.
- **Extensibility**: Adding new abstractions or implementations can be done without modifying existing code.

### Use Cases of the Bridge Design Pattern:

- **Graphical Systems**: Where different shapes and drawing methods need to be supported.
- **Database Access**: When implementing different database backends while keeping a consistent API.
- **Remote Communication**: When separating the communication logic from the protocol used.

The Bridge Pattern is particularly useful when you have a complex hierarchy of abstractions and implementations, and you want to keep them independent and flexible.
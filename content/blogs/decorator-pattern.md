---
title: "Understanding the Decorator Design Pattern"
date: 2024-08-10T15:40:58+05:30
draft: false
tags: [ "Design Patterns", "Structural GOF", "software design" ]
---
The Decorator Design Pattern is a structural pattern that allows you to dynamically add behavior to an object without altering its structure. This pattern provides a flexible alternative to subclassing for extending functionality.

### Components of the Decorator Design Pattern:

1. **Component**: The interface or abstract class defining the common interface for both the core object and decorators.
2. **ConcreteComponent**: The class implementing the `Component` interface. This is the core object to which additional behaviors can be added.
3. **Decorator**: An abstract class or interface that implements the `Component` interface and contains a reference to a `Component` object. It delegates operations to the `Component` and can add additional behavior.
4. **ConcreteDecorator**: A class extending the `Decorator` that adds specific behavior.

### Simple Example:

Let’s create a simple example where we have a `Coffee` class that can be decorated with various add-ons like milk and sugar.

#### 1. Component Interface:

```java
// Component interface
interface Coffee {
    String getDescription();
    double cost();
}
```

#### 2. ConcreteComponent:

```java
// ConcreteComponent class
class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple Coffee";
    }

    @Override
    public double cost() {
        return 5.00; // Base price of coffee
    }
}
```

#### 3. Decorator:

```java
// Decorator class
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public String getDescription() {
        return coffee.getDescription();
    }

    @Override
    public double cost() {
        return coffee.cost();
    }
}
```

#### 4. ConcreteDecorators:

```java
// ConcreteDecorator for Milk
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", Milk";
    }

    @Override
    public double cost() {
        return coffee.cost() + 1.00; // Add cost of milk
    }
}

// ConcreteDecorator for Sugar
class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", Sugar";
    }

    @Override
    public double cost() {
        return coffee.cost() + 0.50; // Add cost of sugar
    }
}
```

#### 5. Client Code:

```java
public class DecoratorPatternDemo {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println(coffee.getDescription() + " $" + coffee.cost());

        // Add milk
        coffee = new MilkDecorator(coffee);
        System.out.println(coffee.getDescription() + " $" + coffee.cost());

        // Add sugar
        coffee = new SugarDecorator(coffee);
        System.out.println(coffee.getDescription() + " $" + coffee.cost());
    }
}
```

### Explanation:

1. **Component Interface**: `Coffee` defines the methods `getDescription` and `cost` that all concrete and decorator classes will implement.
2. **ConcreteComponent**: `SimpleCoffee` is the core object that provides basic coffee functionality.
3. **Decorator**: `CoffeeDecorator` is an abstract class that implements `Coffee` and holds a reference to a `Coffee` object. It delegates the calls to the core `Coffee` object and can add additional behavior.
4. **ConcreteDecorators**: `MilkDecorator` and `SugarDecorator` add specific functionalities (milk and sugar) to the `Coffee` object.
5. **Client Code**: Demonstrates how to create a basic coffee and dynamically add milk and sugar using decorators.

### Benefits of the Decorator Design Pattern:

- **Flexibility**: Allows for adding new functionalities without altering existing code.
- **Scalability**: You can create new decorators to extend functionality as needed.
- **Single Responsibility Principle**: Each class has a single responsibility and can be changed independently.

### Use Cases of the Decorator Design Pattern:

- **User Interfaces**: Adding functionality to UI components (e.g., adding scrollbars, borders, etc.).
- **Stream Processing**: Adding functionalities like buffering, compression, or encryption to input/output streams.
- **Graphical Elements**: Adding features to graphical elements like shapes and text in a drawing application.

The Decorator Pattern is particularly useful when you want to add features to objects dynamically and in a flexible manner without modifying the core object itself.
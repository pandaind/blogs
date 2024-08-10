---
title: "Understanding the Builder Design Pattern"
date: 2024-08-22T16:07:22+05:30
draft: false
tags: [ "Design Patterns", "Builder GOF", "software design" ]
---
The Builder Design Pattern is a creational pattern that provides a way to construct complex objects step by step. It separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

### Components of the Builder Design Pattern:

1. **Builder**: An abstract class or interface that defines the steps for creating parts of a complex object.
2. **ConcreteBuilder**: Implements the Builder interface to construct and assemble parts of the product.
3. **Product**: The complex object being built.
4. **Director**: Constructs an object using the Builder interface. It defines the order in which to execute the building steps.

### Example 1:

Let's create a simple example where we build a `Computer` object with various components like CPU, RAM, and storage. We will use the Builder Pattern to construct the `Computer` object step by step.

#### 1. Product:

```java
// Product class
class Computer {
    private String CPU;
    private String RAM;
    private String storage;

    public void setCPU(String CPU) {
        this.CPU = CPU;
    }

    public void setRAM(String RAM) {
        this.RAM = RAM;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    @Override
    public String toString() {
        return "Computer [CPU=" + CPU + ", RAM=" + RAM + ", Storage=" + storage + "]";
    }
}
```

#### 2. Builder:

```java
// Builder interface
interface ComputerBuilder {
    void buildCPU();
    void buildRAM();
    void buildStorage();
    Computer getComputer();
}
```

#### 3. ConcreteBuilder:

```java
// ConcreteBuilder class
class GamingComputerBuilder implements ComputerBuilder {
    private Computer computer;

    public GamingComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void buildCPU() {
        computer.setCPU("High-performance CPU");
    }

    @Override
    public void buildRAM() {
        computer.setRAM("16GB RAM");
    }

    @Override
    public void buildStorage() {
        computer.setStorage("1TB SSD");
    }

    @Override
    public Computer getComputer() {
        return this.computer;
    }
}
```

#### 4. Director:

```java
// Director class
class ComputerDirector {
    private ComputerBuilder builder;

    public ComputerDirector(ComputerBuilder builder) {
        this.builder = builder;
    }

    public void constructComputer() {
        builder.buildCPU();
        builder.buildRAM();
        builder.buildStorage();
    }
}
```

#### 5. Client Code:

```java
public class BuilderPatternDemo {
    public static void main(String[] args) {
        // Create a builder for a gaming computer
        ComputerBuilder gamingBuilder = new GamingComputerBuilder();

        // Create a director with the gaming computer builder
        ComputerDirector director = new ComputerDirector(gamingBuilder);

        // Construct the computer
        director.constructComputer();

        // Get the built computer
        Computer gamingComputer = gamingBuilder.getComputer();
        System.out.println(gamingComputer);
    }
}
```

### Explanation:

1. **Product**: `Computer` is the complex object being built. It has parts like CPU, RAM, and storage.
2. **Builder**: `ComputerBuilder` defines the steps to build a `Computer`.
3. **ConcreteBuilder**: `GamingComputerBuilder` implements the `ComputerBuilder` interface to create a specific type of computer.
4. **Director**: `ComputerDirector` uses the builder to construct the `Computer` step by step.
5. **Client Code**: Demonstrates how to use the `ComputerDirector` and `GamingComputerBuilder` to build a `Computer` and output its details.

### Example 2: Custom Builder Implementation

Let’s create a `House` class with attributes like walls, windows, and roof, and provide a builder class to construct `House` objects.

#### 1. Define the Product Class (`House`):

```java
public class House {
    private final String walls;
    private final String windows;
    private final String roof;

    // Private constructor to enforce the use of Builder
    private House(Builder builder) {
        this.walls = builder.walls;
        this.windows = builder.windows;
        this.roof = builder.roof;
    }

    // Getters (No setters to ensure immutability)
    public String getWalls() {
        return walls;
    }

    public String getWindows() {
        return windows;
    }

    public String getRoof() {
        return roof;
    }

    @Override
    public String toString() {
        return "House [Walls=" + walls + ", Windows=" + windows + ", Roof=" + roof + "]";
    }

    // Static Builder class
    public static class Builder {
        private String walls;
        private String windows;
        private String roof;

        // Setter methods return the builder itself to allow method chaining
        public Builder setWalls(String walls) {
            this.walls = walls;
            return this;
        }

        public Builder setWindows(String windows) {
            this.windows = windows;
            return this;
        }

        public Builder setRoof(String roof) {
            this.roof = roof;
            return this;
        }

        // Build method to create a House instance
        public House build() {
            return new House(this);
        }
    }
}
```

#### 2. Client Code:

```java
public class BuilderPatternCustomDemo {
    public static void main(String[] args) {
        // Use the builder to create a House object
        House house = new House.Builder()
                .setWalls("Brick walls")
                .setWindows("Glass windows")
                .setRoof("Tile roof")
                .build();

        // Output the house details
        System.out.println(house);
    }
}
```

### Explanation:

1. **Product Class (`House`)**: Contains attributes for `walls`, `windows`, and `roof`. The constructor is private to enforce the use of the builder for object creation.
2. **Builder Class**:
    - Contains fields that match those of the `House` class.
    - Provides setter methods (`setWalls()`, `setWindows()`, `setRoof()`) that return the builder instance (`this`) to allow method chaining.
    - The `build()` method constructs a `House` object using the builder instance.
3. **Client Code**: Uses the `House.Builder` to set the attributes and build the `House` object. It demonstrates method chaining and immutability of the `House` class.

This custom builder pattern implementation provides a flexible and readable way to create complex objects, similar to what Lombok’s `@Builder` provides with automatic code generation.


### Benefits of the Builder Design Pattern:

- **Separation of Concerns**: Separates the construction process from the representation of the object, allowing different representations.
- **Flexibility**: Allows complex objects to be constructed in a step-by-step manner.
- **Immutability**: Can help create immutable objects (objects whose state cannot be changed after creation) by controlling the construction process.

### Use Cases of the Builder Design Pattern:

- **Complex Object Creation**: Building complex objects with many optional components or configurations.
- **Fluent APIs**: Creating builder APIs that provide a fluent interface for constructing objects.
- **Immutability**: Building immutable objects that require complex initialization.

The Builder Pattern is particularly useful when dealing with complex objects that require a specific order of creation or when you need to construct objects with a large number of possible configurations.

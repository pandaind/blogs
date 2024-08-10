---
title: "Understanding the Factory Design Pattern"
date: 2024-08-23T16:20:09+05:30
draft: false
tags: [ "Design Patterns", "Creational GOF", "software design" ]
---
The Factory Design Pattern is a creational pattern that provides a way to create objects without specifying the exact class of the object that will be created. It defines an interface for creating an object, but allows subclasses to alter the type of objects that will be created.

### Components of the Factory Design Pattern:

1. **Product**: The interface or abstract class that defines the type of object to be created.
2. **ConcreteProduct**: Implements the `Product` interface and defines the specific object to be created.
3. **Creator**: The interface or abstract class that declares the factory method for creating `Product` objects.
4. **ConcreteCreator**: Implements the `Creator` interface and overrides the factory method to return an instance of `ConcreteProduct`.

### Simple Example:

Let’s create a simple example where we have a `Vehicle` interface, and concrete implementations like `Car` and `Bike`. We will use a factory to create instances of these vehicles.

#### 1. Product Interface:

```java
// Product interface
interface Vehicle {
    void drive();
}
```

#### 2. Concrete Products:

```java
// Concrete product for Car
class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Driving a car.");
    }
}

// Concrete product for Bike
class Bike implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Riding a bike.");
    }
}
```

#### 3. Creator:

```java
// Creator class with a factory method
abstract class VehicleFactory {
    public abstract Vehicle createVehicle();
}
```

#### 4. Concrete Creators:

```java
// Concrete creator for Car
class CarFactory extends VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new Car();
    }
}

// Concrete creator for Bike
class BikeFactory extends VehicleFactory {
    @Override
    public Vehicle createVehicle() {
        return new Bike();
    }
}
```

#### 5. Client Code:

```java
public class FactoryPatternDemo {
    public static void main(String[] args) {
        // Create a factory for Car
        VehicleFactory carFactory = new CarFactory();
        Vehicle car = carFactory.createVehicle();
        car.drive();

        // Create a factory for Bike
        VehicleFactory bikeFactory = new BikeFactory();
        Vehicle bike = bikeFactory.createVehicle();
        bike.drive();
    }
}
```

### Explanation:

1. **Product Interface**: `Vehicle` defines the common interface for all vehicles.
2. **Concrete Products**: `Car` and `Bike` implement the `Vehicle` interface.
3. **Creator**: `VehicleFactory` declares the factory method `createVehicle()` which is responsible for creating `Vehicle` objects.
4. **Concrete Creators**: `CarFactory` and `BikeFactory` implement the `VehicleFactory` and override the `createVehicle()` method to return instances of `Car` and `Bike`, respectively.
5. **Client Code**: Demonstrates how to use the factory to create `Vehicle` objects without knowing their concrete classes.

### Benefits of the Factory Pattern:

- **Encapsulation**: Hides the instantiation logic and provides a simple interface for creating objects.
- **Flexibility**: Allows changing the class of objects being created without altering the client code.
- **Decoupling**: Separates the creation of objects from their usage, promoting loose coupling.

### Use Cases of the Factory Pattern:

- **Object Creation**: When the exact type of the object to be created is not known until runtime.
- **Dynamic Object Creation**: When different types of objects need to be created based on varying conditions.
- **Managing Object Lifecycles**: When the creation process involves complex steps or initialization.

The Factory Pattern is useful for managing and encapsulating the creation of objects, especially when the objects are part of a complex hierarchy or require a specific configuration.
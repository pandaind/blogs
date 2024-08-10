---
title: "Understanding the Adapter Design Pattern"
date: 2024-08-10T15:20:14+05:30
draft: false
tags: [ "Design Patterns", "Structural GOF", "software design" ]
---
The Adapter Design Pattern is a structural pattern that allows objects with incompatible interfaces to work together. It acts as a bridge, converting the interface of a class into another interface that clients expect. This pattern is useful when you want to use an existing class but its interface doesn’t match the one you need.

### Components of the Adapter Design Pattern:

1. **Target**: The interface that the client expects to use.
2. **Adapter**: Converts the interface of the Adaptee into the Target interface.
3. **Adaptee**: The existing class with an incompatible interface that needs to be adapted.
4. **Client**: Uses the Target interface to interact with the Adaptee via the Adapter.

### Simple Example:

Let’s say we have a `TemperatureSensor` that provides temperature readings in Celsius, but our application needs temperature readings in Fahrenheit. We’ll create an adapter to convert Celsius readings to Fahrenheit.

#### 1. Target Interface:

```java
// Target interface
interface Temperature {
    double getTemperatureInFahrenheit();
}
```

#### 2. Adaptee:

```java
// Adaptee class with an incompatible interface
class CelsiusTemperatureSensor {
    private double temperatureInCelsius;

    CelsiusTemperatureSensor(double temperatureInCelsius) {
        this.temperatureInCelsius = temperatureInCelsius;
    }

    double getTemperatureInCelsius() {
        return temperatureInCelsius;
    }
}
```

#### 3. Adapter:

```java
// Adapter class
class TemperatureAdapter implements Temperature {
    private CelsiusTemperatureSensor sensor;

    TemperatureAdapter(CelsiusTemperatureSensor sensor) {
        this.sensor = sensor;
    }

    @Override
    public double getTemperatureInFahrenheit() {
        // Convert Celsius to Fahrenheit
        return sensor.getTemperatureInCelsius() * 9/5 + 32;
    }
}
```

#### 4. Client:

```java
public class AdapterPatternDemo {
    public static void main(String[] args) {
        // Adaptee
        CelsiusTemperatureSensor celsiusSensor = new CelsiusTemperatureSensor(25);

        // Adapter
        Temperature temperature = new TemperatureAdapter(celsiusSensor);

        // Client uses the Target interface
        System.out.println("Temperature in Fahrenheit: " + temperature.getTemperatureInFahrenheit());
    }
}
```

### Explanation:

1. **Target Interface**: `Temperature` defines the method `getTemperatureInFahrenheit` that the client expects.
2. **Adaptee**: `CelsiusTemperatureSensor` provides temperature readings in Celsius with the method `getTemperatureInCelsius`.
3. **Adapter**: `TemperatureAdapter` implements the `Temperature` interface and converts the Celsius reading from the `CelsiusTemperatureSensor` into Fahrenheit.
4. **Client**: Uses the `Temperature` interface to interact with the adapter, which internally uses the adaptee to get the temperature in Fahrenheit.

### Benefits of the Adapter Design Pattern:

- **Compatibility**: Allows incompatible interfaces to work together without modifying the existing code.
- **Flexibility**: Can be used to adapt multiple incompatible interfaces using a common target interface.
- **Code Reusability**: Allows the reuse of existing code (the adaptee) without altering its structure.

### Use Cases of the Adapter Design Pattern:

- **Legacy Code Integration**: When integrating new systems with legacy code that has incompatible interfaces.
- **Third-Party Libraries**: When using third-party libraries that have different interfaces than your application needs.
- **API Wrappers**: When creating wrappers around APIs to provide a consistent interface for your application.

This pattern is particularly useful in scenarios where you need to work with classes or interfaces that you do not control or cannot modify directly.
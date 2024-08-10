---
title: "Understanding the Observer Design Pattern"
date: 2024-08-10T14:15:14+05:30
draft: false
tags: [ "Design Patterns", "Behavioral GOF", "software design" ]
---
The Observer Pattern is a behavioral design pattern used to define a one-to-many dependency between objects. When one object (the subject) changes its state, all dependent objects (observers) are notified and updated automatically. This pattern is commonly used in scenarios where changes in one part of an application need to be reflected in other parts without tightly coupling the components.

### Components of the Observer Pattern:

1. **Subject**: The object that maintains a list of observers and notifies them of any changes.
2. **Observer**: The interface or abstract class that defines the update method, which is called when the subject's state changes.
3. **ConcreteSubject**: A class that implements the Subject interface and maintains the state of interest.
4. **ConcreteObserver**: A class that implements the Observer interface and updates itself based on the subject's state.

### Simple Example in Java:

Let's create a weather monitoring system where a `WeatherStation` (subject) notifies multiple display devices (observers) of changes in weather conditions.

#### 1. Observer Interface:

```java
// Observer interface
interface Observer {
    void update(float temperature, float humidity, float pressure);
}
```

#### 2. Subject Interface:

```java
// Subject interface
interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}
```

#### 3. ConcreteSubject:

```java
// ConcreteSubject
class WeatherStation implements Subject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    WeatherStation() {
        observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    // Method to update weather conditions
    public void setWeatherConditions(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }
}
```

#### 4. ConcreteObserver:

```java
// ConcreteObserver
class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "°C and " + humidity + "% humidity");
    }
}
```

#### 5. Client Code:

```java
public class ObserverPatternDemo {
    public static void main(String[] args) {
        WeatherStation weatherStation = new WeatherStation();
        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay();

        weatherStation.registerObserver(currentDisplay);

        weatherStation.setWeatherConditions(25.5f, 60.0f, 1012.0f);
        weatherStation.setWeatherConditions(28.0f, 65.0f, 1011.0f);
    }
}
```

### Explanation:

1. **Observer Interface**: Defines the `update` method that observers must implement.
2. **Subject Interface**: Provides methods for managing observers and notifying them of changes.
3. **ConcreteSubject**: `WeatherStation` maintains the state and notifies registered observers when the state changes.
4. **ConcreteObserver**: `CurrentConditionsDisplay` updates and displays the current weather conditions when notified.
5. **Client Code**: Sets up the subject and observer, and updates the weather conditions, triggering notifications to observers.

### Benefits of the Observer Pattern:

- **Loose Coupling**: Subjects and observers are loosely coupled. Observers can be added or removed without changing the subject.
- **Dynamic Relationships**: Observers can be added or removed dynamically at runtime.
- **Enhanced Flexibility**: Allows for flexible communication between components without direct dependencies.

### Use Cases of the Observer Pattern:

- **Event Handling Systems**: GUI frameworks where multiple components need to respond to user actions or system events.
- **Notification Systems**: Applications that need to notify multiple components about state changes or events.
- **Data Binding**: In frameworks that bind UI components to data models, where changes in the model need to update the UI.
---
title: "Understanding the Flyweight Design Pattern"
date: 2024-08-19T15:54:02+05:30
draft: false
tags: [ "Design Patterns", "Structural GOF", "software design" ]
---
The Flyweight Design Pattern is a structural pattern that optimizes memory usage by sharing common parts of objects to support a large number of similar objects efficiently. This pattern is used when you have a large number of objects with shared states and you want to minimize memory usage.

### Components of the Flyweight Design Pattern:

1. **Flyweight**: An interface or abstract class that declares methods for managing and accessing extrinsic state.
2. **ConcreteFlyweight**: Implements the Flyweight interface and defines the intrinsic state of the object. The intrinsic state is shared across all instances of the flyweight.
3. **FlyweightFactory**: Manages the creation and reuse of Flyweight objects. It ensures that flyweights are shared properly.
4. **Client**: Maintains references to flyweights and uses them.

### Simple Example:

Let’s create a simple example where we manage a collection of `Character` objects in a text editor. Each character may have different formatting (e.g., bold or italic), but the characters themselves (e.g., 'A', 'B', 'C') are shared.

#### 1. Flyweight Interface:

```java
// Flyweight interface
interface CharacterFlyweight {
    void display(String context);
}
```

#### 2. ConcreteFlyweight:

```java
// ConcreteFlyweight class
class ConcreteCharacterFlyweight implements CharacterFlyweight {
    private char character;

    public ConcreteCharacterFlyweight(char character) {
        this.character = character;
    }

    @Override
    public void display(String context) {
        System.out.println("Character: " + character + " with formatting: " + context);
    }
}
```

#### 3. FlyweightFactory:

```java
import java.util.HashMap;
import java.util.Map;

// FlyweightFactory class
class CharacterFactory {
    private Map<Character, CharacterFlyweight> characters = new HashMap<>();

    public CharacterFlyweight getCharacter(char character) {
        if (!characters.containsKey(character)) {
            characters.put(character, new ConcreteCharacterFlyweight(character));
        }
        return characters.get(character);
    }
}
```

#### 4. Client Code:

```java
public class FlyweightPatternDemo {
    public static void main(String[] args) {
        CharacterFactory factory = new CharacterFactory();

        // Get flyweight objects
        CharacterFlyweight charA = factory.getCharacter('A');
        CharacterFlyweight charB = factory.getCharacter('B');
        CharacterFlyweight charC = factory.getCharacter('C');

        // Display characters with different formatting
        charA.display("Bold");
        charA.display("Italic");
        charB.display("Bold");
        charC.display("Italic");
    }
}
```

### Explanation:

1. **Flyweight Interface**: `CharacterFlyweight` defines the `display` method for the flyweight objects.
2. **ConcreteFlyweight**: `ConcreteCharacterFlyweight` implements the `CharacterFlyweight` interface and stores the intrinsic state (the character itself).
3. **FlyweightFactory**: `CharacterFactory` manages and reuses flyweight objects. It creates new flyweights only when needed and returns existing ones if they already exist.
4. **Client Code**: Demonstrates how to use the `CharacterFactory` to get flyweight objects and display them with different formatting.

### Benefits of the Flyweight Design Pattern:

- **Memory Efficiency**: Reduces memory usage by sharing common parts of objects.
- **Performance Improvement**: Improves performance when dealing with a large number of similar objects.
- **Decoupling**: Separates the intrinsic state (shared) from the extrinsic state (unique to each object).

### Use Cases of the Flyweight Design Pattern:

- **Text Editors**: Managing a large number of characters with shared properties (e.g., fonts).
- **Graphics Systems**: Managing shapes and graphical elements that share common properties.
- **Document Processing**: Handling a large number of similar objects (e.g., text formatting in documents).

The Flyweight Pattern is particularly useful when you need to handle a large number of similar objects efficiently, where many objects share common data and have only a small amount of unique data.
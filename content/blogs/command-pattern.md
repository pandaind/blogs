---
title: "Understanding the Command Design Pattern"
date: 2024-08-10T13:35:04+05:30
draft: false
tags: [ "Design Patterns", "GOF", "software design" ]
---

The Command Design Pattern is a behavioural design pattern that turns a request into a stand-alone object containing all the information about the request. This pattern allows you to parameterize objects with operations, delay the execution of an operation, or queue a request for execution.

### Simple Example:

Imagine you have a remote control that can turn on and off a light. The Command Pattern can be used to encapsulate these operations into objects.

#### Components:

1. **Command Interface**: Defines a common interface for all commands.
2. **Concrete Command**: Implements the command interface and defines the binding between a receiver object and an action.
3. **Receiver**: Knows how to perform the operations associated with the request.
4. **Invoker**: Asks the command to execute the request.
5. **Client**: Creates a ConcreteCommand object and sets its receiver.

#### Example in Java:

```java
// Command Interface
interface Command {
    void execute();
}

// Receiver
class Light {
    void turnOn() {
        System.out.println("Light is ON");
    }

    void turnOff() {
        System.out.println("Light is OFF");
    }
}

// Concrete Command to turn on the light
class LightOnCommand implements Command {
    private Light light;

    LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
}

// Concrete Command to turn off the light
class LightOffCommand implements Command {
    private Light light;

    LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
}

// Invoker
class RemoteControl {
    private Command command;

    void setCommand(Command command) {
        this.command = command;
    }

    void pressButton() {
        command.execute();
    }
}

// Client
public class CommandPatternDemo {
    public static void main(String[] args) {
        Light light = new Light();
        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton(); // Output: Light is ON

        remote.setCommand(lightOff);
        remote.pressButton(); // Output: Light is OFF
    }
}
```

### Explanation:

1. **Command Interface**: `Command` with the `execute()` method.
2. **Receiver**: `Light` with methods `turnOn()` and `turnOff()`.
3. **Concrete Commands**: `LightOnCommand` and `LightOffCommand` implement `Command` and call appropriate methods on `Light`.
4. **Invoker**: `RemoteControl` holds a command and invokes it.
5. **Client**: Creates instances of `Light`, commands, and the remote control, sets commands, and presses the button.

This setup allows for easy extension of commands, undo/redo functionality, or even batching commands.

### Benefits of the Command Design Pattern:

1. **Decoupling of Sender and Receiver**: The sender (invoker) of a request is decoupled from the receiver (the object that performs the action). This makes it easier to modify, extend, or replace the receiver without affecting the sender.

2. **Enhanced Flexibility**: Commands can be parameterized with different requests, allowing you to create different command objects for various operations. This flexibility also enables you to queue, log, or undo commands.

3. **Easy to Extend**: Adding new commands is straightforward. You only need to create new command classes that implement the command interface without changing existing code.

4. **Support for Undo/Redo**: Commands can be designed to support undo and redo operations, as the command object can keep track of what action was performed.

5. **Composite Commands**: You can create composite commands that combine multiple commands into a single command. This is useful for complex operations that need to be executed as a group.

6. **Batch Processing**: Commands can be executed in batches, allowing for bulk operations or transactions.

### Use Cases of the Command Design Pattern:

1. **GUI Systems**: Commands are often used in graphical user interfaces (GUIs) to handle user actions like button clicks, menu selections, or keystrokes. Each action can be encapsulated as a command object.

2. **Menu Systems**: In applications with complex menus, commands can be used to handle menu actions, making it easy to add, remove, or modify menu options.

3. **Transactional Systems**: In systems where operations need to be performed as transactions, commands can be used to encapsulate the operations and support undo/redo functionality.

4. **Remote Control Systems**: For remote control devices (like home automation systems), commands can represent actions like turning on lights, adjusting thermostats, or opening doors.

5. **Logging and Auditing**: Commands can be used to log actions performed in an application, as each command object can record its execution for auditing purposes.

6. **Workflow Automation**: In workflow automation systems, commands can represent steps in a workflow, allowing you to execute, pause, or resume steps dynamically.

7. **Game Development**: Commands can be used to handle player actions, such as moving characters or executing special abilities, allowing for a clean separation of game logic from user input.

### Example of a Use Case:

In a text editor application, the Command Pattern can be used to handle operations like "cut," "copy," and "paste." Each operation is encapsulated as a command object, which can be executed, undone, or redone. This approach allows for flexible handling of text operations and easy integration of additional features like custom commands or macros.

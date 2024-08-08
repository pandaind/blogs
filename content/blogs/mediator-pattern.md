---
title: "Understanding the Mediator Pattern"
date: 2024-08-08T11:00:27+05:30
draft: false
tags: [ "Design Patterns", "GOF", "software design" ]
---
The Mediator pattern promotes loose coupling between objects by introducing a mediator that handles communication between them. This reduces dependencies and makes the system more flexible and maintainable.

# A Simple Chat Room Example
Let's consider a basic chat room application with multiple users. Instead of users communicating directly with each other, they'll send messages to a chat room (the mediator), which then broadcasts the message to all users.

## 1. Define the Mediator Interface:
~~~java
interface ChatRoom {
    void registerUser(User user);
    void send(String msg, User user);
}
~~~

## 2. Create a Concrete Mediator:

~~~java
class ChatRoomImpl implements ChatRoom {
    private List<User> users = new ArrayList<>();

    @Override
    public void registerUser(User user) {
        users.add(user);
    }

    @Override
    public void send(String msg, User user) {
        for (User u : users) {
            if (u != user) {
                u.receive(msg);
            }
        }
    }
}
~~~

## 3. Define the User Interface:

~~~java
interface User {
    void send(String msg);
    void receive(String msg);
}
~~~

## 4. Create Concrete Users:
~~~java
class UserImpl implements User {
    private ChatRoom chatRoom;
    private String name;

    public UserImpl(ChatRoom chatRoom, String name) {
        this.chatRoom = chatRoom;
        this.name = name;
    }

    @Override
    public void send(String msg) {
        chatRoom.send(msg, this);
    }

    @Override
    public void receive(String msg) {
        System.out.println(name + " received: " + msg);
    }
}
~~~

## 5. Client Code:

~~~java
public class MediatorPatternDemo {
    public static void main(String[] args) {
        ChatRoom chatRoom = new ChatRoomImpl();
        User user1 = new UserImpl(chatRoom, "User1");
        User user2 = new UserImpl(chatRoom, "User2");

        chatRoom.registerUser(user1);
        chatRoom.registerUser(user2);

        user1.send("Hello, everyone!");
        user2.send("Hi there!");
    }
}
~~~


## How it Works
- Users interact with the ChatRoom (mediator) to send messages.
- The ChatRoom broadcasts the message to all registered Users.
- Users receive the message and display it.

## Key Benefits:
- Loose coupling: Users don't need to know about each other.
- Flexibility: Adding new users or changing the message handling logic is easier.
- Maintainability: The code is more organized and easier to understand.

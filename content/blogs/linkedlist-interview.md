---
title: "Linked Lists in Java: An Interview Guide"
date: 2024-07-07T23:05:48+05:30
draft: false
tags: [ "Java", "data structures" ]
---

Linked lists are a fundamental data structure that every software developer should understand. They form the basis for many other data structures and algorithms. In this blog post, we'll explore how to implement a linked list in Java and cover some of the trickiest parts that you might encounter during interviews.

### What is a Linked List?

A linked list is a linear data structure where each element, called a node, contains a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not require contiguous memory allocation, making them more flexible for dynamic data structures.

### Basic Linked List Implementation

Let's start with the basic structure of a linked list. We'll implement a singly linked list, where each node points to the next node.

```java
class Node {
    int data;
    Node next;

    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList {
    private Node head;

    public LinkedList() {
        this.head = null;
    }

    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }

    public void remove(int data) {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        if (head.data == data) {
            head = head.next;
            return;
        }
        Node current = head;
        Node previous = null;
        while (current != null && current.data != data) {
            previous = current;
            current = current.next;
        }
        if (current == null) {
            System.out.println("Element not found in the list");
            return;
        }
        previous.next = current.next;
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.add(1);
        list.add(2);
        list.add(3);
        System.out.println("Linked List:");
        list.display();
        list.remove(2);
        System.out.println("After removing 2:");
        list.display();
    }
}
```

### Advanced Linked List Operations

For interview preparation, it's crucial to understand and implement more advanced operations on linked lists. Here are some key operations you should be familiar with:

#### 1. Insertion at Different Positions

```java
// Insert a new node at the beginning of the list
public void addFirst(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
}

// Insert a new node at a specific position
public void addAtPosition(int position, int data) {
    if (position < 1) {
        System.out.println("Invalid position!");
        return;
    }
    if (position == 1) {
        addFirst(data);
        return;
    }
    Node newNode = new Node(data);
    Node current = head;
    for (int i = 1; i < position - 1 && current != null; i++) {
        current = current.next;
    }
    if (current == null) {
        System.out.println("Position out of bounds!");
        return;
    }
    newNode.next = current.next;
    current.next = newNode;
}
```

#### 2. Reversing the Linked List

```java
// Iterative approach to reverse the linked list
public void reverse() {
    Node previous = null;
    Node current = head;
    Node next = null;
    while (current != null) {
        next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }
    head = previous;
}

// Recursive approach to reverse the linked list
public Node reverseRecursive(Node current) {
    if (current == null || current.next == null) {
        return current;
    }
    Node newHead = reverseRecursive(current.next);
    current.next.next = current;
    current.next = null;
    return newHead;
}

public void reverse() {
    head = reverseRecursive(head);
}
```

#### 3. Detecting a Cycle

```java
// Floyd’s Cycle-Finding Algorithm
public boolean hasCycle() {
    if (head == null) {
        return false;
    }
    Node slow = head;
    Node fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
```

#### 4. Finding the Middle Element

```java
// Find the middle of the linked list
public Node findMiddle() {
    if (head == null) {
        return null;
    }
    Node slow = head;
    Node fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```

#### 5. Nth Node from the End

```java
// Using the two-pointer technique
public Node findNthFromEnd(int n) {
    if (head == null) {
        return null;
    }
    Node first = head;
    Node second = head;
    for (int i = 0; i < n; i++) {
        if (second == null) {
            return null;
        }
        second = second.next;
    }
    while (second != null) {
        first = first.next;
        second = second.next;
    }
    return first;
}
```

### Tips

1. **Understand the Problem**: Before coding, ensure you understand the problem requirements and constraints.
2. **Edge Cases**: Think about and handle edge cases (e.g., empty list, single element list, position out of bounds).
3. **Optimise**: Consider the time and space complexity of your solutions.
4. **Explain Your Thought Process**: Walk through your logic and code with the interviewer.
5. **Test Your Code**: After implementation, test your code with different inputs to ensure it works correctly.


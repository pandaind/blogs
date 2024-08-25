---
title: "Understanding Internal Implementation of HashMap and HashSet in Java"
date: 2024-08-25T19:07:16+05:30
draft: fasle
tags: [ "java"]
---

When working with Java, two commonly used data structures are `HashMap` and `HashSet`. These collections are highly efficient, but their efficiency relies on how they handle internal operations, especially when it comes to collisions. This blog will explain the internal workings of `HashMap` and `HashSet` in simple terms and provide examples to help you understand how they manage collisions.

### What is a HashMap?

A `HashMap` is a data structure that stores key-value pairs. It allows you to store data in a way that lets you quickly retrieve the value associated with a specific key. The keys in a `HashMap` must be unique.

### Internal Working of HashMap

![hashmap](/content-img/hashmap.png)

#### Buckets and Hash Codes

- **Buckets**: Internally, a `HashMap` uses an array of buckets to store entries (key-value pairs). The bucket where a key-value pair is stored is determined by the key's hash code.
- **Hash Code**: When you add a key-value pair to the `HashMap`, Java calculates the hash code of the key. This hash code is then used to determine which bucket the entry should be placed in.

#### Handling Collisions

A collision occurs when two different keys produce the same hash code, resulting in them being assigned to the same bucket.

1. **Linked List (Java 7 and Earlier)**:
   - Before Java 8, if a collision occurred, the `HashMap` would store the collided entries in a linked list within that bucket.
   - To retrieve a value, Java would traverse the linked list in the bucket and compare each key using the `equals()` method until it found the correct one.

2. **Tree-based Structure (Java 8 and Later)**:
   - Starting with Java 8, if a bucket contains a lot of entries (due to collisions), the `HashMap` converts the linked list into a balanced binary tree.
   - This change was made to improve performance, as searching in a tree is faster (O(log n)) compared to searching in a linked list (O(n)).

3. **Rehashing**:
   - When the `HashMap` becomes too full (exceeding a load factor, usually 0.75), it increases the size of its bucket array and rehashes all entries to redistribute them more evenly across the new buckets. This reduces collisions and keeps the `HashMap` efficient.

#### HashMap Example

```java
import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        // Adding key-value pairs
        map.put("apple", 1);
        map.put("banana", 2);
        map.put("orange", 3);

        // Retrieving values
        System.out.println("Value for key 'apple': " + map.get("apple"));
        System.out.println("Value for key 'banana': " + map.get("banana"));

        // Handling collision by putting another key with the same hash code
        map.put("paple", 4); // Assuming "paple" produces the same hash code as "apple"
        System.out.println("Value for key 'paple': " + map.get("paple"));
    }
}
```

In this example, if `"paple"` and `"apple"` happen to produce the same hash code, they will both be stored in the same bucket, and Java will handle this collision internally.

### What is a HashSet?

A `HashSet` is a collection that stores unique elements. It does not allow duplicate entries, and it is implemented using a `HashMap` internally.

### Internal Working of HashSet

![hashmap](/content-img/hashset.png)

- **Underlying HashMap**: When you add an element to a `HashSet`, it is stored as a key in a `HashMap` with a dummy value (usually `Boolean.TRUE`). This is because `HashMap` keys must be unique, which ensures that the `HashSet` only stores unique elements.

#### Handling Collisions

Collisions in a `HashSet` are handled in the same way as in a `HashMap`, since `HashSet` is essentially a `HashMap` without values.

1. **Linked List (Java 7 and Earlier)**:
   - If two elements have the same hash code and are placed in the same bucket, they are stored in a linked list within that bucket.

2. **Tree-based Structure (Java 8 and Later)**:
   - In Java 8 and later, if a bucket's linked list becomes too long due to collisions, it is converted into a balanced binary tree to improve search efficiency.

3. **Rehashing**:
   - Similar to `HashMap`, when the `HashSet` becomes too full, it resizes its underlying `HashMap`, rehashes all elements, and redistributes them across the new buckets.

#### HashSet Example

```java
import java.util.HashSet;

public class HashSetExample {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();

        // Adding elements
        set.add("apple");
        set.add("banana");
        set.add("orange");

        // Checking for existence
        System.out.println("Set contains 'apple': " + set.contains("apple"));
        System.out.println("Set contains 'banana': " + set.contains("banana"));

        // Handling collision by adding another element with the same hash code
        set.add("paple"); // Assuming "paple" produces the same hash code as "apple"
        System.out.println("Set contains 'paple': " + set.contains("paple"));
    }
}
```

In this example, if `"paple"` and `"apple"` produce the same hash code, they will both be stored in the same bucket. The `HashSet` ensures that each element is unique, and handles any collisions internally.

### Conclusion

Understanding how `HashMap` and `HashSet` handle collisions internally is crucial for optimizing their use in your applications. By knowing how buckets, linked lists, and trees work together to manage collisions, you can appreciate the efficiency and robustness of these data structures in Java.

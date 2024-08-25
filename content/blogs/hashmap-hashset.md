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
import java.util.Objects;

public class Main {
  public static void main(String[] args) {
    HashMap<CustomKey, String> map = new HashMap<>();

    CustomKey key1 = new CustomKey(1, "Key1");
    CustomKey key2 = new CustomKey(1, "Key2"); // Same hash code as key1

    System.out.println("Key1: " + key1.hashCode());
    System.out.println("Key2: " + key2.hashCode());

    map.put(key1, "Value1");
    map.put(key2, "Value2");

    System.out.println("Key1: " + map.get(key1));
    System.out.println("Key2: " + map.get(key2));
  }
}

class CustomKey {
  private int id;
  private String name;

  public CustomKey(int id, String name) {
    this.id = id;
    this.name = name;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id); // Simplified hash code to force collision
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null || getClass() != obj.getClass())
      return false;
    CustomKey customKey = (CustomKey)obj;
    return id == customKey.id && Objects.equals(name, customKey.name);
  }
}
```
```bash
Key1: 32
Key2: 32
Key1: Value1
Key2: Value2
```
The code defines a `CustomKey` class with overridden `hashCode` and `equals` methods to demonstrate hash collisions in a `HashMap`. Two `CustomKey` objects with the same `id` but different `name` values are created, resulting in the same hash code but different equality checks. The `HashMap` stores and retrieves values using these keys, showing how collisions are handled.

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
import java.util.Objects;

public class Main {
  public static void main(String[] args) {
    HashSet<CustomKey> set = new HashSet<>();

    CustomKey key1 = new CustomKey(1, "Key1");
    CustomKey key2 = new CustomKey(1, "Key2"); // Same hash code as key1

    System.out.println("Key1: " + key1.hashCode());
    System.out.println("Key2: " + key2.hashCode());
    System.out.println("equals: " + key1.equals(key2));

    set.add(key1);
    set.add(key2);

    System.out.println("HashSet: " + set);
  }
}

class CustomKey {
  private int id;
  private String name;

  public CustomKey(int id, String name) {
    this.id = id;
    this.name = name;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id); // Simplified hash code to force collision
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null || getClass() != obj.getClass())
      return false;
    CustomKey customKey = (CustomKey)obj;
    return id == customKey.id && Objects.equals(name, customKey.name);
  }

  @Override
  public String toString() {
    return "CustomKey{id=" + id + ", name='" + name + "'}";
  }
}
```
```bash
Key1: 32
Key2: 32
HashSet: [CustomKey{id=1, name='Key1'}, CustomKey{id=1, name='Key2'}]
```
A `HashSet` in Java ensures uniqueness of its elements based on both the `hashCode` and `equals` methods. Here's how it works:

1. **Hashing**: When an element is added to the `HashSet`, its `hashCode` method is called to determine the hash code of the element. This hash code is used to find the appropriate bucket.

2. **Equality**: If the hash code matches an existing element's hash code in the same bucket, the `equals` method is then called to check if the two elements are actually equal. If `equals` returns `true`, the new element is considered a duplicate and is not added to the set.

In the provided code, the `CustomKey` class overrides both `hashCode` and `equals` methods. The `hashCode` method is simplified to force a collision by only using the `id` field, while the `equals` method checks both `id` and `name` fields for equality. This means that even if two `CustomKey` objects have the same `id` (and thus the same hash code), they will only be considered equal if both their `id` and `name` fields match.

### Conclusion

Understanding how `HashMap` and `HashSet` handle collisions internally is crucial for optimizing their use in your applications. By knowing how buckets, linked lists, and trees work together to manage collisions, you can appreciate the efficiency and robustness of these data structures in Java.

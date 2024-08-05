---
title: "Valid Anagram"
date: 2024-05-23T15:00:00+05:30
draft: false
tags: [ "coding challenge" ]
---
To solve the "valid anagram" problem, we need to determine if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters with the same frequencies.

Here is a Python function that solves this problem using different approaches, followed by an analysis of each approach to find the best solution.

### Solution 1: Sorting

```python
def is_anagram(s, t):
    return sorted(s) == sorted(t)
```

### Explanation:

1. **Sorting**: Sort both strings and compare them.
   - If they are anagrams, their sorted versions will be identical.
   - If not, they will differ.

### Analysis:

- **Time Complexity**: O(n log n), where n is the length of the strings (sorting time).
- **Space Complexity**: O(n), due to the space required for the sorted strings.

### Solution 2: Counting Characters with a Dictionary

```python
def is_anagram(s, t):
    if len(s) != len(t):
        return False

    count_s = {}
    count_t = {}

    for char in s:
        count_s[char] = count_s.get(char, 0) + 1

    for char in t:
        count_t[char] = count_t.get(char, 0) + 1

    return count_s == count_t
```

### Explanation:

1. **Early Exit**: Check if the lengths of the strings are different; if so, return `False`.
2. **Counting**: Use two dictionaries to count the frequency of each character in both strings.
3. **Comparison**: Compare the two dictionaries. If they are equal, the strings are anagrams; otherwise, they are not.

### Analysis:

- **Time Complexity**: O(n), where n is the length of the strings.
- **Space Complexity**: O(n), due to the space required for the dictionaries.

### Solution 3: Counting Characters with a Single Dictionary

```python
def is_anagram(s, t):
    if len(s) != len(t):
        return False

    count = {}

    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char in count:
            count[char] -= 1
        else:
            return False

    return all(value == 0 for value in count.values())
```

### Explanation:

1. **Early Exit**: Check if the lengths of the strings are different; if so, return `False`.
2. **Counting and Balancing**:
   - Count the characters in the first string.
   - Subtract the count while iterating through the second string.
   - If a character in the second string is not in the count dictionary, return `False`.
3. **Final Check**: Ensure all counts in the dictionary are zero.

### Analysis:

- **Time Complexity**: O(n), where n is the length of the strings.
- **Space Complexity**: O(n), due to the space required for the dictionary.

### Conclusion

The best solution is **Solution 3: Counting Characters with a Single Dictionary**, due to its optimal time complexity O(n) and efficient space usage. Here's the final version of the best solution:

```python
def is_anagram(s, t):
    if len(s) != len(t):
        return False

    count = {}

    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char in count:
            count[char] -= 1
        else:
            return False

    return all(value == 0 for value in count.values())
```

This approach is efficient and easy to understand, making it well-suited for checking if two strings are anagrams.

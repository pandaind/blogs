---
title: "Two Sum"
date: 2024-05-24T00:00:00+05:30
draft: false
tags: [ "coding challenge" ]
---
## Question: 
Given an array of integer nums and an integer target, return indices of the two numbers such that they add up to the target.

## Answer: 
To solve this problem, you can use a dictionary to store the indices of the numbers you've seen so far. As you iterate through the array, you can check if the complement of the current number (target - current number) exists in the dictionary. If it does, you've found the two indices that add up to the target.

Here's the Python code to implement this:

```python
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return None
```

### Explanation:

1. **Dictionary (`num_map`)**: We use a dictionary to store the indices of the numbers we've seen so far.

2. **Iteration (`for i, num in enumerate(nums):`)**: We iterate through the array and for each number, we check if its complement (target - current number) exists in the dictionary.

3. **Checking Complement**: If the complement exists in the dictionary, we return the indices of the current number and its complement.

4. **Storing Indices**: If the complement doesn't exist in the dictionary, we store the current number's index in the dictionary.

5. **Return**: If no solution is found, we return `None` to indicate that no two numbers in the array add up to the target.

### Example:

```python
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # Output: [0, 1] (indices of numbers 2 and 7)
```

### Complexity Analysis:

- **Time Complexity**: O(n), where n is the number of elements in the array. We iterate through the array once.
- **Space Complexity**: O(n), where n is the number of elements in the array. The dictionary can store at most n elements.

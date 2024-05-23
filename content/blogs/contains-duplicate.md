---
title: "Array Contains Duplicate"
date: 2024-05-23T20:07:26+05:30
draft: false
---
To determine if any value appears more than once in an integer array, the best approach is to use a set due to its optimal balance of time complexity, space complexity, and simplicity. Here's a comprehensive solution and explanation:

### Solution

```python
def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
```

### Explanation

1. **Initialization**: Create an empty set called `seen`.
   ```python
   seen = set()
   ```

2. **Iteration**: Loop through each element in the array.
   ```python
   for num in nums:
   ```

3. **Check for Duplicates**:
   - If the current number is already in the `seen` set, return `True` because a duplicate has been found.
   - If not, add the number to the `seen` set.
   ```python
   if num in seen:
       return True
   seen.add(num)
   ```

4. **Completion**: If the loop completes without finding any duplicates, return `False`.
   ```python
   return False
   ```

### Analysis

- **Time Complexity**: O(n)
  - Each lookup and insertion operation in a set takes average O(1) time, making the entire algorithm linear with respect to the number of elements in the array.
- **Space Complexity**: O(n)
  - In the worst case, all elements are unique, and the set will store all n elements.

### Alternatives Considered

1. **Sorting Approach**: 
   ```python
   def contains_duplicate(nums):
       nums.sort()
       for i in range(1, len(nums)):
           if nums[i] == nums[i - 1]:
               return True
       return False
   ```
   - **Time Complexity**: O(n log n)
   - **Space Complexity**: O(1) if sorting in place, but less efficient due to sorting time.

2. **Dictionary (Hash Map) Approach**:
   ```python
   def contains_duplicate(nums):
       count = {}
       for num in nums:
           if num in count:
               return True
           count[num] = 1
       return False
   ```
   - **Time Complexity**: O(n)
   - **Space Complexity**: O(n)
   - Similar in performance to the set-based approach but more verbose.

3. **`collections.Counter` Approach**:
   ```python
   from collections import Counter

   def contains_duplicate(nums):
       counts = Counter(nums)
       for count in counts.values():
           if count > 1:
               return True
       return False
   ```
   - **Time Complexity**: O(n)
   - **Space Complexity**: O(n)
   - More concise but with additional overhead from using the `Counter` class.

### Conclusion

For checking if any value appears more than once in an integer array, the **set-based approach** is the best due to its optimal O(n) time complexity, reasonable O(n) space complexity, and simplicity of implementation. This makes it suitable for most practical use cases.

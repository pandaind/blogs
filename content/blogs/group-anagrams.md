---
title: "Group Anagrams"
date: 2024-05-24T00:00:00+05:30
draft: false
---
## Question: 
Given an array of strings strs, group the anagrams together.

## Answer: 
To group anagrams together, you can use a dictionary to map sorted strings to their respective groups of anagrams. Here's how you can do it in Python:

```python
def group_anagrams(strs):
    anagrams = {}
    for word in strs:
        sorted_word = ''.join(sorted(word))
        if sorted_word in anagrams:
            anagrams[sorted_word].append(word)
        else:
            anagrams[sorted_word] = [word]
    return list(anagrams.values())

# Example
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(group_anagrams(strs))
```

In this code:
- We iterate through each word in the input array.
- For each word, we sort its characters and use the sorted string as a key in the `anagrams` dictionary.
- If the sorted string already exists in the dictionary, we append the word to its list of anagrams. Otherwise, we create a new entry with the sorted string as the key and a list containing the word as its value.
- Finally, we return the values of the `anagrams` dictionary as a list, which contains lists of anagrams.

This solution has a time complexity of O(n * k * log(k)), where n is the number of words in the input array and k is the maximum length of a word. The space complexity is O(n * k) due to the dictionary used to store the grouped anagrams.

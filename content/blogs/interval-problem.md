---
title: "Interval Problems with Code: Insert, Merge, and More"
date: 2024-08-19T13:10:05+05:30
draft: false
tags: [ "coding challenge" ]
---

Intervals are a common topic in algorithmic problems. In this post, we'll tackle five key interval problems: Insert Interval, Merge Intervals, Non Overlapping Intervals, Meeting Rooms, and Meeting Rooms II. Each problem will be solved with code examples and explanations.

### 1. Insert Interval

**Problem:** Given a set of non-overlapping intervals sorted by their start time, insert a new interval into the intervals (merge if necessary) and return the result.

**Code Solution (Java):**

```java
import java.util.ArrayList;
import java.util.List;

public class IntervalProblems {
    public static List<int[]> insertInterval(List<int[]> intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;

        // Add all intervals that end before newInterval starts
        while (i < intervals.size() && intervals.get(i)[1] < newInterval[0]) {
            result.add(intervals.get(i));
            i++;
        }

        // Merge all intervals that overlap with newInterval
        while (i < intervals.size() && intervals.get(i)[0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals.get(i)[0]);
            newInterval[1] = Math.max(newInterval[1], intervals.get(i)[1]);
            i++;
        }
        result.add(newInterval);

        // Add all remaining intervals
        while (i < intervals.size()) {
            result.add(intervals.get(i));
            i++;
        }

        return result;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{1, 3});
        intervals.add(new int[]{6, 9});
        int[] newInterval = {2, 5};

        List<int[]> result = insertInterval(intervals, newInterval);
        for (int[] interval : result) {
            System.out.println("[" + interval[0] + ", " + interval[1] + "]");
        }
    }
}
```

**Output:**

```
[1, 5]
[6, 9]
```

**Explanation:** The function first adds all intervals that end before the new interval starts. Then it merges overlapping intervals and finally adds any remaining intervals.

- The new interval `[2, 5]` merges with `[1, 3]` to form `[1, 5]`.
- The remaining intervals `[6, 9]` are unaffected.

---

### 2. Merge Intervals

**Problem:** Given a collection of intervals, merge all overlapping intervals.

**Code Solution (Java):**

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class IntervalProblems {
    public static List<int[]> mergeIntervals(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return new ArrayList<>();
        }

        // Sort intervals by start time
        intervals.sort(Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        int[] currentInterval = intervals.get(0);
        merged.add(currentInterval);

        for (int i = 1; i < intervals.size(); i++) {
            int[] interval = intervals.get(i);
            if (interval[0] <= currentInterval[1]) {
                // Overlapping intervals
                currentInterval[1] = Math.max(currentInterval[1], interval[1]);
            } else {
                // No overlap
                currentInterval = interval;
                merged.add(currentInterval);
            }
        }

        return merged;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{1, 3});
        intervals.add(new int[]{2, 6});
        intervals.add(new int[]{8, 10});
        intervals.add(new int[]{15, 18});

        List<int[]> result = mergeIntervals(intervals);
        for (int[] interval : result) {
            System.out.println("[" + interval[0] + ", " + interval[1] + "]");
        }
    }
}

```

**Output:**

```
[1, 6]
[8, 10]
[15, 18]
```

**Explanation:** After sorting the intervals by start time, the function iterates through them, merging overlapping intervals and keeping track of the merged intervals.

**Stack-Based Solution (Java):**

```java
import java.util.*;

public class IntervalProblems {

    public static List<int[]> mergeIntervals(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return new ArrayList<>();
        }

        // Sort intervals by start time
        intervals.sort(Comparator.comparingInt(a -> a[0]));
        Stack<int[]> stack = new Stack<>();

        // Push the first interval onto the stack
        stack.push(intervals.get(0));

        for (int i = 1; i < intervals.size(); i++) {
            int[] top = stack.peek();
            int[] current = intervals.get(i);

            if (top[1] >= current[0]) {
                // If the current interval overlaps with the top of the stack, merge them
                top[1] = Math.max(top[1], current[1]);
            } else {
                // If it doesn't overlap, push the current interval onto the stack
                stack.push(current);
            }
        }

        return new ArrayList<>(stack);
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{1, 3});
        intervals.add(new int[]{2, 6});
        intervals.add(new int[]{8, 10});
        intervals.add(new int[]{15, 18});

        List<int[]> result = mergeIntervals(intervals);
        for (int[] interval : result) {
            System.out.println("[" + interval[0] + ", " + interval[1] + "]");
        }
    }
}
```

**Explanation:**

- The stack stores merged intervals. As you iterate through the sorted list, you compare the current interval with the top of the stack. If they overlap, you merge them; otherwise, you push the current interval onto the stack.

---

### 3. Non Overlapping Intervals

**Problem:** Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest non-overlapping.

**Code Solution (Java):**

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class IntervalProblems {
    public static int eraseOverlapIntervals(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return 0;
        }

        // Sort intervals by end time
        intervals.sort(Comparator.comparingInt(a -> a[1]));
        int count = 0;
        int end = intervals.get(0)[1];

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals.get(i)[0] < end) {
                count++;
            } else {
                end = intervals.get(i)[1];
            }
        }

        return count;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{1, 2});
        intervals.add(new int[]{2, 3});
        intervals.add(new int[]{3, 4});
        intervals.add(new int[]{1, 3});

        int result = eraseOverlapIntervals(intervals);
        System.out.println("Minimum number of intervals to remove: " + result);
    }
}

```

**Output:**

```
Minimum number of intervals to remove: 1
```

**Explanation:** By sorting intervals by their end times and keeping track of the end of the last interval, we can count how many intervals overlap and need to be removed.

---

### 4. Meeting Rooms

**Problem:** Given a collection of meeting intervals, determine if a person could attend all meetings.

**Code Solution (Java):**

```Java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class IntervalProblems {
    public static boolean canAttendAllMeetings(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return true;
        }

        // Sort intervals by start time
        intervals.sort(Comparator.comparingInt(a -> a[0]));

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals.get(i)[0] < intervals.get(i - 1)[1]) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{0, 30});
        intervals.add(new int[]{5, 10});
        intervals.add(new int[]{15, 20});

        boolean result = canAttendAllMeetings(intervals);
        System.out.println("Can attend all meetings: " + result);
    }
}

```

**Output:**

```
Can attend all meetings: false
```

**Explanation:** After sorting the intervals by start time, the function checks if any meeting overlaps with the previous one. If any do, it returns `False`, indicating that not all meetings can be attended.

### **Meeting Rooms** (Using a Priority Queue)

For the Meeting Rooms problem, a priority queue (min-heap) efficiently manages meeting end times:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class IntervalProblems {
    public static boolean canAttendAllMeetings(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return true;
        }

        // Sort intervals by start time
        intervals.sort((a, b) -> Integer.compare(a[0], b[0]));

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int[] interval : intervals) {
            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
                minHeap.poll();
            }
            minHeap.offer(interval[1]);
        }

        return minHeap.size() <= 1;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{0, 30});
        intervals.add(new int[]{5, 10});
        intervals.add(new int[]{15, 20});

        boolean result = canAttendAllMeetings(intervals);
        System.out.println("Can attend all meetings: " + result);
    }
}
```

**Output:**

```
false
```

**Explanation:**

- There are overlapping meetings, so you cannot attend all of them without conflicts.

---

### 5. Meeting Rooms II

**Problem:** Given a collection of meeting intervals, find the minimum number of conference rooms required.

**Code Solution (java):**

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class IntervalProblems {
    public static int minMeetingRooms(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return 0;
        }

        List<Integer> startTimes = new ArrayList<>();
        List<Integer> endTimes = new ArrayList<>();

        for (int[] interval : intervals) {
            startTimes.add(interval[0]);
            endTimes.add(interval[1]);
        }

        Collections.sort(startTimes);
        Collections.sort(endTimes);

        int rooms = 0, endPointer = 0;

        for (int start : startTimes) {
            if (start < endTimes.get(endPointer)) {
                rooms++;
            } else {
                endPointer++;
            }
        }

        return rooms;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{0, 30});
        intervals.add(new int[]{5, 10});
        intervals.add(new int[]{15, 20});

        int result = minMeetingRooms(intervals);
        System.out.println("Minimum number of meeting rooms required: " + result);
    }
}

```

**Output:**

```
Minimum number of meeting rooms required: 2
```

**Explanation:** By maintaining two lists of start and end times, the function uses a pointer to determine how many rooms are needed based on overlapping meetings.

### **Meeting Rooms II** (Using a Priority Queue)

The priority queue (min-heap) is also effective for this problem to find the minimum number of meeting rooms needed:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class IntervalProblems {
    public static int minMeetingRooms(List<int[]> intervals) {
        if (intervals.isEmpty()) {
            return 0;
        }

        // Create a priority queue to track end times of meetings
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        // Sort intervals by start time
        intervals.sort((a, b) -> Integer.compare(a[0], b[0]));

        for (int[] interval : intervals) {
            // If the room due to the earliest ending meeting is free, reuse it
            if (!minHeap.isEmpty() && minHeap.peek() <= interval[0]) {
                minHeap.poll();
            }
            // Add the current meeting's end time to the heap
            minHeap.offer(interval[1]);
        }

        // The size of the heap represents the minimum number of meeting rooms needed
        return minHeap.size();
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{0, 30});
        intervals.add(new int[]{5, 10});
        intervals.add(new int[]{15, 20});

        int result = minMeetingRooms(intervals);
        System.out.println("Minimum number of meeting rooms required: " + result);
    }
}

```

**Output:**

```
2
```

**Explanation of Output:**

- The priority queue manages end times to track the number of concurrent meetings. With the intervals `[0, 30]`, `[5, 10]`, and `[15, 20]`, you need at least 2 rooms to accommodate all meetings concurrently.

---

### 6. Problem: Minimum Interval to Include Each Query

**Problem:** Given a list of intervals and a list of queries, find the minimum interval that contains each query. If no interval contains a query, return `[-1, -1]` for that query.

**Code Solution (Java):**

```java
javaCopy codeimport java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class IntervalProblems {
    public static List<int[]> minIntervalToIncludeQuery(List<int[]> intervals, int[] queries) {
        // Sort intervals by their start time
        Collections.sort(intervals, Comparator.comparingInt(a -> a[0]));

        // Prepare result list
        List<int[]> result = new ArrayList<>();
        for (int query : queries) {
            int minLength = Integer.MAX_VALUE;
            int[] minInterval = new int[]{-1, -1};

            for (int[] interval : intervals) {
                if (interval[0] <= query && query <= interval[1]) {
                    int length = interval[1] - interval[0];
                    if (length < minLength) {
                        minLength = length;
                        minInterval = interval;
                    }
                }
            }

            result.add(minInterval);
        }

        return result;
    }

    public static void main(String[] args) {
        List<int[]> intervals = new ArrayList<>();
        intervals.add(new int[]{1, 5});
        intervals.add(new int[]{2, 6});
        intervals.add(new int[]{3, 7});
        intervals.add(new int[]{4, 8});
        
        int[] queries = {2, 4, 6, 8, 10};

        List<int[]> result = minIntervalToIncludeQuery(intervals, queries);
        for (int[] interval : result) {
            System.out.println("[" + interval[0] + ", " + interval[1] + "]");
        }
    }
}
```

**Output:**

```
cssCopy code[1, 5]
[1, 5]
[1, 5]
[4, 8]
[-1, -1]
```

**Explanation:**

1. **Sorting Intervals:** Intervals are sorted by their start times to streamline the search process.
2. **Processing Queries:** For each query, the function iterates through the intervals to find the smallest interval that contains the query.
3. **Finding Minimum Length:** It keeps track of the smallest interval length that contains the query.
4. **Adding Results:** If an interval is found, it’s added to the result list; otherwise, `[-1, -1]` is added if no interval contains the query.


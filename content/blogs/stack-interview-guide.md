---
title: "Stack in Java: Interview Guide"
date: 2024-07-19T22:23:43+05:30
draft: false
tags: [ "Java", "data structures" ]
---
#### 1. **Introduction to Stack in Java**

- **Definition**: A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
- **Operations**:
    - **Push**: Adds an element to the top of the stack.
    - **Pop**: Removes and returns the top element of the stack.
    - **Peek**: Returns the top element without removing it.
    - **isEmpty**: Checks if the stack is empty.
    - **size**: Returns the number of elements in the stack.

#### 2. **Implementing a Stack in Java**

- **Using `java.util.Stack`**:
  ```java
  import java.util.Stack;

  public class StackExample {
      public static void main(String[] args) {
          Stack<Integer> stack = new Stack<>();
          stack.push(10);
          stack.push(20);
          stack.push(30);
          
          System.out.println("Top element is: " + stack.peek());
          System.out.println("Stack size: " + stack.size());
          
          while (!stack.isEmpty()) {
              System.out.println("Popped element: " + stack.pop());
          }
      }
  }
  ```

- **Custom Stack Implementation**:
  ```java
  class MyStack {
      private int maxSize;
      private int[] stackArray;
      private int top;

      public MyStack(int size) {
          maxSize = size;
          stackArray = new int[maxSize];
          top = -1;
      }

      public void push(int value) {
          if (top < maxSize - 1) {
              stackArray[++top] = value;
          } else {
              System.out.println("Stack is full!");
          }
      }

      public int pop() {
          return (top >= 0) ? stackArray[top--] : -1;
      }

      public int peek() {
          return (top >= 0) ? stackArray[top] : -1;
      }

      public boolean isEmpty() {
          return (top == -1);
      }

      public int size() {
          return top + 1;
      }
  }
  ```

#### 3. **Common Interview Questions**

- **Reverse a String Using Stack**:
  ```java
  public class ReverseString {
      public static void main(String[] args) {
          String input = "Hello";
          Stack<Character> stack = new Stack<>();

          for (char ch : input.toCharArray()) {
              stack.push(ch);
          }

          StringBuilder reversed = new StringBuilder();
          while (!stack.isEmpty()) {
              reversed.append(stack.pop());
          }

          System.out.println("Reversed String: " + reversed.toString());
      }
  }
  ```

- **Check for Balanced Parentheses**:
  ```java
  public class BalancedParentheses {
      public static boolean isBalanced(String expression) {
          Stack<Character> stack = new Stack<>();
          for (char ch : expression.toCharArray()) {
              if (ch == '(' || ch == '{' || ch == '[') {
                  stack.push(ch);
              } else if (ch == ')' || ch == '}' || ch == ']') {
                  if (stack.isEmpty()) return false;
                  char last = stack.pop();
                  if ((ch == ')' && last != '(') || (ch == '}' && last != '{') || (ch == ']' && last != '[')) {
                      return false;
                  }
              }
          }
          return stack.isEmpty();
      }

      public static void main(String[] args) {
          String expression = "{[()]}";
          System.out.println("Is balanced: " + isBalanced(expression));
      }
  }
  ```

- **Evaluate a Postfix Expression**:
  ```java
  public class PostfixEvaluation {
      public static int evaluatePostfix(String expression) {
          Stack<Integer> stack = new Stack<>();
          for (char ch : expression.toCharArray()) {
              if (Character.isDigit(ch)) {
                  stack.push(ch - '0');
              } else {
                  int b = stack.pop();
                  int a = stack.pop();
                  switch (ch) {
                      case '+':
                          stack.push(a + b);
                          break;
                      case '-':
                          stack.push(a - b);
                          break;
                      case '*':
                          stack.push(a * b);
                          break;
                      case '/':
                          stack.push(a / b);
                          break;
                  }
              }
          }
          return stack.pop();
      }

      public static void main(String[] args) {
          String expression = "231*+9-";
          System.out.println("Postfix evaluation: " + evaluatePostfix(expression));
      }
  }
  ```

#### 4. **Advanced Topics**

- **Implementing a Min Stack**:
  ```java
  class MinStack {
      private Stack<Integer> stack = new Stack<>();
      private Stack<Integer> minStack = new Stack<>();

      public void push(int x) {
          stack.push(x);
          if (minStack.isEmpty() || x <= minStack.peek()) {
              minStack.push(x);
          }
      }

      public void pop() {
          if (stack.pop().equals(minStack.peek())) {
              minStack.pop();
          }
      }

      public int top() {
          return stack.peek();
      }

      public int getMin() {
          return minStack.peek();
      }
  }
  ```

- **Stack Using Queues**:
  ```java
  import java.util.LinkedList;
  import java.util.Queue;

  class StackUsingQueues {
      private Queue<Integer> queue1 = new LinkedList<>();
      private Queue<Integer> queue2 = new LinkedList<>();

      public void push(int x) {
          queue1.add(x);
      }

      public int pop() {
          while (queue1.size() > 1) {
              queue2.add(queue1.remove());
          }
          int poppedElement = queue1.remove();
          Queue<Integer> temp = queue1;
          queue1 = queue2;
          queue2 = temp;
          return poppedElement;
      }

      public int top() {
          while (queue1.size() > 1) {
              queue2.add(queue1.remove());
          }
          int topElement = queue1.peek();
          queue2.add(queue1.remove());
          Queue<Integer> temp = queue1;
          queue1 = queue2;
          queue2 = temp;
          return topElement;
      }

      public boolean isEmpty() {
          return queue1.isEmpty();
      }
  }
  ```

#### 5. **Tips for Interviews**

- **Understand the Basics**: Make sure you understand basic stack operations and their time complexities.
- **Practice Common Problems**: Focus on problems like balanced parentheses, postfix evaluation, and reverse strings.
- **Advanced Problems**: Be comfortable with implementing stacks using arrays or linked lists, and solving problems like Min Stack or Stack using Queues.
- **Explain Your Thought Process**: During the interview, clearly explain your approach and thought process.
- **Optimize Your Solutions**: Think about edge cases and how to optimize your stack implementations.

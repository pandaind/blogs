---
title: "Understanding the Momento Design Pattern"
date: 2024-08-08T13:00:27+05:30
draft: false
tags: [ "Design Patterns", "Behavioral GOF", "software design" ]
---
## Understanding the Problem
Imagine you're building a text editor. Users often make mistakes or want to revert changes. How can you allow them to undo their actions without exposing the internal state of the document?

## The Memento Solution
The Memento pattern provides a solution by capturing and storing the internal state of an object without violating encapsulation.

Key Players:

- Originator: The object whose state needs to be saved (e.g., the text editor).
- Memento: An object that stores a snapshot of the originator's state.
- Caretaker: An object that holds mementos and doesn't access their contents.

Example: Text Editor
Let's break down the pattern using a text editor example:

Originator (TextEditor):
- Maintains the current text content.
- Creates a Memento object to save its current state.
- Restores its state from a Memento.

Memento (TextEditorState):
- Stores the text content at a specific point in time.
- Provides access to the saved state.

Caretaker (UndoManager):
- Stores Memento objects.
- Doesn't modify Memento contents.

~~~java
class TextEditor {
    private String content;

    public TextEditorState createMemento() {
        return new TextEditorState(content);
    }

    public void restoreFromMemento(TextEditorState memento) {
        content = memento.getContent();
    }

    public void appendText(String text){
        this.content = this.content + text;
    }

    // ... other methods to modify content ...
}

class TextEditorState {
    private String content;

    public TextEditorState(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

class UndoManager {
    private Stack<TextEditorState> mementos = new Stack<>();

    public void addMemento(TextEditorState memento) {
        mementos.push(memento);
    }

    public TextEditorState popMemento() {
        return mementos.pop();
    }
}

class DocumentProcessor {
  private TextEditor textEditor;
  private UndoManager undoManager;

  public void save(String text){
      textEditor.appendText(text);
      undoManager.addMemento(textEditor.createMemento());
  }

  public void undo() {
        TextEditorState editorState = undoManager.popMemento();
        textEditor.restoreFromMemento(editorState);
  }
  
}
~~~

How it Works
 - The TextEditor creates a Memento to capture its current state.
 - The UndoManager stores the Memento.
 - When the user wants to undo, the UndoManager retrieves a Memento and passes it to the TextEditor.
 - The TextEditor restores its state from the Memento.

Key Points
 - The Memento protects the originator's internal state.
 - The caretaker manages Mementos without understanding their contents.
 - This pattern is useful for implementing undo/redo functionality and other state restoration scenarios.

Following the Memento pattern can effectively save and restore object states without exposing internal details.

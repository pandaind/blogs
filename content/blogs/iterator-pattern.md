---
title: "Understanding the Iterator Design Pattern"
date: 2024-08-08T14:00:27+05:30
draft: false
tags: [ "Design Patterns", "GOF", "software design" ]
---

The Iterator pattern provides a way to access the elements of a collection without exposing its internal structure. It promotes loose coupling between the collection and the code that uses it.

Key Components:

 - Iterator: Defines the interface for accessing and traversing elements in a collection.
 - Concrete Iterator: Implements the Iterator interface and keeps track of the current position in the traversal.
 - Aggregate: Defines an interface for creating an Iterator object.   
 - Concrete Aggregate: Implements the Aggregate interface and creates a Concrete Iterator.

## A Simple Example: Book Collection
Let's consider a collection of books. We want to iterate over these books without exposing how they are stored (array, linked list, etc.).

~~~Java
interface BookIterator {
    boolean hasNext();
    Book next();
}

class BookCollection {
    private Book[] books;
    private int index;

    public BookCollection(Book[] books) {
        this.books = books;
    }

    public BookIterator createIterator() {
        return new BookCollectionIterator(this);
    }

    private class BookCollectionIterator implements BookIterator {
        private BookCollection collection;
        private int index;

        public BookCollectionIterator(BookCollection collection) {
            this.collection = collection;
        }

        @Override
        public boolean hasNext() {
            return index < collection.books.length;
        }

        @Override
        public Book next() {
            if (!hasNext()) {
                throw new IllegalStateException("No more books");
            }
            return collection.books[index++];
        }
    }
}
~~~

How it Works
 - BookCollection is the aggregate. It holds an array of books and provides a method createIterator() to create an iterator.
 - BookIterator is the iterator interface, defining methods hasNext() and next().
 - BookCollectionIterator is the concrete iterator. It keeps track of the current index in the book array and implements the BookIterator interface.

## Using the Iterator

~~~java
public class Main {
    public static void main(String[] args) {
        Book[] books = {new Book("Book1"), new Book("Book2"), new Book("Book3")};
        BookCollection bookCollection = new BookCollection(books);

        BookIterator iterator = bookCollection.createIterator();
        while (iterator.hasNext()) {
            Book book = iterator.next();
            System.out.println(book.getTitle());
        }
    }
}
~~~

Key Points
  - The client code (Main class) doesn't need to know the internal structure of the BookCollection.
  - Multiple iterators can be created for the same collection, allowing different traversals.
  - The iterator encapsulates the traversal logic, making the code more maintainable and flexible.

Understanding and applying the Iterator pattern helps create more flexible and maintainable code, especially when dealing with collections.

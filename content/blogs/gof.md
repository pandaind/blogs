---
title: "A Comprehensive Guide to Gang of Four (GoF) Design Patterns"
date: 2023-08-28T12:52:21+05:30
draft: true
---

### Creational Patterns - ABFPS (Abraham Became the First President of States)

- Abstract Factory: Creates an instance of several families of classes
- Builder: Separates object construction from its representation
- Factory Method: Creates an instance of several derived classes
- Prototype: A fully initialized instance to be copied or cloned
- Singleton: A class in which only a single instance can exist

### Structural Patterns - ABCDFFP

- Adapter: Match interfaces of different classes
- Bridge: Separates an object’s abstraction from its implementation
- Composite: A tree structure of simple and composite objects
- Decorator: Add responsibilities to objects dynamically
- Façade: A single class that represents an entire subsystem
- Flyweight: A fine-grained instance used for efficient sharing
- Proxy: An object representing another object

### Behavioural Patterns - 2 MICS On TV (MMIICCSSOTV)

- Mediator: Defines simplified communication between classes
- Memento: Capture and restore an object's internal state
- Interpreter: A way to include language elements in a program
- Iterator: Sequentially access the elements of a collection
- Chain of Resp: A way of passing a request between a chain of objects
- Command: Encapsulate a command request as an object
- State: Alter an object's behaviour when its state changes
- Strategy: Encapsulates an algorithm inside a class
- Observer: A way of notifying change to several classes
- Template Method: Defer the exact steps of an algorithm to a subclass
- Visitor: Defines a new operation to a class without change

**Creational Patterns:**

1. **Singleton:** Ensures that a class has only one instance and provides a global point of access to that instance.

   ```plaintext
   +------------------+
   |    Singleton     |
   +------------------+
   | - instance: Singleton |
   +------------------+
   | + getInstance(): Singleton |
   +------------------+
   ```

   In this diagram:

   - **Singleton:** This is a class that embodies the Singleton Pattern. It contains a private static instance variable called `instance`, which holds the single instance of the class. The class also provides a public static method `getInstance()` that returns the instance. The constructor of the `Singleton` class is usually made private to prevent direct instantiation of the class.

   The Singleton Pattern ensures that there is only one instance of the `Singleton` class, and the `getInstance()` method provides a global point of access to that instance.

2. **Factory Method:** Defines an interface for creating objects but allows subclasses to alter the type of objects that will be created.

   ```plaintext
   +-----------------+       +----------------+
   |    Creator      |       |   Product      |
   +-----------------+       +----------------+
   | - factoryMethod()|<------|                |
   +-----------------+       +----------------+
                                      /\
                                      |
                           +-------------------+
                           |   ConcreteProduct |
                           +-------------------+
   ```

   In this diagram:

   - **Creator:** This is an abstract class or interface that declares the factory method, which returns an object of type `Product`. The factory method is responsible for creating objects.
   - **Product:** This is an abstract class or interface that represents the products created by the factory method.
   - **ConcreteProduct:** These are the concrete classes that implement the `Product` interface or extend the `Product` class. Each `ConcreteProduct` corresponds to a specific product that the factory method creates.

   The Factory Method Pattern allows different subclasses of `Creator` to implement the `factoryMethod()` and produce different types of `ConcreteProduct` objects. This provides a way to create objects while allowing for easy extension and customization of the creation process.

3. **Abstract Factory:** Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

   ```plaintext
   +-----------------+        +------------------+
   |  AbstractFactory|        |   AbstractProduct|
   +-----------------+        +------------------+
   | + createProductA()|<------|                  |
   | + createProductB()|<------|                  |
   +-----------------+        +------------------+
   
          /\                                          
          |                                           
   +------------------+          +-------------------+
   | ConcreteFactory1 |          |   ConcreteProductA|
   +------------------+          +-------------------+
   | + createProductA()|<--------|                   |
   | + createProductB()|<--------|                   |
   +------------------+          +-------------------+
   
   +------------------+          +-------------------+
   | ConcreteFactory2 |          |   ConcreteProductB|
   +------------------+          +-------------------+
   | + createProductA()|<--------|                   |
   | + createProductB()|<--------|                   |
   +------------------+          +-------------------+
   ```

   In this diagram:

   - **AbstractFactory:** This is an abstract class or interface that declares factory methods for creating instances of abstract products (`AbstractProductA` and `AbstractProductB`).
   - **AbstractProduct:** This is an abstract class or interface that declares the interface of the products that concrete factories create.

   Concrete factory classes (`ConcreteFactory1`, `ConcreteFactory2`, etc.) implement the `AbstractFactory` interface and provide concrete implementations for the factory methods. Each concrete factory is responsible for creating a family of related products.

   Concrete product classes (`ConcreteProductA`, `ConcreteProductB`, etc.) implement the `AbstractProduct` interface and define the specific product types.

   The Abstract Factory Pattern allows you to create families of related objects (products) without specifying their concrete classes. This promotes loose coupling between client code and the specific product classes being used.

4. **Builder:** Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

   ```plaintext
   +-------------------+        +----------------+
   |     Director      |        |    Builder     |
   +-------------------+        +----------------+
   | - builder: Builder|<------ |                |
   +-------------------+        +----------------+
   | + construct(): void|       | + buildPartA() |
                                | + buildPartB() |
                                | + getResult(): Product |
                                +----------------+
   
                                    /\
                                    |
                             +------------------+
                             |     Product      |
                             +------------------+
                             |                  |
                             +------------------+
   ```

   In this diagram:

   - **Director:** This class is responsible for constructing the product using the builder. It holds a reference to the `Builder` interface and uses its methods to build the parts of the product.
   - **Builder:** This is an interface that declares methods for building different parts of the product. Concrete builder classes implement this interface and provide specific implementations for building each part. The `getResult()` method returns the final product.
   - **Product:** This class represents the complex object that is being constructed. The `Director` uses the `Builder` to construct this product.

   The Builder Pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. The `Director` controls the construction process, and the `Builder` provides the methods to build the individual parts and retrieve the final product.

5. **Prototype:** Creates new objects by copying an existing object (prototype) and modifying it as needed.

   ```plaintext
   +-----------------+        +----------------+
   |   Prototype     |        |   ConcretePrototypeA|
   +-----------------+        +----------------+
   | + clone(): Prototype|<----|                |
   +-----------------+        +----------------+
   
   +-----------------+        +----------------+
   |   Client        |        |   ConcretePrototypeB|
   +-----------------+        +----------------+
   |                 |        |                |
   |                 |        |                |
   |                 |        +----------------+
   |                 |           
   |                 |           
   +-----------------+           
   ```

   In this diagram:

   - **Prototype:** This is an interface or abstract class that declares the `clone()` method. Concrete prototypes (e.g., `ConcretePrototypeA`, `ConcretePrototypeB`) implement this interface and provide their own implementations for cloning themselves.

   - **ConcretePrototypeA, ConcretePrototypeB:** These are concrete classes that implement the `Prototype` interface and provide specific implementations for the `clone()` method.

   - **Client:** This is the class that uses the prototype objects. It requests prototypes to be cloned when needed.

   The Prototype Pattern allows you to create new objects by copying existing objects, thus avoiding the need to create objects from scratch. The `clone()` method enables the creation of new instances that are identical to the original prototype.

**Structural Patterns:**

1. **Adapter:** Allows objects with incompatible interfaces to collaborate by providing a wrapper that translates one interface into another.

   ```plaintext
   +-----------------------+        +------------------+
   |        Target         |        |      Adaptee     |
   +-----------------------+        +------------------+
   | + request(): void     |        | + specificRequest(): void |
   +-----------------------+        +------------------+
   
                                         |
                                         |
                                 +----------------------+
                                 |       Adapter        |
                                 +----------------------+
                                 | - adaptee: Adaptee   |
                                 +----------------------+
                                 | + request(): void    |
                                 +----------------------+
   ```

   In this corrected diagram:

   - **Target:** This represents the target interface that the client code interacts with. It declares the methods that the client code expects to use. In this case, the `request()` method is declared.

   - **Adaptee:** This represents the class with existing functionality that the client code can't directly use due to incompatible interfaces. It has its own methods, such as `specificRequest()`.

   - **Adapter:** This class implements the `Target` interface and holds a reference to an instance of the `Adaptee`. It adapts the `Adaptee`'s interface to match the `Target`'s interface by implementing the required methods. In this case, the `request()` method in the `Adapter` class delegates the call to the `specificRequest()` method of the `Adaptee`.

2. **Bridge:** Separates an abstraction from its implementation, allowing both to evolve independently.

   ```plaintext
   +---------------------+          +------------------+
   |     Abstraction     |          |    Implementor   |
   +---------------------+          +------------------+
   | - implementor: Implementor  |      |                |
   +---------------------+          +------------------+
   | + operation(): void  | <------| + operationImpl(): void |
   +---------------------+          +------------------+
   
                                     /\
                                     |
                             +-------------------+
                             | ConcreteImplementorA |
                             +-------------------+
                             | + operationImpl() |
                             +-------------------+
   
                             +-------------------+
                             | ConcreteImplementorB |
                             +-------------------+
                             | + operationImpl() |
                             +-------------------+
   ```

   In this diagram:

   - **Abstraction:** This is the interface or abstract class that declares the `operation()` method and holds a reference to an object of type `Implementor`.
   - **Implementor:** This is the interface or abstract class that declares the `operationImpl()` method, which is used by the `Abstraction`.
   - **ConcreteImplementorA, ConcreteImplementorB:** These are the concrete classes that implement the `Implementor` interface. They provide specific implementations of the `operationImpl()` method.

   The Bridge Pattern decouples an abstraction from its implementation, allowing them to vary independently. The `Abstraction` contains a reference to the `Implementor`, and different implementations of `Implementor` can be used with the same `Abstraction`.

3. **Composite:** Composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

   ```plaintext
   +-------------------+       +----------------+
   |     Component     |       |    Leaf        |
   +-------------------+       +----------------+
   | + operation(): void|<----->|                |
   +-------------------+       +----------------+
   
          /\                    /\
          |                      |
   +-------------------+    +----------------+
   |    Composite     |    |   Composite    |
   +-------------------+    +----------------+
   | + operation(): void|    | + operation(): |
   | + add(c: Component)|    |   void         |
   | + remove(c: Component)| | + add(c: Component) |
   +-------------------+    | + remove(c: Component) |
                            +----------------+
   ```

   In this diagram:

   - **Component:** This is the base interface or abstract class that declares the `operation()` method. Both leaf nodes (`Leaf`) and composite nodes (`Composite`) inherit from this class.

   - **Leaf:** This represents the leaf nodes in the composite structure. Leaf nodes implement the `Component` interface and represent individual objects.

   - **Composite:** This represents the composite nodes in the structure. Composite nodes also implement the `Component` interface, but they can contain other components, which can be either leaf nodes or other composite nodes. Composite nodes have additional methods like `add()` and `remove()` to manage child components.

   The Composite Pattern allows you to treat individual objects and compositions of objects uniformly. Composite nodes can contain other components, forming a tree-like structure, while leaf nodes represent individual objects.

4. **Decorator:** Attaches additional responsibilities to objects dynamically, providing a flexible alternative to subclassing for extending functionality.

   ```plaintext
   +-------------------+        +-------------------+
   |    Component      |        |      ConcreteComponent |
   +-------------------+        +-------------------+
   | + operation(): void|        | + operation(): void  |
   +-------------------+        +-------------------+
   
           /\                                   /\
            |                                    |
   +-------------------+       +-------------------+
   |    Decorator      |       |      ConcreteDecoratorA|
   +-------------------+       +-------------------+
   | - component:       |       | - component:       |
   |   Component        |       |   Component        |
   +-------------------+       +-------------------+
   | + operation():     |       | + operation():     |
   |   void            |       |   void            |
   +-------------------+       +-------------------+
   ```

   In this diagram:

   - **Component:** This is the base interface or abstract class that declares the `operation()` method, which is the operation to be decorated.

   - **ConcreteComponent:** This represents the concrete implementation of the `Component` interface. It provides the base operation.

   - **Decorator:** This is the base class for decorators. It holds a reference to a `Component` object and has the same interface as `Component`.

   - **ConcreteDecoratorA:** This is a concrete decorator that adds additional responsibilities to the component. It extends the `Decorator` class, adding specific behavior before or after calling the wrapped component's operation.

   The Decorator Pattern allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. Decorators provide a flexible way to extend the functionality of objects in a layered and transparent manner.

5. **Facade:** Provides a simplified interface to a complex subsystem, making it easier to use and reducing dependencies.

   Certainly! Here's a UML class diagram for the Facade Pattern:

   ```plaintext
   +---------------------+       +----------------+
   |       Facade        |       |   SubsystemA   |
   +---------------------+       +----------------+
   |                     |       |                |
   | + operation(): void |<----->| + operationA(): |
   |                     |       |   void         |
   +---------------------+       +----------------+
   
                                    |
                                    |
                             +-------------------+
                             |    SubsystemB     |
                             +-------------------+
                             |                   |
                             | + operationB():   |
                             |   void            |
                             +-------------------+
   ```

   In this diagram:

   - **Facade:** This is the class that provides a simplified interface to a complex subsystem. It delegates client requests to appropriate objects within the subsystem.

   - **SubsystemA, SubsystemB:** These are the classes that make up the complex subsystem. They contain the actual implementation and functionality.

   The Facade Pattern provides a way to hide the complexities of a subsystem and provide a single, simplified interface to clients. Clients interact with the facade, which then coordinates the interactions with the subsystem components.

6. **Flyweight:** Shares common state among multiple objects to minimize memory usage when dealing with a large number of similar objects.

   ```plaintext
   +-----------------------+         +------------------+
   |       Flyweight       |         |   ConcreteFlyweight |
   +-----------------------+         +------------------+
   | + operation(extrinsic)| <------ |                  |
   +-----------------------+         +------------------+
                                      /\
                                      |
                             +-------------------+
                             |   FlyweightFactory |
                             +-------------------+
                             | + flyweights: Map  |
                             +-------------------+
                             | + getFlyweight(key):|
                             |   Flyweight         |
                             +-------------------+
   ```

   In this diagram:

   - **Flyweight:** This is the interface or abstract class for flyweight objects. It declares the `operation()` method, which takes the extrinsic state as a parameter.

   - **ConcreteFlyweight:** This class implements the `Flyweight` interface and provides the actual implementation of the shared flyweight objects. The intrinsic state is stored within each concrete flyweight object.

   - **FlyweightFactory:** This class manages a pool of flyweight objects. It ensures that only one instance of each unique flyweight is created and shared among clients.

   The Flyweight Pattern is used to minimize memory usage by sharing instances of objects that are the same or have similar content. It's especially useful when dealing with a large number of similar objects.

7. **Proxy:** Provides a surrogate or placeholder for another object to control access, add functionality, or delay instantiation.

   The Proxy Design Pattern involves creating a surrogate or placeholder for another object to control access to it. This can be useful for various purposes like controlling access, delaying object creation, or providing additional functionalities. The pattern consists of three main components:

   1. **Subject**: This is the interface that both the RealSubject and Proxy classes will implement. It defines the common methods that the RealSubject and Proxy will use.

   2. **RealSubject**: This is the real object that the Proxy represents. It implements the methods declared in the Subject interface.

   3. **Proxy**: The Proxy holds a reference to the RealSubject. It implements the same interface as the RealSubject and controls access to the RealSubject. The Proxy might perform additional tasks before or after forwarding the request to the RealSubject.

   Here's a textual representation of how the UML classes and their relationships would look:

   ```
             +--------------+
             |   Subject    |
             +--------------+
             | + request()  |
             +--------------+
                  ^       ^
                  |       |
                  |       |
   +--------------+   +--------------+
   | RealSubject |   |    Proxy     |
   +--------------+   +--------------+
   | + request() |   | + request()  |
   +--------------+   +--------------+
                          ^    ^
                          |    |
                          |    |
                 +--------------+
                 |   RealSubject |
                 +--------------+
                 | + request()  |
                 +--------------+
   ```

   In this diagram:

   - **Subject** is the interface that both **RealSubject** and **Proxy** implement. It defines the common methods like `request()` that both classes must provide.

   - **RealSubject** is the actual object that the Proxy represents. It provides the concrete implementation of the `request()` method.

   - **Proxy** holds a reference to the **RealSubject**. It also implements the `request()` method, and before or after calling the corresponding method on the **RealSubject**, it can perform additional tasks, like checking access rights, logging, etc.

**Behavioral Patterns:**

1. **Chain of Responsibility:** Allows a series of handlers to process a request, passing it along the chain until one of them handles it.

   The Chain of Responsibility design pattern is used to achieve loose coupling in software design, where a request from the client is passed through a chain of handlers to process the request. Each handler in the chain can either process the request or pass it along to the next handler in the chain.

   Here's how the UML classes and their relationships would look:

   ```
   +-------------------+          +-------------------+
   |   Handler         |<---------|   ConcreteHandler1|
   +-------------------+          +-------------------+
   | - successor       |          |                   |
   +-------------------+          +-------------------+
   | + handleRequest() |          | + handleRequest() |
   +-------------------+          +-------------------+
             ^                             ^
             |                             |
             |                             |
   +-------------------+          +-------------------+
   |   Client          |          |   ConcreteHandler2|
   +-------------------+          +-------------------+
   |                   |          |                   |
   +-------------------+          +-------------------+
   |                   |          | + handleRequest() |
   +-------------------+          +-------------------+
   ```

   In this diagram:

   - **Handler** is an abstract class or interface that defines a method `handleRequest()`. It also contains a reference to a **successor**, which is the next handler in the chain.

   - **ConcreteHandler1** and **ConcreteHandler2** are subclasses of **Handler**. They implement the `handleRequest()` method. If they are capable of handling the request, they process it; otherwise, they pass it to their successor.

   - **Client** is the class that initiates the request and starts the chain. It doesn't know which handler will process the request.

   Here's how the pattern works:

   1. The **Client** initiates a request and passes it to the first handler in the chain (usually the most general one).

   2. Each **ConcreteHandler** examines the request. If it can handle the request, it processes it. If not, it passes the request to its successor.

   3. The request continues to be passed along the chain until a handler is found that can process it, or until the end of the chain is reached.

   This pattern promotes flexibility and reusability, as the client and handlers are decoupled. New handlers can be added or removed without affecting the client's code.

2. **Command:** Encapsulates a request as an object, allowing parameterization of clients with different requests, queuing of requests, and logging of their execution.

   The Command Design Pattern is used to encapsulate a request as an object, thereby allowing for parameterization of clients with different requests, queuing of requests, and logging of the requests. It also provides the ability to undo/redo operations.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+       +----------------+       +----------------+
   |   Client       |       |    Command     |       |   Receiver     |
   +----------------+       +----------------+       +----------------+
   |                |       |                |       |                |
   +----------------+       +----------------+       +----------------+
   |                |       |+execute()      |       |                |
   +----------------+       +----------------+       +----------------+
            |                        ^                       |
            |                        |                       |
            |                        |                       |
            |                        |                       |
   +----------------+                |                       |
   |   Invoker      |                |                       |
   +----------------+                |                       |
   |                |                |                       |
   +----------------+                |                       |
   |+setCommand()   |----------------+                       |
   |+executeCommand()|                                    +----------------+
   +----------------+                                    | ConcreteReceiver|
                                                         +----------------+
                                                         |                |
                                                         +----------------+
   ```

   In this diagram:

   - **Client** creates a **Command** object and sets its receiver. It also creates an **Invoker** object and sets the command it will execute.

   - **Command** is an interface or abstract class that declares a `execute()` method. Concrete command classes implement this interface and encapsulate specific actions to be executed on the receiver.

   - **Receiver** knows how to perform the operations associated with the command. It's the actual object that carries out the action when the command's `execute()` method is called.

   - **Invoker** holds a reference to the command object and invokes its `execute()` method. It's responsible for triggering the execution of commands.

   Here's how the pattern works:

   1. The **Client** creates a **Command** object and associates it with a **Receiver**.

   2. The **Client** also creates an **Invoker** object and sets the **Command** it will execute.

   3. When the **Invoker** is triggered (usually by the **Client**), it calls the `execute()` method on the associated **Command**.

   4. The **Command** then calls the appropriate method on the **Receiver**, which performs the actual action.

   The Command Design Pattern allows for decoupling between senders (client) and receivers (receiver), and it enables parameterization of actions and supports undo/redo functionality.

3. **Interpreter:** Provides a way to evaluate language grammar or expressions by defining a representation for its grammar and an interpreter that interprets sentences in the grammar.

   The Interpreter Design Pattern is used to define a language for a specific problem domain and provides a way to evaluate sentences in that language.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Client      |        |   AbstractExpression  |        |   TerminalExpression   |
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +interpret()    |        |  -data: String  |
   +----------------+        +-----------------+        +-----------------+
            |                       ^                         |
            |                       |                         |
            |                       |                         |
            |                       |                         |
   +----------------+                |                         |
   |   Context      |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |+lookup(variable)|                |                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        | NonTerminalExpression |             |  NonTerminalExpression|
                        +-----------------+                   +-----------------+
                        | +interpret()    |                   | +interpret()    |
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
   ```

   In this diagram:

   - **Client** is responsible for constructing an abstract syntax tree (AST) of **AbstractExpression** objects and evaluating the expressions.

   - **AbstractExpression** is an abstract class or interface that declares an `interpret()` method. It's the base class for both **TerminalExpression** and **NonTerminalExpression**.

   - **TerminalExpression** represents the terminal symbols of the language and implements the `interpret()` method. These are usually the leaves of the AST.

   - **NonTerminalExpression** represents the non-terminal symbols of the language and implements the `interpret()` method by combining the interpretations of its subexpressions. These are the nodes of the AST.

   - **Context** contains information that the interpreter uses to evaluate the expressions. It maintains the state and provides values for variables.

   Here's how the pattern works:

   1. The **Client** creates an abstract syntax tree (AST) of **AbstractExpression** objects, representing the sentences to be evaluated.

   2. When **Client** wants to evaluate an expression, it calls the `interpret()` method on the root **AbstractExpression**.

   3. **AbstractExpression** subclasses (both **TerminalExpression** and **NonTerminalExpression**) recursively call the `interpret()` method on their subexpressions to evaluate the entire expression.

   The Interpreter Design Pattern is particularly useful for defining languages for specific domains, such as query languages or configuration languages. It allows for the separation of language parsing and interpretation logic, making it easier to extend or modify the language grammar and semantics.

4. **Iterator:** Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

   The Iterator Design Pattern provides a way to access the elements of a collection without exposing its underlying representation.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +------------------+        +-----------------+
   |   Client       |        |   Iterator       |        |   Aggregate     |
   +----------------+        +------------------+        +-----------------+
   |                |        |                  |        |                 |
   +----------------+        +------------------+        +-----------------+
   |                |        | +next()          |        | +createIterator()|
   +----------------+        +------------------+        +-----------------+
            |                       ^                         |
            |                       |                         |
            |                       |                         |
            |                       |                         |
   +----------------+                |                         |
   |   ConcreteClient|                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +------------------+                   +------------------+
                        | ConcreteIterator |                   |   AggregateConcrete |
                        +------------------+                   +------------------+
                        |                  |                   |                  |
                        +------------------+                   +------------------+
                        | +next()          |                   | +createIterator()|
                        +------------------+                   +------------------+
   ```

   In this diagram:

   - **Client** uses an **Iterator** to iterate through the elements of an **Aggregate** without needing to know about the specific implementation of the collection.

   - **Iterator** is an interface or abstract class that defines methods like `next()` to retrieve the next element, and possibly methods like `hasNext()` to check for the presence of more elements.

   - **Aggregate** is an interface or abstract class that declares the method `createIterator()`, which returns an **Iterator** object.

   - **ConcreteClient** creates an instance of **ConcreteIterator** and uses it to traverse the elements in the collection.

   - **ConcreteIterator** implements the **Iterator** interface and provides the actual iteration logic.

   - **AggregateConcrete** implements the **Aggregate** interface and provides the specific collection of elements. It also implements the `createIterator()` method to return a **ConcreteIterator**.

   Here's how the pattern works:

   1. The **Client** obtains an **Iterator** from the **Aggregate** using the `createIterator()` method.

   2. The **Client** uses the **Iterator** to traverse through the elements of the collection using methods like `next()` and `hasNext()`.

   3. The **ConcreteIterator** provides the actual iteration mechanism, abstracting away the details of traversing the collection.

   The Iterator Design Pattern is particularly useful when you want to iterate over a collection without exposing its internal structure. It allows for easy addition of new types of collections without affecting existing code that uses the iterator.

5. **Mediator:** Reduces direct connections between objects by centralizing communication through a mediator object.

   The Mediator Design Pattern is used to define an object that centralizes communication between multiple objects, reducing direct dependencies between them.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Client      |        |    Mediator     |        |    Colleague    |
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +mediate(col)   |        |                 |
   +----------------+        +-----------------+        +-----------------+
            |                       ^                         |
            |                       |                         |
            |                       |                         |
            |                       |                         |
   +----------------+                |                         |
   |   ConcreteClient|                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        |  ConcreteMediator|                   |  ConcreteColleague|
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
                        | +mediate(col)   |                   |+send(msg)       |
                        +-----------------+                   +-----------------+
                        |                 |                   |+receive(msg)    |
                        +-----------------+                   +-----------------+
   ```

   In this diagram:

   - **Client** interacts with objects through a **Mediator** instead of directly with other **Colleague** objects.

   - **Mediator** is an interface or abstract class that declares methods like `mediate(col)` to communicate and coordinate actions between **Colleague** objects.

   - **Colleague** is an interface or abstract class that declares methods like `send(msg)` and `receive(msg)` for communication through the **Mediator**.

   - **ConcreteClient** creates an instance of **ConcreteMediator** and interacts with other **Colleague** objects through it.

   - **ConcreteMediator** implements the **Mediator** interface and provides the communication logic between **Colleague** objects. It keeps references to the **Colleague** objects.

   - **ConcreteColleague** implements the **Colleague** interface. It uses the `send()` method to send messages and the `receive()` method to receive messages through the **Mediator**.

   Here's how the pattern works:

   1. The **Client** interacts with the **Mediator** to communicate with other **Colleague** objects without needing direct references to them.

   2. **Colleague** objects use the `send()` method to send messages to other colleagues through the **Mediator**.

   3. The **Mediator** receives messages from **Colleague** objects and decides how to handle and relay them to other relevant colleagues.

   The Mediator Design Pattern is useful when you want to reduce direct dependencies between objects and promote a more centralized and decoupled communication mechanism. It can simplify complex communication scenarios by encapsulating the interaction logic in a single mediator.

6. **Memento:** Allows an object's state to be captured and restored later, without exposing its internal structure.

   Certainly, here's a textual representation of the UML diagram for the Mediator Design Pattern:

   The Mediator Design Pattern is used to define an object that centralizes communication between multiple objects, reducing direct dependencies between them.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Client      |        |    Mediator     |        |    Colleague    |
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +mediate(col)   |        |                 |
   +----------------+        +-----------------+        +-----------------+
            |                       ^                         |
            |                       |                         |
            |                       |                         |
            |                       |                         |
   +----------------+                |                         |
   |   ConcreteClient|                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        |  ConcreteMediator|                   |  ConcreteColleague|
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
                        | +mediate(col)   |                   |+send(msg)       |
                        +-----------------+                   +-----------------+
                        |                 |                   |+receive(msg)    |
                        +-----------------+                   +-----------------+
   ```

   In this diagram:

   - **Client** interacts with objects through a **Mediator** instead of directly with other **Colleague** objects.

   - **Mediator** is an interface or abstract class that declares methods like `mediate(col)` to communicate and coordinate actions between **Colleague** objects.

   - **Colleague** is an interface or abstract class that declares methods like `send(msg)` and `receive(msg)` for communication through the **Mediator**.

   - **ConcreteClient** creates an instance of **ConcreteMediator** and interacts with other **Colleague** objects through it.

   - **ConcreteMediator** implements the **Mediator** interface and provides the communication logic between **Colleague** objects. It keeps references to the **Colleague** objects.

   - **ConcreteColleague** implements the **Colleague** interface. It uses the `send()` method to send messages and the `receive()` method to receive messages through the **Mediator**.

   Here's how the pattern works:

   1. The **Client** interacts with the **Mediator** to communicate with other **Colleague** objects without needing direct references to them.

   2. **Colleague** objects use the `send()` method to send messages to other colleagues through the **Mediator**.

   3. The **Mediator** receives messages from **Colleague** objects and decides how to handle and relay them to other relevant colleagues.

   The Mediator Design Pattern is useful when you want to reduce direct dependencies between objects and promote a more centralized and decoupled communication mechanism. It can simplify complex communication scenarios by encapsulating the interaction logic in a single mediator.

7. **Observer:** Defines a dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

   The Observer Design Pattern is used to define a one-to-many relationship between objects so that when one object changes its state, all its dependents are notified and updated automatically.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Subject     |        |    Observer     |        |   ConcreteSubject|
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +update()       |        | +getState()     |
   +----------------+        +-----------------+        | +setState()     |
            ^                       ^                         | +attach(obs)   |
            |                       |                         | +detach(obs)   |
            |                       |                         +-----------------+
            |                       |                         |
            |                       |                         |
   +----------------+                |                         |
   |   ConcreteSubject|                |                         |
   +----------------+                |                         |
   |                |                |                         |
   +----------------+                |                         |
   | +getState()     |                |                         |
   | +setState()     |                |                         |
   | +attach(obs)   |                |                         |
   | +detach(obs)   |                |                         |
   +----------------+                |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        | ConcreteObserver|                   |   ConcreteObserver|
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
                        | +update()       |                   | +update()       |
                        +-----------------+                   +-----------------+
   ```

   In this diagram:

   - **Subject** is an interface or abstract class that declares methods like `attach(obs)` to add an observer, `detach(obs)` to remove an observer, and `notify()` to notify all observers when a change occurs.

   - **Observer** is an interface or abstract class that declares a `update()` method that is called by the **Subject** when its state changes.

   - **ConcreteSubject** implements the **Subject** interface, maintains the state, and notifies registered **Observer** objects when its state changes.

   - **ConcreteObserver** implements the **Observer** interface. It registers itself with one or more **Subject** objects and receives updates when the subjects' state changes.

   Here's how the pattern works:

   1. **ConcreteObservers** register themselves with **ConcreteSubjects** using the `attach()` method.

   2. When the state of a **ConcreteSubject** changes, it calls the `notify()` method, which in turn calls the `update()` method on all registered **ConcreteObservers**.

   3. **ConcreteObservers** receive the update notification and can retrieve the new state of the **ConcreteSubject**.

   The Observer Design Pattern allows for loose coupling between subjects and observers. It enables dynamic relationships between objects, making it easy to add or remove observers without affecting the subjects or other observers.

8. **State:** Allows an object to change its behavior when its internal state changes, effectively creating a new class for each state.

   The State Design Pattern allows an object to change its behavior when its internal state changes. This pattern is particularly useful when an object's behavior is heavily dependent on its state.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Context     |        |      State      |        |   ConcreteState |
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +handle()       |        | +handle()       |
   | -state: State  |        +-----------------+        +-----------------+
   | +request()     |                ^                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        | ConcreteContext |                   | ConcreteStateA  |
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
                        |                 |                   | +handle()       |
                        |                 |                   +-----------------+
                        +-----------------+
   ```

   In this diagram:

   - **Context** maintains a reference to a **State** object that represents its current state. The **Context** is the object whose behavior changes based on its internal state.

   - **State** is an interface or abstract class that declares a `handle()` method. This method is called when the **Context** transitions from one state to another. It encapsulates the behavior associated with a specific state.

   - **ConcreteContext** implements the **Context** interface. It maintains the current state and delegates the `handle()` method to the current **State** object.

   - **ConcreteStateA** and **ConcreteStateB** are concrete implementations of the **State** interface. Each of these classes provides a different behavior for the **Context** when it's in a particular state.

   Here's how the pattern works:

   1. The **Context** maintains a reference to a **State** object and delegates its behavior to this object.

   2. When an event occurs that should trigger a state change, the **Context** updates its internal state by setting a new **State** object.

   3. The **Context** then delegates its operations to the **State** object, which performs the behavior associated with that state.

   The State Design Pattern is useful when you have an object with multiple behaviors depending on its state, and the behaviors need to be switched dynamically. It promotes a clear separation between different behaviors and makes it easier to add new states and behaviors without affecting existing code.

9. **Strategy:** Defines a family of interchangeable algorithms and makes them interchangeable, enabling clients to choose the appropriate algorithm at runtime.

   The Strategy Design Pattern defines a family of algorithms, encapsulates each one as a separate class, and makes them interchangeable. It allows clients to choose algorithms at runtime.

   Here's how the UML classes and their relationships would look:

   ```
   +----------------+        +-----------------+        +-----------------+
   |    Context     |        |    Strategy     |        |   ConcreteStrategy |
   +----------------+        +-----------------+        +-----------------+
   |                |        |                 |        |                 |
   +----------------+        +-----------------+        +-----------------+
   |                |        | +algorithm()    |        | +algorithm()    |
   | -strategy: Strategy |        +-----------------+        +-----------------+
   | +setStrategy() |                ^                         |
   | +execute()     |                |                         |
   +----------------+                |                         |
                                     |                         |
                                     |                         |
                        +-----------------+                   +-----------------+
                        |   ConcreteContext|                   |  ConcreteStrategyA|
                        +-----------------+                   +-----------------+
                        |                 |                   |                 |
                        +-----------------+                   +-----------------+
                        | +algorithm()    |                   | +algorithm()    |
                        +-----------------+                   +-----------------+
   ```

   In this diagram:

   - **Context** maintains a reference to a **Strategy** object and uses it to execute an algorithm. The **Context** is the object that delegates the algorithm's implementation.

   - **Strategy** is an interface or abstract class that declares the `algorithm()` method. This method represents the algorithm to be executed and is defined by concrete strategy classes.

   - **ConcreteContext** implements the **Context** interface. It maintains a reference to a **Strategy** object and uses it to execute the algorithm.

   - **ConcreteStrategyA** and **ConcreteStrategyB** are concrete implementations of the **Strategy** interface. They provide specific implementations of the algorithm.

   Here's how the pattern works:

   1. The **Context** maintains a reference to a **Strategy** object.

   2. The **Client** sets the **Strategy** object for the **Context** using the `setStrategy()` method.

   3. When the **Context** needs to execute an algorithm, it calls the `algorithm()` method on the currently set **Strategy** object.

   4. The actual algorithm executed depends on the specific **Strategy** object set in the **Context**.

   The Strategy Design Pattern promotes the separation of algorithms from the context that uses them. It allows for interchangeable algorithms and enables the client to switch strategies at runtime. This pattern is particularly useful when different algorithms are used in different situations or need to be easily extensible without modifying the existing code.

10. **Template Method:** Defines the structure of an algorithm in a superclass but allows subclasses to override specific steps of the algorithm without changing its structure.

    ```
    +-----------------+              +-----------------+
    |  AbstractClass  |<-------------| ConcreteClassA  |
    +-----------------+              +-----------------+
    |                 |              |                 |
    +-----------------+              +-----------------+
    | +templateMethod()|              | +primitiveOperation()|
    |                 |              +-----------------+
    | -operation1()   |
    | -operation2()   |
    +-----------------+
             ^
             |
    +-----------------+
    | ConcreteClassB  |
    +-----------------+
    |                 |
    +-----------------+
    | +primitiveOperation()|
    +-----------------+
    ```

    In this corrected representation:

    - **AbstractClass** is an abstract class that defines the structure of the algorithm using template methods. It contains abstract and/or concrete methods.

    - **ConcreteClassA** and **ConcreteClassB** are subclasses that inherit from **AbstractClass**.

    - **templateMethod()** is the main method of the algorithm defined in **AbstractClass**. It calls various operations (abstract or concrete) in a specific sequence.

    - **primitiveOperation()** is an abstract method declared in **AbstractClass** and intended to be overridden by subclasses. It represents a specific step in the algorithm.

    - **ConcreteClassA** provides a concrete implementation of `primitiveOperation()`.

    - **ConcreteClassB** provides a concrete implementation of `primitiveOperation()` different from that of **ConcreteClassA**.

    Here's how the pattern works:

    1. **AbstractClass** provides a template method (`templateMethod()`) that defines the overall structure of the algorithm and calls various operations.

    2. Some of the operations are left abstract (`primitiveOperation()`) in **AbstractClass**, to be overridden by subclasses.

    3. **ConcreteClassA** and **ConcreteClassB** inherit from **AbstractClass** and provide their own implementations of `primitiveOperation()`.

    4. When a client uses an instance of **ConcreteClassA** or **ConcreteClassB**, it invokes the template method `templateMethod()`, which follows the algorithm structure defined in **AbstractClass** and calls the overridden `primitiveOperation()` method specific to the subclass.

11. **Visitor:** Lets you add further operations to objects without having to modify them by separating the operations into a visitor class.

    The Visitor Design Pattern allows adding new operations to objects without having to modify the objects themselves. It achieves this by defining a separate visitor class that encapsulates the new behavior.

    Here's how the UML classes and their relationships would look:

    ```
    +-----------------+       +-------------------+       +-------------------+
    |    Visitor      |       |   ConcreteVisitor |       |     Element       |
    +-----------------+       +-------------------+       +-------------------+
    |                 |       |                   |       |                   |
    +-----------------+       +-------------------+       +-------------------+
    |                 |       | +visit(ElementA)  |       | +accept(Visitor) |
    +-----------------+       | +visit(ElementB)  |       +-------------------+
                             +-------------------+               /       \
                                    ^                     /         \
                                    |                   /           \
                   +-----------------+       +-----------------+       +-----------------+
                   | ConcreteElementA|       | ConcreteElementB|       |    ObjectStruct |
                   +-----------------+       +-----------------+       +-----------------+
                   | +accept(Visitor) |       | +accept(Visitor) |       | +elements: List |
                   +-----------------+       +-----------------+       +-----------------+
    ```

    In this diagram:

    - **Visitor** is an interface that declares `visit()` methods for each concrete element class. Each `visit()` method takes an instance of a concrete element class as a parameter.

    - **ConcreteVisitor** implements the **Visitor** interface and provides specific implementations for the `visit()` methods.

    - **Element** is an interface that declares the `accept()` method which takes a **Visitor** as a parameter. This method is used to invoke the visitor's `visit()` method on the element.

    - **ConcreteElementA** and **ConcreteElementB** implement the **Element** interface and provide their own implementations of the `accept()` method.

    - **ObjectStruct** holds a collection of elements (instances of **ConcreteElementA** and **ConcreteElementB**).

    Here's how the pattern works:

    1. **ConcreteVisitor** classes implement the `visit()` methods declared in the **Visitor** interface. Each method performs a specific operation on a concrete element.

    2. **ConcreteElementA** and **ConcreteElementB** implement the `accept()` method declared in the **Element** interface. This method calls the appropriate `visit()` method on the passed **Visitor** object.

    3. **ObjectStruct** contains a collection of elements. It provides a method to iterate through the elements and call the `accept()` method on each element, passing the appropriate **Visitor** object.

    4. When the `accept()` method is called, the corresponding `visit()` method of the **ConcreteVisitor** is invoked, executing the desired operation on the element.

    The Visitor Design Pattern is useful when you want to add new operations to existing classes without modifying those classes. It separates the operations from the classes they operate on, promoting better maintainability and extensibility.

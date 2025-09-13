---
title: "Spring Boot 3 with Thymeleaf: Error Handling"
date: 2024-06-10T10:41:40+05:30
draft: false
tags: [ "Spring Boot 3", "Thymeleaf" ]
---
In modern web applications, providing clear and user-friendly error messages is crucial for a good user experience. In this blog post, we'll explore how to customize error handling in a Spring Boot 3 application using Thymeleaf. We'll look at how to create custom error attributes, define a global error controller, and design a custom error page with Thymeleaf.

## Setting Up the Project

First, ensure your Spring Boot 3 project is set up with the necessary dependencies. We'll need `spring-boot-starter-thymeleaf` for the Thymeleaf integration and `spring-boot-starter-web` for creating the web application.

### Dependencies

Add the following dependencies to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## Customizing Error Attributes

Spring Boot allows you to customize the default error attributes by extending `DefaultErrorAttributes`. We can add additional information to our error responses as needed.

### Step 1: Create `CustomizedErrorAttributes`

Create a new class named `CustomizedErrorAttributes` that extends `DefaultErrorAttributes`:

```java
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class CustomizedErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);

        // Customize the error attributes
        errorAttributes.put("locale", webRequest.getLocale().toString());
        errorAttributes.put("customMessage", "This is a custom error message");

        Throwable error = getError(webRequest);
        if (error != null) {
            errorAttributes.put("exception", error.getClass().getName());
            errorAttributes.put("message", error.getMessage());
        }

        return errorAttributes;
    }
}
```

### Step 2: Create a Global Error Controller

Next, create an error controller to handle the error path. This controller will render a custom error page when an error occurs.

```java
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        String errorMessage = (String) request.getAttribute("javax.servlet.error.message");

        model.addAttribute("statusCode", statusCode);
        model.addAttribute("errorMessage", errorMessage);

        return "customError"; // return custom error view
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
```

### Step 3: Create a Custom Error View

Create a Thymeleaf template named `customError.html` in the `src/main/resources/templates` directory to display custom error messages.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Error</title>
</head>
<body>
    <h1>Error</h1>
    <p>Status Code: <span th:text="${statusCode}">Unknown</span></p>
    <p>Error Message: <span th:text="${errorMessage}">Unknown</span></p>
    <p>Custom Message: This is a custom error message</p>
</body>
</html>
```

### Step 4: Configure Application Properties

Configure the application properties to use the custom error path. Add the following to your `application.properties`:

```properties
server.error.path=/error
```

### Step 5: Run Your Application

Start your Spring Boot application. Now, when an error occurs, the custom error page will be displayed, showing the status code and error message along with the custom message.

Also spring provides several ways to handle exceptions, including the use of `@ExceptionHandler`, `@ControllerAdvice`, and `@ResponseStatus`. Here's how you can use these techniques to handle exceptions in your Spring Boot 3 application.

### Using `@ExceptionHandler`

The `@ExceptionHandler` annotation is used to handle exceptions at the controller level. You can define a method in your controller to handle specific exceptions.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(@RequestParam(value = "error", required = false) String error, Model model) {
        if (error != null) {
            throw new IllegalArgumentException("An error occurred");
        }
        model.addAttribute("message", "Welcome to Thymeleaf with Spring Boot!");
        return "home";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String handleIllegalArgumentException(IllegalArgumentException ex, Model model) {
        model.addAttribute("errorMessage", ex.getMessage());
        return "error";
    }
}
```

In this example, the `handleIllegalArgumentException` method handles `IllegalArgumentException` exceptions thrown by the `home` method. It adds an error message to the model and returns the `error.html` view.

### Using `@ControllerAdvice`

`@ControllerAdvice` is a more global approach to handling exceptions. It allows you to handle exceptions across multiple controllers.

```java
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(Exception ex, Model model) {
        model.addAttribute("errorMessage", ex.getMessage());
        return "error";
    }
}
```

In this example, the `handleException` method handles all exceptions thrown by any controller in the application. It adds an error message to the model and returns the `error.html` view.

### Using `@ResponseStatus`

You can use the `@ResponseStatus` annotation to map exceptions to specific HTTP status codes.

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
```

In this example, the `BadRequestException` is mapped to the HTTP status code 400 (Bad Request). When this exception is thrown, the client will receive a 400 status code.

### Example Thymeleaf Template for Error Page

Create an `error.html` template in the `src/main/resources/templates` directory:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Error</title>
</head>
<body>
    <h1>Error</h1>
    <p th:text="${errorMessage}">An error occurred</p>
</body>
</html>
```

### Putting It All Together

Here's how you can combine these approaches in a Spring Boot 3 application:

#### `pom.xml` Dependencies

Make sure you have the necessary dependencies in your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

#### `HomeController.java`

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(@RequestParam(value = "error", required = false) String error, Model model) {
        if (error != null) {
            throw new IllegalArgumentException("An error occurred");
        }
        model.addAttribute("message", "Welcome to Thymeleaf with Spring Boot!");
        return "home";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String handleIllegalArgumentException(IllegalArgumentException ex, Model model) {
        model.addAttribute("errorMessage", ex.getMessage());
        return "error";
    }
}
```

#### `GlobalExceptionHandler.java`

```java
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(Exception ex, Model model) {
        model.addAttribute("errorMessage", ex.getMessage());
        return "error";
    }
}
```

#### `BadRequestException.java`

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
```

#### `error.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Error</title>
</head>
<body>
    <h1>Error</h1>
    <p th:text="${errorMessage}">An error occurred</p>
</body>
</html>
```

With this setup, your Spring Boot 3 application will be able to handle exceptions effectively, providing meaningful error messages to users while maintaining a robust and secure application.
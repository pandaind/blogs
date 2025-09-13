---
title: "Spring Boot 3 Rest: Error Handling"
date: 2024-06-10T14:39:15+05:30
draft: false
tags: [ "Spring Boot 3" ]
---
Handling exceptions gracefully in a Spring Boot 3 REST application is crucial for providing clear and consistent error responses to the clients. In this section, we'll explore how to handle exceptions for REST controllers using `@ControllerAdvice` and `@ExceptionHandler` annotations, and customize error responses.

## Setting Up the Project

Ensure you have the necessary dependencies in your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## Step 1: Create a Custom Exception

Define a custom exception that can be thrown by your REST controllers:

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

## Step 2: Create a Global Exception Handler

Create a class annotated with `@ControllerAdvice` to handle exceptions globally:

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false));

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "Internal Server Error");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false));

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

## Step 3: Create a REST Controller

Create a REST controller that throws the custom exception:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyRestController {

    @GetMapping("/resource/{id}")
    public String getResource(@PathVariable String id) {
        if ("1".equals(id)) {
            return "Resource found";
        } else {
            throw new ResourceNotFoundException("Resource with id " + id + " not found");
        }
    }
}
```

## Step 4: Customize Error Attributes

To customize error attributes for exceptions globally, you can extend `DefaultErrorAttributes` as shown in the previous section. Here’s how you can integrate it into your REST application:

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

        // Customize the error attributes here
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

## Step 5: Run Your Application

Run your Spring Boot application. When you access a non-existent resource, for example `http://localhost:8080/api/resource/2`, the global exception handler will catch the `ResourceNotFoundException` and return a customized error response.

# Using zalando problems

## Step 1: Add Dependencies

To start, add the necessary dependencies to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.zalando</groupId>
    <artifactId>problem-spring-web</artifactId>
    <version>0.27.0</version>
</dependency>
```

## Step 2: Configure Problem Details

You can configure Problem Details globally for your application by creating a `ProblemConfig` class. This class can also be used to customize the Problem Details as needed.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zalando.problem.ProblemModule;
import org.zalando.problem.violations.ConstraintViolationProblemModule;

@Configuration
public class ProblemConfig {

    @Bean
    public ProblemModule problemModule() {
        return new ProblemModule();
    }

    @Bean
    public ConstraintViolationProblemModule constraintViolationProblemModule() {
        return new ConstraintViolationProblemModule();
    }
}
```

## Step 3: Create a Custom Exception

Create a custom exception that you want to handle using Problem Details:

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

## Step 4: Create a Global Exception Handler

Use `@ControllerAdvice` to create a global exception handler that converts exceptions to Problem Details:

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.zalando.problem.Problem;
import org.zalando.problem.Status;
import org.zalando.problem.spring.web.advice.ProblemHandling;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler implements ProblemHandling {

    @ExceptionHandler(ResourceNotFoundException.class)
    public Problem handleResourceNotFoundException(ResourceNotFoundException ex, NativeWebRequest request) {
        return Problem.builder()
                .withType(URI.create("https://example.com/not-found"))
                .withTitle("Resource not found")
                .withStatus(Status.NOT_FOUND)
                .withDetail(ex.getMessage())
                .build();
    }

    @ExceptionHandler(Exception.class)
    public Problem handleGlobalException(Exception ex, NativeWebRequest request) {
        return Problem.builder()
                .withType(URI.create("https://example.com/internal-server-error"))
                .withTitle("Internal Server Error")
                .withStatus(Status.INTERNAL_SERVER_ERROR)
                .withDetail(ex.getMessage())
                .build();
    }
}
```

## Step 5: Create a REST Controller

Create a REST controller that uses the custom exception:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyRestController {

    @GetMapping("/resource/{id}")
    public String getResource(@PathVariable String id) {
        if ("1".equals(id)) {
            return "Resource found";
        } else {
            throw new ResourceNotFoundException("Resource with id " + id + " not found");
        }
    }
}
```

## Step 6: Run Your Application

Run your Spring Boot application. When you access a non-existent resource, for example, `http://localhost:8080/api/resource/2`, the global exception handler will catch the `ResourceNotFoundException` and return a Problem Details response:

```json
{
    "type": "https://example.com/not-found",
    "title": "Resource not found",
    "status": 404,
    "detail": "Resource with id 2 not found"
}
```

# Spring mvc Problem Details

The `ProblemDetailsExceptionHandler` is a mechanism provided by Spring Boot 3 to handle exceptions and convert them to RFC 7807 Problem Details responses. This allows you to provide more structured and standardized error responses to clients.

Here's how you can use `ProblemDetailsExceptionHandler` in a Spring Boot 3 application:

## Step 1: Enable Problem Details

Enable Problem Details in your `application.properties` file:

```properties
spring.mvc.problemdetails.enabled=true
spring.webflux.problemdetails.enabled=true
```

These properties enable Problem Details for both Spring MVC and Spring WebFlux.

## Step 2: Create a Custom Exception

Define a custom exception that you want to handle using Problem Details:

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

## Step 3: Use `ProblemDetailsExceptionHandler`

Create a `ProblemDetailsExceptionHandler` to handle exceptions and convert them to Problem Details responses:

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.http.ProblemDetail;

import java.net.URI;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("Resource not found");
        problemDetail.setType(URI.create("https://example.com/not-found"));
        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGlobalException(Exception ex, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setType(URI.create("https://example.com/internal-server-error"));
        return problemDetail;
    }
}
```

In this example, the `handleResourceNotFoundException` method handles `ResourceNotFoundException` and converts it to a `ProblemDetail` response. The `handleGlobalException` method catches any other exceptions and converts them to `ProblemDetail` responses as well.

## Step 4: Create a REST Controller

Create a REST controller that uses the custom exception:

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyRestController {

    @GetMapping("/resource/{id}")
    public String getResource(@PathVariable String id) {
        if ("1".equals(id)) {
            return "Resource found";
        } else {
            throw new ResourceNotFoundException("Resource with id " + id + " not found");
        }
    }
}
```

## Step 6: Run Your Application

Run your Spring Boot application. When you access a non-existent resource, for example, `http://localhost:8080/api/resource/2`, the global exception handler will catch the `ResourceNotFoundException` and return a Problem Details response:

```json
{
    "type": "https://example.com/not-found",
    "title": "Resource not found",
    "status": 404,
    "detail": "Resource with id 2 not found"
}
```


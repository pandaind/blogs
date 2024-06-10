---
title: "Springrest Async"
date: 2024-06-10T21:06:51+05:30
draft: false
---
Configuring asynchronous processing in a Spring Boot REST application allows you to handle requests without blocking the main thread, improving performance and responsiveness. Here's a step-by-step guide to enable and configure asynchronous processing in your Spring Boot REST application:

### 1. Enable Async Support

First, enable asynchronous processing by adding the `@EnableAsync` annotation to your Spring Boot application class or any other configuration class.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AsyncApplication {
    public static void main(String[] args) {
        SpringApplication.run(AsyncApplication.class, args);
    }
}
```

### 2. Configure an Async Executor

Define a `ThreadPoolTaskExecutor` bean to handle async tasks. This executor can be configured to manage the number of threads, queue capacity, and other parameters.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}
```

### 3. Use @Async Annotation

Use the `@Async` annotation on methods that you want to execute asynchronously. The method should return a `Future`, `CompletableFuture`, or `ListenableFuture`.

```java
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Service
public class AsyncService {

    @Async("taskExecutor")
    public CompletableFuture<String> asyncMethod() {
        // Simulate a long-running task
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return CompletableFuture.completedFuture("Async Result");
    }

    @Async("taskExecutor")
    public Future<String> asyncMethodWithFuture() {
        // Simulate a long-running task
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return new AsyncResult<>("Async Result with Future");
    }
}
```

### 4. Call Async Methods

Call the async methods from your controller or service. Use the `CompletableFuture` or `Future` to get the result when needed.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@RestController
public class AsyncController {

    @Autowired
    private AsyncService asyncService;

    @GetMapping("/async")
    public String asyncEndpoint() throws ExecutionException, InterruptedException {
        CompletableFuture<String> future = asyncService.asyncMethod();
        // Do some other processing if needed
        return future.get(); // Blocking call, waits for the async method to complete
    }

    @GetMapping("/asyncWithFuture")
    public String asyncWithFutureEndpoint() throws ExecutionException, InterruptedException {
        Future<String> future = asyncService.asyncMethodWithFuture();
        // Do some other processing if needed
        return future.get(); // Blocking call, waits for the async method to complete
    }
}
```

### 5. Exception Handling in Async Methods

Handle exceptions in async methods by using `@Async` with exception handling capabilities.

```java
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;

import java.util.concurrent.Executor;

@Configuration
public class AsyncExceptionConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        return new ThreadPoolTaskExecutor();
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (throwable, method, objects) -> {
            // Handle exceptions thrown by async methods
            System.out.println("Exception message: " + throwable.getMessage());
            System.out.println("Method name: " + method.getName());
            for (Object param : objects) {
                System.out.println("Parameter value: " + param);
            }
        };
    }
}
```

By following these steps, you can configure asynchronous processing in your Spring Boot REST application, improving its performance and responsiveness.

### 6. Write Test Class for AsyncController

Create a test class for `AsyncController`. In this class, use `MockMvc` to perform requests and validate responses. Additionally, you can use `CompletableFuture` and `Awaitility` to wait for the asynchronous processing to complete.

```java
import org.awaitility.Awaitility;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.concurrent.TimeUnit;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AsyncController.class)
public class AsyncControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AsyncService asyncService;

    @BeforeEach
    public void setUp() {
        // Setup your mock behavior here
        given(asyncService.asyncMethod()).willReturn(CompletableFuture.completedFuture("Async Result"));
        given(asyncService.asyncMethodWithFuture()).willReturn(new AsyncResult<>("Async Result with Future"));
    }

    @Test
    public void testAsyncEndpoint() throws Exception {
        mockMvc.perform(get("/async"))
                .andExpect(status().isOk())
                .andExpect(content().string("Async Result"));

        verify(asyncService).asyncMethod();
    }

    @Test
    public void testAsyncWithFutureEndpoint() throws Exception {
        mockMvc.perform(get("/asyncWithFuture"))
                .andExpect(status().isOk())
                .andExpect(content().string("Async Result with Future"));

        verify(asyncService).asyncMethodWithFuture();
    }

    @Test
    public void testAsyncMethodDelay() throws Exception {
        // Simulate a delay in async method
        given(asyncService.asyncMethod()).willReturn(CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "Delayed Async Result";
        }));

        mockMvc.perform(get("/async"))
                .andExpect(status().isOk())
                .andExpect(content().string("Delayed Async Result"));

        // Use Awaitility to wait for async processing to complete
        Awaitility.await().atMost(5, TimeUnit.SECONDS).until(() -> {
            verify(asyncService).asyncMethod();
            return true;
        });
    }
}
```

### 3. Add Awaitility Dependency

Add the Awaitility dependency to handle waiting for async operations.

For Maven:

```xml
<dependency>
    <groupId>org.awaitility</groupId>
    <artifactId>awaitility</artifactId>
    <version>4.0.3</version>
    <scope>test</scope>
</dependency>
```

### Explanation

- `@WebMvcTest(AsyncController.class)`: This annotation is used to test the web layer. It disables full auto-configuration and instead applies only configuration relevant to MVC tests.
- `@MockBean`: This annotation is used to add mocks to the Spring ApplicationContext. Here, it mocks the `AsyncService` bean.
- `setUp()`: This method sets up the mock behavior before each test.
- `testAsyncEndpoint()` and `testAsyncWithFutureEndpoint()`: These tests perform GET requests to the async endpoints and verify the responses.
- `testAsyncMethodDelay()`: This test simulates a delay in the async method and uses `Awaitility` to wait for the async processing to complete.

By following these steps, you can write tests for your async controllers in a Spring Boot application. This ensures that the asynchronous processing is correctly handled and verified in your application.
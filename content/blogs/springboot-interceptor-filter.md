---
title: "How to Create and Order Custom Interceptors and Filters in Spring Boot"
date: 2024-09-13T23:27:01+05:30
draft: false
tags: [ "Spring Boot 3" ]
---
In a Spring Boot application, managing HTTP requests and responses is critical for implementing cross-cutting concerns such as logging, security, and authentication. **Interceptors** and **Filters** provide two key mechanisms for this purpose. Additionally, you might need to specify the order in which these interceptors and filters are executed to ensure the correct flow of operations.

In this post, we'll walk through how to create both a **custom Interceptor** and a **custom Filter** in Spring Boot, and how to define the order in which they should be executed.

### What is an Interceptor?

An **Interceptor** operates at the Spring MVC level, allowing you to:

- Pre-process requests before they are handled by a controller.
- Post-process responses after the controller has processed them.
- Execute code after the request has been completed.

### What is a Filter?

A **Filter** operates at a lower level, within the servlet layer, and allows for global manipulation of requests and responses. Filters can be used to:

- Modify incoming requests before they reach a servlet.
- Modify outgoing responses after they leave a servlet.

### Creating a Custom Interceptor in Spring Boot

Let’s start by creating a simple **Interceptor** that logs messages during the request lifecycle.

#### 1. Implementing the Interceptor

To create an interceptor, implement the `HandlerInterceptor` interface. This interface has three important methods:

- `preHandle`: Executed before the request is handled by the controller.
- `postHandle`: Executed after the controller has processed the request but before the view is rendered.
- `afterCompletion`: Executed after the complete request cycle is done.

```java
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CustomInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Pre Handle method is Calling");
        return true; // Continue request processing
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, 
                           org.springframework.web.servlet.ModelAndView modelAndView) throws Exception {
        System.out.println("Post Handle method is Calling");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) 
                                throws Exception {
        System.out.println("Request and Response is completed");
    }
}
```

#### 2. Registering the Interceptor

To activate your interceptor, you need to register it by overriding the `addInterceptors` method in a configuration class.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private CustomInterceptor customInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor).addPathPatterns("/**");  // Intercepts all paths
    }
}
```

### Creating a Custom Filter in Spring Boot

Now, let's create a **Filter**. Filters operate at the servlet level and are used for tasks like logging, session validation, or security enforcement.

#### 1. Implementing the Filter

To create a custom filter, implement the `Filter` interface. The `doFilter` method is where you define what the filter does.

```java
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")  // Applies the filter to all URL patterns
public class CustomFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("Request is being filtered");
        chain.doFilter(request, response);  // Continue the filter chain
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}
```

#### 2. Registering the Filter

To register the filter, you can either use `@WebFilter` (as shown above) or `FilterRegistrationBean` in a configuration class.

```java
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<CustomFilter> loggingFilter() {
        FilterRegistrationBean<CustomFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CustomFilter());
        registrationBean.addUrlPatterns("/api/*");  // Apply to specific URL patterns
        return registrationBean;
    }
}
```

### How to Control the Execution Order of Filters and Interceptors

When you have multiple interceptors or filters, you may need to specify the order in which they are executed. Here's how you can achieve that:

### Ordering Filters

You can set the order of filters using the `@Order` annotation or `FilterRegistrationBean#setOrder()`.

#### Using `@Order`:

```java
import org.springframework.core.annotation.Order;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

@Order(1)  // This filter will be executed first
@WebFilter(urlPatterns = "/*")
public class FirstFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("First filter before");
        chain.doFilter(request, response);
        System.out.println("First filter after");
    }
}
```

#### Using `FilterRegistrationBean`:

```java
@Bean
public FilterRegistrationBean<FirstFilter> firstFilter() {
    FilterRegistrationBean<FirstFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new FirstFilter());
    registrationBean.addUrlPatterns("/*");
    registrationBean.setOrder(1);  // Order of execution
    return registrationBean;
}
```

### Ordering Interceptors

Interceptors are executed in the order they are registered in the `InterceptorRegistry`.

#### Example of Two Interceptors:

```java
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class FirstInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("First Interceptor before");
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) 
            throws Exception {
        System.out.println("First Interceptor after");
    }
}

@Component
public class SecondInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Second Interceptor before");
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) 
            throws Exception {
        System.out.println("Second Interceptor after");
    }
}
```

#### Registering Interceptors in Order:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private FirstInterceptor firstInterceptor;

    @Autowired
    private SecondInterceptor secondInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(firstInterceptor).addPathPatterns("/**");  // This runs first
        registry.addInterceptor(secondInterceptor).addPathPatterns("/**");  // This runs second
    }
}
```

### Conclusion

- **Filters** and **Interceptors** in Spring Boot help you intercept and modify requests and responses at different levels.
- You can easily control their execution order using the `@Order` annotation, `FilterRegistrationBean#setOrder()` for filters, and registration order for interceptors.
- Interceptors are ideal for pre-processing and post-processing controller requests, while filters are used for more general request/response manipulation.
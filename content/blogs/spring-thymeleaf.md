---
title: "Using Thymeleaf with Spring Boot"
date: 2024-06-09T23:12:56+05:30
draft: false
---
Thymeleaf is a modern server-side Java template engine for web and standalone environments. It is particularly well-suited for Spring Boot applications, offering a natural way to create dynamic web pages. In this blog post, we'll explore how to integrate Thymeleaf with Spring Boot, create dynamic templates, and use Thymeleaf's powerful features to build a simple web application.

## Setting Up Thymeleaf with Spring Boot

### Step 1: Create a Spring Boot Project

Start by creating a new Spring Boot project using Spring Initializr or your preferred method. Make sure to include the Spring Web and Thymeleaf dependencies.

### Step 2: Add Thymeleaf Dependency

If you are using Maven, add the following dependency to your `pom.xml`:

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

For Gradle, add the following to your `build.gradle`:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
implementation 'org.springframework.boot:spring-boot-starter-security'
```

### Step 3: Configure Security

Create a security configuration class to define security rules. For example:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/home").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }
}
```

### Step 4: Create Thymeleaf Templates

Create Thymeleaf templates for your application, including a login form. For example:

`src/main/resources/templates/login.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form th:action="@{/login}" method="post">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

### Step 5: Create a Controller

Create a controller to handle HTTP requests and return Thymeleaf templates. For example, create a `HomeController`:

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Thymeleaf with Spring Boot!");
        return "index";
    }
}
```

### Step 6: Create Thymeleaf Templates

Create Thymeleaf templates in the `src/main/resources/templates` directory. Create an `index.html` file with the following content:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Thymeleaf with Spring Boot</title>
</head>
<body>
    <h1 th:text="${message}">Welcome to Thymeleaf!</h1>
</body>
</html>
```

### Step 7: Run Your Application

Run your Spring Boot application. Navigate to `http://localhost:8080` in your browser, and you should see the message "Welcome to Thymeleaf with Spring Boot!".

## Advanced Thymeleaf Features

Thymeleaf offers a wide range of features to create dynamic and interactive web pages. Let's explore some of these features with examples.

### Using Thymeleaf Expressions

Thymeleaf provides powerful expression syntax for accessing variables, performing operations, and more. Here are some common expressions:

- **Variable Expressions**: `${variable}` to access variables.
- **Text Operations**: `|Text with ${variable}|` for concatenation.
- **Conditional Statements**: `th:if` and `th:unless` for conditionals.

Example `index.html` with expressions:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Thymeleaf with Spring Boot</title>
</head>
<body>
    <h1 th:text="${message}">Welcome to Thymeleaf!</h1>
    
    <!-- Conditional Rendering -->
    <div th:if="${message != null}">
        <p>Message is available: <span th:text="${message}"></span></p>
    </div>
    <div th:unless="${message != null}">
        <p>No message available.</p>
    </div>

    <!-- List Rendering -->
    <ul>
        <li th:each="item : ${items}" th:text="${item}">Item</li>
    </ul>
</body>
</html>
```

### Form Handling

Thymeleaf integrates seamlessly with Spring MVC to handle forms. Here's an example of a simple form:

1. **Create a DTO**: Create a simple DTO to hold form data.

   ```java
   public class User {
       private String name;
       private String email;

       // Getters and Setters
   }
   ```

2. **Create a Form Controller**: Handle form submission in a controller.

   ```java
   import org.springframework.stereotype.Controller;
   import org.springframework.ui.Model;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.ModelAttribute;
   import org.springframework.web.bind.annotation.PostMapping;

   @Controller
   public class FormController {

       @GetMapping("/form")
       public String form(Model model) {
           model.addAttribute("user", new User());
           return "form";
       }

       @PostMapping("/form")
       public String submitForm(@ModelAttribute User user, Model model) {
           model.addAttribute("user", user);
           return "result";
       }
   }
   ```

3. **Create Thymeleaf Templates**: Create `form.html` and `result.html`.

   `form.html`:
   ```html
   <!DOCTYPE html>
   <html xmlns:th="http://www.thymeleaf.org">
   <head>
       <title>Form Handling</title>
   </head>
   <body>
       <form th:action="@{/form}" th:object="${user}" method="post">
           <div>
               <label for="name">Name:</label>
               <input type="text" id="name" th:field="*{name}" />
           </div>
           <div>
               <label for="email">Email:</label>
               <input type="email" id="email" th:field="*{email}" />
           </div>
           <button type="submit">Submit</button>
       </form>
   </body>
   </html>
   ```

   `result.html`:
   ```html
   <!DOCTYPE html>
   <html xmlns:th="http://www.thymeleaf.org">
   <head>
       <title>Form Result</title>
   </head>
   <body>
       <h1>Form Submission Result</h1>
       <p>Name: <span th:text="${user.name}"></span></p>
       <p>Email: <span th:text="${user.email}"></span></p>
   </body>
   </html>
   ```

### Including Fragments

Thymeleaf allows you to include fragments of templates to reuse code. Create a fragment in a separate file, such as `fragments.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Fragments</title>
</head>
<body>
    <div th:fragment="header">
        <h1>Thymeleaf Header</h1>
    </div>
</body>
</html>
```

Include the fragment in another template:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Main Template</title>
</head>
<body>
    <div th:insert="fragments :: header"></div>
    <p>Main content here</p>
</body>
</html>
```

## Conclusion

Thymeleaf is a powerful and flexible template engine that integrates seamlessly with Spring Boot. By following this guide, you can set up Thymeleaf in your Spring Boot application, create dynamic templates, handle forms, and use advanced features like expressions and fragments. This enhances your ability to build rich, interactive web applications with ease.
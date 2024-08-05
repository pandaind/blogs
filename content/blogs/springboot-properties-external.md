---
title: "External Configuration Management in Spring Boot"
date: 2024-05-13T20:28:51+05:30
draft: false
tags: [ "Spring Boot 3" ]
---
## Why Externalize Configuration?

Externalizing configuration in Spring Boot means separating configuration parameters from the code. This separation allows the same application code to be used in different environments by simply changing the configuration rather than the code, reducing the risk of bugs and simplifying the deployment process.

## 1. Using `application.properties` or `application.yml`

Spring Boot's default approach for configuration is through the `application.properties` or `application.yml` files located under `src/main/resources`. These files are automatically loaded by Spring Boot and can be used to define properties accessible throughout the application.

**Example:**

`application.yml`:
```yaml
app:
  message: Welcome to Spring Boot Configuration!
```

Accessing the property in a Spring component:
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WelcomeComponent {
    @Value("${app.message}")
    private String message;

    public String getMessage() {
        return message;
    }
}
```

## 2. Profile-specific Properties

Spring Boot facilitates environment-specific configurations through profile-based properties files. These are named following the pattern `application-{profile}.properties` or `application-{profile}.yml`.

For example:
- `application-dev.yml` for development
- `application-prod.yml` for production

Activating a profile:
```bash
java -jar myapp.jar --spring.profiles.active=prod
```

## 3. Command Line Properties

Properties can be overridden at runtime using command-line arguments:
```bash
java -jar myapp.jar --app.message="Message from Command Line"
```

Three important properties facilitate this: `spring.config.name`, `spring.config.location`, and `spring.config.additional-location`. Here's a deeper look into each of these properties and how you can use them to customize your application's configuration setup.

### `spring.config.name`
This property allows you to change the base name of the configuration file that Spring Boot loads. By default, Spring Boot looks for a file named `application` (i.e., `application.properties` or `application.yml`). By setting the `spring.config.name` property, you can specify a different base name for your configuration files.

**Example Usage:**
```bash
java -jar myapp.jar --spring.config.name=myconfig
```
This command tells Spring Boot to look for `myconfig.properties` or `myconfig.yml` instead of the default `application.properties` or `application.yml`.

### `spring.config.location`
This property specifies the locations of configuration directories or files directly. It can be very useful if your configuration files are not in the standard locations that Spring Boot scans by default (like `classpath:/`, `classpath:/config/`, `file:./`, `file:./config/`). The `spring.config.location` property supports directory locations or file paths, which can be prefixed with `classpath:` or `file:` to indicate the protocol.

**Example Usage:**
```bash
java -jar myapp.jar --spring.config.location=file:/etc/myapp/
```
This will direct Spring Boot to load configuration files from `/etc/myapp/` directory. It's important to note that specifying this property replaces the default locations.

### `spring.config.additional-location`
Unlike `spring.config.location`, which replaces the default locations, `spring.config.additional-location` allows you to add additional locations that Spring Boot will scan for configuration files. These additional locations are searched before the standard ones, so properties defined in these files can override those in the default locations.

**Example Usage:**
```bash
java -jar myapp.jar --spring.config.additional-location=file:/etc/myapp/override.properties
```
This will add `/etc/myapp/override.properties` as an additional location. Properties defined here can override those in `application.properties` or `application.yml` found in the default locations.

### Combining the Properties
You can combine these properties to fine-tune your configuration management. For instance, if you want to use a different base name and also add specific override files, you could launch your application with:
```bash
java -jar myapp.jar --spring.config.name=myapp --spring.config.additional-location=file:/etc/myapp/override.yml
```
This setup ensures your application loads configuration from `myapp.properties` or `myapp.yml` and also considers overrides from `override.yml`.

## 4. Environment Variables

Spring Boot also supports configuration through environment variables, which is particularly useful in cloud environments and CI/CD pipelines:
```bash
export APP_MESSAGE="Hello from Environment Variable"
java -jar myapp.jar
```

## 5. Using `@ConfigurationProperties`

This is a type-safe approach to handle configuration values. By defining a class annotated with `@ConfigurationProperties`, you can easily bind and validate configuration properties.

**Example:**
```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="app")
public class AppConfigProperties {
    private String message;

    // getters and setters
}
```

## 6. Loading Properties from Different Configuration Files

Sometimes, it's necessary to load additional properties files or use files that do not follow the default naming conventions. You can use `spring.config.additional-location` to specify additional configuration files:

```bash
java -jar myapp.jar --spring.config.additional-location=file:///path/to/override.properties
```

Alternatively, use the `@PropertySource` annotation for more specific control:
```java
@Configuration
@PropertySource("classpath:custom-config.properties")
public class CustomConfig {
    // Configuration handling
}
```

## 7. Custom `EnvironmentPostProcessor`

For the most flexible configuration management, you can implement a custom `EnvironmentPostProcessor` to programmatically modify the environment before the application starts:

```java
public class MyEnvironmentPostProcessor implements EnvironmentPostProcessor {
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // custom logic to modify environment
    }
}
```

Register this processor in `META-INF/spring.factories` to ensure it's picked up by Spring Boot.

## Conclusion

Spring Boot's comprehensive support for externalized configuration offers powerful options for managing application settings across different environments, enhancing modularity, and ensuring easier maintenance. By mastering these techniques, developers can ensure their applications are both flexible and robust, ready to meet the challenges of modern software environments.
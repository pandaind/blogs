---
title: "Configuring Log Levels for Specific Loggers in a Spring Boot 3 Application"
date: 2024-06-08T23:00:27+05:30
draft: false
---
Logging is an essential aspect of any application, providing critical insights and aiding in debugging and monitoring. In a Spring Boot 3 application, you can easily configure log levels for specific loggers to control the verbosity of logs for different packages or classes. In this blog, we'll explore how to achieve this using properties files, YAML configuration, and programmatic approaches for both Logback and Log4j.

### Table of Contents
1. [Introduction](#introduction)
2. [Using application.properties](#using-applicationproperties)
3. [Using application.yml](#using-applicationyml)
4. [Programmatic Configuration](#programmatic-configuration)
5. [Customizing Logback Configuration](#customizing-logback-configuration)
6. [Configuring Log4j](#configuring-log4j)
7. [Conclusion](#conclusion)

### Introduction

Spring Boot uses Logback as the default logging framework, but it also supports Log4j2. You can choose the logging framework that best fits your needs. In this blog, we'll cover configuration for both Logback and Log4j.

### Using `application.properties`

The simplest way to configure log levels in a Spring Boot application is by setting properties in the `application.properties` file. You can specify log levels for specific packages or classes as follows:

```properties
logging.level.com.yourpackage=DEBUG
logging.level.org.springframework.web=INFO
logging.level.com.yourpackage.YourClass=TRACE
```

### Using `application.yml`

If you prefer YAML for configuration, you can achieve the same result by adding entries to the `application.yml` file:

```yaml
logging:
  level:
    com:
      yourpackage: DEBUG
      yourpackage.YourClass: TRACE
    org:
      springframework:
        web: INFO
```

### Programmatic Configuration

You can configure log levels programmatically within your Spring Boot application. This approach is useful if you need to adjust log levels dynamically based on certain conditions.

#### Logback Programmatic Configuration

```java
import org.springframework.boot.logging.LogLevel;
import org.springframework.boot.logging.LoggingSystem;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class LogLevelConfigurer {

    private final LoggingSystem loggingSystem;

    public LogLevelConfigurer(LoggingSystem loggingSystem) {
        this.loggingSystem = loggingSystem;
    }

    @PostConstruct
    public void configureLogLevels() {
        loggingSystem.setLogLevel("com.yourpackage", LogLevel.DEBUG);
        loggingSystem.setLogLevel("org.springframework.web", LogLevel.INFO);
        loggingSystem.setLogLevel("com.yourpackage.YourClass", LogLevel.TRACE);
    }
}
```

### Customizing Logback Configuration

If you're using Logback, you can customize its configuration by creating a `logback-spring.xml` file in the `src/main/resources` directory. This file allows for advanced logging configurations.

#### Example `logback-spring.xml` Configuration

```xml
<configuration>

    <property name="LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss} - %msg%n"/>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>

    <logger name="com.yourpackage" level="DEBUG"/>
    <logger name="org.springframework.web" level="INFO"/>
    <logger name="com.yourpackage.YourClass" level="TRACE"/>

</configuration>
```

### Configuring Log4j

If you prefer to use Log4j, you can configure it by placing a `log4j2.xml` file in the `src/main/resources` directory of your Spring Boot application. Log4j will automatically detect this configuration file.

#### Example `log4j2.xml` Configuration

```xml
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} - %msg%n"/>
        </Console>
    </Appenders>

    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
        </Root>
        <Logger name="com.yourpackage" level="debug" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>
        <Logger name="org.springframework.web" level="info" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>
        <Logger name="com.yourpackage.YourClass" level="trace" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>
    </Loggers>
</Configuration>
```

### Conclusion

Configuring log levels for specific loggers in a Spring Boot 3 application is straightforward and can be done using properties files, YAML configuration, or programmatically for both Logback and Log4j. Additionally, you can customize Logback's configuration or use Log4j by providing a configuration file. By fine-tuning log levels, you can control the verbosity of logs, making it easier to monitor and debug your application.
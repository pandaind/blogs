---
title: "Docker Compose and Testcontainers with Spring Boot 3"
date: 2024-06-09T21:40:37+05:30
draft: false
tags: [ "Spring Boot 3", "testing" ]
---
In modern software development, containerization has become a key practice for ensuring consistent environments across different stages of development, testing, and deployment. Spring Boot 3 offers robust support for Docker Compose and Testcontainers, making it easier to manage multi-container applications and write comprehensive integration tests. This blog post will guide you through setting up Spring Boot 3 with Docker Compose, using custom container images, and leveraging Testcontainers for integration testing.

## Docker Compose Support in Spring Boot 3

Docker Compose is a tool for defining and running multi-container Docker applications. With Spring Boot 3, integrating Docker Compose is straightforward, allowing you to manage services your application depends on (like databases) easily.

### Setting Up Docker Compose

1. **Add the Dependency**:
   First, ensure you have the `spring-boot-docker-compose` dependency in your project.

   **Maven**:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-docker-compose</artifactId>
   </dependency>
   ```

   **Gradle**:
   ```groovy
   implementation 'org.springframework.boot:spring-boot-docker-compose'
   ```

2. **Create a `docker-compose.yml` File**:
   Define your services in a `docker-compose.yml` file at the root of your project. Here’s an example for a Spring Boot application with a PostgreSQL database:

   ```yaml
   version: '3.8'
   services:
     app:
       image: your-app-image:latest
       build: .
       ports:
         - "8080:8080"
       environment:
         SPRING_PROFILES_ACTIVE: docker
       depends_on:
         - db

     db:
       image: postgres:14
       environment:
         POSTGRES_DB: your_db
         POSTGRES_USER: your_user
         POSTGRES_PASSWORD: your_password
       ports:
         - "5432:5432"
   ```

3. **Enable Docker Compose Support**:
   Enable Docker Compose support in your `application.properties` or `application.yml`:

   ```properties
   spring.docker.compose.enabled=true
   ```

4. **Configure Application Properties**:
   Configure your application to use the services defined in `docker-compose.yml`:

   ```properties
   spring.datasource.url=jdbc:postgresql://db:5432/your_db
   spring.datasource.username=${POSTGRES_USER}
   spring.datasource.password=${POSTGRES_PASSWORD}
   ```

5. **Run Your Application**:
   Build and run your Docker Compose services and Spring Boot application:

   ```sh
   docker-compose up --build
   ```

### Using Custom Container Images

To use custom container images, you can specify your custom images in the `docker-compose.yml` file.

1. **Create Custom Dockerfile**:
   Create a `Dockerfile` for your Spring Boot application:

   ```Dockerfile
   FROM eclipse-temurin:17-jdk-alpine
   VOLUME /tmp
   ARG JAR_FILE=target/*.jar
   COPY ${JAR_FILE} app.jar
   ENTRYPOINT ["java","-jar","/app.jar"]
   ```

   Build your custom Docker image:

   ```sh
   docker build -t your-app-image:latest .
   ```

2. **Update `docker-compose.yml`**:
   Use your custom images in `docker-compose.yml`:

   ```yaml
   version: '3.8'
   services:
     app:
       image: custom-spring-boot-app:latest
       build:
         context: .
         dockerfile: Dockerfile
       ports:
         - "8080:8080"
       environment:
         SPRING_PROFILES_ACTIVE: docker
       depends_on:
         - db

     db:
       image: custom-postgres:latest
       build:
         context: ./db
         dockerfile: Dockerfile
       environment:
         POSTGRES_DB: custom_db
         POSTGRES_USER: custom_user
         POSTGRES_PASSWORD: custom_password
       ports:
         - "5432:5432"
   ```

3. **Run the Setup**:
   Run your Docker Compose setup:

   ```sh
   docker-compose up --build
   ```

## Using Testcontainers for Integration Testing

Testcontainers is a Java library that provides lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container. It’s perfect for integration testing.

### Setting Up Testcontainers

1. **Add Dependencies**:
   Add Testcontainers dependencies to your project.

   **Maven**:
   ```xml
   <dependency>
       <groupId>org.testcontainers</groupId>
       <artifactId>testcontainers</artifactId>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.testcontainers</groupId>
       <artifactId>junit-jupiter</artifactId>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.testcontainers</groupId>
       <artifactId>postgresql</artifactId>
       <scope>test</scope>
   </dependency>
   ```

   **Gradle**:
   ```groovy
   testImplementation 'org.testcontainers:testcontainers'
   testImplementation 'org.testcontainers:junit-jupiter'
   testImplementation 'org.testcontainers:postgresql'
   ```

2. **Create a Test Configuration**:
   Create a configuration class for setting up the container for your tests:

   ```java
   import org.springframework.boot.test.context.TestConfiguration;
   import org.springframework.context.annotation.Bean;
   import org.testcontainers.containers.PostgreSQLContainer;

   @TestConfiguration
   public class TestContainersConfig {

       @Bean
       public PostgreSQLContainer<?> postgresContainer() {
           PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:14")
                   .withDatabaseName("test")
                   .withUsername("test")
                   .withPassword("test");
           postgresContainer.start();
           return postgresContainer;
       }
   }
   ```

3. **Configure Spring Boot to Use the Testcontainer**:
   Use the `@DynamicPropertySource` annotation to set properties dynamically:

   ```java
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.context.SpringBootTest;
   import org.springframework.test.context.DynamicPropertyRegistry;
   import org.springframework.test.context.DynamicPropertySource;
   import org.testcontainers.containers.PostgreSQLContainer;
   import org.testcontainers.junit.jupiter.Container;
   import org.testcontainers.junit.jupiter.Testcontainers;

   @SpringBootTest
   @Testcontainers
   public class ApplicationTests {

       @Container
       static PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:14")
               .withDatabaseName("test")
               .withUsername("test")
               .withPassword("test");

       @DynamicPropertySource
       static void configureProperties(DynamicPropertyRegistry registry) {
           registry.add("spring.datasource.url", postgresContainer::getJdbcUrl);
           registry.add("spring.datasource.username", postgresContainer::getUsername);
           registry.add("spring.datasource.password", postgresContainer::getPassword);
       }

       @Autowired
       private YourRepository yourRepository;

       @Test
       void contextLoads() {
           // Your test logic here
       }
   }
   ```

4. **Write Integration Tests**:
   Write your integration tests, and Spring Boot will automatically use the properties provided by the Testcontainer:

   ```java
   import org.junit.jupiter.api.Test;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.boot.test.context.SpringBootTest;
   import static org.assertj.core.api.Assertions.assertThat;

   @SpringBootTest
   public class YourServiceTests {

       @Autowired
       private YourService yourService;

       @Test
       public void testService() {
           // Given
           YourEntity entity = new YourEntity();
           entity.setName("Test");

           // When
           yourService.save(entity);
           YourEntity foundEntity = yourService.findByName("Test");

           // Then
           assertThat(foundEntity).isNotNull();
           assertThat(foundEntity.getName()).isEqualTo("Test");
       }
   }
   ```

## Conclusion

Spring Boot 3's integration with Docker Compose and Testcontainers simplifies managing and testing multi-container applications. By following this guide, you can leverage these powerful tools to create robust, scalable, and testable applications.

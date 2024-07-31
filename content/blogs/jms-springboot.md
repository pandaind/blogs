---
title: "Connecting Spring Boot 3 to Apache ActiveMQ Artemis with AMQP and Transactions"
date: 2024-07-31T20:22:41+05:30
draft: false
---

## Introduction

In modern applications, messaging systems play a crucial role in enabling communication between different components and services. Apache ActiveMQ Artemis is a popular open-source messaging broker that supports multiple protocols, including AMQP. In this blog post, we will explore how to connect a Spring Boot 3 application to an Apache ActiveMQ Artemis broker using the AMQP protocol and configure it to support transactions.

## Prerequisites

Before we begin, ensure you have the following:

- Java 17 or higher installed
- Apache ActiveMQ Artemis broker installed and running
- Basic knowledge of Spring Boot and JMS

## Step 1: Set Up Dependencies

First, we need to add the necessary dependencies to our `pom.xml` file. These dependencies include the Spring Boot starter for ActiveMQ and the Artemis JMS client.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-activemq</artifactId>
    </dependency>
    <dependency>
        <groupId>org.apache.activemq</groupId>
        <artifactId>artemis-jms-client</artifactId>
        <version>2.17.0</version>
    </dependency>
</dependencies>
```

## Step 2: Configure Application Properties

Next, we need to configure the connection to the Apache ActiveMQ Artemis broker. Add the following properties to your `application.properties` file:

```properties
spring.artemis.broker-url=amqp://localhost:5672
spring.artemis.user=your-username
spring.artemis.password=your-password
spring.artemis.mode=native
```

Replace `your-username` and `your-password` with your actual Artemis broker credentials.

### Create a Custom Message Converter

First, create a custom message converter that implements the `MessageConverter` interface. This converter will handle the conversion of messages to and from specific object types.

```java
javaCopy codeimport javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import org.springframework.jms.support.converter.MessageConversionException;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.SimpleMessageConverter;

public class CustomMessageConverter implements MessageConverter {

    private final SimpleMessageConverter delegate = new SimpleMessageConverter();

    @Override
    public Message toMessage(Object object, Session session) throws JMSException, 	MessageConversionException {
        // Add custom conversion logic if needed
        return delegate.toMessage(object, session);
    }

    @Override
    public Object fromMessage(Message message) throws JMSException, MessageConversionException {
        // Add custom conversion logic if needed
        return delegate.fromMessage(message);
    }
}
```

## Step 3: Create Configuration Class

To enable transactions and configure the connection to the broker, we need to create a configuration class. This class will set up the connection factory, transaction manager, and `DefaultJmsListenerContainerFactory`.

```java
import org.apache.activemq.artemis.jms.client.ActiveMQConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.connection.JmsTransactionManager;
import org.springframework.jms.core.JmsTemplate;

@Configuration
@EnableJms
public class ArtemisConfig {

    @Bean
    public ActiveMQConnectionFactory connectionFactory() {
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory();
        connectionFactory.setBrokerURL("amqp://localhost:5672"); // tcp: for TCP protocol
        connectionFactory.setUser("your-username");
        connectionFactory.setPassword("your-password");
        return connectionFactory;
    }

    @Bean
    public JmsTransactionManager transactionManager() {
        return new JmsTransactionManager(connectionFactory());
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        JmsTemplate jmsTemplate = new JmsTemplate(connectionFactory());
        jmsTemplate.setSessionTransacted(true);
        return jmsTemplate;
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory() {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setTransactionManager(transactionManager());
        factory.setConcurrency("1-1");
        factory.setSessionTransacted(true);
        factory.setMessageConverter(customMessageConverter());
        return factory;
    }
    
    @Bean
    public MessageConverter customMessageConverter() {
        return new CustomMessageConverter();
    }
}
```

## Step 4: Sending Messages

To send messages to the broker, we will create a REST controller. This controller will use the `JmsTemplate` to send messages to the specified queue.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.transaction.annotation.Transactional;

@RestController
public class MessageController {

    @Autowired
    private JmsTemplate jmsTemplate;

    @GetMapping("/send")
    @Transactional
    public String sendMessage(@RequestParam String message) {
        jmsTemplate.convertAndSend("test-queue", message);
        return "Message sent!";
    }
}
```

In this controller, the `sendMessage` method is annotated with `@Transactional`, ensuring that the message sending operation is wrapped in a transaction.

## Step 5: Receiving Messages

To receive messages from the broker, we will create a message listener. This listener will use the `DefaultJmsListenerContainerFactory` that we configured earlier.

```java
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @JmsListener(destination = "test-queue", containerFactory = "jmsListenerContainerFactory")
    public void onMessage(String message) {
        System.out.println("Received message: " + message);
        // Additional business logic can be added here
    }
}
```

The `@JmsListener` annotation specifies the destination queue and the container factory to use for this listener.

## Step 6: Running the Application

With everything configured, we can now run the Spring Boot application. Start your Artemis broker if it is not already running, and then start your Spring Boot application. You can send messages by navigating to `http://localhost:8080/send?message=HelloWorld` in your browser. The message will be sent to the `test-queue`, and the message listener will receive and print it to the console.

## Conclusion

In this blog post, we explored how to connect a Spring Boot 3 application to an Apache ActiveMQ Artemis broker using the AMQP protocol. We configured the connection factory, enabled transactions, and set up message sending and receiving. By following these steps, you can integrate Apache ActiveMQ Artemis into your Spring Boot applications, enabling robust messaging and transaction support.

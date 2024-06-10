---
title: "Internationalization (i18n) in Spring Boot with Thymeleaf"
date: 2024-06-10T16:38:52+05:30
draft: false
---
Internationalization (i18n) in Spring Boot with Thymeleaf allows you to create web applications that can support multiple languages. This involves setting up message resource files for different languages and configuring your application to use them.

Here's a step-by-step guide to set up i18n in a Spring Boot application using Thymeleaf:

## Step 1: Add Dependencies

Ensure you have the necessary dependencies in your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## Step 2: Create Message Resource Files

Create message resource files for each language you want to support. For example, create `messages.properties` for the default language, `messages_fr.properties` for French, and `messages_es.properties` for Spanish.

### `src/main/resources/messages.properties`

```properties
greeting=Hello
farewell=Goodbye
```

### `src/main/resources/messages_fr.properties`

```properties
greeting=Bonjour
farewell=Au revoir
```

### `src/main/resources/messages_es.properties`

```properties
greeting=Hola
farewell=Adiós
```

## Step 3: Configure Spring Boot for i18n with session resolver

Add the necessary configuration to enable internationalization in your Spring Boot application. Create a configuration class to define the message source and locale resolver.

### `src/main/java/com/example/config/I18nConfig.java`

```java
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Locale;

@Configuration
public class I18nConfig implements WebMvcConfigurer {

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.US);
        return slr;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(localeChangeInterceptor());
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
```

## Step 4: Create Thymeleaf Templates

Use the Thymeleaf `#{} syntax to access the messages in your HTML templates.

### `src/main/resources/templates/index.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Thymeleaf i18n Example</title>
</head>
<body>
    <h1 th:text="#{greeting}">Default Greeting</h1>
    <p th:text="#{farewell}">Default Farewell</p>

    <a href="?lang=en">English</a> |
    <a href="?lang=fr">French</a> |
    <a href="?lang=es">Spanish</a>
</body>
</html>
```

## Step 5: Create a Controller

Create a controller to handle requests to your Thymeleaf templates.

### `src/main/java/com/example/controller/HomeController.java`

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
```

## Step 6: Run Your Application

Run your Spring Boot application. When you access the application in your browser, you can change the language by appending the `lang` parameter to the URL. For example:

- `http://localhost:8080/?lang=en` for English
- `http://localhost:8080/?lang=fr` for French
- `http://localhost:8080/?lang=es` for Spanish

The text on the page will change according to the selected language.

## Resolve locales with a cookie

Use bellow bean in I18nConfig

```java
   @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver clr = new CookieLocaleResolver();
        clr.setDefaultLocale(Locale.US);
        clr.setCookieName("localeInfo");
        clr.setCookieMaxAge(3600); // Set cookie to expire in 1 hour
        return clr;
    }
```

## Resolve locales with HTTP Request Header

Use bellow bean in I18nConfig

```java
   @Bean
    public LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
        localeResolver.setDefaultLocale(Locale.US);
        localeResolver.setSupportedLocales(List.of(Locale.US, Locale.FRANCE, new Locale("es", "ES")));
        return localeResolver;
    }
```

## you can use a dropdown form to change the language:

### `src/main/resources/templates/index.html` (with dropdown)

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Thymeleaf i18n Example</title>
</head>
<body>
    <h1 th:text="#{greeting}">Default Greeting</h1>
    <p th:text="#{farewell}">Default Farewell</p>

    <form method="get" action="/">
        <select name="lang" onchange="this.form.submit()">
            <option value="en" th:text="#{english}">English</option>
            <option value="fr" th:text="#{french}">French</option>
            <option value="es" th:text="#{spanish}">Spanish</option>
        </select>
    </form>
</body>
</html>
```



## Conclusion

we demonstrated how to set up internationalization (i18n) in a Spring Boot application using Thymeleaf. By creating message resource files, configuring the application, and using Thymeleaf templates, you can easily support multiple languages in your web application. This enhances the user experience by allowing users to interact with the application in their preferred language.
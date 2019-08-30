package com.coyoapp.tinytask.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class TemplateEngConfig {
  @Bean
  public SpringTemplateEngine getTemplateEngine() {
    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(getThymeleafTemplateResolver());
    return templateEngine;
  }

  @Bean
  public ClassLoaderTemplateResolver getThymeleafTemplateResolver() {
    ClassLoaderTemplateResolver thymeleafTemplateResolver = new ClassLoaderTemplateResolver();
    thymeleafTemplateResolver.setPrefix("mail/");
    thymeleafTemplateResolver.setSuffix(".html");
    thymeleafTemplateResolver.setTemplateMode("HTML");
    thymeleafTemplateResolver.setCharacterEncoding("UTF-8");
    thymeleafTemplateResolver.setOrder(1);
    return thymeleafTemplateResolver;
  }
}

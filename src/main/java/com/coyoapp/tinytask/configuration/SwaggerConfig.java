package com.coyoapp.tinytask.configuration;

import com.google.common.base.Predicates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.builders.OAuthBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

@EnableSwagger2
@Configuration
public class SwaggerConfig extends WebMvcConfigurerAdapter {
  @Value("${app.params.baseUrl}")
  private String baseUrl;

  @Bean
  public Docket docket() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .paths(Predicates.not(PathSelectors.regex("/auditevents.*|/error|/autoconfig.*|/beans.*"
        + "|/configprops.*|/dump.*|/features.*|/info.*|/mapping.*|/trace.*|/env.*|/pause.*"
        + "|/refresh.*|/resume.*|/heapdump.*|/loggers.*|/restart.*|/oauth/error")))
      .build()
      .apiInfo(generateApiInfo())
      .globalResponseMessage(RequestMethod.GET, newArrayList(
        new ResponseMessageBuilder().code(500).message("Internal Server Error")
          .responseModel(new ModelRef("Error"))
          .build()
      ))
      .securitySchemes(newArrayList(oauthScheme()))
      ;
  }


  private ApiInfo generateApiInfo() {
    return new ApiInfo("Tiny Task Backend", "TinyTasks, the most basic task management app in the whole wide world .", "Version 1.0",
      "urn:tos", "mail@coyoapp.com", "Apache 2.0", "http://www.apache.org/licenses/LICENSE-2.0");
  }

  @Bean
  public SecurityScheme oauthScheme() {
    List<GrantType> grantTypes = new ArrayList<>();
    String tokenUrl = baseUrl + "/oauth/token";
    GrantType clientGrantType = new ClientCredentialsGrant(tokenUrl);
    grantTypes.add(clientGrantType);
    GrantType passwordGrantType = new ResourceOwnerPasswordCredentialsGrant(tokenUrl);
    grantTypes.add(passwordGrantType);

    return new OAuthBuilder()
      .name("octaSwaggerClient")
      .grantTypes(grantTypes)
      .build();
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("swagger-ui.html")
      .addResourceLocations("classpath:/META-INF/resources/");

    registry.addResourceHandler("/webjars/**")
      .addResourceLocations("classpath:/META-INF/resources/webjars/");
  }
}

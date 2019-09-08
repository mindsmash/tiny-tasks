package com.coyoapp.tinytask;
import java.util.Collections;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
  /**
   * Main Swagger API Bean
   *
   * @return Docket
   */
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.coyoapp.tinytask"))
      .paths(PathSelectors.any())
      .build()
      .apiInfo(apiInfo());
  }

  /**
   * Method describing api info.
   *
   * @return ApiInfo with parameters describing the application
   */
  private ApiInfo apiInfo() {
    return new ApiInfo(
      "COYO TinyTasks",
      "Extended task controller with a PUT endpoint to update Task.",
      "1",
      "Terms of service",
      new Contact("Khallad Sharaf", "com.coyoapp.tinytask", "khallad_3@hotmail.com"),
      "License of API",
      "#",
      Collections.emptyList());
  }
}

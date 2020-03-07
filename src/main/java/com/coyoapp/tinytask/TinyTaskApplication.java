package com.coyoapp.tinytask;

import com.coyoapp.tinytask.configuration.JWTFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import javax.servlet.FilterRegistration;

@SpringBootApplication
public class TinyTaskApplication {

  @Bean
  public FilterRegistrationBean jwtFilter() {
    final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
    registrationBean.setFilter(new JWTFilter());
    registrationBean.addUrlPatterns("/rest/*");

    return registrationBean;
  }


  public static void main(String[] args) {
    SpringApplication.run(TinyTaskApplication.class, args);
  }

}

package com.coyoapp.tinytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaAuditing
@EnableJpaRepositories
@SpringBootApplication
public class TinyTaskApplication {

  public static void main(String[] args) {
    SpringApplication.run(TinyTaskApplication.class, args);
  }

}

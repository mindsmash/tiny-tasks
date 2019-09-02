package com.coyoapp.tinytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration
@EntityScan
public class TinyTaskApplication {

  public static void main(String[] args) {
    SpringApplication.run(TinyTaskApplication.class, args);
  }

}

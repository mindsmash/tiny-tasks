package com.coyoapp.tinytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.coyoapp.tinytask"})
public class TinyTaskApplication {
  public static void main(String[] args) {
    SpringApplication.run(TinyTaskApplication.class, args);
  }
}

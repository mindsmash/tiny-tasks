package com.coyoapp.tinytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TinyTaskApplication {

  public static void main(String[] args) {
    SpringApplication.run(TinyTaskApplication.class, args);
  }

  @EventListener(ApplicationReadyEvent.class)
  public void startScheduler() {
    EmailScheduler emailScheduler = new EmailScheduler();
    Timer timer = new Timer();
    timer.scheduleAtFixedRate(emailScheduler, 60*1000, 60*1000);
  }
  
}

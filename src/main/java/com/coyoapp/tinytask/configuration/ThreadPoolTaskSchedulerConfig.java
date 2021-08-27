package com.coyoapp.tinytask.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class ThreadPoolTaskSchedulerConfig {

  @Bean
  public ThreadPoolTaskScheduler taskScheduler(){
    ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
    //threadPoolTaskScheduler.setPoolSize(5); // Uncomment it to set the desired number of threads for multi-tasking
    threadPoolTaskScheduler.setThreadNamePrefix("taskScheduler");
    return threadPoolTaskScheduler;
  }

}

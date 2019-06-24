package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.service.JobsService;
import org.hibernate.engine.config.spi.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SchedulerService implements SchedulingConfigurer {

  private final JobsService jobsService;

  @Autowired
  public SchedulerService(JobsService jobsService) {
    this.jobsService = jobsService;
  }

//  @Bean
//  public TaskScheduler poolScheduler() {
//    ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
//    scheduler.setThreadNamePrefix("ThreadPoolTaskScheduler");
//    scheduler.setPoolSize(1);
//    scheduler.initialize();
//    return scheduler;
//  }

  @Override
  public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
//    taskRegistrar.setScheduler(poolScheduler());
//    taskRegistrar.addTriggerTask(new Runnable() {
//      @Override
//      public void run() {
//        // Do not put @Scheduled annotation above this method, we don't need it anymore.
////        configurationService.loadConfigurations();
//      }
//    }, new Trigger() {
//      @Override
//      public Date nextExecutionTime(TriggerContext triggerContext) {
////        Calendar nextExecutionTime = new GregorianCalendar();
////        Date lastActualExecutionTime = triggerContext.lastActualExecutionTime();
////        nextExecutionTime.setTime(lastActualExecutionTime != null ? lastActualExecutionTime : new Date());
////        nextExecutionTime.add(Calendar.MILLISECOND, Integer.parseInt(configurationService.getConfiguration(Constants.CONFIG_KEY_REFRESH_RATE_CONFIG).getConfigValue()));
////        return nextExecutionTime.getTime();
//        return null;
//      }
//    });
  }
}

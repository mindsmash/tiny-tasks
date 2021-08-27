package com.coyoapp.tinytask.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

@Slf4j
@Component
@AllArgsConstructor
public class ReminderManager {

  private final ThreadPoolTaskScheduler taskScheduler;
  private final Map<String, ScheduledFuture<?>> reminders = new HashMap<>();

  public void createReminder(String cronExpression) {
    if (reminders.get(cronExpression) == null) {
      ScheduledFuture<?> sf = taskScheduler.schedule(new Reminder(cronExpression),new CronTrigger(cronExpression));
      log.debug("Reminder has been scheduled : {}",cronExpression);
      reminders.put(cronExpression,sf);
    } else {
      log.debug("Reminder already exists : {}",cronExpression);
    }
  }

  public void deleteReminder(String cronExpression) {
    if (reminders.get(cronExpression) != null) {
      reminders.get(cronExpression).cancel(true);
      reminders.remove(cronExpression);
      log.debug("Reminder has been stopped : {}", cronExpression);
    } else {
      log.debug("Reminder doesn't exist : {}",cronExpression);
    }
  }

}

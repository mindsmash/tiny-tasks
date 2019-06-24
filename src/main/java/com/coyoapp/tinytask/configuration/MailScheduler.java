package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.domain.Emails;
import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.service.EmailsService;
import com.coyoapp.tinytask.service.JobsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

@Slf4j
@Component
public class MailScheduler {

  private static Map<String, Jobs> users;
  private static Map<String, Timer> timers;

  private final JobsService jobsService;

  private final MailConfig mailConfig;

  private final EmailsService emailsService;

  @Autowired
  public MailScheduler(JobsService jobsService, MailConfig mailConfig, EmailsService emailsService) {
    this.jobsService = jobsService;
    this.mailConfig = mailConfig;
    this.emailsService = emailsService;
  }

  @EventListener
  public void onUserCreate(Jobs job) {
    loadConfigurations();
    System.out.println("hello");
  }

  @PostConstruct
  public void loadConfigurations() {
    users = new HashMap<>();
    timers = new HashMap<>();

    List<Jobs> schedulingEmails = jobsService.getAllJobs();

    for (Jobs schedulingEmail : schedulingEmails) {
      users.put(schedulingEmail.getUsername(), schedulingEmail);
      schedule(schedulingEmail.getUsername(), schedulingEmail);
    }
  }

  private void schedule(String username, Jobs job) {
    Emails emails = emailsService.getEmailByUsername(username);
    if (emails != null) {
      Calendar date = Calendar.getInstance();
      int period = 24;
      date.set(Calendar.HOUR, job.getSchedule().getHours());
      date.set(Calendar.MINUTE, job.getSchedule().getMinutes());
      date.set(Calendar.SECOND, 0);
      date.set(Calendar.MILLISECOND, 0);

      Timer timer = new Timer();
      EmailTask emailTask = new EmailTask(mailConfig);
      emailTask.setUsername(username);
      emailTask.setJob(job);
      timer.scheduleAtFixedRate(emailTask, date.getTime(), 100 * 60 * 60 * period);
      timers.put(username, timer);
    }
  }


}

package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.service.JobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UserQueueNotifier {

  private static Map<String, Jobs> emailsToBeSent;

  private final JobsService jobsService;

  @Autowired
  public UserQueueNotifier(JobsService jobsService) {
    this.jobsService = jobsService;
  }

  @EventListener
  public void onUserCreate(Jobs job) {

    System.out.println("hello");
  }

  @PostConstruct
  public void loadConfigurations() {
    emailsToBeSent = new HashMap<>();

    List<Jobs> schedulingEmails = jobsService.getAllJobs();

    for (Jobs schedulingEmail : schedulingEmails) {
      emailsToBeSent.put(schedulingEmail.getUsername(), schedulingEmail);
    }
  }

}

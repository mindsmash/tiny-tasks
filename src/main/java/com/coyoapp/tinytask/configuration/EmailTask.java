package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.domain.Jobs;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.TimerTask;

@Slf4j
@Component
public class EmailTask extends TimerTask {

  private String username;

  private Jobs job;

  private final MailConfig mailConfig;

  @Autowired
  public EmailTask(MailConfig mailConfig) {
    this.mailConfig = mailConfig;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setJob(Jobs job) {
    this.job = job;
  }

  @Override
  public void run() {
    log.debug("Sending email to {} started", username);
    mailConfig.sendEmailFromTemplate(username);
  }

}

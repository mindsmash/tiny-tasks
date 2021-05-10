package com.coyoapp.tinytask.jobs;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailJob extends QuartzJobBean{

  private final JavaMailSender mailSender;

  private final MailProperties mailProperties;

  @Override
  protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
    log.info("Executing Job with key {}", jobExecutionContext.getJobDetail().getKey());

    JobDataMap jobDataMap = jobExecutionContext.getMergedJobDataMap();
    String subject = jobDataMap.getString("subject");
    String body = jobDataMap.getString("body");
    String recipientEmail = jobDataMap.getString("email");

    sendMail(mailProperties.getUsername(), recipientEmail, subject, body);

  }

  public void sendMail(String fromEmail, String toEmail, String subject, String body) {

    try {
      log.info("Sending Email to {}", toEmail);
      MimeMessage message = mailSender.createMimeMessage();

      MimeMessageHelper messageHelper = new MimeMessageHelper(message, StandardCharsets.UTF_8.toString());
      messageHelper.setSubject(subject);
      messageHelper.setText(body, true);
      messageHelper.setFrom(fromEmail);
      messageHelper.setTo(toEmail);

      mailSender.send(message);
    } catch (MessagingException ex) {
      log.error("Failed to send email to {}", toEmail);
    }

  }

}



package com.coyoapp.tinytask.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService{

  private final JavaMailSender emailSender;

  @Autowired
  public EmailService(JavaMailSender emailSender) {
    this.emailSender = emailSender;
  }

  /**
   *
   * @param recipients comma-separated list of emails
   * @param subject the subject of the email
   * @param body the body of the email
   * @return true if the operation is successful, false otherwise
   */

  public boolean sendEmail(String recipients, String subject, String body){

    try {
      MimeMessage message = emailSender.createMimeMessage();
      MimeMessageHelper messageHelper = new MimeMessageHelper(message);
      messageHelper.setFrom("task-mailer@coyo-test.com");
      messageHelper.setTo(recipients);
      messageHelper.setSubject(subject);
      messageHelper.setText(body, true);

      emailSender.send(message);
    } catch (MessagingException e) {
      e.printStackTrace();
    }

    return true;
  }




}

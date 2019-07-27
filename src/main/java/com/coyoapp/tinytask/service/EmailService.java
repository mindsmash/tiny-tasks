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
  

  public boolean sendEmail(String recipients, String subject, String body){

    try {
      MimeMessage message = emailSender.createMimeMessage();
      MimeMessageHelper messageHelper = new MimeMessageHelper(message);
      messageHelper.setFrom("reminder@coyotask.com");
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
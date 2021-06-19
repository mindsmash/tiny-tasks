package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class DefaultEmailService {

  @Autowired
  private JavaMailSender javaMailsender;


  public void sendMailToUserReminderTasks(User user) throws MailException{
    SimpleMailMessage mail = new SimpleMailMessage();
    mail.setTo(user.getEmail());
    mail.setSubject("Check you unfinished Tasks!");
    mail.setFrom("noreply@tinytask.com");
    mail.setText("");
    javaMailsender.send(mail);
  }

  public void sendMailToMe() throws MailException {
    SimpleMailMessage mail = new SimpleMailMessage();
    mail.setTo("email1@domain.tld");
    mail.setSubject("This is a test mail!");
    mail.setFrom("email1@domain.tld");
    mail.setText("Does this work!?");
    javaMailsender.send(mail);
  }

  public void sendMailToMyselfButMime() throws  MessagingException {
    MimeMessage mimeMessage = javaMailsender.createMimeMessage();
    MimeMessageHelper mail = new MimeMessageHelper(mimeMessage);
    mail.setTo("email1@domain.tld");
    mail.setSubject("This is a test mail!");
    // this needs to match the address in the smtp settings at least on the domain level
    mail.setFrom("email1@domain.tld");
    mail.setText("Does this work!?");
    javaMailsender.send(mimeMessage);
  }


}

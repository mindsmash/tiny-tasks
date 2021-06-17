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
    mail.setTo("an@email.com");
    mail.setSubject("This is a test mail!");
    mail.setFrom("noreply@tinytask.com");
    mail.setText("Does this work!?");
    javaMailsender.send(mail);
  }

  public void sendMailToMyselfButMime() throws  MessagingException {
    MimeMessage mimeMessage = javaMailsender.createMimeMessage();
    MimeMessageHelper mail = new MimeMessageHelper(mimeMessage);
    mail.setTo("an@email.com");
    mail.setSubject("This is a test mail!");
    mail.setFrom("lionel@pureops.tech");
    mail.setText("Does this work!?");
    javaMailsender.send(mimeMessage);
  }


}

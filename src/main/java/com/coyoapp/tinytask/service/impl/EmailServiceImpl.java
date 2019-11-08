package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.service.EmailService;
import com.coyoapp.tinytask.util.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;

@Service(value = "emailService")
public class EmailServiceImpl implements EmailService {

  @Autowired
  private JavaMailSender javaMailSender;

  private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

  @Value("${spring.mail.username}")
  private String sender;

  public void sendEmail (Email email) throws MessagingException, UnsupportedEncodingException {
      MimeMessage msg = javaMailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(msg, true);

      InternetAddress address = new InternetAddress();
      address.setAddress(sender);
      address.setPersonal("No Reply: Tiny Task Notification");

      helper.setTo(email.getToEmail());
      helper.setSubject(email.getSubject());
      helper.setText(email.getBody());
      helper.setSentDate(new Date());
      helper.setFrom(address);
      helper.setReplyTo(address);
      javaMailSender.send(msg);

      logger.info("EMail Sent to " + email.getToEmail() + " Successfully!!");
  }
}

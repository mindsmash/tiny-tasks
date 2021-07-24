package com.coyoapp.tinytask.common.email;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public abstract class EmailSender {

  private final JavaMailSender javaMailSender;

  @Value("${mail.default-email}")
  private String fromMail;

  protected void sendEmail(String to, String subject, String content) {
    SimpleMailMessage message = getSimpleMailMessage(to, subject, content);
    javaMailSender.send(message);
  }

  protected SimpleMailMessage getSimpleMailMessage(String to, String subject, String content) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(fromMail);
    message.setTo(to);
    message.setSubject(subject);
    message.setText(content);
    return message;
  }

  protected void sendSimpleMailMessage(SimpleMailMessage simpleMailMessage) {
    javaMailSender.send(simpleMailMessage);
  }

  protected void sendSimpleMailMessage(List<SimpleMailMessage> simpleMailMessageList) {
    javaMailSender.send(simpleMailMessageList.toArray(SimpleMailMessage[]::new));
  }
}

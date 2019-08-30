package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;
  private final SpringTemplateEngine templateEngine;

  private MimeMessageHelper getMimeMessageHelper(String to, String subject, String content, MimeMessage message, String from) throws MessagingException {
    MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    messageHelper.setTo(to);
    messageHelper.setFrom(from);
    messageHelper.setSubject(subject);
    messageHelper.setText(content, true);
    return messageHelper;
  }

  @Async
  public void sendTaskNotificationEmails(List<Task> tasks, User user) {
    try {
    Context context = new Context();
    context.setVariable("tasks", tasks);
    context.setVariable("user", user);
    String content = templateEngine.process("undoneTasks", context);
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper messageHelper = getMimeMessageHelper(user.getEmail(), "Pending tasks resume", content, message, "support@tinytask");
    mailSender.send(message);
    log.info("Notification email sent to {}", user.getEmail());
    }catch (MessagingException ex){
      log.error(ex.getMessage());
    }
  }

}

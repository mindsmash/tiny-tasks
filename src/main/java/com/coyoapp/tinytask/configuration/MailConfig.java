package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.service.EmailsService;
import com.coyoapp.tinytask.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring3.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;

@Slf4j
@Component
public class MailConfig {

  private final SpringTemplateEngine templateEngine;

  private final JavaMailSender javaMailSender;

  private final EmailsService emailsService;

  private final TaskService taskService;

  @Autowired
  public MailConfig(SpringTemplateEngine templateEngine,
                    JavaMailSender javaMailSender, EmailsService emailsService, TaskService taskService) {
    this.templateEngine = templateEngine;
    this.javaMailSender = javaMailSender;
    this.emailsService = emailsService;
    this.taskService = taskService;
  }

  @Async
  public void sendEmailFromTemplate(String username) {
    Locale locale = Locale.getDefault();
    List<Task> tasks = taskService.getAllByUsernameAndStatusNot(username, "DONE");
    if(tasks != null && tasks.size() != 0) {
      Context context = new Context(locale);
      context.setVariable("username", username);
      context.setVariable("taskList", tasks);
//    context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
      String content = templateEngine.process("tasks", context);
      String subject = "Daily reminder";
      sendEmail(emailsService.getEmailByUsername(username).getEmail(), subject, content, false, true);
    } else{
      log.debug("All tasks for user: {}, are DONE", username);
    }
  }

  @Async
  public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {

    // Prepare message using a Spring helper

    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    try {
      MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
      message.setTo(to);
      message.setSubject(subject);
      message.setText(content, isHtml);
      message.setFrom("taulant.ymeri92@gmail.com");

      javaMailSender.send(mimeMessage);
      log.debug("Sent email to User '{}'", to);
    } catch (Exception e) {
      if (log.isDebugEnabled()) {
        log.warn("Email could not be sent to user '{}'", to, e);
      } else {
        log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
      }
    }
  }
}

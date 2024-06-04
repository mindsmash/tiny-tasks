package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;
import freemarker.template.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class EmailService implements NotificationService {

  private final JavaMailSender mailSender;
  private final Configuration freemarkerConfiguration;

  public EmailService(JavaMailSender mailSender, Configuration freemarkerConfiguration) {
    this.mailSender = mailSender;
    this.freemarkerConfiguration = freemarkerConfiguration;
  }

  @Override
  public void sendNotificationAboutTasks(String email, List<TaskResponse> tasks, String templateFileName) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper =  new MimeMessageHelper(message, true);

      helper.setTo(email);
      helper.setSubject("Unfinished Tasks Reminder");
      Map<String, Object> model = new HashMap<>();
      model.put("taskList", tasks);

      Template template = freemarkerConfiguration.getTemplate(templateFileName);
      StringWriter stringWriter = new StringWriter();
      template.process(model, stringWriter);
      String htmlContent = stringWriter.getBuffer().toString();
      helper.setText(htmlContent, true);

      mailSender.send(message);
      log.info("The email has been sent to " + email);
    } catch (TemplateException | MessagingException | IOException e) {
      log.error("Error while sending email!");
      throw new RuntimeException(e);
    }
  }
}

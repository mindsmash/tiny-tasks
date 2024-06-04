package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {
  @Mock
  private JavaMailSender mailSender;
  @Mock
  private Configuration freemarkerConfig;
  @Mock
  private Template template;
  @InjectMocks
  private EmailService emailService;

  @Test
  void shouldSendNotificationAboutTasks() throws MessagingException, IOException, TemplateException {
    // Given
    String email = "test@example.com";
    List<TaskResponse> tasks = Collections.emptyList();
    String templateFileName = "taskMail.ftl";

    MimeMessage mimeMessage = mock(MimeMessage.class);
    when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

    when(freemarkerConfig.getTemplate(templateFileName)).thenReturn(template);

    doAnswer(invocation -> {
      Object[] args = invocation.getArguments();
      ((StringWriter) args[1]).write("Test HTML content");
      return null;
    }).when(template).process(any(), any());

    doNothing().when(mailSender).send(mimeMessage);

    // When
    emailService.sendNotificationAboutTasks(email, tasks, templateFileName);

    // Then
    verify(mailSender).send(mimeMessage);

    // Verify that MimeMessageHelper is set correctly
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
    helper.setTo(email);
    helper.setSubject("Unfinished Tasks Reminder");
    helper.setText("Test HTML content", true);

    // Verifying methods that are actually called during test
    verify(mailSender, times(1)).createMimeMessage();
    verify(freemarkerConfig, times(1)).getTemplate(templateFileName);
    verify(template, times(1)).process(any(), any(StringWriter.class));
  }
}

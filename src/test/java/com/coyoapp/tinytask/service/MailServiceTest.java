package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MailServiceTest {
  UserRepository userRepository = mock(UserRepository.class);
  TaskRepository taskRepository = mock(TaskRepository.class);
  JavaMailSender javaMailSender = mock(JavaMailSender.class);

  MailService mailService = new MailService(javaMailSender, userRepository, taskRepository);

  @Test
  void sendMailShouldSendAnEmailToEveryUserWithTasksInProgress() {
    //GIVEN
    when(userRepository.findAll())
      .thenReturn(List.of(
        User.builder()
          .username("Foobar")
          .email("some@mail.com")
          .id("some id")
          .build(),
        User.builder()
          .username("Baz")
          .email("another@mail.com")
          .id("another id")
          .build()));

    when(taskRepository.findAllByUserId("some id"))
      .thenReturn(List.of(Task.builder()
        .inProgress(true)
        .id("task id")
        .created(Instant.now())
        .name("Open Task")
        .build()));

    when(taskRepository.findAllByUserId("another id"))
      .thenReturn(List.of(Task.builder()
        .inProgress(false)
        .id("task id")
        .created(Instant.now())
        .name("Done Task")
        .build()));

    SimpleMailMessage mailMessageFoobar = new SimpleMailMessage();
    mailMessageFoobar.setFrom("noreply@yourdailytasks.io");
    mailMessageFoobar.setTo("some@mail.com");
    mailMessageFoobar.setSubject("Hey! Here are some tasks for you :)");
    String mailFoobar = "Good morning " + "Foobar" + " here is a list of your open tasks: " +
      "\n" + "Open Task";
    mailMessageFoobar.setText(mailFoobar);

    //WHEN
    mailService.sendMail();

    //THEN
    verify(userRepository, times(1)).findAll();
    verify(taskRepository, times(1)).findAllByUserId("Foobar");
    verify(taskRepository, times(1)).findAllByUserId("Baz");
    verify(javaMailSender, times(1)).send(mailMessageFoobar);
  }
}

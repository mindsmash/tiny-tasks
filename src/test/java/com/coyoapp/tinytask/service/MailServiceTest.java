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
        .build(),
        Task.builder()
          .inProgress(true)
          .id("task id 2")
          .created(Instant.now())
          .name("Another Open Task")
          .build(),
        Task.builder()
          .inProgress(false)
          .id("task id 3")
          .created(Instant.now())
          .name("This is done")
          .build()));

    when(taskRepository.findAllByUserId("another id"))
      .thenReturn(List.of(Task.builder()
        .inProgress(false)
        .id("task id 4")
        .created(Instant.now())
        .name("Done Task")
        .build(),
        Task.builder()
          .inProgress(true)
          .id("task id 5")
          .created(Instant.now())
          .name("Oh my, it's an open Task")
          .build()));

    SimpleMailMessage mailMessageFoobar = new SimpleMailMessage();
    mailMessageFoobar.setFrom("noreply@yourdailytasks.io");
    mailMessageFoobar.setTo("some@mail.com");
    mailMessageFoobar.setSubject("Hey! Here are some tasks for you :)");
    String mailFoobar = "Good morning " + "Foobar" + " here is a list of your open tasks: " +
      "\n" + "Open Task" + "\n" + "Another Open Task";
    mailMessageFoobar.setText(mailFoobar);

    SimpleMailMessage mailMessageBaz = new SimpleMailMessage();
    mailMessageBaz.setFrom("noreply@yourdailytasks.io");
    mailMessageBaz.setTo("another@mail.com");
    mailMessageBaz.setSubject("Hey! Here are some tasks for you :)");
    String mailBaz = "Good morning " + "Baz" + " here is a list of your open tasks: " +
      "\n" + "Oh my, it's an open Task";
    mailMessageBaz.setText(mailBaz);

    //WHEN
    mailService.sendMail();

    //THEN
    verify(userRepository, times(1)).findAll();
    verify(taskRepository, times(1)).findAllByUserId("some id");
    verify(taskRepository, times(1)).findAllByUserId("another id");
    verify(javaMailSender, times(1)).send(mailMessageFoobar);
    verify(javaMailSender, times(1)).send(mailMessageBaz);
  }
}

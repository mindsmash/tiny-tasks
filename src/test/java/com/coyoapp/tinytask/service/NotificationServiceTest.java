package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.AppUser;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AppUserRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

import static org.mockito.Mockito.*;

class NotificationServiceTest {

  private final JavaMailSender mailSender = mock(JavaMailSender.class);
  private final AppUserRepository userRepository = mock(AppUserRepository.class);
  private final TaskRepository taskRepository = mock(TaskRepository.class);

  NotificationService notificationService = new NotificationService(mailSender,userRepository,taskRepository);

  @Test
  void sendNotifications() {
    //GIVEN
    when(userRepository.findAll()).thenReturn(List.of(
      AppUser.builder().id("1234").name("Hanna").mail("Hanna@gmail.com").build(),
      AppUser.builder().id("1235").name("Laura").mail("Laura@gmail.com").build()
    ));

    when(taskRepository.findByAppUserIdAndDone("1234", false)).thenReturn(List.of());
    when(taskRepository.findByAppUserIdAndDone("1235", false)).thenReturn(List.of(
      Task.builder().id("Id12").name("Kochen").build(),
      Task.builder().id("Id56").name("Essen").build(),
      Task.builder().id("Id93").name("Abspülen").build()
    ));

    SimpleMailMessage mail1 = new SimpleMailMessage();
    mail1.setTo("Hanna@gmail.com");
    mail1.setFrom("noreply@tinytask.com");
    mail1.setSubject("Deine Todo-Erinnerung");
    mail1.setText("Hallo Hanna!/r/nEs gibt keine offenen Todos!");

    SimpleMailMessage mail2 = new SimpleMailMessage();
    mail2.setTo("Laura@gmail.com");
    mail2.setFrom("noreply@tinytask.com");
    mail2.setSubject("Deine Todo-Erinnerung");
    mail2.setText("Hallo Laura!/r/nHier kommen deine offenen Todos:/r/nKochen/r/nEssen/r/nAbspülen/r/n");



    //WHEN
    notificationService.sendNotifications();

    //THEN
    //THEN
    verify(userRepository, times(1)).findAll();
    verify(taskRepository, times(1)).findByAppUserIdAndDone("1234", false);
    verify(taskRepository, times(1)).findByAppUserIdAndDone("1235", false);
    verify(mailSender, times(1)).send(mail1);
    verify(mailSender, times(1)).send(mail2);
  }
}


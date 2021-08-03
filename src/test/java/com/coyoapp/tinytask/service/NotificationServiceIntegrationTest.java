package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.config.ContainerEnvironment;
import com.coyoapp.tinytask.domain.AppUser;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AppUserRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;


@SpringBootTest
@ActiveProfiles("test")
public class NotificationServiceIntegrationTest extends ContainerEnvironment {

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private AppUserRepository appUserRepository;

  @Autowired
  private NotificationService notificationService;

  @BeforeEach
  void setUp() {
    AppUser user1 = AppUser.builder().name("Hanna").mail("Hanna@gmail.com").build();
    AppUser user2 = AppUser.builder().name("Laura").mail("Laura@gmail.com").build();

    appUserRepository.saveAll(List.of(user1,user2));

    taskRepository.saveAll(List.of(
      Task.builder().appUser(user1).name("Kochen").done(true).build(),
      Task.builder().appUser(user1).name("Essen").done(false).build(),
      Task.builder().appUser(user2).name("Abspülen").done(false).build()
    ));
  }

  @Test
  public void sendNotificationsShouldSendEmailToAllUsers() {
    // When
    notificationService.sendNotifications();
  }

}

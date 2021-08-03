package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.domain.AppUser;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AppUserRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {


  private final JavaMailSender javaMailSender;
  private final AppUserRepository appUserRepository;
  private final TaskRepository taskRepository;

  public NotificationService(JavaMailSender javaMailSender, AppUserRepository appUserRepository, TaskRepository taskRepository) {
    this.javaMailSender = javaMailSender;
    this.appUserRepository = appUserRepository;
    this.taskRepository = taskRepository;
  }

  @Scheduled(cron = "0 0 7 * * MON-FRI")
  public void sendNotifications() {
    List<AppUser> appUsers = appUserRepository.findAll();

    for (AppUser appUser : appUsers) {

      SimpleMailMessage mail = new SimpleMailMessage();
      mail.setTo(appUser.getMail());
      mail.setFrom("noreply@tinytask.com");
      mail.setSubject("Deine Todo-Erinnerung");
      mail.setText(generateMail(appUser));

      javaMailSender.send(mail);
    }
  }

  private String generateMail(AppUser appUser) {
    List<Task> tasks = taskRepository.findByAppUserIdAndDone(appUser.getId(), false);
    StringBuilder mailContent = new StringBuilder();
    mailContent.append("Hallo ").append(appUser.getName()).append("!/r/n");
    if (tasks.isEmpty()) {
      mailContent.append("Es gibt keine offenen Todos!");
    } else {
      mailContent.append("Hier kommen deine offenen Todos:/r/n");
      tasks.forEach(task -> mailContent.append(task.getName()).append("/r/n"));
    }
    return mailContent.toString();
  }
}

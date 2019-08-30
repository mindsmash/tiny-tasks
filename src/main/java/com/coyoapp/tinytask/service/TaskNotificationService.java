package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskNotificationService {
  private final EmailService emailService;
  private final UserRepository repository;

  @Scheduled(cron = "0 0 8 * * MON-SAT")
  //@Scheduled(cron = "15 * * * * *")
  private void sendEmailsNotifications() {

    List<User> systemUsers = repository.findAll(Sort.by(Sort.Direction.ASC, "created"));
    systemUsers.forEach(user -> {
      List<Task> unfinishedTasks = user.getAssignedTasks().stream().filter(task -> !task.getStatus().equals(TaskStatus.DONE)).collect(Collectors.toList());
      if (!unfinishedTasks.isEmpty()) {
        emailService.sendTaskNotificationEmails(unfinishedTasks, user);
      }
    });
  }
}

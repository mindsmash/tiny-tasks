package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskNotificationService {
  private final EmailService emailService;
  private final TaskRepository repository;

  @Scheduled(cron = "0 0 8 * * MON-SAT ?")
  private void sendEmailsNotifications(){
    List<Task> undoneTasks = repository.findAllByStatusIsNot(TaskStatus.DONE);
  }
}

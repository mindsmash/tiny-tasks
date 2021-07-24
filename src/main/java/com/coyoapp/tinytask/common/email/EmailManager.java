package com.coyoapp.tinytask.common.email;

import com.coyoapp.tinytask.batch.TaskNotificationJob;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.domain.UserTask;
import com.coyoapp.tinytask.exception.TasksForMultipleUserException;
import com.coyoapp.tinytask.service.UserService;
import com.coyoapp.tinytask.service.UserTaskService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
public class EmailManager extends EmailSender {

  @Value("${mail.formats.task.template}")
  private String taskEmailTemplate;

  @Value("${mail.formats.task.header}")
  private String taskEmailHeader;

  private final UserTaskService userTaskService;

  private final TaskNotificationJob taskNotificationJob;

  public EmailManager(@Value("${scheduled-jobs.task-notifier.chunk-size}") Integer emailSenderChunkSize,
                      JavaMailSender javaMailSender,
                      UserTaskService userTaskService,
                      UserService userService) {
    super(javaMailSender);
    this.userTaskService = userTaskService;
    this.taskNotificationJob = new TaskNotificationJob(emailSenderChunkSize, userTaskService, userService, this);
  }

  @Scheduled(cron = "${scheduled-jobs.task-notifier.cron-tab}")
  @Transactional
  public void sendUnfinishedTaskEmailsForUsers() {
    log.debug("sendUnfinishedTaskEmailsForUsers()");
    this.taskNotificationJob.run();
  }

  @Transactional
  public void sendMailsForUnfinishedTasks(List<UserTask> userTasks) {
    Set<User> users = userTasks.stream().map(UserTask::getUser).collect(Collectors.toSet());
    if (users.size() > 1) {
      throw new TasksForMultipleUserException();
    }
    User user = users.iterator().next();
    String userName = user.getUserName();
    String email = user.getEmail();
    StringBuilder taskNames = new StringBuilder();
    userTasks.forEach(userTask -> {
      taskNames.append(userTask.getTask().getName()).append(", ");
      userTask.setLastNotified(LocalDateTime.now());
    });
    taskNames.setLength(taskNames.length() - 2);
    String filledTemplate = String.format(taskEmailTemplate, userName, taskNames);
    log.debug("this.sendEmail({}, {}, {})", email, taskEmailHeader, filledTemplate);
    this.sendEmail(email, taskEmailHeader, filledTemplate);
    userTaskService.saveAll(userTasks);
  }
}

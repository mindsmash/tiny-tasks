package com.coyoapp.tinytask.scheduler;

import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.enums.Duration;
import com.coyoapp.tinytask.service.NotificationService;
import com.coyoapp.tinytask.service.NotificationSettingService;
import com.coyoapp.tinytask.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class EMailScheduler {
  private final TaskService taskService;
  private final NotificationSettingService notificationSettingService;
  private final NotificationService notificationService;
  public EMailScheduler(TaskService taskService, NotificationSettingService notificationSettingService, NotificationService notificationService) {
    this.taskService = taskService;
    this.notificationSettingService = notificationSettingService;
    this.notificationService = notificationService;
  }

  @Scheduled(fixedDelayString = "#{120000}")
  public void sendEmailSchedule() {
    try {
      log.info("sendEmailSchedule() started");
      NotificationSettingModel notificationSetting = notificationSettingService.getNotificationSetting();
      LocalDate today = LocalDate.now();
      boolean allowEmailSending = notificationSetting.isActive() && !notificationSetting.getRequestedNotificationDate().isAfter(today);
      log.info("allowEmailSending: " + allowEmailSending);
      if (allowEmailSending) {
        List<TaskResponse> tasks = notificationSetting.isOnlyDueDate() ? taskService.getTasksWithinDays(notificationSetting.getDayBeforeDueDate()) : taskService.getTasks();
        log.info("number of total tasks: " + tasks.size());
        if (!CollectionUtils.isEmpty(tasks)) {
          notificationService.sendNotificationAboutTasks(notificationSetting.getEmail(), tasks, "TaskMail.ftl");
          notificationSettingService.updateNotificationRequestedDate(notificationSetting.getEmail(), today.plusDays(Duration.valueOf(notificationSetting.getDuration()).getDurationInDay()));
        }
      }
      log.info("sendEmailSchedule() finished.");
    } catch (Exception e) {
      log.error("sendEmailSchedule() got an error! {}", e.getMessage());
    }
  }
}

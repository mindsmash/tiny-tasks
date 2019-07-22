package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserTask;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;

@Component
public class AlertSender {


  static AlertSender alertSenderInstance;

  @Autowired
  public void setAlertSender(AlertSender alertSender){
    if(alertSenderInstance == null){
      alertSenderInstance = alertSender;
    }
  }

  org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AlertSender.class);
  private final TaskRepository taskRepository;
  private final EmailService emailService;

  @Autowired
  public AlertSender(TaskRepository taskRepository, EmailService emailService) {
    this.taskRepository = taskRepository;
    this.emailService = emailService;
  }

  private List<UserTask> getDueTaskList(ZonedDateTime dateTime){
    return taskRepository.getByDueDateTimeBeforeAndCompleted(dateTime, false);
  }

  private void sendEmails(List<UserTask> tasks){
    for (UserTask task: tasks){
      emailService.sendEmail(task.getEmail(), task.getTaskTitle(), getEmailMessage(task.getUserName(), task.getTaskTitle()));
    }
  }

  private String getEmailMessage(String userName, String taskTitle){
    StringBuilder sb = new StringBuilder();
    sb.append("Hello "+userName+"\n\n");
    sb.append("Your task " + taskTitle + " is approaching its due date and time. Consider completing it!\n\n");
    sb.append("Happy working,\n\nCoyo Team");
    return sb.toString();
  }

  public void sendAlerts(){
    ZonedDateTime now = ZonedDateTime.now();
    List<UserTask> tasks = getDueTaskList(now);
    sendEmails(tasks);
    log.debug("AlertSender: sent email alerts of " + tasks.size() + "(s) tasks at " + now.toString());
  }
}

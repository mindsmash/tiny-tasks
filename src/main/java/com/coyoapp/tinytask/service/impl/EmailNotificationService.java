package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.service.NotificationService;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class EmailNotificationService implements NotificationService {

  @Lazy
  @Autowired
  private TaskService taskService;

  @Autowired
  private UserService userService;

  @Autowired
  private JavaMailSender javaMailSender;

  @Override
  @Async
  public void notifyUserAboutNewTask(TaskResponse taskResponse) {
    this.notifyUserAboutTasksToDo(Arrays.asList(taskResponse));
  }

  @Override
  @Scheduled(cron = "0 0 0 * * *")
  public void sendScheduledNotification() {

    List<UserDTO> userDTOS = userService.getUsers();

    for (UserDTO userDTO : userDTOS) {
      List<TaskResponse> taskResponsesOfUser = this.taskService.findAllUndoneTasksOfUser(userDTO);
      this.notifyUserAboutTasksToDo(taskResponsesOfUser);
    }

  }


  @Async
  void notifyUserAboutTasksToDo(List<TaskResponse> taskResponses) {
    log.debug("notifyUserAboutTasksToDo(taskResponses={})", taskResponses);

    if (taskResponses == null) {
      return;
    }

    UserDTO recipient = taskResponses.get(0).getOwner();

    log.info("Creating scheduled notification for " + recipient.getName() + " at email address " + recipient.getEmail());

    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setTo(recipient.getEmail());

    msg.setSubject("Notification from Tiny Task app");

    String text = "Hi " + recipient.getName() + "!";
    text = text + '\n' + "You have to do the following tasks: \n";

    for (TaskResponse taskResponse: taskResponses) {
        text = text + "- " + taskResponse.getName() + '\n';
    }

    msg.setText(text);

    javaMailSender.send(msg);


  }

}

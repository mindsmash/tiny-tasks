package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.service.NotificationService;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class EmailNotificationService implements NotificationService {

  @Autowired
  private TaskService taskService;

  @Autowired
  private UserService userService;

  @Override
  public void notifyUserAboutNewTask(Task task) {

  }

  @Override
  @Scheduled(cron = "0 0 * * *")
  public void sendScheduledNotification() {

    List<UserDTO> userDTOS = userService.getUsers();

    for (UserDTO userDTO : userDTOS) {
      List<TaskResponse> taskResponsesOfUser = this.taskService.findAllUndoneTasksOfUser(userDTO);
      this.notifyUserAboutTasksToDo(taskResponsesOfUser);
    }

  }

  void notifyUserAboutTasksToDo(List<TaskResponse> taskResponses) {
    log.debug("notifyUserAboutTasksToDo(taskResponses={})", taskResponses);
  }

}

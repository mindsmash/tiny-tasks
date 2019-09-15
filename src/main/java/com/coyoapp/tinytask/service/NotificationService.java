package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;

public interface NotificationService {

  void notifyUserAboutNewTask(TaskResponse taskResponse);

  void sendScheduledNotification();

}

package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;

public interface NotificationService {

  void notifyUserAboutNewTask(Task task);

  void sendScheduledNotification();

}

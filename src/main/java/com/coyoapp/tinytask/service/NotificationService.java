package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;

import java.util.List;

public interface NotificationService {
  void sendNotificationAboutTasks(String email, List<TaskResponse> tasks, String templateFileName);
}

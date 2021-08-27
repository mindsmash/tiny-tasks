package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.NotificationRequest;
import com.coyoapp.tinytask.dto.NotificationResponse;

public interface NotificationService {

  NotificationResponse createNotification(NotificationRequest notificationRequest);

  NotificationResponse updateNotification(NotificationRequest notificationRequest);

}

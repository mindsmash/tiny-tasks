package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.NotificationRequest;
import com.coyoapp.tinytask.dto.NotificationResponse;

public interface NotificationService {

  NotificationResponse createNotification(String userId, NotificationRequest notificationRequest);

  NotificationResponse updateNotification(String id, NotificationRequest notificationRequest);

}

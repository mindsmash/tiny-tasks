package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.NotificationSettingModel;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

public interface NotificationSettingService {

  void updateNotificationSetting(NotificationSettingModel notificationDto);

  NotificationSettingModel getNotificationSetting();

  void updateNotificationRequestedDate(String email, LocalDate requestedNotificationDate);
}

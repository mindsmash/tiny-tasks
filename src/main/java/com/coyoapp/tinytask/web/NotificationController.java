package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.coyoapp.tinytask.service.NotificationSettingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
class NotificationController {

  private final NotificationSettingService notificationSettingService;

  @ResponseStatus(HttpStatus.OK)
  @PutMapping
  public void updateNotificationSetting(@RequestBody NotificationSettingModel notificationDto) {
    log.debug("updateNotificationSettings(notification={})", notificationDto);
    notificationSettingService.updateNotificationSetting(notificationDto);
  }

  @GetMapping
  public NotificationSettingModel getNotificationSetting() {
    log.debug("getNotificationSetting()");
    return notificationSettingService.getNotificationSetting();
  }
}

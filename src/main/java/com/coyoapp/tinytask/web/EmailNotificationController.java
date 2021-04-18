package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.service.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
class EmailNotificationController {

  private final EmailNotificationService emailNotificationService;

  @Scheduled(cron = "0 0 7 * * *", zone="Europe/Berlin")
  public void sendEmailNotification() {
    log.debug("sendEmailNotification()");
    emailNotificationService.sendEmailNotification();
  }

}

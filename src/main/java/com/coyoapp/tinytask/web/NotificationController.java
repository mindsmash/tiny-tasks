package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.NotificationRequest;
import com.coyoapp.tinytask.dto.NotificationResponse;
import com.coyoapp.tinytask.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

  private final NotificationService notificationService;

  @PostMapping
  public NotificationResponse createNotification(
    @RequestBody @Valid NotificationRequest notificationRequest,
    @RequestParam String userId) {
    log.debug("createNotification(notificationRequest={})", notificationRequest);
    return notificationService.createNotification(userId,notificationRequest);
  }

  @PutMapping(path = "/{id}")
  public NotificationResponse updateNotification(
    @RequestBody @Valid NotificationRequest notificationRequest,
    @PathVariable String id) {
    log.debug("updateNotification(notificationRequest={})", notificationRequest);
    return notificationService.updateNotification(id,notificationRequest);
  }

}

package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.ScheduleEmailRequest;
import com.coyoapp.tinytask.dto.ScheduleEmailResponse;
import com.coyoapp.tinytask.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDetail;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.time.ZonedDateTime;


@Slf4j
@RestController
@RequiredArgsConstructor
public class EmailJobSchedulerController {

  private final NotificationService notificationService;

  @PostMapping("/scheduleEmail")
  public ResponseEntity<ScheduleEmailResponse> scheduleEmail(@Valid @RequestBody ScheduleEmailRequest request) {

    try {
      ZonedDateTime dateTime = ZonedDateTime.of(request.getDateTime(), request.getTimeZone());
      if (dateTime.isBefore(ZonedDateTime.now())) {
        ScheduleEmailResponse scheduleEmailResponse = new ScheduleEmailResponse(false,
          "dateTime must be after current time");
        return ResponseEntity.badRequest().body(scheduleEmailResponse);
      }
      // ---- //
      JobDetail jobDetail = notificationService.setEmailNotification(request, dateTime);
      // ---- //
      ScheduleEmailResponse scheduleEmailResponse = new ScheduleEmailResponse(true,
        jobDetail.getKey().getName(), jobDetail.getKey().getGroup(), "Email Scheduled Successfully!");
      return ResponseEntity.ok(scheduleEmailResponse);
    } catch (SchedulerException ex) {
      log.error("Error scheduling email", ex);

      ScheduleEmailResponse scheduleEmailResponse = new ScheduleEmailResponse(false,
        "Error scheduling email. Please try again");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(scheduleEmailResponse);
    }

  }

}


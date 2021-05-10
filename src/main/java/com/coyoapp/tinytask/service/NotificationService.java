package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.ScheduleEmailRequest;
import org.quartz.JobDetail;
import org.quartz.SchedulerException;
import java.time.ZonedDateTime;

public interface NotificationService {

  JobDetail setEmailNotification(ScheduleEmailRequest request, ZonedDateTime dateTime) throws SchedulerException;
}

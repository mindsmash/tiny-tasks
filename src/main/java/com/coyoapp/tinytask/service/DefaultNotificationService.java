package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.ScheduleEmailRequest;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.jobs.EmailJob;
import com.coyoapp.tinytask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class DefaultNotificationService implements NotificationService {

  private final Scheduler scheduler;

  private final TaskRepository taskRepository;

  @Override
  public JobDetail setEmailNotification(ScheduleEmailRequest request, ZonedDateTime dateTime) throws SchedulerException, TaskNotFoundException {

    List<Task> tasks = taskRepository.findByUsersId(request.getUserID());
    if (tasks == null || tasks.isEmpty()) {
      throw new TaskNotFoundException();
    }
    // Filter undone & due tasks
    List<String> unfinishedTasks = tasks.stream()
      .filter(task -> !task.isDone() && task.getDueDate().isAfter(request.getDateTime().toLocalDate()))
      .map(Task::getName)
      .collect(Collectors.toList());

    JobDetail jobDetail = buildJobDetail(request.getEmail(), unfinishedTasks);
    Trigger trigger = buildJobTrigger(jobDetail, dateTime);
    scheduler.scheduleJob(jobDetail, trigger);

    return jobDetail;
  }

  private JobDetail buildJobDetail(String userEmail, List<String> tasks) {
    JobDataMap jobDataMap = new JobDataMap();

    jobDataMap.put("email", userEmail);
    jobDataMap.put("subject", "Coyo - You have unfinished tasks");
    jobDataMap.put("body", tasks.toString());

    //JobBuilder is a builder-style API to construct JobDetail instances
    return JobBuilder.newJob(EmailJob.class)
      .withIdentity(UUID.randomUUID().toString(), "email-jobs")
      .withDescription("Send Email Job")
      .usingJobData(jobDataMap)
      .storeDurably()
      .build();
  }

  /**
   * Configure Trigger for Quartz Jobs
   * Identified by a TriggerKey that comprises of a name and a group.
   * The name must be unique within a group.
   * A Job can have many Triggers, but a Trigger can only be associated with one Job.
   */
  private Trigger buildJobTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
    return TriggerBuilder.newTrigger()
      .forJob(jobDetail)
      .withIdentity(jobDetail.getKey().getName(), "email-triggers")
      .withDescription("Send Email Trigger")
      .startAt(Date.from(startAt.toInstant()))
      .withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow())
      .build();
  }
}

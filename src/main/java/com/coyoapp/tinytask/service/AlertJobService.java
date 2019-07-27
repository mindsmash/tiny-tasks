package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserTask;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.List;

import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

@Component
public class  AlertJobService {

	 static AlertJobService jobInstance;

	  @Autowired
	  public void setAlertJobService(AlertJobService job){
	    if(jobInstance == null){
	      jobInstance = job;
	    }
	  }

	  org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AlertJobService.class);
	  private final TaskRepository taskRepository;
	  private final EmailService emailService;

	  @Autowired
	  public AlertJobService(TaskRepository taskRepository, EmailService emailService) {
	    this.taskRepository = taskRepository;
	    this.emailService = emailService;
	  }

	  private List<UserTask> getDueTaskList(ZonedDateTime dateTime){
	    return taskRepository.getByDueDateTimeBeforeAndCompleted(dateTime, false);
	  }

	  private void sendEmails(List<UserTask> tasks){
	    for (UserTask task: tasks){
	      emailService.sendEmail(task.getEmail(), task.getTaskTitle(), getEmailMessage(task.getUserName(), task.getTaskTitle()));
	    }
	  }

	  private String getEmailMessage(String userName, String taskTitle){
	    StringBuilder sb = new StringBuilder();
	    sb.append("Hey "+userName+"\n\n");
	    sb.append("REMINDER!!! \n\nYour task " + taskTitle + " is due by today.!\n\n");
	    sb.append("Task Remider Alerts");
	    return sb.toString();
	  }

	  public void sendAlertToUser(){
	    ZonedDateTime now = ZonedDateTime.now();
	    List<UserTask> tasks = getDueTaskList(now);
	    sendEmails(tasks);
	    log.debug("AlertJobService: sent email alerts of " + tasks.size() + "(s) tasks at " + now.toString());
	  }

}

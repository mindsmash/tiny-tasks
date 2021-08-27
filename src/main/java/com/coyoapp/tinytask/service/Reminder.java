package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.State;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.util.BeanUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.*;

@Slf4j
public class Reminder implements Runnable {

  private JavaMailSender mailSender;

  private final String cronExpression;

  private TaskRepository taskRepository;

  public Reminder(String cronExpression) {
    this.cronExpression = cronExpression;
    this.mailSender = BeanUtil.getBean(JavaMailSender.class);
    this.taskRepository = BeanUtil.getBean(TaskRepository.class);
  }

  // Sends email to all users who have uncompleted tasks, active notification and same cronExpression
  public void run() {
    List<Task> tasks = taskRepository.findAllUncompletedByCronExpression(cronExpression);
    if (!tasks.isEmpty()) {
      Map<String, List<Task>> groupedTasks = getTasksGroupedByUser(tasks);
      mailSender.send(getMessages(groupedTasks));
      log.debug("Email has been sent to users with cronExpression: " + cronExpression);
    }
  }

  private MimeMessage[] getMessages(Map<String, List<Task>> groupedTasks) {
    MimeMessage[] messages = new MimeMessage[groupedTasks.size()];
    int index = 0;
    for (String userEmail : groupedTasks.keySet()) {
      messages[index] = getMessageInstance(userEmail,groupedTasks.get(userEmail));
      index++;
    }
    return messages;
  }

  private MimeMessage getMessageInstance(String userEmail, List<Task> tasks) {
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
    try {
      helper.setTo(userEmail);
      helper.setText(formatTasks(tasks),true);// enabling html
      helper.setSubject("Remaining tasks");
    } catch (MessagingException e) {
      e.printStackTrace();
    }
    return mimeMessage;
  }

  private String formatTasks(List<Task> tasks) {
    StringBuilder sb = new StringBuilder("<ul>");
    for (Task task : tasks)
      sb.append("<li>" + task.getName() + "</li>");
    sb.append("</ul>");
    return sb.toString();
  }

  private Map<String, List<Task>> getTasksGroupedByUser(List<Task> tasks) {
    Map<String, List<Task>> groupedTasks = new HashMap<>();
    for (Task task : tasks) {
      String userEmail = task.getUser().getEmail();
      if (groupedTasks.get(userEmail) == null)
        groupedTasks.put(userEmail, new ArrayList<>(List.of(task)));
      else
        groupedTasks.get(userEmail).add(task);
    }
    return groupedTasks;
  }

}

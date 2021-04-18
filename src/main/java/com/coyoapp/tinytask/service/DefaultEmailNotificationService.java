package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.constants.TinyTasksConstants;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UsersRepository;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultEmailNotificationService implements EmailNotificationService {

  private final TaskRepository taskRepository;
  private final UsersRepository usersRepository;

  @Override
  public void sendEmailNotification() {
    log.info("Sending Emails");
    List<Users> users = usersRepository.findAll();

    users.stream()
      .forEach(user -> {
        List<Task> usersTasks = getUserTasks(user.getUsername(), false);
        if(!usersTasks.isEmpty()) {
          this.sendMail(user, usersTasks);
        }
      });
    log.info("All emails were sent");
  }

  private List<Task> getUserTasks(String username, boolean isCompleted) {
    return taskRepository.findByUsernameResponsibleAndIsTaskCompleted(username, isCompleted);
  }

  private void sendMail(Users user, List<Task> userTasks) {
    Email from = new Email(System.getenv(TinyTasksConstants.FROM));
    Email to = new Email(user.getEmail());
    Content content = new Content(TinyTasksConstants.TYPE, this.createEmailBody(user, userTasks));
    Mail mail = new Mail(from, TinyTasksConstants.SUBJECT, to, content);

    SendGrid sg = new SendGrid(System.getenv(TinyTasksConstants.SENDGRID_API_KEY));

    try {
      Request request = new Request();
      request.setMethod(Method.POST);
      request.setEndpoint(TinyTasksConstants.ENDPOINT);
      request.setBody(mail.build());
      Response response = sg.api(request);
      log.info("Status {}", response.getStatusCode());
    } catch (IOException ex) {
      log.info(ex.getMessage());
    }
  }

  private String createEmailBody(Users user, List<Task> userTasks) {
    StringBuilder builder = new StringBuilder();
    builder.append(TinyTasksConstants.EMAIL_GREETINGS.concat(user.getUsername()));
    builder.append(TinyTasksConstants.TASKS_INCOMPLETE);
    userTasks.forEach(task->builder.append(task.getName() + "\n"));
    builder.append(TinyTasksConstants.SIGNATURE);

    return builder.toString();
  }
}

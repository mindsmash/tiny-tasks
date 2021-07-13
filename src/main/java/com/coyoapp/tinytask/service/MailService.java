package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class MailService {


  private final JavaMailSender javaMailSender;
  private final UserRepository userRepository;
  private final TaskRepository taskRepository;

  @Autowired
  public MailService(JavaMailSender javaMailSender, UserRepository userRepository, TaskRepository taskRepository){
    this.javaMailSender = javaMailSender;
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  @Scheduled(cron = "0 0 7 * * MON-FRI")
  public void sendMail(){
    List<User> userList = userRepository.findAll();

    if(userList.isEmpty()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No users found");
    }

    for (User user : userList
         ) {
      List<Task> taskList = getTasksByUserId(user.getId());
      Optional<String> mail = buildMailFromTasks(taskList, user.getUsername());

      if (mail.isPresent()){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("noreply@yourdailytasks.io");
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Hey! Here are some tasks for you :)");
        mailMessage.setText(mail.get());
        javaMailSender.send(mailMessage);
      }

    }
  }

  private List<Task> getTasksByUserId(String id){
    List<Task> taskList = taskRepository
      .findAllByUserId(id)
      .stream()
      .filter(Task::isInProgress)
      .collect(Collectors.toList());

    if(taskList.isEmpty()) {
      return Collections.emptyList();
    }
    return taskList;
  }
  private Optional<String> buildMailFromTasks (List<Task> taskList, String name){
    if (taskList.isEmpty()){
      return Optional.empty();
    }
    StringBuilder mail = new StringBuilder();
    mail.append("Good morning ").append(name).append(" here is a list of your open tasks: ");
    taskList.forEach(task -> mail.append("\n").append(task.getName()));

    return Optional.of(mail.toString());
  }
}

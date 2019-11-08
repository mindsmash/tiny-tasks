package com.coyoapp.tinytask.batch;

import com.coyoapp.tinytask.ResourceConstants;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.EmailService;
import com.coyoapp.tinytask.util.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

//Scheduled task which sends email to every user their unfinished tasks everyday

@Component
public class SendEmailBatch {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EmailService emailService;

  private static final Logger logger = LoggerFactory.getLogger(SendEmailBatch.class);



  @Scheduled(cron = ResourceConstants.CRON_EVERYDAY_EXPRESSION)
  public void sendUsersEmail() {
    logger.info("Email Schedule started");

    List<User> users = (List<User>) userRepository.findAll();
    try {
      if (null != users) sendEmail(users);
    }catch (Exception e) {
      e.printStackTrace();
    }
  }

  private void sendEmail(List<User> users) {
    for (User user : users) {
      if (null != user.getTasks() && !user.getTasks().isEmpty()) {
        Set<Task> tasks = user.getTasks();
        List<Task> unfinishedTasks = getUnfinishedTasks(tasks);
        if(!unfinishedTasks.isEmpty()){
          String emailBody = "Here are unfinished Tasks: \n";
          for (Task unfinished : unfinishedTasks) {
            emailBody = emailBody + " - " + unfinished.getName() + "\n";
          }

          String subject = ResourceConstants.EMAIL_SUBJECT;
          Email email = new Email();
          email.setSubject(subject);
          email.setBody(emailBody);
          email.setToEmail(user.getEmail());

          try {
            emailService.sendEmail(email);
          }catch (MessagingException | UnsupportedEncodingException me){
            me.printStackTrace();
          }
        }
      }
    }
  }

  private List<Task> getUnfinishedTasks(Set<Task> tasks) {
    List<Task> unfinishedTasks = new ArrayList<>();
    for (Task task:tasks) {
      if(!task.isDone()){
        unfinishedTasks.add(task);
      }
    }
    return unfinishedTasks;
  }
}

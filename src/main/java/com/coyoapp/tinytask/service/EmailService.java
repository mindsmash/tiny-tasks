package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Account;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AccountRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EmailService {

  @Qualifier("getJavaMailSender")
  @Autowired
  private JavaMailSender javaMailSender;

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private TaskRepository taskRepository;

  public EmailService(@Qualifier("getJavaMailSender") JavaMailSender javaMailSender, AccountRepository accountRepository, TaskRepository taskRepository) {
    this.javaMailSender = javaMailSender;
    this.accountRepository = accountRepository;
    this.taskRepository = taskRepository;
  }

  @Scheduled(cron="0 0 8 * * *")
  public void sendEmail() {

    List<Account> allAccounts = accountRepository.findAll();

    if (allAccounts.size() > 0) {
      for (Account account : allAccounts) {
        Optional<String> emailText = getEmailText(account);
        if (emailText.isPresent()) {
          SimpleMailMessage message = new SimpleMailMessage();
          message.setFrom("tech.challenge.coyo@gmail.com");
          message.setTo(account.getEmail());
          message.setSubject("This is your daily task list");
          message.setText(emailText.get());

          javaMailSender.send(message);
        }
      }
    }
  }

  public Optional<String> getEmailText(Account account) {
    List<Task> taskList = taskRepository.findByAccountId(account.getId());

    if (taskList.size() == 0) {
      return Optional.empty();
    }

    StringBuilder emailMessage = new StringBuilder();
    emailMessage.append("Hello " + account.getName() + ", \nhere is your daily task list:");

    for (Task task : taskList) {
      if (!task.isDone()) {
        emailMessage.append("\n" + task.getName());
      }
    }

    return Optional.of(emailMessage.toString());
  }

}

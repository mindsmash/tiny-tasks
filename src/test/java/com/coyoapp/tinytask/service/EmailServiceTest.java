package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Account;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AccountRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;


import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class EmailServiceTest {

  private final AccountRepository accountRepository = mock(AccountRepository.class);
  private final TaskRepository taskRepository = mock(TaskRepository.class);
  private final JavaMailSender javaMailSender = mock(JavaMailSender.class);

  private final EmailService emailService = new EmailService(javaMailSender, accountRepository, taskRepository);


  @Test
  @DisplayName("get email text returns email text")
  public void getEmailTextReturnsEmailText() {
    // Given
    Account testAccount = new Account() {{
      setEmail("awesome@mail.com");
      setId("awesomeId");
      setName("Awesome Name");
    }};
    when(taskRepository.findByAccountId("awesomeId")).thenReturn(List.of(
      new Task() {{
        setId("1234");
        setName("Awesome test task");
        setCreated(Instant.now());
        setDone(true);
      }},
      new Task() {{
        setId("5678");
        setName("Another awesome test task");
        setCreated(Instant.now());
        setDone(false);
      }}
    ));

    // When
    Optional<String> emailText = emailService.getEmailText(testAccount);

    // Then
    assertThat(emailText.get(), is("Hello Awesome Name, \nhere is your daily task list:\nAnother awesome test task"));

  }

  @Test
  @DisplayName("get email text should return empty optional when no tasks exist")
  public void getEmailTextShouldReturnEmptyOptionalWhenNoTasksExists(){
    // Given
    Account testAccount = new Account() {{
      setEmail("awesome@mail.com");
      setId("awesomeId");
      setName("Awesome Name");
    }};
    when(taskRepository.findByAccountId("awesomeId")).thenReturn(List.of());

    // When
    Optional<String> emailText = emailService.getEmailText(testAccount);

    // Then
    assertTrue(emailText.isEmpty());
  }

  @Test
  @DisplayName("send email sends email to all users")
  public void sendEmailSendEmailToAllUsers(){
    // Given
    when(accountRepository.findAll()).thenReturn(List.of(
      new Account() {{
        setEmail("awesome@mail.com");
        setId("awesomeId");
        setName("Awesome Name");
      }},
      new Account() {{
        setEmail("awesome2@mail.com");
        setId("awesomeId2");
        setName("Another Awesome Name");
      }}
    ));

    when(taskRepository.findByAccountId("awesomeId")).thenReturn(List.of(
      new Task() {{
        setId("1234");
        setName("Awesome test task");
        setCreated(Instant.now());
        setDone(true);
      }},
      new Task() {{
        setId("5678");
        setName("Another awesome test task");
        setCreated(Instant.now());
        setDone(false);
      }}
    ));

    when(taskRepository.findByAccountId("awesomeId2")).thenReturn(List.of(
      new Task() {{
        setId("9012");
        setName("Awesome test task");
        setCreated(Instant.now());
        setDone(false);
      }},
      new Task() {{
        setId("3456");
        setName("Another awesome test task");
        setCreated(Instant.now());
        setDone(true);
      }}
    ));


    SimpleMailMessage message1 = new SimpleMailMessage();
    message1.setFrom("tech.challenge.coyo@gmail.com");
    message1.setTo("awesome@mail.com");
    message1.setSubject("This is your daily task list");
    message1.setText("Hello Awesome Name, \nhere is your daily task list:\nAnother awesome test task");

    SimpleMailMessage message2 = new SimpleMailMessage();
    message2.setFrom("tech.challenge.coyo@gmail.com");
    message2.setTo("awesome2@mail.com");
    message2.setSubject("This is your daily task list");
    message2.setText("Hello Another Awesome Name, \nhere is your daily task list:\nAwesome test task");

    ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);

    // When
    emailService.sendEmail();

    // Then
    verify(javaMailSender, times(2)).send(captor.capture());
    assertThat(captor.getAllValues(), is(List.of(message1, message2)));
  }

}

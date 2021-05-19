package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Account;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.AccountRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import javax.transaction.Transactional;
import java.time.Instant;

@SpringBootTest
@Testcontainers
public class EmailServiceIntegrationTest {

  @Container
  private static PostgreSQLContainer  postgreSQLContainer = new PostgreSQLContainer("postgres:13.1-alpine")
    .withDatabaseName("awesome-test-db")
    .withUsername("awesome-test-user")
    .withPassword("awesomePassword");

  @Container
  private static GenericContainer greenmailContainer = new GenericContainer(DockerImageName.parse("greenmail/standalone:1.6.1"))
    .withEnv("GREENMAIL_OPTS", "-Dgreenmail.setup.test.all -Dgreenmail.hostname=0.0.0.0 -Dgreenmail.users=test:awesomeTestPassword")
    .withExposedPorts(3025);



  @DynamicPropertySource
  static void properties(DynamicPropertyRegistry registry){
    registry.add("spring.datasource.url", postgreSQLContainer::getJdbcUrl);
    registry.add("spring.datasource.password", postgreSQLContainer::getPassword);
    registry.add("spring.datasource.username", postgreSQLContainer::getUsername);
    registry.add("spring.mail.host", greenmailContainer::getHost);
    registry.add("spring.mail.port", greenmailContainer::getFirstMappedPort);
  }

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private EmailService emailService;

  @BeforeEach
  void setUp(){

    // Set up db
    Account account1 = new Account();
    account1.setEmail("awesome@mail.com");
    account1.setName("Awesome Name");
    account1.setId("1234");
    accountRepository.save(account1);

    Account account2 = new Account();
    account2.setEmail("awesome2@mail.com");
    account2.setId("awesomeId2");
    account2.setName("Another Awesome Name");

    accountRepository.save(account2);

    Task task1 = new Task();
    task1.setId("1234");
    task1.setName("Awesome test task");
    task1.setCreated(Instant.now());
    task1.setDone(true);

    taskRepository.save(task1);

    Task task2 = new Task();
    task2.setId("5678");
    task2.setName("Another awesome test task");
    task2.setCreated(Instant.now());
    task2.setDone(false);

    taskRepository.save(task2);

    Task task3 = new Task();
    task3.setId("9012");
    task3.setName("Awesome test task");
    task3.setCreated(Instant.now());
    task3.setDone(false);

    taskRepository.save(task3);

    Task task4 = new Task();
    task4.setId("3456");
    task4.setName("Another awesome test task");
    task4.setCreated(Instant.now());
    task4.setDone(true);

    taskRepository.save(task4);
  }

  @Test
  @Transactional
  @DisplayName("send email should send email to all users")
  public void sendEmailShouldSendEmailToAllUsers(){
    // When
    // This test tests SQL set up files for flyway as well as general email sending capabilities
    emailService.sendEmail();
  }

}

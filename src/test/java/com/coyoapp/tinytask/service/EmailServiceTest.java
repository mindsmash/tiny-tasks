package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.TinyTaskApplication;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = TinyTaskApplication.class)
public class EmailServiceTest {

  @Autowired
  private EmailService service;

  @Test
  public void sendTaskNotificationEmails() {
    User user = new User();
    user.setId("user1");
    user.setCreated(Instant.now());
    user.setEmail("joseym90@gmail.com");
    user.setName("Jose Manuel");
    user.setPassword("pass");
    Task t1 = new Task();
    t1.setAssignedTo(user);
    t1.setId("task1");
    t1.setCreated(Instant.now());
    t1.setName("task 1");
    t1.setStatus(TaskStatus.NEW);

    Task t2 = new Task();
    t2.setAssignedTo(user);
    t2.setId("task2");
    t2.setCreated(Instant.now());
    t2.setName("task 2");
    t2.setStatus(TaskStatus.IN_PROGRESS);

    Task t3 = new Task();
    t3.setAssignedTo(user);
    t3.setId("task3");
    t3.setCreated(Instant.now());
    t3.setName("task 3");
    t3.setStatus(TaskStatus.DONE);

    List<Task> tasks = new ArrayList<>();
    tasks.add(t1);
    tasks.add(t2);
    tasks.add(t3);

    service.sendTaskNotificationEmails(tasks, user);
  }
}

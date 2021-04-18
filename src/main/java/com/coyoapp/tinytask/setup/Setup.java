package com.coyoapp.tinytask.setup;

import com.coyoapp.tinytask.constants.TinyTasksConstants;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.UsersRequest;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class Setup {

  private final UsersService usersService;
  private final TaskService taskService;

  @EventListener(ApplicationReadyEvent.class)
  public void createUsers(){
    UsersRequest userJohnRequest = new UsersRequest();
    UsersRequest userJaneRequest = new UsersRequest();

    userJohnRequest.setUsername(TinyTasksConstants.USERNAME_JOHN);
    userJohnRequest.setEmail(TinyTasksConstants.EMAIL_JOHN);

    userJaneRequest.setUsername(TinyTasksConstants.USERNAME_JANE);
    userJaneRequest.setEmail(TinyTasksConstants.EMAIL_JANE);

    usersService.createUser(userJohnRequest);
    usersService.createUser(userJaneRequest);

  }

  @EventListener(ApplicationReadyEvent.class)
  public void createJohDoeTasks() {
    TaskRequest taskOneRequest = new TaskRequest();
    taskOneRequest.setName(TinyTasksConstants.TASK_ONE_JOHN);
    taskOneRequest.setUsernameResponsible(TinyTasksConstants.USERNAME_JOHN);

    TaskRequest taskTwoRequest = new TaskRequest();
    taskTwoRequest.setName(TinyTasksConstants.TASK_TWO_JOHN);
    taskTwoRequest.setUsernameResponsible(TinyTasksConstants.USERNAME_JOHN);

    taskService.createTask(taskOneRequest);
    taskService.createTask(taskTwoRequest);
  }

  @EventListener(ApplicationReadyEvent.class)
  public void createJaneDoeTasks() {
    TaskRequest taskOneRequest = new TaskRequest();
    taskOneRequest.setName(TinyTasksConstants.TASK_ONE_JANE);
    taskOneRequest.setUsernameResponsible(TinyTasksConstants.USERNAME_JANE);

    TaskRequest taskTwoRequest = new TaskRequest();
    taskTwoRequest.setName(TinyTasksConstants.TASK_TWO_JANE);
    taskTwoRequest.setUsernameResponsible(TinyTasksConstants.USERNAME_JANE);
    taskTwoRequest.setTaskCompleted(true);

    taskService.createTask(taskOneRequest);
    taskService.createTask(taskTwoRequest);
  }

}

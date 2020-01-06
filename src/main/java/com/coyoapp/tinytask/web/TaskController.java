package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;

import java.util.List;
import java.util.Objects;
import javax.validation.Valid;

import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;
  private final UserService userService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest, Authentication a) {
    log.debug("createTask(createTask={})", taskRequest);
    Users user = userService.findByUserName(a.getName());
    return taskService.createTask(taskRequest, user);
  }

  @GetMapping
  public List<TaskResponse> getTasks(Authentication a, Pageable pg) {
    log.debug("getTasks()");
    if (Objects.nonNull(a)) {
      Users user = userService.findByUserName(a.getName());
      return taskService.getTasks(user.getId(), pg);
    }
    return taskService.getTasks();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

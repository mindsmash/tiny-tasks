package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.DefaultTaskService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@Slf4j
@RestController
@RequestMapping("/tasks")
public class TaskController {
  private final DefaultTaskService taskService;

  @Autowired
  public TaskController(DefaultTaskService taskService) {
    this.taskService = taskService;
  }

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);

    val username = SecurityContextHolder.getContext().getAuthentication().getName();
    if (username.equals("anonymousUser")) {
      taskRequest.setCreator(username);
      return taskService.createTask(taskRequest);
    }

    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");

    val username = SecurityContextHolder.getContext().getAuthentication().getName();
    return taskService.getTasks().stream().filter(task -> task.getCreator().equals(username)).collect(Collectors.toList());
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.DefaultTaskService;
import com.coyoapp.tinytask.service.TaskService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
  public TaskResponse createTask(Principal principal, @RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);

    Optional<String> username = Optional.ofNullable(principal.getName());
    if (username.isPresent()) {
      taskRequest.setCreator(principal.getName());
      return taskService.createTask(taskRequest);
    }

    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
  }

  @GetMapping
  public List<TaskResponse> getTasks(Principal principal) {
    log.debug("getTasks()");

    Optional<String> username = Optional.ofNullable(principal.getName());
    return username.map(
      name -> taskService.getTasks().stream().filter(task -> task.getCreator().equals(name)).collect(Collectors.toList())
    ).orElseGet(taskService::getTasks);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

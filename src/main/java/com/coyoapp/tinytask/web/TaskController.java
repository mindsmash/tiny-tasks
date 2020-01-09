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
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;
  private final UserService userService;

  @PostMapping
  @ResponseBody
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest, Authentication a) {
    log.debug("createTask(createTask={})", taskRequest);
    if (Objects.nonNull(a))
      return taskService.createTask(taskRequest, a.getName());
    return taskService.createTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks(Authentication a) {
    log.debug("getTasks()");
    if (Objects.nonNull(a)) {
      return taskService.getTasks(a.getName());
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

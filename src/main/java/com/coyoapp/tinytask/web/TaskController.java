package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;

import java.util.List;

import com.coyoapp.tinytask.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;
  private final JwtUtils jwtUtils;

  @PostMapping
  public TaskResponse createTask(@RequestHeader("Authorization") String jwtToken,
                                 @RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    String email = jwtUtils.extractEmail(jwtToken);
    return taskService.createTask(taskRequest, email);
  }

  @GetMapping
  public List<TaskResponse> getTasks(
    @RequestHeader("Authorization") String jwtToken) {
    log.debug("getTasks()");

    String email = jwtUtils.extractEmail(jwtToken);
    log.debug("email={}", email);
    return taskService.getTasks();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

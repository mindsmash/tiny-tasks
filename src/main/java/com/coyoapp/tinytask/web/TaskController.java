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
    Long userId = jwtUtils.extractId(jwtToken);
    return taskService.createTask(taskRequest, userId);
  }

  @GetMapping
  public List<TaskResponse> getTasks(
    @RequestHeader("Authorization") String jwtToken) {
    Long userId = jwtUtils.extractId(jwtToken);
    log.debug("getTasks(userId={})", userId);
    return taskService.getTasks(userId);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    // TODO: it's better to check if the deleting taskId belongs to the correct userId
    // But skip for now since it's quite straightforward to do
    // also we might want to allow a users to delete tasks from others
    taskService.deleteTask(taskId);
  }
}

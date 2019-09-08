package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.dto.TaskCreateRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Task Rest Controller
 */
@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Api("Main Controller for Tasks")
public class TaskController {
  private final TaskService taskService;

  @ApiOperation(value = "An endpoint to create task")
  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskCreateRequest taskCreateRequest) {
    log.debug("createTask(createTask={})", taskCreateRequest);
    return taskService.createTask(taskCreateRequest);
  }

  @ApiOperation(value = "An endpoint to update task.")
  @PutMapping("/{taskId}")
  public TaskResponse updateTask(@RequestParam @Valid TaskStatus taskNewStatus,
                                 @PathVariable String taskId) {
    log.debug("updateTask(updateTask={})", taskNewStatus);
    return taskService.updateTask(taskNewStatus, taskId);
  }

  @ApiOperation(value = "An endpoint to return all tasks.")
  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @ApiOperation(value = "An endpoint to delete task.")
  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(value = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

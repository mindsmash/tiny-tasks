package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.dto.TaskCreateRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.TaskUpdateRequest;
import com.coyoapp.tinytask.service.TaskService;
import java.util.List;
import java.util.UUID;
import javax.validation.Valid;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


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

  @PutMapping("/{taskId}")
  public TaskResponse updateTask(@RequestParam @Valid TaskStatus taskupdateRequest,
                                 @PathVariable String taskId) {
    log.debug("updateTask(updateTask={})", taskupdateRequest);
    return taskService.updateTask(taskupdateRequest,taskId);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(value = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

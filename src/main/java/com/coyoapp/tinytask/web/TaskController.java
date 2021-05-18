package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;

import java.util.Arrays;
import java.util.List;
import javax.validation.Valid;

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

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    return taskService.createTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }

  @PutMapping(path = "/{taskId}")
  public TaskResponse updateTask(@PathVariable String taskId, @RequestBody @Valid TaskRequest taskRequest) {
    log.debug("updateTask(taskId={}, taskRequest={})", taskId, taskRequest);
    return taskService.updateTask(taskId, taskRequest);
  }

  @ResponseStatus(HttpStatus.OK)
  @PostMapping(path = "/deleteBulk")
  public void deleteTasks(@RequestBody String[] tasksId) {
    log.debug("deleteTasks(taskRequest={})", Arrays.toString(tasksId));
    taskService.deleteTasks(tasksId);
  }
}

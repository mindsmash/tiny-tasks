package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest, @RequestParam String userId) {
    log.debug("createTask(createTask={})", taskRequest);
    return taskService.createTask(userId,taskRequest);
  }

  @PutMapping(path = "/{id}")
  public TaskResponse updateTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable String id) {
    log.debug("updateTask(taskRequest={})", taskRequest);
    return taskService.updateTask(id,taskRequest);
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

}

package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    if(taskRequest.getDueDate()==null){
      taskRequest.setDueDate(LocalDate.now().minusYears(500L));
    }
    taskRequest.setCreated(Instant.now());
    taskRequest.setModified(taskRequest.getCreated());
    return taskService.createTask(taskRequest);
  }


  @PutMapping(path = "/{taskId}", consumes = "application/json")
  public TaskResponse doneTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable String taskId){
    Task taskToBeUpdated = taskService.getSingleTask(taskId);
    taskRequest.setName(taskToBeUpdated.getName());
    taskRequest.setDone(true);
    taskRequest.setDueDate(taskToBeUpdated.getDueDate());
    taskRequest.setCreated(taskToBeUpdated.getCreated());
    taskRequest.setModified(Instant.now());
    return taskService.updateTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @GetMapping(path="/{taskId}")
  public Task getSingleTask(@PathVariable String taskId){
    log.debug("getSingleTask()");
    return taskService.getSingleTask(taskId);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }
}

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
import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) throws ParseException {
    log.debug("createTask(createTask={})", taskRequest);
    if(taskRequest.getDueDate()==null){
      taskRequest.setDueDate(LocalDate.now().minusYears(500L));
    }
    return taskService.createTask(taskRequest);
  }

  @PostMapping(path = "/task/{taskId}", consumes = "application/json")
  public TaskResponse updateTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable String taskId){
    log.debug("updateTask(updateTask={} & taskId={})",taskRequest, taskId);
    Task task = (Task) taskService.getSingleTask(taskId);
    task.setName(taskRequest.getName());
    task.setDone(taskRequest.getDone());
    task.setDueDate(taskRequest.getDueDate());
    return taskService.updateTask(taskRequest);
  }

  //?
  @PutMapping(path = "/task/{taskId}", consumes = "application/json")
  public TaskResponse doneTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable String taskId){
    log.debug("doneTask(doneTask={} & taskId={})",taskRequest, taskId);
    Task task = (Task) taskService.getSingleTask(taskId);
    task.setDone(true);
    return taskService.updateTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @GetMapping(path="/{taskId}")
  public List<TaskResponse>getSingleTask(@PathVariable String taskId){
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

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
import java.util.Optional;


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
    log.debug("doneTask(doneTask={} & taskId={})",taskRequest, taskId);
    Optional<Task> taskToBeUpdated = taskService.getSingleTask(taskId);
    if(taskToBeUpdated.isPresent()){
      taskRequest.setDueDate(taskToBeUpdated.get().getDueDate());
      taskRequest.setName(taskToBeUpdated.get().getName());
    }
    log.debug("TaskRequest in question: \n{}",taskRequest.toString());
    taskRequest.setDone(true);
    return taskService.updateTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @GetMapping(path="/{taskId}")
  public Optional<Task> getSingleTask(@PathVariable String taskId){
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
// 2021-06-26 17:16:43.187  WARN 26385 --- [nio-8080-exec-4] .w.s.m.s.DefaultHandlerExceptionResolver :
// Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0]
// in public com.coyoapp.tinytask.dto.TaskResponse com.coyoapp.tinytask.web.TaskController.doneTask
// (com.coyoapp.tinytask.dto.TaskRequest,java.lang.String): [Field error in object 'taskRequest' on field
// 'name': rejected value [null]; codes [NotEmpty.taskRequest.name,NotEmpty.name,
// NotEmpty.java.lang.String,NotEmpty]; arguments [org.springframework.context.support.
// DefaultMessageSourceResolvable: codes [taskRequest.name,name]; arguments [];
// default message [name]]; default message [must not be empty]] ]

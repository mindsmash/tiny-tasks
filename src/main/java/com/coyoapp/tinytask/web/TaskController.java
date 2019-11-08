package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.ResourceConstants;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequestMapping(ResourceConstants.TINY_TASKS_V1 + "tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<List<TaskResponse>> getTasks() {
    return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
  }

  @GetMapping(path = "/{taskid}" ,produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<TaskResponse> getTask(@PathVariable String taskId) {
    return new ResponseEntity<>(taskService.getTask(taskId), HttpStatus.OK);
  }

  @PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<TaskResponse> createTask(@RequestBody @Valid TaskRequest taskRequest) {

    try{
      TaskResponse taskResponse = taskService.createTask(taskRequest);
      return new ResponseEntity<>(taskResponse, HttpStatus.CREATED);
    }catch (UserNotFoundException e){
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }

  @PutMapping(path = "/{taskId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<TaskResponse> updateTask(@PathVariable String taskId, @RequestBody @Valid TaskRequest taskRequest) {

    try{
      TaskResponse taskResponse = taskService.updateTask(taskRequest, taskId);
      return new ResponseEntity<>(taskResponse, HttpStatus.OK);
    }catch (NullPointerException e){
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    taskService.deleteTask(taskId);
  }
}

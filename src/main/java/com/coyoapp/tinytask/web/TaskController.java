package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;
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
public class TaskController {

  private final TaskService taskService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    return taskService.createTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks(@RequestParam(name = "q", required = false) String queryParam) {
    log.debug("getTasks(queryParam={})", queryParam);
    return taskService.getTasks(queryParam);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }

}

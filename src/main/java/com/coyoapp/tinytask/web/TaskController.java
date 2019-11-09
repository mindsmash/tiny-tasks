package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequestCreate;
import com.coyoapp.tinytask.dto.TaskRequestPatch;
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
  public TaskResponse createTask(@RequestBody @Valid TaskRequestCreate taskRequestCreate) {
    log.debug("createTask(createTask={})", taskRequestCreate);
    return taskService.createTask(taskRequestCreate);
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

  @ResponseStatus(HttpStatus.OK)
  @PatchMapping(path = "/{taskId}")
  public TaskResponse patchTask(@PathVariable String taskId, @RequestBody @Valid TaskRequestPatch taskRequestPatch) {
    log.debug("patchTask(taskId={}, data={})", taskId, taskRequestPatch);
    return taskService.patchTask(taskId, taskRequestPatch);
  }
}

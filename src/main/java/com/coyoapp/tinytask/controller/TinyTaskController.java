package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.TinyTask;
import com.coyoapp.tinytask.store.TaskStore;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/tinytasks")
@RestController
@Slf4j
public class TinyTaskController {

  @Autowired
  private TaskStore taskStore;

  @GetMapping
  public List<TinyTask> getTinyTasks() {
    log.debug("Invoked getTinyTasks");
    return taskStore.getAll();
  }

  @GetMapping("/{taskName}")
  public TinyTask getTinyTask(@PathVariable String taskName) {
    log.debug("Invoked getTinyTask for task name: {}", taskName);
    return taskStore.getTask(taskName);
  }

  @PostMapping(consumes = {"application/json"})
  @ResponseStatus(HttpStatus.CREATED)
  public TinyTask createTinyTask(@RequestBody TinyTask tinyTask) {
    log.debug("Invoked createTinyTask for Task: {}", tinyTask);
    return taskStore.addTask(tinyTask);
  }

  @DeleteMapping("/{taskName}")
  public TinyTask deleteTask(@PathVariable String taskName) {
    log.debug("Invoked deleteTask for task name {}", taskName);
    return taskStore.removeTask(taskName);
  }
}

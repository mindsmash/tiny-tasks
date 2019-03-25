package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("task")
public class TaskController {

  TaskService taskService;

  @Autowired
  public TaskController(TaskService taskService){
    this.taskService = taskService;
  }

  @GetMapping("/all")
  public ResponseEntity<Collection<Task>> getAllTasks() {
    Collection<Task> tasks = taskService.getAll();
    return new ResponseEntity<>(tasks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getOneTask(@PathVariable final Long id) {
    Optional<Task> task = taskService.getOne(id);
    if (task.isPresent()) {
      return new ResponseEntity<>(task.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(task.get(), HttpStatus.NOT_FOUND);
  }

  @PostMapping("/add")
  public ResponseEntity<Task> addTask(@Valid @RequestBody final Task request) {
    Task task = new Task();
    task.setName(request.getName());
    taskService.add(task);
    return new ResponseEntity<>(task, HttpStatus.CREATED);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<Task> updateTask(@PathVariable final Long id, @Valid @RequestBody final Task taskRequest) {
    Task updatedTask = taskService.updateTask(id, taskRequest.getName());
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteTask(@PathVariable final Long id){
    Optional<Task> task = taskService.getOne(id);
    task.ifPresent(taskToRemove -> taskService.remove(taskToRemove));
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}

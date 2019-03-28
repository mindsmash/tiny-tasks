package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.exception.ResourceNotFoundException;
import com.coyoapp.tinytask.model.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

  @Autowired
  private TaskRepository taskRepository;

  @GetMapping("/tasks")
  public Page<Task> getTasks(Pageable pageable) {
    return taskRepository.findAll(pageable);
  }


  @PostMapping("/tasks")
  public Task createTask(@Valid @RequestBody Task task) {
    return taskRepository.save(task);
  }

  @PutMapping("/tasks/{taskId}")
  public Task updateTask(@PathVariable Long taskId,
    @Valid @RequestBody Task taskRequest) {
    return taskRepository.findById(taskId)
      .map(task -> {
        task.setName(taskRequest.getName());
        task.setDone(taskRequest.getDone());
        return taskRepository.save(task);
      }).orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + taskId));
  }


  @DeleteMapping("/tasks/{taskId}")
  public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
    return taskRepository.findById(taskId)
      .map(task -> {
        taskRepository.delete(task);
        return ResponseEntity.ok().build();
      }).orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + taskId));
  }
}

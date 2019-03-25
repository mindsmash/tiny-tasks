package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;
import java.util.Optional;

@Service
@Slf4j
public class TaskServiceImpl implements TaskService {

  @Autowired
  private TaskRepository repository;

  @Override
  public Task add(Task task) {
    log.info("Saving task with name: {}", task.getName());
    return repository.save(task);
  }

  @Override
  public Optional<Task> getOne(Long id) {
    log.info("Getting task with id: {}", id);
    return repository.findById(id);
  }

  @Override
  public Collection<Task> getAll() {
    log.info("Getting all Tasks");
    return repository.findAll();
  }

  @Override
  public Task updateTask(Long id, String name) {
    log.info("Attempting to update Task with id: [{}, -- name: {}]", id, name);
    return repository.findById(id)
      .map(task -> {
        task.setName(name);
        return repository.save(task);
      }).orElseThrow(() -> new EntityNotFoundException("Could not find the Task to update."));
  }

  @Override
  public void remove(Task task) {
    log.info("Attempting to update Task");
    repository.delete(task);
  }
}

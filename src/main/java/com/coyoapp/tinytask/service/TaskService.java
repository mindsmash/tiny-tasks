package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;

import java.util.Collection;
import java.util.Optional;

public interface TaskService {
  Task add(Task task);
  Optional<Task> getOne(Long id);
  Collection<Task> getAll();
  Task updateTask(Long id, String name);
  void remove(Task task);
}

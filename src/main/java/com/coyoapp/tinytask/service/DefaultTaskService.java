package com.coyoapp.tinytask.service;

import static java.util.stream.Collectors.toList;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

  private final TaskRepository taskRepository;
  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public TaskResponse createTask(TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    Task task = mapperFacade.map(taskRequest, Task.class);
    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional(readOnly = true)
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  @Transactional(readOnly = true)
  public List<TaskResponse> getTasksByUsername(String username) {
    log.debug("getTasks for user with username {}", username);
    Optional<List<Task>> tasks = taskRepository
      .findAllTasksByUser(userRepository.findByUsername(username).orElseThrow(
        EntityNotFoundException::new));
    return tasks.orElse(new ArrayList<Task>())
      .stream().map(this::transformToResponse).collect(toList());
  }

  private TaskResponse transformToResponse(Task task) {
    return mapperFacade.map(task, TaskResponse.class);
  }

  @Override
  @Transactional
  public void deleteTask(String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskRepository.delete(getTaskOrThrowException(taskId));
  }

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

}

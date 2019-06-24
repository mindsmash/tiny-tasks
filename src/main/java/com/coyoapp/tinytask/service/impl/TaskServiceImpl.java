package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.util.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

  private final TaskRepository taskRepository;
  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public TaskResponse createTask(TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    Task task = mapperFacade.map(taskRequest, Task.class);
    task.setUsername(Utils.decrypt(task.getUsername()));
    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional
  public TaskResponse updateTask(Task task) {
    log.debug("updateTask(updateTask={})", task);
    Optional<Task> verifyTask = taskRepository.findById(task.getId());
    Task task1 = verifyTask.orElseThrow(TaskNotFoundException::new);
    task.setUsername(task1.getUsername());
    task.setCreated(task1.getCreated());

    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional(readOnly = true)
  public List<TaskResponse> getTasks(String token) {
    log.debug("getTasks()");
    return taskRepository.findAllByUsername(Utils.decrypt(token)).stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  public List<Task> getAllByUsernameAndStatusNot(String username, String status) {
    return taskRepository.findAllByUsernameAndStatusNot(username, status);
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

package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

  private final TaskRepository taskRepository;
  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public TaskResponse createTask(String userId, TaskRequest taskRequest) {
    log.debug("createTask(taskRequest={})", taskRequest);
    User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    Task task = mapperFacade.map(taskRequest, Task.class);
    task.setUser(user);
    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional(readOnly = true)
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  @Transactional
  public void deleteTask(String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskRepository.delete(getTaskOrThrowException(taskId));
  }

  @Override
  @Transactional
  public TaskResponse updateTask(String id, TaskRequest taskRequest) {
    log.debug("updateTask(taskRequest={})", taskRequest);
    Task task = getTaskOrThrowException(id);
    mapUpdatedTask(taskRequest,task);
    return transformToResponse(taskRepository.save(task));
  }

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

  private TaskResponse transformToResponse(Task task) {
    return mapperFacade.map(task, TaskResponse.class);
  }

  private void mapUpdatedTask(TaskRequest taskRequest, Task task) {
    task.setName(taskRequest.getName());
    task.setState(taskRequest.getState());
    task.setDueDate(taskRequest.getDueDate());
  }
}

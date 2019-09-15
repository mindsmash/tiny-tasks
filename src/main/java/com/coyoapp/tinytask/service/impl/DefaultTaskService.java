package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.service.NotificationService;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.UserService;
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
  private final UserService userService;
  private final MapperFacade mapperFacade;
  private final NotificationService notificationService;

  @Override
  @Transactional
  public TaskResponse createTask(TaskRequest taskRequest) {
    log.debug("createTask(createTask={})", taskRequest);
    Task task = mapperFacade.map(taskRequest, Task.class);

    if (task.getOwner() != null) {
      UserDTO user = userService.get(taskRequest.getOwner().getId());
      if (user == null) {
        user = userService.create(taskRequest.getOwner());
      }
      User userModel = mapperFacade.map(user, User.class);
      task.setOwner(userModel);
    }

    TaskResponse taskResponse = transformToResponse(taskRepository.save(task));
    notificationService.notifyUserAboutNewTask(taskResponse);
    return taskResponse;
  }

  @Override
  public List<TaskResponse> findAllUndoneTasksOfUser(UserDTO owner) {
    User ownerModel = this.mapperFacade.map(owner, User.class);
    return taskRepository.findByOwnerAndIsCompleted(ownerModel, false).stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  @Transactional(readOnly = true)
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
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

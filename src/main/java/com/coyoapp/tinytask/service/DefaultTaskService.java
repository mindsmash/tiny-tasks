package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

  private final TaskRepository taskRepository;
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

  private TaskResponse transformToResponse(Task task) {
    return mapperFacade.map(task, TaskResponse.class);
  }

  @Override
  @Transactional
  public void deleteTask(String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskRepository.delete(getTaskOrThrowException(taskId));
  }

  @Override
  @Transactional
  public void deleteTasks(String[] tasksId) {
    log.debug("deleteTasks(taskRequest={})", Arrays.toString(tasksId));
    for (String taskId : tasksId) {
      taskRepository.delete(getTaskOrThrowException(taskId));
    }
  }

  @Override
  @Transactional
  public TaskResponse updateTask(String taskId, TaskRequest taskRequest) {
    log.debug("updateTask(taskId={}, taskRequest={})", taskId, taskRequest);
    Task task = mapperFacade.map(taskRequest, Task.class);
    return transformToResponse(taskRepository.save(task));
  }

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

}

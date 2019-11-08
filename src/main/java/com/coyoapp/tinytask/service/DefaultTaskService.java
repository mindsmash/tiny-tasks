package com.coyoapp.tinytask.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService {
//
//  private final TaskRepository taskRepository;
//  private final MapperFacade mapperFacade;
//
//  @Override
//  @Transactional
//  public TaskResponse createTask(TaskRequest taskRequest) {
//    log.debug("createTask(createTask={})", taskRequest);
//    Task task = mapperFacade.map(taskRequest, Task.class);
//    return transformToResponse(taskRepository.save(task));
//  }
//
//  @Override
//  @Transactional(readOnly = true)
//  public List<TaskResponse> getTasks() {
//    log.debug("getTasks()");
//    return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
//  }
//
//  private TaskResponse transformToResponse(Task task) {
//    return mapperFacade.map(task, TaskResponse.class);
//  }
//
//  @Override
//  @Transactional
//  public void deleteTask(String taskId) {
//    log.debug("deleteTask(taskId={})", taskId);
//    taskRepository.delete(getTaskOrThrowException(taskId));
//  }
//
//  private Task getTaskOrThrowException(String taskId) {
//    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
//  }

}

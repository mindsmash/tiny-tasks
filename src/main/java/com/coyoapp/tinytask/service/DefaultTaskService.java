package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.dto.TaskCreateRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.TaskUpdateRequest;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
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
  public TaskResponse createTask(TaskCreateRequest taskCreateRequest) {
    log.debug("createTask(createTask={})", taskCreateRequest);
    Task task = mapperFacade.map(taskCreateRequest, Task.class);
    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional
  public TaskResponse updateTask(TaskStatus newStatus, String taskId) {
    if(!taskRepository.findById(taskId).isPresent()){
      throw new TaskNotFoundException("No task found for Id="+ taskId);
    }else {
      Task task = taskRepository.findById(taskId).get();
      task.setStatus(newStatus);
      return transformToResponse(taskRepository.save(task));
    }
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

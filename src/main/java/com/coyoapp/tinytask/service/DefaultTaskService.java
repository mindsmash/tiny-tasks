package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.io.IOException;
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

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

  @Override
  @Transactional
  public TaskResponse addFile(String taskId, FileRequest filerequest) {
    log.debug("addFile(addFile(taskId={}))", taskId);
    Task task = getTaskOrThrowException(taskId);
    try {
      task.setAttachment_data(filerequest.getFile().getBytes());
    } catch ( IOException e ) {
      log.error("GetBytes did not work for File " + e.toString());
    }
    task.setAttachment_name(filerequest.getFile().getOriginalFilename());
    task.setAttachment_type(filerequest.getFile().getContentType());
    return transformToResponse(taskRepository.save(task));
  }

  @Override
  @Transactional
  public TaskResponse deleteFile(String taskId) {
    log.debug("deleteFile(deleteFile(taskId={}))", taskId);
    Task task = getTaskOrThrowException(taskId);
    task.setAttachment_data(null);
    task.setAttachment_name(null);
    task.setAttachment_type(null);
    return transformToResponse(taskRepository.save(task));
  }
}

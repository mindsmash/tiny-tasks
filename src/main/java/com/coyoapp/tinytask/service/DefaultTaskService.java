package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.enums.TaskStatus;
import com.coyoapp.tinytask.exception.DuplicateTaskException;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.exception.UnexpectedException;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.dao.DataIntegrityViolationException;
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
//  @Transactional  // the exceptions can be caught and expanded.
  public TaskResponse createTask(TaskRequest taskRequest) {
    try {
      log.debug("createTask(createTask={})", taskRequest);
      Task task = mapperFacade.map(taskRequest, Task.class);
      task.setTaskStatus(TaskStatus.TODO); // initialize status of any task
      return transformToResponse(taskRepository.save(task));
    } catch (DataIntegrityViolationException dive) {
      throw new DuplicateTaskException();
    } catch (Exception e) {
      throw new UnexpectedException();
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

  @Override
  public TaskResponse getTaskById(String id) {
    log.debug("getTaskById(id={})", id);
    Task task = taskRepository.findById(id).orElseThrow(TaskNotFoundException::new);
    TaskResponse taskResponse = new TaskResponse();
    taskResponse.setName(task.getName());
    return taskResponse;
  }

  /**
   * Find task by id and change its task status
   *
   * @param taskRequest, taskId
   * @return taskResponse
   */
  @Override
  public TaskResponse changeStatus(TaskRequest taskRequest, String taskId) {
    Task task = taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
    task.setTaskStatus(taskRequest.getTaskStatus());
    task = taskRepository.save(task);
    return mapperFacade.map(task, TaskResponse.class);
  }

  @Override
  @Transactional
  public void deleteAllTasksDone() {
    taskRepository.deleteByTaskStatus(TaskStatus.DONE);
  }

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

}

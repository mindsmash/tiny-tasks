package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequestCreate;
import com.coyoapp.tinytask.dto.TaskRequestPatch;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
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
  public TaskResponse createTask(TaskRequestCreate taskRequestCreate) {
    log.debug("createTask(createTask={})", taskRequestCreate);
    Task task = mapperFacade.map(taskRequestCreate, Task.class);
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
  public void deleteTasks(Task[] tasks) {
    log.debug("deleteTasks(tasks={})", tasks);
    for (Task task : tasks) {
      taskRepository.delete(getTaskOrThrowException(task.getId()));
    }
  }

  @Override
  @Transactional
  public void deleteTask(String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskRepository.delete(getTaskOrThrowException(taskId));
  }

  @Override
  @Transactional
  public TaskResponse patchTask(String taskId, TaskRequestPatch taskRequestPatch) {
    log.debug("patchTask(taskId={}, data={})", taskId, taskRequestPatch);
    Task task = getTaskOrThrowException(taskId);
    Task patchedTask = mapperFacade.map(taskRequestPatch, Task.class);

    task.setDone(patchedTask.getDone());

    return transformToResponse(taskRepository.save(task));
  }

  private Task getTaskOrThrowException(String taskId) {
    return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
  }

}

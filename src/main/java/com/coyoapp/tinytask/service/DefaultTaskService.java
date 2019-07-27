package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
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
  private final UserRepository userRepository;

  @Override
  @Transactional
  public TaskResponse createTask(TaskRequest taskRequest) throws Exception {
    log.debug("createTask(createTask={})", taskRequest);
    Task task = mapperFacade.map(taskRequest, Task.class);
    //return transformToResponse(taskRepository.save(task));
    return userRepository.findById(taskRequest.getTaskOwnerId()).map(user -> {
        Task task = mapperFacade.map(taskRequest, Task.class);
        task.setTaskOwner(user);
        Task ts = taskRepository.save(task);
        return transformToResponse(taskRepository.save(ts));
      }).orElseThrow(() -> new Exception("No user found with: " + taskRequest.getTaskOwnerId()));
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

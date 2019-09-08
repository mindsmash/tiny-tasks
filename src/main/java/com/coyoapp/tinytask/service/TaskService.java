package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.dto.TaskCreateRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {

  /**
   * Mehtod to create task
   * @param taskCreateRequest task creation request
   * @return task response.
   */
  TaskResponse createTask(TaskCreateRequest taskCreateRequest);

  /**
   * Mehtod to update task
   * @param newStatus
   * @param taskId
   * @return
   */
  TaskResponse updateTask(TaskStatus newStatus, String taskId);

  /**
   * Mehtod to get tasks
   * @return
   */
  List<TaskResponse> getTasks();

  /**
   * Mehtod to Delete task
   * @param taskId
   */
  void deleteTask(String taskId);

}

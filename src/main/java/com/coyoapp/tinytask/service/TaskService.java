package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

  TaskResponse getTaskById(String name);

  TaskResponse changeStatus(TaskRequest taskRequest, String taskId);

  void deleteAllTasksDone();
}

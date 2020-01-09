package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;

import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  TaskResponse createTask(TaskRequest taskRequest, String user);

  List<TaskResponse> getTasks();

  List<TaskResponse> getTasks(String username);

  void deleteTask(String taskId);

}

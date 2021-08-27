package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {

  TaskResponse createTask(String userId,TaskRequest taskRequest);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

  TaskResponse updateTask(String id, TaskRequest taskRequest);

}

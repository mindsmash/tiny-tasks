package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserDTO;

import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  List<TaskResponse> findAllUndoneTasksOfUser(UserDTO owner);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

}

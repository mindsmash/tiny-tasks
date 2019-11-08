package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.exception.UserNotFoundException;

import java.util.List;

public interface TaskService {

  List<TaskResponse> getAllTasks();

  TaskResponse getTask(String id) throws TaskNotFoundException;

  TaskResponse createTask(TaskRequest taskRequest) throws UserNotFoundException;

  TaskResponse updateTask(TaskRequest taskRequest, String taskId) throws TaskNotFoundException, UserNotFoundException;

  void deleteTask(String taskId) throws TaskNotFoundException;

}

package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  List<TaskResponse> getTasks();

  List<TaskResponse> getTasksWithinDays(int days);

  void deleteTask(String taskId);

  void updateTask(String taskId, LocalDate dueDate);

}

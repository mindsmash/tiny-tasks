package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;
import java.util.Optional;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

  Optional<Task> getSingleTask(String taskId);

  TaskResponse updateTask(TaskRequest taskRequest);

}

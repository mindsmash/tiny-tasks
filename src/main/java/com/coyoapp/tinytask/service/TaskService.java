package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  TaskResponse updateTask(Task taskRequest);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

}

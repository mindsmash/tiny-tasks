package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequestCreate;
import com.coyoapp.tinytask.dto.TaskRequestPatch;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequestCreate taskRequestCreate);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

  TaskResponse patchTask(String taskId, TaskRequestPatch taskRequestPatch);

}

package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest, Users user);

  List<TaskResponse> getTasks();

  List<TaskResponse> getTasks(Integer userId, Pageable pg);

  void deleteTask(String taskId);

}

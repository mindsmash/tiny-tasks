package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.domain.UserTask;
import com.coyoapp.tinytask.dto.UserTaskRequest;
import com.coyoapp.tinytask.dto.UserTaskResponse;
import java.util.List;

public interface UserTaskService {

  List<UserTask> getTasksWillNotifiedByUsers(User user);

  void saveAll(List<UserTask> userTasks);

  UserTask finishUserTask(String userTaskId);

  void deleteUserTask(String userTaskId);

  List<UserTask> getAllUserTasks();

  List<UserTask> getAllUserTasksByUserId(String userId);

  UserTask assignNewTask(UserTaskRequest userTaskRequest);
}

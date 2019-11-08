package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskResponse;

import java.util.List;

public interface TinyTaskService {

  List<TaskResponse> getAllUserTasks(String userId);

}

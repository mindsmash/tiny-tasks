package com.coyoapp.tinytask.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest, MultipartFile image) throws IOException;

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

}

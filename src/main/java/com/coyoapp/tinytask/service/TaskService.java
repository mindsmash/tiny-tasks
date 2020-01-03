package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest, Optional<MultipartFile> multipartFile);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

}

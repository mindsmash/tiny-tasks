package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface TaskService {

  TaskResponse createTask(TaskRequest taskRequest);

  List<TaskResponse> getTasks();

  void deleteTask(String taskId);

  Task getTaskByid(String taskId);
  
  String storeTaskFile(MultipartFile file);
  
  Resource loadTaskFile(String fileName);

}

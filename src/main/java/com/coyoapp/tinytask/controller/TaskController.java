package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.ApiResponse;
import com.coyoapp.tinytask.entity.Task;
import com.coyoapp.tinytask.exception.AppException;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/task/")
public class TaskController {

  @Autowired
  TaskService taskService;

  @GetMapping()
  public ApiResponse listTasks() throws AppException {
    List<Task> list = taskService.list();
    return ApiResponse.response(list);
  }

  @PostMapping()
  public ApiResponse createTask() throws AppException {
    return ApiResponse.response(taskService.list());
  }

}

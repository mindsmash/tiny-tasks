package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.TinyTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "tinyTaskService")
public class TinyTaskServiceImpl implements TinyTaskService {

  @Autowired
  TaskRepository taskRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ConversionService conversionService;

  @Override
  public List<TaskResponse> getAllUserTasks(String userId) {
    List<Task> tasks = taskRepository.findByUserId(userId);
    List<TaskResponse> responses = new ArrayList<>();
    for (Task task : tasks) {
      responses.add(conversionService.convert(task, TaskResponse.class));
    }
    return responses;
  }



}

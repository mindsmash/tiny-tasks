package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskDto;
import com.coyoapp.tinytask.entity.Task;
import com.coyoapp.tinytask.exception.AppException;

import java.util.List;
public interface TaskService {
  List<Task> list() throws AppException;
  Task create(TaskDto dto) throws AppException;
}

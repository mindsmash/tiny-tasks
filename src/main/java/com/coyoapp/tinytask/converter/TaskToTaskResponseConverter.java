package com.coyoapp.tinytask.converter;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskResponse;
import org.springframework.core.convert.converter.Converter;

public class TaskToTaskResponseConverter implements Converter<Task, TaskResponse> {
  @Override
  public TaskResponse convert(Task source) {
    TaskResponse taskResponse = new TaskResponse();
    taskResponse.setId(source.getId());
    taskResponse.setName(source.getName());
    taskResponse.setCreatedDate(source.getCreated());
    taskResponse.setDetail(source.getDetail());
    taskResponse.setDueDate(source.getDueDate());
    taskResponse.setUser(source.getUser());
    taskResponse.setDone(source.isDone());

    return taskResponse;
  }
}

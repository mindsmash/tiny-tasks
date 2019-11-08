package com.coyoapp.tinytask.converter;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import org.springframework.core.convert.converter.Converter;

public class TaskRequestToTaskConverter implements Converter<TaskRequest, Task> {

  @Override
  public Task convert(TaskRequest source) {
    Task task= new Task();

    if(null != source.getId()) {
      task.setId(source.getId());
    }

    task.setName(source.getName());
    task.setDetail(source.getDetail());
    task.setDueDate(source.getDueDate());
    task.setDone(source.isDone());

    return task;
  }
}

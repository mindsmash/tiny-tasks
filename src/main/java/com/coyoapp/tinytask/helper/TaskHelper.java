package com.coyoapp.tinytask.helper;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import lombok.RequiredArgsConstructor;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
public class TaskHelper {

  private final FileHelper fileHelper;
  private final MapperFacade mapperFacade;

  public List<TaskResponse> tasksToResponses(List<Task> tasks) {
    return tasks.stream().map(this::taskToResponse).collect(toList());
  }

  public TaskResponse taskToResponse(Task task) {
    // transform attached files to fileResponses
    Set<FileResponse> fileResponses = task.getAttachedFiles().stream().
      map(fileHelper::fileToResponse).collect(Collectors.toSet());

    // build task response
    return TaskResponse.builder()
      .id(task.getId())
      .name(task.getName())
      .files(fileResponses)
      .build();
  }

  public Task requestToTask(TaskRequest taskRequest) {
    return mapperFacade.map(taskRequest, Task.class);
  }
}

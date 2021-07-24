package com.coyoapp.tinytask.dto;

import java.time.LocalDateTime;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTaskRequest {

  @NotEmpty
  String userId;

  @NotEmpty
  String taskId;

  LocalDateTime dueDate;
}

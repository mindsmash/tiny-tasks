package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserTaskResponse {

  private Task task;

  private User user;

  private LocalDateTime lastNotified;

  private Boolean isDone;

  private LocalDateTime dueDate;
}

package com.coyoapp.tinytask.exception;

public class TaskCreateError extends AppException {
  public TaskCreateError(String detail) {
    super("Task can not be created", ErrorCode.TASK_CREATE_ERROR);
  }
}

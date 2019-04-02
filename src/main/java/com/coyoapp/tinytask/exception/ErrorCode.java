package com.coyoapp.tinytask.exception;

public enum ErrorCode {
  UNEXPECTED_ERROR(999),
  TASK_CREATE_ERROR(101);

  int code;

  ErrorCode(int code) {
    this.code = code;
  }

  @Override
  public String toString() {
    return String.valueOf(code);
  }
}

package com.coyoapp.tinytask.exception;

public abstract class AppException extends Throwable {
  String message;
  ErrorCode code;

  public AppException(String message, ErrorCode code) {
    this.message = message;
    this.code = code;
  }

  @Override
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ErrorCode getCode() {
    return code;
  }

  public void setCode(ErrorCode code) {
    this.code = code;
  }
}

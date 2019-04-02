package com.coyoapp.tinytask.exception;

public class UnexpectedError extends AppException {
  public UnexpectedError() {
    super("Unexpected error occurred", ErrorCode.UNEXPECTED_ERROR);
  }
}

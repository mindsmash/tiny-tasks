package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.exception.AppException;
import com.coyoapp.tinytask.exception.ErrorCode;

public class AppError {

  ErrorCode code;
  String message;

  private AppError(ErrorCode code, String message) {
    this.code = code;
    this.message = message;
  }


  public static class Builder {
    private AppException exception;

    public Builder() {
    }

    public Builder setException(AppException exception) {
      this.exception = exception;
      return this;
    }

    public AppError build() {
      return new AppError(this.exception.getCode(),
        this.exception.getMessage());
    }
  }
}

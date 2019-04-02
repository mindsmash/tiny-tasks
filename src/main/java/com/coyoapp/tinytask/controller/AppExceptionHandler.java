package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.ApiResponse;
import com.coyoapp.tinytask.dto.AppError;
import com.coyoapp.tinytask.exception.AppException;
import com.coyoapp.tinytask.exception.UnexpectedError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseStatus(HttpStatus.OK)
public class AppExceptionHandler {

  @ExceptionHandler(value = {RuntimeException.class})
  public ApiResponse unexpected(){
    AppError.Builder builder = new AppError.Builder();
    AppError error = builder.setException(new UnexpectedError()).build();
    return ApiResponse.error(error);
  }

  @ExceptionHandler(value = {AppException.class})
  public ApiResponse returnError(AppException e){
    AppError.Builder builder = new AppError.Builder();
    AppError error = builder.setException(e).build();
    return ApiResponse.error(error);
  }

}

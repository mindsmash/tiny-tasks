package com.coyoapp.tinytask.web.advice;

import com.coyoapp.tinytask.exception.TaskNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
@Slf4j
public class TaskControllerAdvice {

  @ExceptionHandler({RuntimeException.class})
  public ResponseEntity<String> handleRunTimeException(RuntimeException e) {
    return error(INTERNAL_SERVER_ERROR, e);
  }

  @ExceptionHandler({MethodArgumentTypeMismatchException.class})
  public ResponseEntity<String> MethodArgumentTypeMismatchException(RuntimeException exception) {
    return error(BAD_REQUEST, exception);
  }

  @ExceptionHandler({TaskNotFoundException.class})
  public ResponseEntity<String> handleNotFoundException(TaskNotFoundException exception) {
    return error(NOT_FOUND, exception);
  }

  private ResponseEntity<String> error(HttpStatus status, Exception exception) {
    log.error("Exception : ", exception);
    return ResponseEntity.status(status).body(exception.getMessage());
  }

}

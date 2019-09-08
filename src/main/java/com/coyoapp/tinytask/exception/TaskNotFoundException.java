package com.coyoapp.tinytask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TaskNotFoundException extends RuntimeException {
  public TaskNotFoundException(){
    super();
  }

  public TaskNotFoundException(String msg){
    super(msg);
  }
}

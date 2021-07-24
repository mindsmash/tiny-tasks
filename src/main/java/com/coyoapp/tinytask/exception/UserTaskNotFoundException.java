package com.coyoapp.tinytask.exception;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
@NoArgsConstructor
@Slf4j
public class UserTaskNotFoundException extends RuntimeException {

  public UserTaskNotFoundException(String id) {
    log.error("There is no UserTask with id: {}", id);
  }
}

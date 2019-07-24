package com.coyoapp.tinytask.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:48
 */
@Data
@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {
  private String reason;


  public EntityNotFoundException(String reason) {
    super(String.format(reason));
  }

}



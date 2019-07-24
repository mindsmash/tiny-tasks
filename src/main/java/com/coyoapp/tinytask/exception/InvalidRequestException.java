package com.coyoapp.tinytask.exception;

import org.springframework.validation.Errors;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:55
 */
public class InvalidRequestException extends RuntimeException {
  private final Errors errors;

  public InvalidRequestException(Errors errors) {
    super("");
    this.errors = errors;
  }

  public Errors getErrors() {
    return errors;
  }
}

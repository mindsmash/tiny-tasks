package com.coyoapp.tinytask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "General error....")
public class GeneralError extends Exception {
  static final long serialVersionUID = -3387516993224229948L;

  public GeneralError(String message) {
    super(message);
  }
}

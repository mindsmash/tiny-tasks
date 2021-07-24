package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

  @NotEmpty(message = "userName can't be null")
  private String userName;

  @NotEmpty(message = "email can't be null")
  private String email;
}

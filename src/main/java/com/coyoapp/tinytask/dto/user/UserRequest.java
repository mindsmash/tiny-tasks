package com.coyoapp.tinytask.dto.user;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotEmpty;

@Setter
@Getter
@Builder
public class UserRequest {
  @NotEmpty
  private String email;

  @NotEmpty
  private String password;
}

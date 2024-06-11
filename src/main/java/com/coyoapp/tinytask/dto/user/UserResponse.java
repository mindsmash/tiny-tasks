package com.coyoapp.tinytask.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserResponse {

  public UserResponse() {}

  public UserResponse(long id, String email, String jwtToken) {
    this.id = id;
    this.email = email;
    this.jwtToken = jwtToken;
  }

  @NotEmpty
  private long id;

  @NotEmpty
  private String email;

  @NotEmpty
  private String jwtToken;
}

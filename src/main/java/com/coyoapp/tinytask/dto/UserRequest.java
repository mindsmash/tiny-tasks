package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

  @NotEmpty
  private String username;

  @NotEmpty
  private String userpw;

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.userpw;
  }
}

package com.coyoapp.tinytask.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
  private String id;

  @NotEmpty(message = "Please provide username.")
  private String username;

  @NotEmpty(message = "Please provide valid email.")
  private String email;

  @NotEmpty(message = "Please provide password.")
  private String password;

  public UserRequest(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

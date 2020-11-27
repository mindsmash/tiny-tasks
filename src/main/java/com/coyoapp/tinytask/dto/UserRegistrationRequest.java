package com.coyoapp.tinytask.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequest {
  private String username;
  private String password;
  private String repeatedPassword;
}

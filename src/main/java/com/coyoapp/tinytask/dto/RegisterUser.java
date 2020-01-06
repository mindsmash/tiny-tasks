package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUser {

  @NotEmpty
  private String username;

  @NotEmpty
  private String password;

  @NotEmpty
  private String phoneNumber;
}

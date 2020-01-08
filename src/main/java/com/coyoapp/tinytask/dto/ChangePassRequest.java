package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ChangePassRequest {
  @NotEmpty
  private String currentPassword;
  @NotEmpty
  private String newPassword;
  @NotEmpty
  private String confirmPassword;
}

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
public class TaskRequest {

  @NotEmpty
  private String name;

  @NotEmpty
  private String state;

  /* I've inserted userId here rather than adding an endpoint in /users/{userId}/...
  to achieve the separation of concerns and having multiple controllers each intended
  for handling a specific entity*/
  @NotEmpty
  private String userId;

}

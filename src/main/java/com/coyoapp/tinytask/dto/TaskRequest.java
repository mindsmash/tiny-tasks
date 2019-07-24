package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;

import com.coyoapp.tinytask.domain.User;
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

  private User user;

}

package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class TaskRequest {

  @NotEmpty
  private String title;

}

package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;

import com.coyoapp.tinytask.domain.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskCreateRequest {

  @NotEmpty
  private String name;

  private TaskStatus status;
}

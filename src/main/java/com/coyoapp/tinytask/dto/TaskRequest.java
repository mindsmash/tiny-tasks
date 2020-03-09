package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;

import com.coyoapp.tinytask.domain.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

  private String id;

  private TaskStatus taskStatus;

  private Instant created;

  @NotEmpty
  private String name;

}

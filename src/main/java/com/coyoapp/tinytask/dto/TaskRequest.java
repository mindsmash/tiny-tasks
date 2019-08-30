package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

  @NotEmpty
  private String name;

  @NotNull
  private String userId;

  private Instant dueDate;

}

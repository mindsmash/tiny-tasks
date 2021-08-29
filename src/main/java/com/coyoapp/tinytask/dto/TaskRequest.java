package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.coyoapp.tinytask.domain.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

  @NotEmpty
  private String name;

  @NotNull
  private State state;

  private Date dueDate;

}

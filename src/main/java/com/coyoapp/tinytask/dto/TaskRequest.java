package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

  @NotEmpty
  private String name;

  private String id;

  private boolean done;

  private LocalDate dueDate;

  //? no idea why no getter for a boolean value could be generated
  public boolean getDone() {
    return this.done;
  }
}

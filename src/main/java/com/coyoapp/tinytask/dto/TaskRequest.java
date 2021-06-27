package com.coyoapp.tinytask.dto;

import lombok.*;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

//  @NotEmpty
  private String name;

  private String id;

  private boolean done;

  private LocalDate dueDate;

  private Instant created;

  private Instant modified;

//  //? no idea why no getter for a boolean value could be generated
//  public boolean getDone() {
//    return this.done;
//  }
}


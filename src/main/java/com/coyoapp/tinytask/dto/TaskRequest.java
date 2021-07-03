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

  private String name;

  private String id;

  private boolean done;

  private LocalDate dueDate;

  private Instant created;

  private Instant modified;


}


package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.User;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

  private String id;

  private String name;

  private LocalDate dueDate;

  private String detail;

  private Instant createdDate;

  private User user;

  private boolean done;
}

package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

  private String id;

  private String name;

  private boolean isCompleted;

  private ZonedDateTime dueDateTime;

  private UUID ownerId;

}

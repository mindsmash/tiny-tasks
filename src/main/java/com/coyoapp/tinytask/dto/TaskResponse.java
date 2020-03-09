package com.coyoapp.tinytask.dto;

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
public class TaskResponse {

  private String id;

  private String name;

  private TaskStatus taskStatus;

  private Instant created;

}

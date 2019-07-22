package com.coyoapp.tinytask.dto;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

  @NotEmpty
  private String name;

  @NotEmpty
  private String ownerId;

  private boolean isCompleted = false;

  @NonNull
  private ZonedDateTime dueDateTime;

  public String getTaskOwnerId(){
    return this.ownerId;
  }
}

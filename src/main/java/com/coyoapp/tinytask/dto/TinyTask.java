package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import static com.google.common.base.Preconditions.checkNotNull;

@AllArgsConstructor
@Data
@Slf4j
public class TinyTask {

  /*
  FIXME: Not required as such for the running application, but test class not picking the all args constructor somehow.
   */
  public TinyTask() {

  }

  public TinyTask(@NotNull String name) {
    checkNotNull(name, "Task must have a name");
    this.name = name;
  }

  private String name;

  private LocalDateTime startTime;

  private LocalDateTime endTime;

  /**
   * Reminder in minutes.
   */
  private int reminder;
}

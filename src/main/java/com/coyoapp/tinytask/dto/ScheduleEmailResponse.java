package com.coyoapp.tinytask.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor
public class ScheduleEmailResponse {

  private boolean success;
  private String jobId;
  private String jobGroup;
  private String message;

  public ScheduleEmailResponse(boolean success, String message) {
    this.success = success;
    this.message = message;
  }

}

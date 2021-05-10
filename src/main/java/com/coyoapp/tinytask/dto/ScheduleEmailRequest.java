package com.coyoapp.tinytask.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleEmailRequest {

  @Email
  @NotEmpty
  private String email;

  @NotEmpty
  @NotNull
  private String userID;

  @NotNull
  private LocalDateTime dateTime;

  @NotNull
  private ZoneId timeZone;

}

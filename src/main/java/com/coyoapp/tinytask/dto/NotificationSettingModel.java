package com.coyoapp.tinytask.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationSettingModel {
  @NotEmpty
  private String duration;

  @NotEmpty
  private String email;

  @NotEmpty
  private boolean isActive;

  @NotEmpty
  private boolean isOnlyDueDate;

  @NotEmpty
  private Integer dayBeforeDueDate;

  @NotEmpty
  private LocalDate requestedNotificationDate;
}

package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUserResponse {
  private String id;

  private String name;

  private String email;

  private List<TaskResponse> tasks;
}

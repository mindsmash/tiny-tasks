package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

  private String id;

  private String name;

  private State state;

}

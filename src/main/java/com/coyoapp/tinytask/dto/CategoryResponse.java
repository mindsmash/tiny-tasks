package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
  private String id;

  private List<TaskResponse> tasks;
}

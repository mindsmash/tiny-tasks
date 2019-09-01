package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

  @NotEmpty
  private String name;

  @NotNull
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "uuuu-MM-dd'T'HH:mm:ss.SSS")
//  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
  private LocalDateTime dueDate;

}

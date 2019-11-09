package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(includeFieldNames=true)
public class TaskRequestPatch {

  @NotNull
  private Boolean done;

}

package com.coyoapp.tinytask.utility;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.stereotype.Component;

@Component
public final class TaskProvisioner {

  public static Task aSingleTask() {
    return Task.builder()
                .name("A single task")
                .build();
  }

  public static Task aSingleCustomTask(String name) {
    return Task.builder()
      .name(name)
      .build();
  }

}

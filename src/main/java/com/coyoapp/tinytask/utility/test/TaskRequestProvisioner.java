package com.coyoapp.tinytask.utility.test;

import com.coyoapp.tinytask.domain.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskRequestProvisioner {

  public static String addRequest(Task task){
//    return "{" +
//      "\"name\": " +
//      "\"taskNameForRequest\"" +
//            "}";

    return asJsonString(task);
  }

   private static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }


}

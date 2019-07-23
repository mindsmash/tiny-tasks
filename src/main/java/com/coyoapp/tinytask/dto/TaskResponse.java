package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;
import com.fasterxml.jackson.annotation.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {

  private String id;

  private String name;

  private Date taskDate;

    @JsonFormat(pattern = "HH:mm")
    private java.time.LocalTime taskTime;
}

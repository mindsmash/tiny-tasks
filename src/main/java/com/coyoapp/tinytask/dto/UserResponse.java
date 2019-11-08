package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.Role;
import com.coyoapp.tinytask.domain.Task;
import lombok.*;

import java.util.Set;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
  private String id;
  private String name;
  private String email;
  private Set<Task> tasks;
  private Set<Role> roles;

}

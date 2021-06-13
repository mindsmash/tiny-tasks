package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

  private String id;
  private Set<Role> roles = new HashSet<>();
  private String username;
  private String firstname;
  private String lastname;
  private String email;
  private Instant created;
  private Instant modified;

}

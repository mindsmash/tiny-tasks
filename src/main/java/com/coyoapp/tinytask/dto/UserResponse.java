package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

  private String id;
//! this creates 500 because 'usr_roles' misses a relation for some reason
//  private String roles;
  private String username;
  private String firstname;
  private String lastname;
  private String email;
  private Instant created;
  private Instant modified;

}

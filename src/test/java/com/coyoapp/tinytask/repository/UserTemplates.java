package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import java.util.Optional;

public class UserTemplates {

  private UserTemplates() {
  }

  public static Optional<User> defaultUser(String username) {
    return Optional.of(new User("123", username, "hunter2"));
  }
}

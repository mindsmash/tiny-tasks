package com.coyoapp.tinytask.domain;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "user")
@Setter
@Getter
public class User {

  @Id
  private String id;

  private String username;

  private String password;

  public User(String id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(id, user.id) &&
      Objects.equals(username, user.username) &&
      Objects.equals(password, user.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, username, password);
  }
}

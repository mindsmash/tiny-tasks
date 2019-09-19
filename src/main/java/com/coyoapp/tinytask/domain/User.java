package com.coyoapp.tinytask.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "users")
@Table
@Data
@NoArgsConstructor
public class User implements Serializable {

  @Id
  private String id;

  private String username;

  private String password;

  @OneToMany(mappedBy = "userEntity", cascade= CascadeType.ALL, targetEntity = Task.class)
  private List<Task> tasks;

  public User(String id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

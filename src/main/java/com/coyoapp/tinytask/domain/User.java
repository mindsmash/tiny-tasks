package com.coyoapp.tinytask.domain;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "users")
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

  @Id
  private String id;

  private String username;

  private String password;

}

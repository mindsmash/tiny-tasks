package com.coyoapp.tinytask.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "\"user\"") // Use double quotes to handle reserved keywords
public class User {

  public User() {

  }

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 128)
  private String email;

  @Column(nullable = false, length = 256)
  private String password;

  @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime created;

  @OneToMany(mappedBy = "user")
  private List<Task> tasks;


}

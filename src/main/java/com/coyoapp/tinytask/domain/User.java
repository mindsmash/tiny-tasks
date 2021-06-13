package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name ="usr")
public class User {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name="uuid2",strategy = "uuid2")
  @Column(name="id", nullable = false,updatable = false)
  private String id;
  @ManyToMany
  private Set<Role> roles = new HashSet<>();
  @Column(name="username", nullable=false)
  private String username;
  @Column(name="password", nullable=false)
  private String password;
  @Column(name="firstname", nullable=false)
  private String firstname;
  @Column(name="lastname", nullable=false)
  private String lastname;
  @Column(name="email", nullable=false)
  private String email;
  @CreatedDate
  @Column(name="created",nullable=false)
  private Instant created;
  @Column(name="modified",nullable=false)
  private Instant modified;
}

package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "password")
  private String password;

  @OneToMany(fetch = FetchType.EAGER, mappedBy="assignedTo", cascade = CascadeType.ALL)
  private Set<Task> assignedTasks;

  @CreatedDate
  private Instant created;
}

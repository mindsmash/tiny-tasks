package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Column(name = "id", nullable = false, updatable = false)
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(strategy = "uuid2", name = "uuid2gen")
  @Id
  private String id;

  @Column(nullable = false)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @OneToMany(mappedBy = "user")
  private List<Task> taskList = new ArrayList<>();
}

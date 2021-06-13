package com.coyoapp.tinytask.domain;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="roles")
public class Role {

  @Id
  @GeneratedValue(generator="uuid2")
  @GenericGenerator(name="uuid2", strategy="uuid2")
  private String id;

  private String name;

  @ManyToMany(mappedBy = "roles")
  private Set<User> users = new HashSet<>();

  @CreatedDate
  @Column(name="created",nullable=false)
  private Instant created;
}

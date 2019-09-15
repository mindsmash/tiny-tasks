package com.coyoapp.tinytask.domain;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.annotation.Generated;
import javax.persistence.*;
import java.util.List;

@Table(name = "users")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  private String id;

  @Column(unique = true, nullable = false)
  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  @OneToMany(mappedBy = "owner")
  private List<Task> tasks;

}

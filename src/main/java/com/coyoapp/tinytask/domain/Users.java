package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Table(name = "users")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Users {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(unique = true)
  @NotEmpty
  private String username;

  @Column(unique = true)
  @NotEmpty
  private String email;

  @OneToMany(mappedBy = "users", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  private Set<Task> task = new HashSet<>();

}

package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "account")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Account {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(nullable = false)
  private String name;

  @Column(
    unique = true,
    nullable = false
  )
  private String email;

  @OneToMany(mappedBy = "account")
  private List<Task> tasks = new ArrayList<>();
}

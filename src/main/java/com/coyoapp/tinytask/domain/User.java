package com.coyoapp.tinytask.domain;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Table(name = "users")
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User{

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;


  @Column(name = "user_name")
  private String userName;
  private String password;

  @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
  private List<Task> tasks = new ArrayList<>();
  @CreatedDate
  private Instant created;

}

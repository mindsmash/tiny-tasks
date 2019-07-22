package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Table(name = "app_user")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class AppUser {
  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;

  @Email
  @Column(unique = true)
  private String email;

  @OneToMany(targetEntity = Task.class, cascade = CascadeType.ALL)
  @JoinColumn(name="owner_id")
  private List<Task> tasks = new ArrayList<>();

  public void addTask(Task task){
    this.tasks.add(task);
  }

  public String getId(){
    return this.id;
  }
}

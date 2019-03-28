package com.coyoapp.tinytask.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tasks")
public class Task extends AuditModel {

  @Id
  @GeneratedValue(generator = "task_generator")
  @SequenceGenerator(
    name = "task_generator",
    sequenceName = "task_sequence",
    initialValue = 1000
  )
  private Long id;

  @NotBlank
  @Size(min = 3, max = 100)
  private String name;

  @Column
  private Boolean done;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean getDone() {
    return done;
  }

  public void setDone(Boolean done) {
    this.done = done;
  }
}

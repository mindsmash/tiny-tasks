package com.coyoapp.tinytask.domain;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;
import java.time.ZonedDateTime;


@Table(name = "task")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Task {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;

  @CreatedDate
  private Instant created;
  
  @Column(nullable = false, name="is_completed")
  private boolean isCompleted;

  @Column(nullable = false, name="due_date_time")
  private ZonedDateTime dueDateTime;
  
  
  @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", nullable = false)
  private User taskOwner;

  public void setTaskOwner(User user){
    this.taskOwner = user;
  }
  
}

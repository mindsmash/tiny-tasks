package com.coyoapp.tinytask.domain;

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

  @Column(nullable = false, name="is_completed")
  private boolean isCompleted;

  @Column(nullable = false, name="due_date_time")
  private ZonedDateTime dueDateTime;

  @CreatedDate
  private Instant created;

  @ManyToOne(targetEntity = AppUser.class, fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_id", nullable = false)
  private AppUser owner;

  public void setTaskOwner(AppUser user){
    this.owner = user;
  }


}

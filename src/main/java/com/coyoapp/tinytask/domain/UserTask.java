package com.coyoapp.tinytask.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "user_tasks")
@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class UserTask extends DatedEntity {

  @ManyToOne(fetch = FetchType.LAZY)
  private Task task;

  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  private LocalDateTime lastNotified;

  private Boolean isDone = false;

  private LocalDateTime dueDate;
}

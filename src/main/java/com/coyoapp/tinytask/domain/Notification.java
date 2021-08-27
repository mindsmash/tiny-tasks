package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Table(name = "notification")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Notification {

  @Id
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(name = "cron_expression", nullable = false)
  private String cronExpression;

  @Column(nullable = false)
  private boolean active;

  @OneToOne
  @MapsId
  @JoinColumn(name = "id", nullable = false)
  private User user;

}

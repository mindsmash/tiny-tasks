package com.coyoapp.tinytask.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Table(name = "notification_setting")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class NotificationSetting {
  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String duration;

  private String email;

  private boolean isActive;

  private boolean isOnlyDueDate;

  private Integer dayBeforeDueDate;

  private LocalDate requestedNotificationDate;
}

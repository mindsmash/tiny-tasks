package com.coyoapp.tinytask.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "users")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class User extends BaseEntity {

  @Column(unique = true)
  private String userName;

  @Column(unique = true)
  private String email;

  private Integer userNotificationPeriodInHours;

  public User(String id) {
    this.setId(id);
  }
}

package com.coyoapp.tinytask.domain;

import java.time.Instant;
import java.util.Objects;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "task")
@Entity
@Setter
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Access(AccessType.FIELD)
public class Task {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;

  @CreatedDate
  private Instant created;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(
    name = "username",
    referencedColumnName = "username"
  )
  private User user;

  public Task(String id, String name, Instant created) {
    this.id = id;
    this.name = name;
    this.created = created;
  }

  public void setUser(User user) {
    // prevent endless loop
    if (sameAsFormer(user)) {
      return;
    }

    User oldUser = this.user;
    this.user = user;
    if (oldUser != null) {
      user.removeTask(this);
    }
  }

  private boolean sameAsFormer(User user) {
    return Objects.equals(this.user, user);
  }

}

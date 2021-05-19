package com.coyoapp.tinytask.domain;

import java.time.Instant;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

  @Column(nullable = false)
  private boolean isDone;

  @ManyToOne
  @JoinColumn(name = "account_id")
  private Account account;
}

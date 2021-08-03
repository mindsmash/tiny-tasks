package com.coyoapp.tinytask.domain;

import java.time.Instant;
import javax.persistence.*;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "task")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;

  @ManyToOne
  @JoinColumn(name = "appuser_id", nullable = false)
  private AppUser appUser;

  private boolean done;

  @CreatedDate
  private Instant created;
}

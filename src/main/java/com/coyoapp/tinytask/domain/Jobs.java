package com.coyoapp.tinytask.domain;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Table(name = "jobs")
@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Jobs {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  @Column(name = "schedule")
  private Time schedule;

  @Column(name = "due_date")
  private Date dueDate;

  @Column(name = "username")
  private String username;

}

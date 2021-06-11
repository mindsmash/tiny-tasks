package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "file")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class File {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;

  @CreatedDate
  private Instant created;

  private String type;

  @Lob
  private byte[] content;

  @ManyToOne
  @JoinColumn(name ="task")
  private Task task;
}

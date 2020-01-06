package com.coyoapp.tinytask.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@MappedSuperclass
@Data
public class BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @CreatedDate
  private Instant dateCreated;

  @Column(nullable = false)
  private Boolean deleted = false;

  public BaseEntity() {
  }
}

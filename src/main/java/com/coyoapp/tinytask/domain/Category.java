package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Table(name = "category")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Category {

  @Id
  private String id;

  @OneToMany(mappedBy = "category")
  private List<Task> tasks;
}

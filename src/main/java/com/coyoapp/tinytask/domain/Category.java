package com.coyoapp.tinytask.domain;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@Table(name = "category")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Category {

  @Id
  private String id;

  @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
  private List<Task> tasks;
}

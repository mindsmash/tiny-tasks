package com.coyoapp.tinytask.domain;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor
@Setter
@Getter
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private @NonNull String name;
}

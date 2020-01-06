package com.coyoapp.tinytask.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "user_role")
@Entity
public class UserRole {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @JoinColumn(name = "user_id", referencedColumnName = "id")
  @ManyToOne
  private Users userId;

  @JoinColumn(name = "role_id", referencedColumnName = "id")
  @ManyToOne
  private Roles roleId;
}

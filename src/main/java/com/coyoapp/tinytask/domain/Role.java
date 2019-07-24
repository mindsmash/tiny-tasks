package com.coyoapp.tinytask.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 06:50
 */
@Entity
@Table(name = "role")
@Data
public class Role implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Basic(optional = false)
  @Column(nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(length = 255,unique = true,name = "name")
  @Enumerated(EnumType.STRING)
  private RoleName roleName;

  @JoinTable(name = "roles_privileges", joinColumns = {
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
  }, inverseJoinColumns = {
    @JoinColumn(name = "privilege_id", referencedColumnName = "id", nullable = false)})
  @ManyToMany
  private List<Privilege> privilegeList;

  public Role() {
  }

  public Role(RoleName roleName){
    this.roleName = roleName;
  }
}

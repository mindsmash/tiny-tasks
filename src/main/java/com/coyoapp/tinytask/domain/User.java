package com.coyoapp.tinytask.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
public class User implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @Basic(optional = false)
  @Column(nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Basic(optional = false)
  @Column(nullable = false, length = 60, unique = true)
  private String email;

  @Basic(optional = false)
  @Lob
  @Column(nullable = false)
  @Type(type = "org.hibernate.type.BinaryType")
  private byte[] password;

  @Basic(optional = false)
  @Column(name = "first_name", nullable = false, length = 45)
  private String firstName;

  @Basic(optional = false)
  @Column(name = "sur_name", nullable = false, length = 45)
  private String surName;

  @Basic(optional = false)
  @Column(nullable = false, length = 6)
  @Enumerated(EnumType.STRING)
  private Sex sex;

  @Basic(optional = false)
  @Column(name = "account_active", nullable = false)
  private Boolean accountActive;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Set<Role> roleList;

  @JsonBackReference
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
  private List<Task> taskList;

  public User(String email, byte[] password, String firstName, String surName, Sex sex, Boolean accountActive, Set<Role> roleList) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.surName = surName;
    this.sex = sex;
    this.accountActive = accountActive;
    this.roleList = roleList;

  }


  public User(Integer id) {
    this.id = id;
  }


}


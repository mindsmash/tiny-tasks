package com.coyoapp.tinytask.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 06:57
 */
@Entity
@Table(name = "privilege")
@Data
public class Privilege implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Basic(optional = false)
  @Column(nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(length = 255)
  private String name;

  @ManyToMany(mappedBy = "privilegeList")
  private List<Role> roleList;


  public Privilege() {
  }


  public Privilege(Integer id) {
    this.id = id;
  }

}


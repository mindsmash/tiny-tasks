package com.coyoapp.tinytask.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Getter
@Setter
@Table(name = "roles")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Roles extends BaseEntity implements GrantedAuthority {

  private String authority;

  @ManyToMany(mappedBy = "roles")
  @JsonIgnore
  private Set<Users> users;

  @Override
  public String getAuthority() {
    return authority;
  }

  public Roles(String authority) {
    this.authority = authority;
  }

  public Roles() {
  }
}

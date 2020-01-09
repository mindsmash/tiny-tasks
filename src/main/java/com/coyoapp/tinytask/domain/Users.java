package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "uc_username", columnNames = {"username"}))
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Users extends BaseEntity implements UserDetails {

  @Column(nullable = false)
  @NotNull(message = "Username can not be null!")
  protected String username;
  @Column(nullable = false)
  @NotNull(message = "Password can not be null!")
  protected String password;
  @Column(nullable = false)
  @NotNull(message = "Phone Number can not be null!")
  protected String phoneNumber;
  private boolean accountLocked = false;
  private boolean accountEnabled = true;
  private boolean accountExpired = false;
  private boolean credentialsExpired = false;

  @ManyToMany
  @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  protected Set<Roles> roles = new HashSet<>();

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return getRoles();
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return !accountExpired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !accountLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return !credentialsExpired;
  }

  @Override
  public boolean isEnabled() {
    return accountEnabled;
  }

  public Users(String userName, Set<Roles> authorityList) {
    this.username = userName;
    this.roles = authorityList;
  }

  public Users() {
  }

}

package com.coyoapp.tinytask.security;

import com.coyoapp.tinytask.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:14
 */
public class UserPrincipal implements UserDetails {

  private Long id;

  private String name;

  private String username;

  private User user;

  @JsonIgnore
  private String email;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;


  public UserPrincipal(Long id, String name, String username, String email, String password, Collection<? extends GrantedAuthority> authorities, User user) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
    this.user = user;
  }


  public static UserDetails createUserPrincipalFromUserEntity(User user) {
    List<GrantedAuthority> authorities = user.getRoleList().stream().map(role ->
      new SimpleGrantedAuthority(role.getRoleName().toValue())
    ).collect(Collectors.toList());

    return new UserPrincipal(
      Long.valueOf(String.valueOf(user.getId())),
      user.getFirstName() + " " + user.getSurName(),
      user.getEmail(),
      user.getEmail(),
      new String(user.getPassword()),
      authorities,
      user
    );
  }


  public Long getId() {
    return id;
  }


  public String getName() {
    return name;
  }


  public String getEmail() {
    return email;
  }


  @Override
  public String getUsername() {
    return username;
  }


  @Override
  public String getPassword() {
    return password;
  }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }


  @Override
  public boolean isAccountNonExpired() {
    return user.getAccountActive();
  }


  @Override
  public boolean isAccountNonLocked() {
    return user.getAccountActive();
  }


  @Override
  public boolean isCredentialsNonExpired() {
    return user.getAccountActive();
  }


  @Override
  public boolean isEnabled() {
    return user.getAccountActive();
  }


  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserPrincipal that = (UserPrincipal) o;
    return Objects.equals(id, that.id);
  }


  @Override
  public int hashCode() {

    return Objects.hash(id);
  }
}

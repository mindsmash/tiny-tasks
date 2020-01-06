package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.UserRole;
import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.RegisterUser;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.RoleService;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
@CommonsLog
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
  private final UserRepository repository;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;


  @Override
  public Users findByUserName(String userName) {
    return repository.findByUsername(userName);
  }

  @Override
  public Users saveUser(RegisterUser users) {
    //fetch default role
    Roles role = roleService.findByAuthority("ROLE_USER");

    //add user
    Users user = new Users();
    user.setPhoneNumber(users.getUsername());
    user.setUsername(users.getUsername());
    user.setPassword(passwordEncoder.encode(users.getPassword()));
    user.setDateCreated(Instant.now());
    user = repository.save(user);

    //add user role
    UserRole userRole = new UserRole();
    userRole.setRoleId(role);
    userRole.setUserId(user);
    roleService.saveUserRoles(userRole);

    return user;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    log.info("-> loadUserByUsername(" + s + ")");
    Users user = findByUserName(s);
    if (Objects.isNull(user)) {
      log.error("User not found = " + s);
      throw new UsernameNotFoundException("User with username " + s + " not found");
    }
    log.info("<- User Successfully Found for userName=" + s);
    Set<GrantedAuthority> authorities = new HashSet<>();
    user.getRoles().forEach(rolesDO -> {
      authorities.add(new SimpleGrantedAuthority(rolesDO.getAuthority()));
    });

    boolean isEnabled = user.isEnabled();
    boolean nonExpired = user.isAccountNonExpired();
    boolean nonLocked = user.isAccountNonLocked();

    return new User(s, user.getPassword(), isEnabled, true, nonExpired,
      nonLocked, authorities);
  }
}

package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository repository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    log.info("-> loadUserByUsername(" + s + ")");
    Users user = repository.findByUsername(s);
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

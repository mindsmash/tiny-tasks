package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.repository.UserRepository;
import lombok.Builder;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Builder
@Service
public class StoredUserService implements UserDetailsService {
  private final UserRepository userRepository;

  @Autowired
  public StoredUserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    val storedUser = userRepository.findById(username).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
    );

    return User.builder().username(storedUser.getUsername()).password(storedUser.getPassword()).build();
  }
}

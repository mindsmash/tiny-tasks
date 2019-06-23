package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.Login;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public User authenticate(Login login) {
    log.debug("authenticate user: {}", login.getUsername());
    Optional<User> user = userRepository.findByUsernameAndPassword(login.getUsername(), login.getPassword());

    return user.orElseThrow(UserNotFoundException::new);
  }
}

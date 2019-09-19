package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserRepository userRepository;

  @PostMapping("/login")
  public boolean login(@RequestBody User user) {
    log.debug("login User {}", user);
    User userEntity = userRepository.findByUsername(user.getUsername()).orElseThrow(
      () -> new EntityNotFoundException("could not find user with username " + user.getUsername()));
    return user.getPassword().equals(userEntity.getPassword());
  }

}

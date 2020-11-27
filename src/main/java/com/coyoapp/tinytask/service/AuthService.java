package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Builder
@Service
public class AuthService {
  private final StoredUserService userService;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private static final int MAX_USERNAME_LENGTH = 24;

  @Autowired
  public AuthService(
    StoredUserService userService,
    UserRepository userRepository,
    PasswordEncoder passwordEncoder
  ) {
    this.userService = userService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User register(String username, String password, String repeatedPassword) {
    log.debug("register(username={}, password={}, repeatedPassword={})", username, password, repeatedPassword);

    userRepository.findById(username).ifPresent(storedUser -> {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    });

    if (password.equals(repeatedPassword) && username.length() <= MAX_USERNAME_LENGTH) {
      val toBeAddedUser = User.builder().username(username).password(passwordEncoder.encode(password)).build();
      return userRepository.save(toBeAddedUser);
    }

    throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
  }

  public void login(String username, String password) {
    log.debug("login(username={}, password={})", username, password);

    val storedUser = userService.loadUserByUsername(username);

    if(!passwordEncoder.matches(password, storedUser.getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    SecurityContextHolder.getContext().setAuthentication(
      new UsernamePasswordAuthenticationToken(storedUser, null, storedUser.getAuthorities())
    );
  }
}

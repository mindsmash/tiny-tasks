package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.PasswordResetResponse;
import com.coyoapp.tinytask.helper.PasswordResetHelper;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Builder
@Service
public class UserService {
  private final UserRepository userRepository;
  private final PasswordResetHelper passwordResetHelper;

  @Autowired
  public UserService(UserRepository userRepository, PasswordResetHelper passwordResetHelper) {
    this.userRepository = userRepository;
    this.passwordResetHelper = passwordResetHelper;
  }

  public PasswordResetResponse resetPassword(String username) {
    log.debug("resetPassword(username={})", username);

    val storedUser = userRepository.findById(username).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.BAD_REQUEST)
    );

    storedUser.setPassword(passwordResetHelper.createPassword());
    userRepository.save(storedUser);

    return PasswordResetResponse.builder().generatedPassword(storedUser.getPassword()).build();
  }
}

package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.PasswordResetResponse;
import com.coyoapp.tinytask.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("user")
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("password-reset/{username}")
  public PasswordResetResponse resetPassword(@PathVariable @NonNull String username) {
    log.debug("resetPassword(username={})", username);

    return userService.resetPassword(username);
  }
}

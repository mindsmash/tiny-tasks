package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.service.AuthService;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Builder
@RestController
@RequestMapping("auth/login")
public class AuthController {
  private final AuthService authService;

  @Autowired
  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @GetMapping
  public String login() {
    log.debug("login()");
    return "Tiny Task Server requires you to be logged in.";
  }

  @PostMapping
  public void login(@RequestBody @NonNull User toBeLoggedInUser) {
    log.debug("login(toBeLoggedInUser={})", toBeLoggedInUser);
    authService.login(toBeLoggedInUser.getUsername(), toBeLoggedInUser.getPassword());
  }
}

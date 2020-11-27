package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
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

    val username = SecurityContextHolder.getContext().getAuthentication().getName();
    return (username.equals("anonymousUser")) ?
      "Tiny Task Server requires you to be logged in." :
      "Greetings, " + username + "!";
  }

  @PostMapping
  public void login(@RequestBody @NonNull User toBeLoggedInUser) {
    log.debug("login(toBeLoggedInUser={})", toBeLoggedInUser);
    authService.login(toBeLoggedInUser.getUsername(), toBeLoggedInUser.getPassword());
  }
}

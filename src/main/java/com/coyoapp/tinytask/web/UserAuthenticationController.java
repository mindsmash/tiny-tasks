package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.Login;
import com.coyoapp.tinytask.dto.Token;
import com.coyoapp.tinytask.service.UserService;
import com.coyoapp.tinytask.util.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@Slf4j
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class UserAuthenticationController {

  private final UserService userService;

  @PostMapping
  public Token login(@RequestBody @Valid Login login) {
    User user = userService.authenticate(login);
    return new Token(Utils.encrypt(user.getUsername()));
  }

}

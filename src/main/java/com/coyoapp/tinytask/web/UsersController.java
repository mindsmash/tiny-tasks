package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.ChangePassResponse;
import com.coyoapp.tinytask.dto.RegisterRequest;
import com.coyoapp.tinytask.dto.RegisterResponse;
import com.coyoapp.tinytask.exception.GeneralError;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
  private final UserService userService;

  @PostMapping
  public RegisterResponse createUser(@RequestBody @Valid RegisterRequest userRequest) throws GeneralError {
    log.debug("createUser(createUser={})", userRequest);
    return userService.saveUser(userRequest);
  }


  @PostMapping(value = "/change-password")
  public ChangePassResponse changePassword(@RequestBody @Valid ChangePassRequest req, Authentication a) throws GeneralError {
    log.debug("changePassword(changePassword={})", req);
    return userService.changePass(req, a.getName());
  }
}

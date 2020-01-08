package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.RegisterUser;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.GeneralError;
import com.coyoapp.tinytask.service.RoleService;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
  private final UserService userService;

  @PostMapping
  public Users createUser(@RequestBody @Valid RegisterUser userRequest) throws GeneralError {
    log.debug("createUser(createUser={})", userRequest);

    return userService.saveUser(userRequest);
  }


  @PostMapping(value = "/change-password")
  public Users changePassword(@RequestBody @Valid ChangePassRequest req, Authentication a) throws GeneralError {
    log.debug("changePassword(changePassword={})", req);
    Users user = userService.findByUserName(a.getName());

    return userService.changePass(req, user);
  }
}

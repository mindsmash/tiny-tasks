package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.RegisterUser;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.RoleService;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
  public Users createUser(@RequestBody @Valid RegisterUser userRequest) {
    log.debug("createUser(createUser={})", userRequest);

    return userService.saveUser(userRequest);
  }
}

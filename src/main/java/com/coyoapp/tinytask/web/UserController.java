package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.service.UserService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
class UserController {

  private final UserService userService;

  @PostMapping
  public UserResponse createUser(@RequestBody @Valid UserRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    return userService.createUser(userRequest);
  }

  @PostMapping(path = "/login")
  public UserResponse login(@RequestBody @Valid UserRequest userRequest) {
    log.debug("loginUser(loginUser={})", userRequest);
    return userService.login(userRequest.getUsername(), userRequest.getPassword());
  }
}

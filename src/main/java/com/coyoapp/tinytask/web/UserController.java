package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import com.coyoapp.tinytask.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  public UserResponse createUser(@RequestBody @Valid UserRequest createUserRequest) {
    log.debug("createUser={}", createUserRequest);
    return userService.createUser(createUserRequest);
  }

  @PostMapping("/login")
  public ResponseEntity<UserResponse> loginUser(@RequestBody @Valid UserRequest userRequest) {
    Optional<UserResponse> user = userService.findUser(userRequest);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
  }

  // todo: verify token
}

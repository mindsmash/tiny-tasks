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

  @PostMapping("/register")
  public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest createUserRequest) {
    log.debug("createUser={}", createUserRequest);
    try {
      UserResponse userResponse = userService.createUser(createUserRequest);
      return ResponseEntity.ok(userResponse);
    } catch (Exception e) {
      if (e.getMessage().contains("duplicate key value")) {
        return ResponseEntity.status(409).build();
      }
      return ResponseEntity.status(500).build();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<UserResponse> loginUser(@RequestBody @Valid UserRequest userRequest) {
    Optional<UserResponse> user = userService.findByEmailAndPassword(userRequest);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(401).build());
  }
}

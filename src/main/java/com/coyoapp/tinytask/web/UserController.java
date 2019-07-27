package com.coyoapp.tinyUser.web;

import com.coyoapp.tinyUser.dto.UserRequest;
import com.coyoapp.tinyUser.dto.UserResponse;
import com.coyoapp.tinyUser.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  public UserResponse createUser(@RequestBody @Valid UserRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    return UserService.createUser(userRequest);
  }

  @GetMapping
  public List<UserResponse> getUsers() {
    log.debug("getUsers()");
    return UserService.getUsers();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{UserId}")
  public void deleteUser(@PathVariable String UserId) {
    log.debug("deleteUser(UserId={})", UserId);
    UserService.deleteUser(UserId);
  }
  
  //
  
}

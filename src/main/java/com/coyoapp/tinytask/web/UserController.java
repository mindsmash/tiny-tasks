package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping
  public UserResponse createUser(@RequestBody @Valid UserRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    return userService.createUser(userRequest);
  }

  // Other CRUD methods could be added here, I developed only methods that I really needed

}

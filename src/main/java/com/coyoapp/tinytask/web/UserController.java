package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.ResourceConstants;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(ResourceConstants.TINY_TASKS_V1 + "users")
public class UserController {

  private final UserService userService;

  @GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<List<UserResponse>> getAllUsers() {
    return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
  }

  @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<UserResponse> getUser(@PathVariable String userId) {
    return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
  }

  @PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest userRequest) {
    return new ResponseEntity<>(userService.createUser(userRequest), HttpStatus.CREATED);
  }

  @PutMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  public ResponseEntity<UserResponse> updateUser(@PathVariable String userId, @RequestBody @Valid UserRequest userRequest) {

    return new ResponseEntity<>(userService.updateUser(userRequest, userId), HttpStatus.OK);
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{userId}")
  public void deleteUser(@PathVariable String userId) {
    userService.deleteUser(userId);
  }



}

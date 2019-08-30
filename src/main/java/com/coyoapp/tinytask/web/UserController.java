package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
  private final UserService service;

  @GetMapping
  public List<UserDTO> getAllUsers() {
    return service.getAllUsers().stream().map(user ->
      UserDTO
        .builder()
        .email(user.getEmail())
        .id(user.getId())
        .name(user.getName())
        .build()).collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
    log.info("Requesting user {}", id);
    return service.getUser(id).map(user ->
      UserDTO
        .builder()
        .email(user.getEmail())
        .id(user.getId())
        .name(user.getName())
        .build())
      .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/email")
  public ResponseEntity<UserDTO> getUserByEmail(@RequestParam String email) {
    log.info("Requesting user with email: {}", email);
    return service.getUserByEmail(email).map(user ->
      UserDTO
        .builder()
        .email(user.getEmail())
        .id(user.getId())
        .name(user.getName())
        .build())
      .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteUserById(@PathVariable String id) {
    log.info("Deleting user {}", id);
    service.deleteUser(id);
    return ResponseEntity.ok().build();
  }
}

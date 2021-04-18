package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.UsersRequest;
import com.coyoapp.tinytask.dto.UsersResponse;
import com.coyoapp.tinytask.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@Slf4j
@RestController
@RequiredArgsConstructor
class UsersController {

  private final UsersService usersService;

  @PostMapping
  public UsersResponse createTask(@RequestBody @Valid UsersRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    return usersService.createUser(userRequest);
  }
}

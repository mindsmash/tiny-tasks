package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.AppUserRequest;
import com.coyoapp.tinytask.dto.AppUserResponse;
import com.coyoapp.tinytask.service.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class AppUserController {

  private final AppUserService appUserService;

  @PostMapping
  AppUserResponse createAppUser(@RequestBody AppUserRequest userRequest){
    log.debug("createAppUser(createAppUser={})", userRequest);
    return appUserService.createAppUser(userRequest);
  }

  @GetMapping
  public List<AppUserResponse> getTasks() {
    log.debug("getTasks()");
    return appUserService.getUsers();
  }

}

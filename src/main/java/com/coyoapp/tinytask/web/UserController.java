package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.domain.UserTask;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.dto.UserTaskResponse;
import com.coyoapp.tinytask.service.UserService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  private final MapperFacade mapperFacade;

  @PostMapping
  @Transactional
  public UserResponse createUsers(@RequestBody @Valid UserRequest userRequest) {
    log.debug("userRequest(userRequest={})", userRequest);
    return transformToResponse(userService.createUser(userRequest));
  }

  @GetMapping
  @Transactional(readOnly = true)
  public List<UserResponse> getUsers() {
    log.debug("getUsers()");
    return transformToResponse(userService.getUsers());
  }

  private UserResponse transformToResponse(User user) {
    return mapperFacade.map(user, UserResponse.class);
  }

  private List<UserResponse> transformToResponse(List<User> userTasks) {
    return mapperFacade.mapAsList(userTasks, UserResponse.class);
  }
}

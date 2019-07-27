package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService{

  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;


  @Override
  @Transactional

  public UserResponse createUser(UserRequest userRequest) {
    log.debug("createAppUser(createAppUser={})", userRequest);
    User user = mapperFacade.map(userRequest, User.class);
    return transformToResponse(UserRepository.save(user));
  }

  private UserResponse transformToResponse(User user) {
    return userRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  @Transactional
  public List<UserResponse> getUsers() {
    log.debug("getUsers()");
    return userRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  private User getUserOrThrowException(String userId) {
	    return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
	  }
}

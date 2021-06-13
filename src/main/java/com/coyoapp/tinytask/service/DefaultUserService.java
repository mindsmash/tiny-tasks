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
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService{

  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;

  private UserResponse transformToResponse(User user){
    return mapperFacade.map(user,UserResponse.class);
  }

  private User getUserOrThrowException(String userId){
    return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
  }


  @Override
  @Transactional
  public UserResponse createUser(UserRequest userRequest) {
    User user = mapperFacade.map(userRequest, User.class);
    return transformToResponse(userRepository.save(user));
  }

  @Override
  @Transactional(readOnly = true)
  public List<UserResponse> getUsers() {
    log.debug("getUser()");
    return userRepository.findAll().stream().map(this::transformToResponse).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void deleteUser(String userId) {
    log.debug("deleteUser(userId={})",userId);
    userRepository.delete(getUserOrThrowException(userId));
  }

  @Override
  @Transactional
  public UserResponse updateUser(UserRequest userRequest) {
    log.debug("updateUser(updateUser={})",userRequest);
    User user = mapperFacade.map(userRequest, User.class);
    //? this needs work, this isn't how you update a user
    return transformToResponse(userRepository.save(user));
  }
}

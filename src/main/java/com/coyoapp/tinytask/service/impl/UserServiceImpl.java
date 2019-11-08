package com.coyoapp.tinytask.service.impl;


import com.coyoapp.tinytask.domain.Role;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.RoleRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  ConversionService conversionService;

  @Override
  public List<UserResponse> getAllUsers() {
    List<User> users = (List<User>) userRepository.findAll();

    List<UserResponse> responses = new ArrayList<>();
    for (User user: users) {
      responses.add(conversionService.convert(user, UserResponse.class));
    }
    return responses;
  }

  @Override
  public UserResponse getUser(String id) throws UserNotFoundException {
    if(!userRepository.findById(id).isPresent()){ throw new UserNotFoundException("User with user_id " + id + " Not Found."); }
    return conversionService.convert(userRepository.findById(id).get(), UserResponse.class);
  }

  @Override
  public UserResponse createUser(UserRequest userRequest) {
    User user = conversionService.convert(userRequest, User.class);

    userRepository.save(user);

    Role role = new Role();
    role.setRole("USER");
    role.setUser(user);

    roleRepository.save(role);

    return conversionService.convert(user, UserResponse.class);
  }

  @Override
  public UserResponse updateUser(UserRequest userRequest, String userId) throws UserNotFoundException{
    if(!userRepository.findById(userId).isPresent()){ throw new UserNotFoundException("User with user_id " + userId + " Not Found."); }
    userRequest.setId(userId);
    User user = conversionService.convert(userRequest, User.class);

    userRepository.save(user);

    return conversionService.convert(user, UserResponse.class);
  }

  @Override
  public void deleteUser(String userId) throws UserNotFoundException{
    if(!userRepository.findById(userId).isPresent()){ throw new UserNotFoundException("User with user_id " + userId + " Not Found."); }
      userRepository.delete(userRepository.findById(userId).get());
  }
}

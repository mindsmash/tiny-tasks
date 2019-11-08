package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;

import java.util.List;

public interface UserService {

  List<UserResponse> getAllUsers();

  UserResponse getUser(String id) throws UserNotFoundException;

  UserResponse createUser(UserRequest userRequest);

  UserResponse updateUser(UserRequest userRequest, String userId) throws UserNotFoundException;

  void deleteUser(String userId) throws UserNotFoundException;
}

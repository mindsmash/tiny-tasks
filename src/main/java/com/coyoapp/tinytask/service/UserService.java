package com.coyo.tinytask.service;

import com.coyo.tinytask.dto.UserRequest;
import com.coyo.tinytask.dto.UserResponse;

import java.util.List;

public interface UserService {

  UserResponse createUser(UserRequest userRequest);

  List<UserResponse> getUsers();

}
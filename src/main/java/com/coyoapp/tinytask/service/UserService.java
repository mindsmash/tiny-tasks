package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;

public interface UserService {

  UserResponse createUser(UserRequest userRequest);

  UserResponse login(String usrName, String usrPwd);
}

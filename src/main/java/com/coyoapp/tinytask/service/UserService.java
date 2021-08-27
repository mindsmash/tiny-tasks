package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;

import java.util.List;

public interface UserService {

  UserResponse createUser(UserRequest userRequest);

  // Other CRUD methods could be added here, I developed only methods that I really needed

}

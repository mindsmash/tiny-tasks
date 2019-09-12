package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;

public interface AuthenticationService {

    UserResponse login(UserRequest userRequest);

    UserResponse logout();

}
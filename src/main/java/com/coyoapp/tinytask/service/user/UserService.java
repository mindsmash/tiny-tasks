package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserLoginResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

  UserLoginResponse createUser(UserRequest taskRequest);

  ResponseEntity<UserLoginResponse> findUser(UserRequest userRequest);
}

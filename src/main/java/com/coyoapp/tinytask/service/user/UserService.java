package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

  UserResponse createUser(UserRequest taskRequest);

  ResponseEntity<UserResponse> findUser(UserRequest userRequest);
}

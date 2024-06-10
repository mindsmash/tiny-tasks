package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {

  UserResponse createUser(UserRequest taskRequest);

  Optional<UserResponse> findUser(UserRequest userRequest);

  Optional<User> findById(long userId);
}

package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import java.util.List;

public interface UserService {

  User createUser(UserRequest userRequest);

  List<User> getUsers();

  List<User> getUsers(Integer page, Integer pageSize);
}

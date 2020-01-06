package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.RegisterUser;

public interface UserService {
  Users findByUserName(String userName);

  Users saveUser(RegisterUser users);
}

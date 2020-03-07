package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;


public interface UserService {

  User findByUserName(String name);
  User save(User user);
}

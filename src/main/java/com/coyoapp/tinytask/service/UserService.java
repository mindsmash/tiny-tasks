package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.Login;
import com.coyoapp.tinytask.exception.UserNotFoundException;

public interface UserService {

  User authenticate(Login login);
}

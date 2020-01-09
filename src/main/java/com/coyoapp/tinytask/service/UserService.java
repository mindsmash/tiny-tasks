package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.ChangePassResponse;
import com.coyoapp.tinytask.dto.RegisterRequest;
import com.coyoapp.tinytask.dto.RegisterResponse;
import com.coyoapp.tinytask.exception.GeneralError;

public interface UserService {
  Users findByUserName(String userName);

  RegisterResponse saveUser(RegisterRequest users) throws GeneralError;

  ChangePassResponse changePass(ChangePassRequest req, String username) throws GeneralError;
}

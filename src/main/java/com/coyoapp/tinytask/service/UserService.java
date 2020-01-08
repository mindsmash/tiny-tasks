package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.RegisterUser;
import com.coyoapp.tinytask.exception.GeneralError;

public interface UserService {
  Users findByUserName(String userName);

  Users saveUser(RegisterUser users) throws GeneralError;

  Users changePass(ChangePassRequest req, Users user) throws GeneralError;
}

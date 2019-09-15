package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserDTO;

import java.util.List;

public interface UserService {

  List<UserDTO> getUsers();

}

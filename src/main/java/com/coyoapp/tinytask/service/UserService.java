package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UserDTO;

import java.util.List;

public interface UserService {

  UserDTO create(UserDTO userDTO);

  UserDTO get(String id);

  List<UserDTO> getUsers();

}

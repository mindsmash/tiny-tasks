package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.UsersRequest;
import com.coyoapp.tinytask.dto.UsersResponse;

public interface UsersService {

  UsersResponse createUser(UsersRequest userRequest);


}

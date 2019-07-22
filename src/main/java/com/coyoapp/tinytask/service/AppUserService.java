package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.AppUserRequest;
import com.coyoapp.tinytask.dto.AppUserResponse;

import java.util.List;

public interface AppUserService {

  AppUserResponse createAppUser(AppUserRequest userRequest);

  List<AppUserResponse> getUsers();
}

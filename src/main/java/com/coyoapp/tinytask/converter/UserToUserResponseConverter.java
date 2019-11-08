package com.coyoapp.tinytask.converter;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserResponse;
import org.springframework.core.convert.converter.Converter;

public class UserToUserResponseConverter implements Converter<User, UserResponse> {
  @Override
  public UserResponse convert(User source) {
    UserResponse userResponse = new UserResponse();
    userResponse.setEmail(source.getEmail());
    userResponse.setId(source.getId());
    userResponse.setName(source.getUsername());
    userResponse.setRoles(source.getRoles());
    userResponse.setTasks(source.getTasks());

    return userResponse;
  }
}

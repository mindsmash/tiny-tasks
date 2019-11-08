package com.coyoapp.tinytask.converter;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import org.springframework.core.convert.converter.Converter;

public class UserRequestToUserConverter implements Converter<UserRequest, User> {


  @Override
  public User convert(UserRequest source) {
    User user = new User();

    if(null != source.getId()){
      user.setId(source.getId());
    }
    user.setEmail(source.getEmail());
    user.setUsername(source.getUsername());
    user.setPassword(source.getPassword());

    return user;
  }
}

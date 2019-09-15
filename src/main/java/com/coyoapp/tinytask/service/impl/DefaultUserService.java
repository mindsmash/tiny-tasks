package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.UserService;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class DefaultUserService implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private MapperFacade mapperFacade;

  @Override
  public List<UserDTO> getUsers() {
    log.debug("getUsers()");
    return this.userRepository.findAll().stream().map(this::transformToUserDTO).collect(Collectors.toList());
  }

  private UserDTO transformToUserDTO(User user) {
    return mapperFacade.map(user, UserDTO.class);
  }

}

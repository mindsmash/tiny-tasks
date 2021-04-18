package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.UsersRequest;
import com.coyoapp.tinytask.dto.UsersResponse;
import com.coyoapp.tinytask.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUsersService implements UsersService {

  private final UsersRepository usersRepository;
  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public UsersResponse createUser(UsersRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    Users user = mapperFacade.map(userRequest, Users.class);
    return transformToResponse(usersRepository.save(user));
  }

  private UsersResponse transformToResponse(Users user) {
    return mapperFacade.map(user, UsersResponse.class);
  }

}

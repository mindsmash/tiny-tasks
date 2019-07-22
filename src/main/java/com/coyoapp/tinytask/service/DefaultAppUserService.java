package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.AppUser;
import com.coyoapp.tinytask.dto.AppUserRequest;
import com.coyoapp.tinytask.dto.AppUserResponse;
import com.coyoapp.tinytask.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultAppUserService implements AppUserService{

  private final AppUserRepository appUserRepository;
  private final MapperFacade mapperFacade;


  @Override
  @Transactional

  public AppUserResponse createAppUser(AppUserRequest userRequest) {
    log.debug("createAppUser(createAppUser={})", userRequest);
    AppUser appUser = mapperFacade.map(userRequest, AppUser.class);
    return transformToResponse(appUserRepository.save(appUser));
  }

  private AppUserResponse transformToResponse(AppUser user) {
    return mapperFacade.map(user, AppUserResponse.class);
  }

  @Override
  @Transactional
  public List<AppUserResponse> getUsers() {
    log.debug("getUsers()");
    return appUserRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

}

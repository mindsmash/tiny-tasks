package com.coyoapp.tinytask.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.coyoapp.tinytask.configuration.jwt.SecurityConstants;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.exception.UserWrongLoginException;
import com.coyoapp.tinytask.repository.UserRepository;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;

import org.springframework.context.annotation.Import;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import static java.util.stream.Collectors.toList;

import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  @Transactional
  public UserResponse createUser(UserRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    User user = mapperFacade.map(userRequest, User.class);
    UUID uuid = UUID.randomUUID();
    user.userpw = bCryptPasswordEncoder.encode(user.userpw);
    user.uuid = uuid.toString();

    // create token to return to the client
    user.token = this.createToken(
      user.getUsername(),
      uuid.toString()
    );

    return transformToResponse(userRepository.save(user));
  }

  @Override
  public UserResponse login(String usrName, String usrPwd) throws UserNotFoundException {
    User appUser = userRepository.findByUsername(usrName);
    if (appUser == null) {
      throw new UserNotFoundException();
    }

    if (!bCryptPasswordEncoder.matches(usrPwd, appUser.getPassword())) {
      throw new UserWrongLoginException();
    }

    // Authentication token = SecurityContextHolder.getContext().getAuthentication();

    // create token to return to the client
    appUser.token = this.createToken(
      appUser.getUsername(),
      appUser.getUuid()
    );

    return transformToResponse(appUser);
  }

  private UserResponse transformToResponse(User user) {
    return mapperFacade.map(user, UserResponse.class);
  }

  private String createToken(String userName, String uuid) {
    return JWT.create()
              .withSubject("TinyTaskToken")
              .withClaim("username", userName)
              .withClaim("uuid", uuid)
              .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
              .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
  }

}

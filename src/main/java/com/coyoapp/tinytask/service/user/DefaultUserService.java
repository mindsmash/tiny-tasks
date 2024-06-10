package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

  private final UserRepository userRepository;
  private final ModelMapper mapper;

  @Override
  @Transactional
  public UserResponse createUser(UserRequest userRequest) {
    log.debug("createUser={}", userRequest);
    User user = mapper.map(userRequest, User.class);
    user.setPassword(DigestUtils.sha256Hex(user.getPassword()));
    return transformToResponse(userRepository.save(user));
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<UserResponse> findUser(UserRequest userRequest) {
    Optional<User> userOptional = userRepository.findByEmailAndPassword(
      userRequest.getEmail(),
      DigestUtils.sha256Hex(userRequest.getPassword())
    );
    return userOptional.map(this::transformToResponse);
  }

  private UserResponse transformToResponse(User user) {
    UserResponse r = mapper.map(user, UserResponse.class);
    // Todo: do this with ModelMapper
    r.setJwtToken(JwtUtils.generateToken(r.getEmail()));
    return r;
  }

}

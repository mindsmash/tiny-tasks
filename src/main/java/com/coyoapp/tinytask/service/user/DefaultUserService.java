package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
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
    // todo: hash the password before saving
    // todo: return jwt token
    return transformToResponse(userRepository.save(user));
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseEntity<UserResponse> findUser(UserRequest userRequest) {
    log.debug("findUser={}", userRequest);
    Optional<User> userOptional = userRepository.findByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      return ResponseEntity.ok(transformToResponse(user));
    } else {
      return ResponseEntity.status(401).build();
    }
  }

  private UserResponse transformToResponse(User user) {
    return mapper.map(user, UserResponse.class);
  }

}

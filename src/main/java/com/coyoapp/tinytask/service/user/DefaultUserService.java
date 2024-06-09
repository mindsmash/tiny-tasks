package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserLoginResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

  private final UserRepository userRepository;

  @Override
  @Transactional
  public UserLoginResponse createUser(UserRequest userRequest) {
    log.debug("createUser={}", userRequest);
    User newUser = new User(userRequest.getEmail(), userRequest.getPassword());
    User savedUser = userRepository.save(newUser);
    // todo: hash the password before saving
    // todo: return jwt token
    return new UserLoginResponse(savedUser.getId(), savedUser.getEmail(), savedUser.getPassword());
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseEntity<UserLoginResponse> findUser(UserRequest userRequest) {
    log.debug("findUser={}", userRequest);
    Optional<User> userOptional = userRepository.findByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      return ResponseEntity.ok(new UserLoginResponse(user.getId(), user.getEmail(), user.getPassword()));
    } else {
      return ResponseEntity.status(401).build();
    }
  }

  //todo: map user to UserLoginResponse
}

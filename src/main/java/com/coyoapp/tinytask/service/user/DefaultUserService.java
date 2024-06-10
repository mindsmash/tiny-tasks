package com.coyoapp.tinytask.service.user;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

  private final UserRepository userRepository;
  private final ModelMapper mapper;
  private final JwtEncoder encoder;

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

  @Override
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }


  private UserResponse transformToResponse(User user) {
    UserResponse r = mapper.map(user, UserResponse.class);

    // Todo: split this to a separate util
    Instant now = Instant.now();
    long expiry = 36000L;

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuedAt(now)
      .expiresAt(now.plusSeconds(expiry))
      .subject(r.getEmail())
      .build();
    String token = this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

    // Todo: do this with ModelMapper
    r.setJwtToken(token);
    return r;
  }

}

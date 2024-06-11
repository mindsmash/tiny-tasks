package com.coyoapp.tinytask.utils;

import com.coyoapp.tinytask.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtils {

  private static final Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

  private final JwtEncoder encoder;
  private final JwtDecoder decoder;

  /**
   * Generates the JWT token from a {@link User}.
   * Password and task list of the user are excluded.
   *
   * @param user the given user.
   * @return the JWT token
   */
  public String generateToken(User user) {
    String jsonString = gson.toJson(user);
    log.debug("jsonString={}", jsonString);
    return generateToken(jsonString);
  }

  private String generateToken(String data) {
    Instant now = Instant.now();
    long expiry = 36000L;

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuedAt(now)
      .expiresAt(now.plusSeconds(expiry))
      .subject(data)
      .build();
    return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }

  public Long extractId(String token) {
    Jwt decodedJwt = decoder.decode(token.replace("Bearer ", ""));
    User user = gson.fromJson(decodedJwt.getSubject(), User.class);
    return user.getId();
  }
}

package com.coyoapp.tinytask.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtils {

  private final JwtEncoder encoder;
  private final JwtDecoder decoder;

  public String generateToken(String data) {
    Instant now = Instant.now();
    long expiry = 36000L;

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuedAt(now)
      .expiresAt(now.plusSeconds(expiry))
      .subject(data)
      .build();
    return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }

  public String extractEmail(String token) {
    Jwt decodedJwt = decoder.decode(token.replace("Bearer ", ""));
    return decodedJwt.getSubject(); // subject is the email string
  }

}

package com.coyoapp.tinytask.utils;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;

public class JwtUtils {

  public static String generateToken(JwtEncoder encoder, String data) {
    Instant now = Instant.now();
    long expiry = 36000L;

    JwtClaimsSet claims = JwtClaimsSet.builder()
      .issuedAt(now)
      .expiresAt(now.plusSeconds(expiry))
      .subject(data)
      .build();
    return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
  }
}

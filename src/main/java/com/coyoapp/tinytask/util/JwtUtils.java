package com.coyoapp.tinytask.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;


public class JwtUtils {
  private static final String SECRET_KEY = "my$up3Secr@tkeymy$up3Secr@tkeymy$up3Secr@tkey"; // TODO: read from config
  private static final long EXPIRATION_TIME = 15 * 86400000; // 15 days in milliseconds

  public static String generateToken(String email) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
    Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    return Jwts.builder()
      .setSubject(email)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(key)
      .compact();
  }

  public static boolean validateToken(String token) {
    try {
      Jws<Claims> claims = getClaimsFromToken(token);
      return !claims.getBody().getExpiration().before(new Date());
    } catch (Exception e) {
      return false;
    }
  }

  public static String getEmailFromToken(String token) {
    return getClaimsFromToken(token).getBody().getSubject();
  }

  public static Date getExpirationDateFromToken(String token) {
    return getClaimsFromToken(token).getBody().getExpiration();
  }

  private static Jws<Claims> getClaimsFromToken(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(SECRET_KEY)
      .build()
      .parseClaimsJws(token);
  }
}

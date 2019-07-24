package com.coyoapp.tinytask.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:20
 */
@Component
public class JWTProvider {
  private static final Logger logger = LoggerFactory.getLogger(JWTProvider.class);

  @Value("${app.jwtSecret}")
  private String jwtSecret;

  @Value("${app.jwtExpirationInMs}")
  private int jwtExpirationInMs;


  public String generateToken(Authentication authentication) {

    UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

    return Jwts.builder()
      .setSubject(userDetails.getEmail())
      .setIssuedAt(new Date())
      .setExpiration(expiryDate)
      .signWith(SignatureAlgorithm.HS512, jwtSecret)
      .compact();
  }


  public String getUserIdFromJWT(String token) {
    Claims claims = Jwts.parser()
      .setSigningKey(jwtSecret)
      .parseClaimsJws(token)
      .getBody();

    return claims.getSubject();
  }


  public boolean validateToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException ex) {
      logger.error("Invalid JWT signature");
    } catch (MalformedJwtException ex) {
      logger.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      logger.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      logger.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      logger.error("JWT claims string is empty.");
    }
    return false;
  }
}

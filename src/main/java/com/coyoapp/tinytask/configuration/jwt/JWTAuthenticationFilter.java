package com.coyoapp.tinytask.configuration.jwt;

import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.coyoapp.tinytask.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Date;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private AuthenticationManager authenticationManager;

  public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
      this.authenticationManager = authenticationManager;

      //setFilterProcessesUrl("/users/login");
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req,
                                              HttpServletResponse res) throws AuthenticationException {
      try {
          User creds = new ObjectMapper()
                  .readValue(req.getInputStream(), User.class);

          return authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(
                          creds.getUsername(),
                          creds.getPassword(),
                          new ArrayList<>())
          );
      } catch (IOException e) {
          throw new RuntimeException(e);
      }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req,
                                          HttpServletResponse res,
                                          FilterChain chain,
                                          Authentication auth) throws IOException {
      String token = JWT.create()
              .withSubject("TinyTaskToken")
              .withClaim("username", ((User) auth.getPrincipal()).getUsername())
              .withClaim("uuid", ((User) auth.getPrincipal()).getUuid())
              .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
              .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));

      String body = ((User) auth.getPrincipal()).getUsername() + " " + token;

      res.getWriter().write(body);
      res.getWriter().flush();
  }
}

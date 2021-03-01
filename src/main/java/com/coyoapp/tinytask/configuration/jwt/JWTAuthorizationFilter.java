package com.coyoapp.tinytask.configuration.jwt;

import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.io.IOException;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.ArrayList;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

  public JWTAuthorizationFilter(AuthenticationManager authManager) {
      super(authManager);
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws IOException, ServletException {
      String header = req.getHeader(SecurityConstants.HEADER_STRING);

      if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
          chain.doFilter(req, res);
          return;
      }

      UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

      SecurityContextHolder.getContext().setAuthentication(authentication);
      chain.doFilter(req, res);
  }

  // Reads the JWT from the Authorization header, and then uses JWT to validate the token
  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
      String token = request.getHeader(SecurityConstants.HEADER_STRING);

      if (token != null) {
          // parse the token.
          String user = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()))
                  .build()
                  .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                  .getSubject();

          if (user != null) {
              // new arraylist means authorities
              return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
          }

          return null;
      }

      return null;
  }
}

package com.coyoapp.tinytask.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Kickstart this when an endpoint is called when there is no authentication but authentication is required for the endpoint
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:18
 */
@Component
public class JWTSecurityAuthenticationEntryPoint implements AuthenticationEntryPoint
{
  private static final Logger logger = LoggerFactory.getLogger(JWTSecurityAuthenticationEntryPoint.class);


  @Override public void commence(
    HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException
  {
    logger.error("Authentication required. Message - {}", authException.getMessage());
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
  }
}

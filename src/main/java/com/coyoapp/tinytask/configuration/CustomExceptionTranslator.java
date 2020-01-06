package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.exception.GeneralError;
import com.coyoapp.tinytask.wrapper.ResponseWrapper;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.error.WebResponseExceptionTranslator;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Primary
@CommonsLog
public class CustomExceptionTranslator implements WebResponseExceptionTranslator {

  @Override
  public ResponseEntity<OAuth2Exception> translate(Exception e) throws Exception {
    ResponseWrapper response = new ResponseWrapper();
    Map<String, String> data = new HashMap();

    log.error("Authentication exception: ", e);
    if (e instanceof InvalidGrantException) {
      InvalidGrantException ie = (InvalidGrantException) e;
      data.put("error", ie.getOAuth2ErrorCode());
      data.put("error_description", ie.getMessage());
      response.setData(data);
      if (ie.getMessage().equalsIgnoreCase("User is Disabled")) {
        response.setMessage("Sorry the account is disabled");
      } else if (e.getMessage().equals("Sorry password has expired")) {
        response.setCode(HttpStatus.GONE.value());
        response.setMessage("Sorry password has expired");
        return new ResponseEntity(response, HttpStatus.GONE);
      } else if (e.getMessage().equals("Sorry account is locked")) {
        response.setCode(HttpStatus.LOCKED.value());
        response.setMessage("Sorry account locked");
        return new ResponseEntity(response, HttpStatus.LOCKED);
      } else {
        response.setMessage(ie.getMessage());
      }
      response.setCode(ie.getHttpErrorCode());
      return new ResponseEntity(response, HttpStatus.valueOf(ie.getHttpErrorCode()));
    } else if (e instanceof OAuth2Exception) {
      OAuth2Exception oauthException = (OAuth2Exception) e;
      response.setCode(oauthException.getHttpErrorCode());
      response.setMessage("Please provide valid cradentials");
      data.put("error", oauthException.getOAuth2ErrorCode());
      data.put("error_description", oauthException.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.valueOf(oauthException.getHttpErrorCode()));
    } else if (e instanceof InternalAuthenticationServiceException) {
      response.setCode(401);
      response.setMessage("Sorry internal authentication error occured");
      data.put("error_description", e.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.UNAUTHORIZED);
    } else if (e instanceof LockedException) {
      response.setCode(HttpStatus.LOCKED.value());
      response.setMessage(e.getMessage());
      data.put("error_description", e.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.LOCKED);
    } else if (e instanceof GeneralError) {
      response.setCode(HttpStatus.LOCKED.value());
      response.setMessage(e.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.LOCKED);
    } else if (e instanceof AccessDeniedException) {
      response.setCode(HttpStatus.FORBIDDEN.value());
      response.setMessage(e.getMessage());
      data.put("error_description", e.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.FORBIDDEN);
    } else if (e instanceof CredentialsExpiredException) {
      response.setCode(HttpStatus.GONE.value());
      response.setMessage(e.getMessage());
      data.put("error_description", e.getMessage());
      response.setData(data);
      return new ResponseEntity(response, HttpStatus.GONE);
    } else {

      log.error("Found unknown authentication exception");
      throw e;
    }

  }

}

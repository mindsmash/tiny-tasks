package com.coyoapp.tinytask.configuration;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@CommonsLog
public class AppAuthenticationProvider extends DaoAuthenticationProvider {
  private final UserDetailsService userDetailsService;
  private final TokenStore tokenStore;
  @Value("${app.params.security.ui-client}")
  private String uiClient;


  public AppAuthenticationProvider(@Qualifier("userServiceImpl") UserDetailsService userDetailsService, PasswordEncoder passwordEncoder, TokenStore tokenStore) {
    super();
    this.userDetailsService = userDetailsService;
    this.tokenStore = tokenStore;
    super.setUserDetailsService(userDetailsService);
    super.setPasswordEncoder(passwordEncoder);
  }

  @Override
  public Authentication authenticate(Authentication authentication)
    throws AuthenticationException {
    String lockedError = "Sorry account is locked";
    try {
      Authentication auth = super.authenticate(authentication);
      return auth;
    } catch (BadCredentialsException e) {
      throw new BadCredentialsException("Sorry wrong password or username");
    } catch (LockedException e) {
      throw new LockedException(lockedError);
    } catch (DisabledException en) {
      throw new DisabledException("Sorry account is disabled");
    } catch (CredentialsExpiredException ex) {
      throw new CredentialsExpiredException("Sorry password has expired");
    }
  }
}

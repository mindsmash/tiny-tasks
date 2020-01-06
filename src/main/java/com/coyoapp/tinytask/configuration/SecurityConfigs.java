package com.coyoapp.tinytask.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * Used to configure authentication manager bean and user details service
 */
@Configuration
public class SecurityConfigs extends WebSecurityConfigurerAdapter {
  @Autowired
  private DataSource dataSource;

  /**
   * Initialize authentication manager bean from the super class
   */
  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  /**
   * Initialize Bcrypt encoder bean in spring 5
   */
  @Bean
  public PasswordEncoder delegatingPasswordEncoder() {
    PasswordEncoder defaultEncoder = new BCryptPasswordEncoder();
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());
    encoders.put("scrypt", new SCryptPasswordEncoder());

    DelegatingPasswordEncoder passworEncoder = new DelegatingPasswordEncoder(
      "bcrypt", encoders);
    passworEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

    return passworEncoder;
  }

  @Bean
  @Primary
  public TokenStore jdbcTokenStore() {
    return new JdbcTokenStore(dataSource);
  }
}

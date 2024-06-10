package com.coyoapp.tinytask;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

// TODO: skip authentication in unit test but better to have e2e test for it
@Configuration
@EnableWebSecurity
public class SecurityConfigTest {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests((auth) -> auth
        .anyRequest().permitAll()
      );
    return http.build();
  }

}

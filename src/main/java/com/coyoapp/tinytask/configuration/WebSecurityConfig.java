package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.auth.LoginStatusFilter;
import com.coyoapp.tinytask.service.StoredUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  private final StoredUserService userService;
  private final LoginStatusFilter loginStatusFilter;

  @Autowired
  public WebSecurityConfig(StoredUserService userService, LoginStatusFilter loginStatusFilter) {
    this.userService = userService;
    this.loginStatusFilter = loginStatusFilter;
  }

  @Override
  public void configure(AuthenticationManagerBuilder authentication) throws Exception {
    authentication.userDetailsService(userService);
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()
                         .antMatchers("/**")
                         .permitAll()
                         .and()
                         .addFilterBefore(loginStatusFilter, UsernamePasswordAuthenticationFilter.class)
                         .logout()
                         .logoutUrl("/auth/logout")
                         .invalidateHttpSession(true)
                         .deleteCookies("JSESSIONID");
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManager() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}

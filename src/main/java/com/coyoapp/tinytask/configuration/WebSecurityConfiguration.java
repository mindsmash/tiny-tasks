package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.security.JWTSecurityAuthenticationEntryPoint;
import com.coyoapp.tinytask.security.JwtAuthenticationFilter;
import com.coyoapp.tinytask.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:08
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
  securedEnabled = true,
  jsr250Enabled = true,
  prePostEnabled = true
)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final CustomUserDetailService customUserDetailsService;

  private final JWTSecurityAuthenticationEntryPoint unauthorizedHandler;


  public WebSecurityConfiguration(CustomUserDetailService customUserDetailsService, JWTSecurityAuthenticationEntryPoint unauthorizedHandler) {
    this.customUserDetailsService = customUserDetailsService;
    this.unauthorizedHandler = unauthorizedHandler;
  }


  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter();
  }


  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder
      .userDetailsService(customUserDetailsService)
      .passwordEncoder(passwordEncoder());
  }


  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }


  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .cors()
      .and()
      .csrf()
      .disable()
      .exceptionHandling()
      .authenticationEntryPoint(unauthorizedHandler)
      .and()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
      .antMatchers(
        "/",
        "/favicon.ico",
        "/**/*.png",
        "/**/*.gif",
        "/**/*.svg",
        "/**/*.jpg",
        "/**/*.html",
        "/**/*.css",
        "/**/*.js")
      .permitAll()
      .antMatchers("/api/v1/auth/**")
      .permitAll()
      .antMatchers("/api/v1/user/checkUsernameAvailability",
        "/api/user/checkEmailAvailability")
      .permitAll()
      .anyRequest()
      .authenticated();

    // Add our custom JWT security filter
    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    http.headers().frameOptions().disable();
  }

}


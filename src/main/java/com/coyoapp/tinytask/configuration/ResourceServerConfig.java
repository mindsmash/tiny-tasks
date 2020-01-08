package com.coyoapp.tinytask.configuration;


import com.coyoapp.tinytask.filters.ResponseFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * @author Owori Juma
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
  private final AccessDeniedHandler accessDeniedHandler;
  private final AuthenticationFilter authFilter;
  private final ResponseFilter responseFilter;
  private final OauthClientFilter clientFilter;


  public ResourceServerConfig(TokenStore tokenStore, AccessDeniedHandler accessDeniedHandler) {
    this.accessDeniedHandler = accessDeniedHandler;
    authFilter = new AuthenticationFilter();
    responseFilter = new ResponseFilter();
    this.clientFilter = new OauthClientFilter(tokenStore);
  }

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .requestMatchers(CorsUtils::isCorsRequest).permitAll()
      .antMatchers("/v1").permitAll()
      .antMatchers("/v1/swagger-resources/**", "/v1/configuration/**", "/v1/swagger-ui.html", "/v1/webjars/**").permitAll()
      .antMatchers(HttpMethod.POST, "/v1/users").permitAll()
      .antMatchers(HttpMethod.POST, "/v1/tasks").hasRole("USER")
      .antMatchers(HttpMethod.POST, "/v1/users/change-pass").hasRole("USER")
      .antMatchers(HttpMethod.GET, "/v1/tasks").hasRole("USER")
      .antMatchers(HttpMethod.DELETE, "/v1/tasks/{\\taskId}").hasRole("USER")
      .and()
      .addFilterAfter(clientFilter, BasicAuthenticationFilter.class)
      .addFilterBefore(authFilter, ExceptionTranslationFilter.class)
      .cors()
      .configurationSource(corsConfig())
      .and()
      .exceptionHandling()
      .accessDeniedHandler(accessDeniedHandler);
  }


  @Bean
  CorsConfigurationSource corsConfig() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration corsConfig = new CorsConfiguration();
    corsConfig.applyPermitDefaultValues();
    corsConfig.addAllowedHeader("Access-Control-Allow-Origin");
    corsConfig.addExposedHeader("Access-Control-Allow-Origin");
    corsConfig.addAllowedMethod(HttpMethod.GET);
    corsConfig.addAllowedMethod(HttpMethod.POST);
    corsConfig.addAllowedMethod(HttpMethod.DELETE);
    corsConfig.addAllowedOrigin("http://localhost:4200");
    source.registerCorsConfiguration("/**", corsConfig);
    return source;
  }
}

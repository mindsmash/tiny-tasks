package com.coyoapp.tinytask.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		//desactiver la session
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		//http.formLogin();
		http.authorizeRequests().antMatchers("/login/**","/users/**","/tasks/**","/resetpassword","tasks/gettasksadmin","tasks/createtaskuse","/tasks/tasksbyuser" ).permitAll();
//		http.authorizeRequests().antMatchers("/tasks/**","/register/**" ,"/users/**").hasAnyAuthority("ADMIN");
//		http.authorizeRequests().antMatchers(HttpMethod.POST,"/tasks/**","/register/**").permitAll()/*hasAnyAuthority("ADMIN")*/;
//		http.authorizeRequests().antMatchers(HttpMethod.PUT,"/tasks/**","/users/**").hasAnyAuthority("ADMIN");
//		http.authorizeRequests().antMatchers(HttpMethod.GET,"/tasks/**","/users/**","/user/**").hasAnyAuthority("ADMIN");


		http.authorizeRequests().anyRequest().permitAll();
		http.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
		}
	
	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
       return encoder;
    }
}
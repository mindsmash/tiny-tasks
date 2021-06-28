package com.coyoapp.tinytask.configuration;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.coyoapp.tinytask.domain.Customer;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;




public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	AuthenticationManager authenticationManager;
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		super();
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
		Customer customer = null;
		
		try {
			customer = new ObjectMapper().readValue(request.getInputStream(), Customer.class);
		} catch (Exception e) {
			throw new RuntimeException(e);
		} 
			System.out.println("*************");
			System.out.println("username="+ customer.getLogin());
			System.out.println("password="+ customer.getPassword());
		return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				customer.getLogin(), customer.getPassword())) ;
	}
	

	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		User springUser = (User) authResult.getPrincipal();
		String Jwt = Jwts.builder()
				.setSubject(springUser.getUsername())
				.setExpiration(new Date(System.currentTimeMillis()+SecurityConstants.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS256, SecurityConstants.SECRET)
				.claim("roles", springUser.getAuthorities())
				
				.compact();
		response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX+Jwt);
		
		
	}

}
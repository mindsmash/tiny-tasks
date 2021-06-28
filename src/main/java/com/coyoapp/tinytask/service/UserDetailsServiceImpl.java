package com.coyoapp.tinytask.service;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.coyoapp.tinytask.domain.Customer;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private AccountService accountService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Customer customer =  accountService.findUserByUsername(username);
		if(customer==null) throw new  UsernameNotFoundException(username);
		
		Collection<GrantedAuthority> authorities = new ArrayList<>();

		
		
		return new User(customer.getLogin(),customer.getPassword(),authorities);
	}
	
	
}
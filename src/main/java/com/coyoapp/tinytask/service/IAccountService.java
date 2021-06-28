package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Customer;

public interface IAccountService {
	
	public Customer saveUser(Customer user);
	public Customer findUserByUsername(String username);
	
	

}
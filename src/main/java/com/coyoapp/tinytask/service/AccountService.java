package com.coyoapp.tinytask.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.Customer;
import com.coyoapp.tinytask.repository.CustomerRepository;



@Service
@Transactional
public class AccountService implements IAccountService {
	
	private PasswordEncoder bCryptPasswordEncoder;
	
	public AccountService(BCryptPasswordEncoder bCryptPasswordEncoder) {this.bCryptPasswordEncoder=bCryptPasswordEncoder;}
	
	
	@Autowired
	private CustomerRepository userRepository;
	
	
	
	@Override
	public Customer saveUser(Customer customer) {
		String hashPW = bCryptPasswordEncoder.encode(customer.getPassword());
		customer.setPassword(hashPW);
		
		return userRepository.save(customer);
	}


	@Override
	public Customer findUserByUsername(String username) {
		return userRepository.findByLogin(username);
	}

	
	
	
}
package com.coyoapp.tinytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.coyoapp.tinytask.domain.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

	
	public Customer findByLogin(String login);

	

}

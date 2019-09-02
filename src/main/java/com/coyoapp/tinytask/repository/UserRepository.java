package com.coyoapp.tinytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.coyoapp.tinytask.domain.User;

public interface UserRepository extends JpaRepository<User, String> {

	@Query("Select u from User u where u.email = ?1 and u.password = ?2  ")
	User findByUserAndPassword(String user, String password); 
}

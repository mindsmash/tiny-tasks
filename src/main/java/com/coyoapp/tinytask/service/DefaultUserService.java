package com.coyoapp.tinytask.service;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultUserService implements UserService {

	@Autowired
	private UserRepository userRepository;

	Logger log = LoggerFactory.getLogger(DefaultUserService.class);

	@Override
	@Transactional(readOnly = true)
	public List<User> getAllUsers() {
		log.debug("getTasks()");
		return userRepository.findAll();
	}

	@Override
	public User signIn(@Valid User user) {
		return userRepository.findByUserAndPassword(user.getEmail(), user.getPassword());
		
	}

}

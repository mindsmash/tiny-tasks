package com.coyoapp.tinytask.web;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:4200", "http://localhost"})

public class UserController {

	@Autowired
	private UserService userService;

	Logger log = LoggerFactory.getLogger(UserService.class);

	@PostMapping
	public User signIn(@RequestBody @Valid User user) {
		log.debug("user controller- signIn - "+ user.toString());
		return this.userService.signIn(user);
	}
}
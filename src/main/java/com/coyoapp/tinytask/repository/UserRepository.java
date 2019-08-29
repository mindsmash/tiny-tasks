package com.coyoapp.tinytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coyoapp.tinytask.domain.User;

public interface UserRepository extends JpaRepository<User, String> {
}

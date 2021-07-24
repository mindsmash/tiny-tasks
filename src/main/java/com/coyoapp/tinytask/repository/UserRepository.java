package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {}

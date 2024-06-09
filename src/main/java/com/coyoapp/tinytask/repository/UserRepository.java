package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByEmailAndPassword(String email, String password);
}

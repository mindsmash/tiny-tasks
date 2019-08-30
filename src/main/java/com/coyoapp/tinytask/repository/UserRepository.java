package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
  @Override
  Optional<User> findById(String id);

  Optional<User> findByEmail(String email);
}

package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
  User findByUsername(String username);
}

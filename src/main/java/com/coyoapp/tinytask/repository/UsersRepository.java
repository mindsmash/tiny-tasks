package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String> {
}

package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.UserRole;
import com.coyoapp.tinytask.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

  List<UserRole> findByUserId(Users userId);
}

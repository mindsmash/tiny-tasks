package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles, Integer> {

  Roles findByAuthority(String authority);
}

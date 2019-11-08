package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {
  List<Role> findByUserId(String userId);
}

package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Role;
import com.coyoapp.tinytask.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:10
 */
public interface UserRepository extends CrudRepository<User, Integer> {
  Optional<User> findByEmail(String email);

  Optional<User> findByEmailOrId(String email, String id);

  Optional<User> findByEmailAndPassword(String email, byte[] password);

  List<User> findAllByRoleList(List<Role> roleList);
}

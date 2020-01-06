package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.UserRole;
import com.coyoapp.tinytask.repository.RoleRepository;
import com.coyoapp.tinytask.repository.UserRoleRepository;
import com.coyoapp.tinytask.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

  private final RoleRepository roleRepository;
  private final UserRoleRepository userRoleRepository;

  @Override
  public Roles findByAuthority(String authority) {
    return roleRepository.findByAuthority(authority);
  }

  @Override
  public void saveUserRoles(UserRole userRole) {
    //delete pre-existing assigned roles
    List<UserRole> userRoles = userRoleRepository.findByUserId(userRole.getUserId());
    userRoleRepository.deleteAll(userRoles);

    userRoleRepository.save(userRole);
  }


}

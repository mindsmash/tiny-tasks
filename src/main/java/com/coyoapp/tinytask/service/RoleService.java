package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.UserRole;

public interface RoleService {

  /**
   * @param authority
   * @return
   */
  Roles findByAuthority(String authority);

  /**
   * @param userRole
   */
  void saveUserRoles(UserRole userRole);
}

package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Roles;
import com.coyoapp.tinytask.domain.UserRole;
import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.ChangePassResponse;
import com.coyoapp.tinytask.dto.RegisterRequest;
import com.coyoapp.tinytask.dto.RegisterResponse;
import com.coyoapp.tinytask.exception.GeneralError;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.RoleService;
import com.coyoapp.tinytask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
  private final UserRepository repository;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;
  private final MapperFacade mapperFacade;


  @Override
  public Users findByUserName(String userName) {
    log.debug("fetch user( user  ={})", userName);
    return repository.findByUsername(userName);
  }

  @Override
  public RegisterResponse saveUser(RegisterRequest users) throws GeneralError {
    log.debug("RegisterUser( reg ={})", users);
    //fetch default role
    Roles role = roleService.findByAuthority("ROLE_USER");
    if (Objects.nonNull(repository.findByUsername(users.getUsername())))
      throw new GeneralError("Username [" + users.getUsername() + "] is already used");
    //add user
    String password = passwordEncoder.encode(users.getPassword());
    users.setPassword(password);
    Users user = mapperFacade.map(users, Users.class);
    RegisterResponse resp = mapperFacade.map(repository.save(user), RegisterResponse.class);
    log.debug("RegisterResponse( rep ={})", resp);

    //add user role
    UserRole userRole = new UserRole();
    userRole.setRoleId(role);
    userRole.setUserId(user);
    roleService.saveUserRoles(userRole);


    return resp;
  }

  @Override
  public ChangePassResponse changePass(ChangePassRequest req, String username) throws GeneralError {
    Users user = findByUserName(username);
    String curr_pass = passwordEncoder.encode(req.getCurrentPassword());
    log.debug("Current Password {} and encrypted {}", req.getCurrentPassword(), curr_pass);

    if (!req.getNewPassword().equals(req.getConfirmPassword()))
      throw new GeneralError("New passwords not matching");
    if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword()))
      throw new GeneralError("Wrong Current Password");
    if (req.getCurrentPassword().equals(req.getConfirmPassword()))
      throw new GeneralError("Your new Password is matching what you currently have, please set a new password that has not been used");
    user.setPassword(passwordEncoder.encode(req.getNewPassword()));
    user = repository.save(user);
    return mapperFacade.map(user, ChangePassResponse.class);
  }
}

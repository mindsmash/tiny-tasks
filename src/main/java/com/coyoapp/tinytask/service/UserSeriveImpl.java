package com.coyoapp.tinytask.service;


import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserSeriveImpl implements UserService {

  @Autowired
  private UserRepository userRepository;


  @Override
  public User findByUserName(String name) {
    return userRepository.findByUserName(name);
  }

  @Override
  @Transactional
  public User save(User user) {
    log.debug("createUser(createUser={})", user.getUserName());
    return userRepository.save(user);

  }
}
